'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  FileText,
  Users,
  Clock,
  ClipboardList,
  Loader2,
  Tag,
} from 'lucide-react';
import { cn, parseTags } from '@/lib/utils';

// ---------- Types ----------

interface Contact {
  id: string;
  name: string;
  phone: string;
  tags: string;
  optedOut: boolean;
}

interface StepDef {
  key: string;
  label: string;
  icon: React.ElementType;
}

const STEPS: StepDef[] = [
  { key: 'content', label: 'Conteudo', icon: FileText },
  { key: 'audience', label: 'Audiencia', icon: Users },
  { key: 'cadence', label: 'Cadencia', icon: Clock },
  { key: 'review', label: 'Revisao', icon: ClipboardList },
];

const AVAILABLE_TAGS = [
  'lead',
  'cliente',
  'vip',
  'prospecto',
  'enterprise',
  'startup',
  'pme',
];

const TAG_LABELS: Record<string, string> = {
  lead: 'Lead',
  cliente: 'Cliente',
  vip: 'VIP',
  prospecto: 'Prospecto',
  enterprise: 'Enterprise',
  startup: 'Startup',
  pme: 'PME',
};

// ---------- Component ----------

export default function CampaignForm() {
  const router = useRouter();

  // Step navigation
  const [currentStep, setCurrentStep] = useState(0);

  // Form data
  const [name, setName] = useState('');
  const [templateText, setTemplateText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [rateLimit, setRateLimit] = useState(30);

  // Contacts for audience estimation
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  // Submission
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch('/api/contacts');
        if (res.ok) {
          const data = await res.json();
          setContacts(data);
        }
      } catch {
        // ignore
      } finally {
        setLoadingContacts(false);
      }
    }
    fetchContacts();
  }, []);

  // Eligible contacts count
  const eligibleContacts = useMemo(() => {
    const notOptedOut = contacts.filter((c) => !c.optedOut);
    if (selectedTags.length === 0) return notOptedOut;
    return notOptedOut.filter((c) => {
      const contactTags = parseTags(c.tags);
      return selectedTags.some((t) => contactTags.includes(t));
    });
  }, [contacts, selectedTags]);

  const audienceCount = eligibleContacts.length;

  // Estimated duration
  const estimatedMinutes = useMemo(() => {
    if (audienceCount === 0 || rateLimit === 0) return 0;
    return Math.ceil(audienceCount / rateLimit);
  }, [audienceCount, rateLimit]);

  // Validation per step
  function isStepValid(step: number): boolean {
    switch (step) {
      case 0:
        return name.trim().length > 0 && templateText.trim().length > 0;
      case 1:
        return audienceCount > 0;
      case 2:
        return rateLimit >= 5 && rateLimit <= 60;
      case 3:
        return true;
      default:
        return false;
    }
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const audienceFilter =
        selectedTags.length > 0
          ? JSON.stringify({ tags: selectedTags })
          : undefined;

      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          templateText: templateText.trim(),
          audienceFilter,
          rateLimit,
        }),
      });

      if (res.ok) {
        router.push('/campaigns');
      }
    } catch {
      // error creating
    } finally {
      setSubmitting(false);
    }
  }

  // ---------- Step renderers ----------

  function renderStepContent() {
    return (
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Nome da campanha
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Promocao Black Friday"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#25d366] focus:bg-white"
          />
        </div>

        {/* Template text */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Texto da mensagem
          </label>
          <textarea
            value={templateText}
            onChange={(e) => setTemplateText(e.target.value)}
            placeholder={
              'Ola {{nome}}, temos uma oferta especial para voce!\n\nConfira nossos produtos com ate 50% de desconto.'
            }
            rows={8}
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#25d366] focus:bg-white"
          />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Use {'{{nome}}'} para personalizar com o nome do contato
            </span>
            <span
              className={cn(
                'text-xs',
                templateText.length > 1000 ? 'text-red-500' : 'text-gray-400'
              )}
            >
              {templateText.length}/1000
            </span>
          </div>
        </div>
      </div>
    );
  }

  function renderStepAudience() {
    return (
      <div className="space-y-6">
        {/* Tag selector */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Filtrar por tags
          </label>
          <p className="mb-3 text-xs text-gray-400">
            Selecione tags para segmentar sua audiencia. Sem selecao, todos os
            contatos ativos serao incluidos.
          </p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                    isSelected
                      ? 'border-[#25d366] bg-[#25d366]/10 text-[#128c7e]'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <Tag className="h-3.5 w-3.5" />
                  {TAG_LABELS[tag] ?? tag}
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimated audience */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366]/10">
              <Users className="h-5 w-5 text-[#25d366]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {loadingContacts ? (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                ) : (
                  audienceCount
                )}
              </div>
              <div className="text-sm text-gray-500">
                {selectedTags.length > 0
                  ? 'contatos com as tags selecionadas'
                  : 'contatos ativos (todos)'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStepCadence() {
    return (
      <div className="space-y-6">
        {/* Rate limit */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Velocidade de envio
          </label>
          <p className="mb-4 text-xs text-gray-400">
            Defina quantas mensagens por minuto serao enviadas. Valores mais baixos
            reduzem risco de bloqueio.
          </p>

          <div className="space-y-3">
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={rateLimit}
              onChange={(e) => setRateLimit(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#25d366]"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">5 msg/min</span>
              <span className="rounded-lg bg-[#25d366]/10 px-3 py-1 text-sm font-bold text-[#128c7e]">
                {rateLimit} msg/min
              </span>
              <span className="text-xs text-gray-400">60 msg/min</span>
            </div>
          </div>
        </div>

        {/* Estimated time */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {estimatedMinutes === 0
                  ? '--'
                  : estimatedMinutes < 60
                    ? `${estimatedMinutes} min`
                    : `${Math.floor(estimatedMinutes / 60)}h ${estimatedMinutes % 60}min`}
              </div>
              <div className="text-sm text-gray-500">
                Tempo estimado para {audienceCount} mensagens
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStepReview() {
    return (
      <div className="space-y-4">
        {/* Campaign name */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            Campanha
          </div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
        </div>

        {/* Message preview */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            Mensagem
          </div>
          <div className="whitespace-pre-wrap rounded-lg bg-[#dcf8c6] p-3 text-sm text-gray-800">
            {templateText}
          </div>
          <div className="mt-1.5 text-right text-xs text-gray-400">
            {templateText.length} caracteres
          </div>
        </div>

        {/* Audience */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            Audiencia
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {audienceCount} contatos
            </span>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {TAG_LABELS[tag] ?? tag}
                  </span>
                ))}
              </div>
            )}
            {selectedTags.length === 0 && (
              <span className="text-xs text-gray-400">
                (todos os contatos ativos)
              </span>
            )}
          </div>
        </div>

        {/* Cadence */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            Cadencia
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {rateLimit} msg/min
            </span>
            <span className="text-xs text-gray-400">
              ~{estimatedMinutes === 0
                ? '--'
                : estimatedMinutes < 60
                  ? `${estimatedMinutes} min`
                  : `${Math.floor(estimatedMinutes / 60)}h ${estimatedMinutes % 60}min`}{' '}
              de envio
            </span>
          </div>
        </div>
      </div>
    );
  }

  const stepRenderers = [
    renderStepContent,
    renderStepAudience,
    renderStepCadence,
    renderStepReview,
  ];

  // ---------- Layout ----------

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          const StepIcon = step.icon;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                    isCompleted
                      ? 'border-[#25d366] bg-[#25d366] text-white'
                      : isActive
                        ? 'border-[#25d366] bg-white text-[#25d366]'
                        : 'border-gray-200 bg-white text-gray-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    'mt-1.5 text-xs font-medium',
                    isActive ? 'text-[#128c7e]' : 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1',
                    idx < currentStep ? 'bg-[#25d366]' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          {STEPS[currentStep].label}
        </h2>
        {stepRenderers[currentStep]()}
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            currentStep === 0
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </button>

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            disabled={!isStepValid(currentStep)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors',
              isStepValid(currentStep)
                ? 'bg-[#25d366] hover:bg-[#128c7e]'
                : 'cursor-not-allowed bg-gray-300'
            )}
          >
            Proximo
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || !isStepValid(0) || audienceCount === 0}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors',
              submitting
                ? 'cursor-not-allowed bg-gray-300'
                : 'bg-[#25d366] hover:bg-[#128c7e]'
            )}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Criar Campanha
          </button>
        )}
      </div>
    </div>
  );
}
