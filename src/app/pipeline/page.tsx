import { Plus } from 'lucide-react';
import KanbanBoard from '@/components/pipeline/kanban-board';

export default function PipelinePage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Pipeline Comercial
        </h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#128c7e]"
        >
          <Plus className="h-4 w-4" />
          Novo Deal
        </button>
      </header>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}
