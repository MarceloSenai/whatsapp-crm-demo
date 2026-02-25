import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const templates = await prisma.template.findMany({
    where: { status: 'approved' },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(templates);
}
