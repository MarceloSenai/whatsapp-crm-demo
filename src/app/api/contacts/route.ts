import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const contacts = await prisma.contact.findMany({
    include: {
      _count: { select: { conversations: true, deals: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(contacts);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, optedOut } = body;

  if (!id || typeof optedOut !== 'boolean') {
    return NextResponse.json({ error: 'id and optedOut required' }, { status: 400 });
  }

  const contact = await prisma.contact.update({
    where: { id },
    data: {
      optedOut,
      optOutAt: optedOut ? new Date() : null,
    },
  });

  return NextResponse.json(contact);
}
