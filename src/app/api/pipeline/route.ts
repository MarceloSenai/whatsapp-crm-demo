import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const pipeline = await prisma.pipeline.findFirst({
    include: {
      stages: {
        orderBy: { order: 'asc' },
        include: {
          deals: {
            include: { contact: true },
            orderBy: { updatedAt: 'desc' },
          },
        },
      },
    },
  });
  return NextResponse.json(pipeline);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { dealId, stageId } = body;

  if (!dealId || !stageId) {
    return NextResponse.json({ error: 'dealId and stageId required' }, { status: 400 });
  }

  const deal = await prisma.deal.update({
    where: { id: dealId },
    data: { stageId },
    include: { contact: true, stage: true },
  });

  return NextResponse.json(deal);
}
