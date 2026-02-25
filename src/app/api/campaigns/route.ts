import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      _count: { select: { messages: true } },
      messages: {
        select: { status: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const result = campaigns.map((c) => {
    const stats = {
      total: c.messages.length,
      pending: c.messages.filter((m) => m.status === 'pending').length,
      sent: c.messages.filter((m) => m.status === 'sent').length,
      delivered: c.messages.filter((m) => m.status === 'delivered').length,
      read: c.messages.filter((m) => m.status === 'read').length,
      replied: c.messages.filter((m) => m.status === 'replied').length,
      failed: c.messages.filter((m) => m.status === 'failed').length,
    };
    const { messages: _, ...campaign } = c;
    return { ...campaign, stats };
  });

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, templateText, audienceFilter, rateLimit } = body;

  if (!name || !templateText) {
    return NextResponse.json({ error: 'name and templateText required' }, { status: 400 });
  }

  // Find eligible contacts (not opted out)
  let tagFilter: string[] = [];
  if (audienceFilter) {
    try {
      const parsed = JSON.parse(audienceFilter);
      tagFilter = parsed.tags || [];
    } catch { /* ignore */ }
  }

  const contacts = await prisma.contact.findMany({
    where: { optedOut: false },
  });

  // Filter by tags if specified
  const eligible = tagFilter.length > 0
    ? contacts.filter((c) => {
        const contactTags: string[] = JSON.parse(c.tags || '[]');
        return tagFilter.some((t: string) => contactTags.includes(t));
      })
    : contacts;

  const campaign = await prisma.campaign.create({
    data: {
      name,
      templateText,
      audienceFilter: audienceFilter || null,
      rateLimit: rateLimit || 30,
      status: 'draft',
      messages: {
        create: eligible.map((c) => ({
          contactId: c.id,
          status: 'pending',
        })),
      },
    },
    include: { _count: { select: { messages: true } } },
  });

  return NextResponse.json(campaign);
}
