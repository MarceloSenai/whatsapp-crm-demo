interface CampaignStatsData {
  total: number;
  pending: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  failed: number;
}

interface CampaignStatsProps {
  stats: CampaignStatsData;
}

const FUNNEL_STEPS = [
  { key: 'sent', label: 'Enviadas', color: 'bg-blue-500' },
  { key: 'delivered', label: 'Entregues', color: 'bg-indigo-500' },
  { key: 'read', label: 'Lidas', color: 'bg-green-500' },
  { key: 'replied', label: 'Respondidas', color: 'bg-emerald-500' },
] as const;

function pct(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
}

export default function CampaignStats({ stats }: CampaignStatsProps) {
  const { total } = stats;

  if (total === 0) {
    return (
      <div className="text-xs text-gray-400">Sem mensagens</div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {/* Stacked horizontal bar */}
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
        {FUNNEL_STEPS.map((step) => {
          const value = stats[step.key];
          if (value === 0) return null;
          const widthPct = (value / total) * 100;
          return (
            <div
              key={step.key}
              className={`${step.color} transition-all duration-500`}
              style={{ width: `${widthPct}%` }}
              title={`${step.label}: ${value} (${pct(value, total)})`}
            />
          );
        })}
        {stats.failed > 0 && (
          <div
            className="bg-red-400 transition-all duration-500"
            style={{ width: `${(stats.failed / total) * 100}%` }}
            title={`Falhas: ${stats.failed} (${pct(stats.failed, total)})`}
          />
        )}
      </div>

      {/* Labels row */}
      <div className="flex items-center gap-3">
        {FUNNEL_STEPS.map((step) => {
          const value = stats[step.key];
          return (
            <div key={step.key} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${step.color}`} />
              <span className="text-[11px] text-gray-500">
                {value}
              </span>
              <span className="text-[10px] text-gray-400">
                {pct(value, total)}
              </span>
            </div>
          );
        })}
        {stats.failed > 0 && (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-[11px] text-red-500">
              {stats.failed}
            </span>
            <span className="text-[10px] text-red-400">
              {pct(stats.failed, total)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
