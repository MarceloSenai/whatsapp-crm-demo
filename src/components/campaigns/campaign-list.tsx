'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Megaphone, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import CampaignStats from '@/components/campaigns/campaign-stats';

interface CampaignStatsData {
  total: number;
  pending: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  failed: number;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  templateText: string;
  audienceFilter: string | null;
  rateLimit: number;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  stats: CampaignStatsData;
}

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  draft: {
    label: 'Rascunho',
    classes: 'bg-gray-100 text-gray-600',
  },
  running: {
    label: 'Enviando...',
    classes: 'bg-blue-100 text-blue-700 animate-pulse',
  },
  paused: {
    label: 'Pausada',
    classes: 'bg-yellow-100 text-yellow-700',
  },
  completed: {
    label: 'Concluida',
    classes: 'bg-green-100 text-green-700',
  },
};

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [startingId, setStartingId] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch('/api/campaigns');
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
    } catch {
      // silently retry on next poll
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
    const interval = setInterval(fetchCampaigns, 5000);
    return () => clearInterval(interval);
  }, [fetchCampaigns]);

  async function handleStart(id: string) {
    setStartingId(id);
    try {
      const res = await fetch(`/api/campaigns/${id}/start`, { method: 'POST' });
      if (res.ok) {
        await fetchCampaigns();
      }
    } catch {
      // error starting
    } finally {
      setStartingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Megaphone className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700">
          Nenhuma campanha criada
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Crie sua primeira campanha para enviar mensagens em massa.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Nome
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Audiencia
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Progresso
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Enviadas
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Entregues
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Lidas
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Respondidas
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Acoes
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {campaigns.map((campaign) => {
            const cfg = STATUS_CONFIG[campaign.status] ?? STATUS_CONFIG.draft;
            const { stats } = campaign;
            const sentPct =
              stats.total > 0
                ? Math.round(((stats.total - stats.pending) / stats.total) * 100)
                : 0;
            const isStarting = startingId === campaign.id;

            return (
              <tr
                key={campaign.id}
                className="transition-colors hover:bg-gray-50/50"
              >
                {/* Nome */}
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 text-sm">
                    {campaign.name}
                  </div>
                  <div className="mt-0.5 max-w-[200px] truncate text-xs text-gray-400">
                    {campaign.templateText}
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      cfg.classes
                    )}
                  >
                    {cfg.label}
                  </span>
                </td>

                {/* Audiencia */}
                <td className="px-4 py-3 text-center text-sm text-gray-700">
                  {stats.total}
                </td>

                {/* Progresso */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          campaign.status === 'completed'
                            ? 'bg-green-500'
                            : 'bg-blue-500'
                        )}
                        style={{ width: `${sentPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{sentPct}%</span>
                  </div>
                </td>

                {/* Enviadas */}
                <td className="px-4 py-3 text-center text-sm text-blue-600 font-medium">
                  {stats.sent}
                </td>

                {/* Entregues */}
                <td className="px-4 py-3 text-center text-sm text-indigo-600 font-medium">
                  {stats.delivered}
                </td>

                {/* Lidas */}
                <td className="px-4 py-3 text-center text-sm text-green-600 font-medium">
                  {stats.read}
                </td>

                {/* Respondidas */}
                <td className="px-4 py-3 text-center text-sm text-emerald-600 font-medium">
                  {stats.replied}
                </td>

                {/* Acoes */}
                <td className="px-4 py-3 text-center">
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => handleStart(campaign.id)}
                      disabled={isStarting}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors',
                        isStarting
                          ? 'cursor-not-allowed bg-gray-300'
                          : 'bg-[#25d366] hover:bg-[#128c7e]'
                      )}
                    >
                      {isStarting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Play className="h-3.5 w-3.5" />
                      )}
                      Iniciar
                    </button>
                  )}
                  {campaign.status === 'running' && (
                    <span className="text-xs text-blue-500">Em andamento</span>
                  )}
                  {campaign.status === 'completed' && (
                    <CampaignStats stats={stats} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
