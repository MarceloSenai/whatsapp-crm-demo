'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { Loader2 } from 'lucide-react';
import KanbanColumn from '@/components/pipeline/kanban-column';
import DealCard from '@/components/pipeline/deal-card';

interface Contact {
  id: string;
  name: string;
  phone: string;
  tags: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  notes: string | null;
  contact: Contact;
}

interface Stage {
  id: string;
  name: string;
  order: number;
  color: string;
  deals: Deal[];
}

interface Pipeline {
  id: string;
  name: string;
  stages: Stage[];
}

export default function KanbanBoard() {
  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const fetchPipeline = useCallback(async () => {
    try {
      const res = await fetch('/api/pipeline');
      const data = await res.json();
      setPipeline(data);
    } catch (err) {
      console.error('Failed to fetch pipeline:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

  function handleDragStart(event: DragStartEvent) {
    const dealId = event.active.id as string;
    if (!pipeline) return;

    for (const stage of pipeline.stages) {
      const deal = stage.deals.find((d) => d.id === dealId);
      if (deal) {
        setActiveDeal(deal);
        break;
      }
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveDeal(null);

    const { active, over } = event;
    if (!over || !pipeline) return;

    const dealId = active.id as string;
    const targetStageId = over.id as string;

    // Find the source stage of this deal
    const sourceStage = pipeline.stages.find((s) =>
      s.deals.some((d) => d.id === dealId)
    );
    if (!sourceStage) return;

    // No-op if dropped on the same stage
    if (sourceStage.id === targetStageId) return;

    // Find the deal being moved
    const deal = sourceStage.deals.find((d) => d.id === dealId);
    if (!deal) return;

    // Optimistic update
    setPipeline((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        stages: prev.stages.map((stage) => {
          if (stage.id === sourceStage.id) {
            return {
              ...stage,
              deals: stage.deals.filter((d) => d.id !== dealId),
            };
          }
          if (stage.id === targetStageId) {
            return {
              ...stage,
              deals: [deal, ...stage.deals],
            };
          }
          return stage;
        }),
      };
    });

    // Persist to server
    try {
      await fetch('/api/pipeline', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId, stageId: targetStageId }),
      });
    } catch (err) {
      console.error('Failed to move deal:', err);
      // Revert on error
      fetchPipeline();
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!pipeline) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Nenhum pipeline encontrado.</p>
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {pipeline.stages.map((stage) => (
          <KanbanColumn key={stage.id} stage={stage} />
        ))}
      </div>

      <DragOverlay>
        {activeDeal ? <DealCard deal={activeDeal} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
