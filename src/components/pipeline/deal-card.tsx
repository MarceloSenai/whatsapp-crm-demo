'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { User, DollarSign } from 'lucide-react';
import { formatCurrency, parseTags } from '@/lib/utils';

interface Deal {
  id: string;
  title: string;
  value: number;
  notes: string | null;
  contact: {
    id: string;
    name: string;
    phone: string;
    tags: string;
  };
}

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: deal.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const tags = parseTags(deal.contact.tags);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-lg border bg-white p-3 shadow-sm transition-shadow ${
        isDragging ? 'shadow-lg ring-2 ring-blue-200' : 'hover:shadow-md'
      } cursor-grab active:cursor-grabbing`}
    >
      <h4 className="mb-1 text-sm font-medium text-gray-900">{deal.title}</h4>

      <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
        <User className="h-3 w-3 shrink-0" />
        <span className="truncate">{deal.contact.name}</span>
      </div>

      <div className="mb-2 flex items-center gap-1 text-sm font-semibold text-gray-800">
        <DollarSign className="h-3.5 w-3.5 shrink-0 text-green-600" />
        {formatCurrency(deal.value)}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
