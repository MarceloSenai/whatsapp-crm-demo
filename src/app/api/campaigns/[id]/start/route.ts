import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { messages: true },
  });

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  // Update campaign status
  await prisma.campaign.update({
    where: { id },
    data: { status: 'running', startedAt: new Date() },
  });

  // Simulate sending messages progressively
  const pendingMessages = campaign.messages.filter((m) => m.status === 'pending');
  const rateLimit = campaign.rateLimit || 30;
  const intervalMs = Math.max(60000 / rateLimit, 500); // At least 500ms between messages

  pendingMessages.forEach((msg, idx) => {
    const sendDelay = idx * intervalMs;

    // sent
    setTimeout(async () => {
      await prisma.campaignMessage.update({
        where: { id: msg.id },
        data: { status: 'sent', sentAt: new Date() },
      });
    }, sendDelay);

    // delivered (1-3s after sent)
    setTimeout(async () => {
      await prisma.campaignMessage.update({
        where: { id: msg.id },
        data: { status: 'delivered', deliveredAt: new Date() },
      });
    }, sendDelay + 1000 + Math.random() * 2000);

    // read (50% chance, 3-8s after sent)
    if (Math.random() > 0.4) {
      setTimeout(async () => {
        await prisma.campaignMessage.update({
          where: { id: msg.id },
          data: { status: 'read', readAt: new Date() },
        });
      }, sendDelay + 3000 + Math.random() * 5000);
    }

    // replied (20% chance, 8-15s after sent)
    if (Math.random() > 0.8) {
      setTimeout(async () => {
        await prisma.campaignMessage.update({
          where: { id: msg.id },
          data: { status: 'replied', repliedAt: new Date() },
        });
      }, sendDelay + 8000 + Math.random() * 7000);
    }
  });

  // Mark campaign as completed after all messages processed
  const totalDelay = pendingMessages.length * intervalMs + 15000;
  setTimeout(async () => {
    await prisma.campaign.update({
      where: { id },
      data: { status: 'completed', completedAt: new Date() },
    });
  }, totalDelay);

  return NextResponse.json({ status: 'started', messagesCount: pendingMessages.length });
}
