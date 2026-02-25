'use client';

import { useDroppable } from '@dnd-kit/core';
import { formatCurrency } from '@/lib/utils';
import DealCard from '@/components/pipeline/deal-card';

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

interface Stage {
  id: string;
  name: string;
  order: number;
  color: string;
  deals: Deal[];
}

interface KanbanColumnProps {
  stage: Stage;
}

export default function KanbanColumn({ stage }: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: stage.id,
  });

  const totalValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="flex min-w-[280px] max-w-[320px] shrink-0 flex-col rounded-xl bg-gray-50">
      {/* Column Header */}
      <div className="px-3 py-3">
        <div className="mb-1 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: stage.color }}
          />
          <h3 className="text-sm font-semibold text-gray-800">{stage.name}</h3>
          <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
            {stage.deals.length}
          </span>
        </div>
        <p className="pl-[18px] text-xs text-gray-500">
          {formatCurrency(totalValue)}
        </p>
      </div>

      {/* Column Body (Droppable) */}
      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2 transition-colors ${
          isOver ? 'bg-blue-50' : ''
        }`}
        style={{ maxHeight: 'calc(100vh - 180px)' }}
      >
        {stage.deals.length > 0 ? (
          stage.deals.map((deal) => <DealCard key={deal.id} deal={deal} />)
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-4">
            <p className="text-center text-xs text-gray-400">
              Arraste um deal aqui
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
