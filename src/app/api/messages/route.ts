import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { generateResponse, randomDelay } from '@/lib/whatsapp-simulator';

export async function GET(request: NextRequest) {
  const conversationId = request.nextUrl.searchParams.get('conversationId');
  if (!conversationId) {
    return NextResponse.json({ error: 'conversationId required' }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  });

  // Mark conversation as read
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { unreadCount: 0 },
  });

  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { conversationId, content } = body;

  if (!conversationId || !content) {
    return NextResponse.json({ error: 'conversationId and content required' }, { status: 400 });
  }

  // Save outbound message
  const outbound = await prisma.message.create({
    data: {
      conversationId,
      direction: 'outbound',
      content,
      status: 'sent',
    },
  });

  // Update conversation
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date(), status: 'open' },
  });

  // Simulate status progression: sent → delivered → read
  setTimeout(async () => {
    await prisma.message.update({
      where: { id: outbound.id },
      data: { status: 'delivered' },
    });
  }, 1000);

  setTimeout(async () => {
    await prisma.message.update({
      where: { id: outbound.id },
      data: { status: 'read' },
    });
  }, 3000);

  // Simulate auto-response after delay
  const delay = randomDelay();
  setTimeout(async () => {
    const responseText = generateResponse(content);
    await prisma.message.create({
      data: {
        conversationId,
        direction: 'inbound',
        content: responseText,
        status: 'read',
      },
    });

    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        unreadCount: { increment: 1 },
      },
    });
  }, delay);

  return NextResponse.json(outbound);
}
