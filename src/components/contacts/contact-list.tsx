'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Search,
  Users,
  ShieldOff,
  MessageSquare,
  DollarSign,
  Mail,
  Phone,
  UserX,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { formatPhone, parseTags } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  tags: string;
  optedOut: boolean;
  optOutAt: string | null;
  createdAt: string;
  _count: { conversations: number; deals: number };
}

type FilterTab = 'all' | 'active' | 'optout';

// ---------------------------------------------------------------------------
// Tag color mapping
// ---------------------------------------------------------------------------

const TAG_COLORS: Record<string, string> = {
  lead: 'bg-blue-100 text-blue-700',
  cliente: 'bg-green-100 text-green-700',
  vip: 'bg-amber-100 text-amber-700',
  prospecto: 'bg-purple-100 text-purple-700',
  enterprise: 'bg-red-100 text-red-700',
  startup: 'bg-cyan-100 text-cyan-700',
  pme: 'bg-orange-100 text-orange-700',
  inativo: 'bg-gray-100 text-gray-600',
  parceiro: 'bg-teal-100 text-teal-700',
};

const DEFAULT_TAG_COLOR = 'bg-slate-100 text-slate-600';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25d366]/15 text-sm font-semibold text-[#128c7e]">
      {getInitials(name)}
    </div>
  );
}

function TagBadge({ tag }: { tag: string }) {
  const lower = tag.toLowerCase();
  const color = TAG_COLORS[lower] ?? DEFAULT_TAG_COLOR;
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
    >
      {tag}
    </span>
  );
}

function OptOutToggle({
  contact,
  onToggle,
  loading,
}: {
  contact: Contact;
  onToggle: (id: string, optedOut: boolean) => void;
  loading: boolean;
}) {
  const active = contact.optedOut;

  function handleClick() {
    const action = active ? 'reativar' : 'bloquear opt-out para';
    const confirmed = window.confirm(
      `Deseja ${action} o contato "${contact.name}"?`,
    );
    if (confirmed) {
      onToggle(contact.id, !active);
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleClick}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#25d366]/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
        active ? 'bg-red-500' : 'bg-gray-300'
      }`}
      title={active ? 'Clique para reativar' : 'Clique para bloquear (opt-out)'}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          active ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toggling, setToggling] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');

  // ---- Fetch contacts ----
  const fetchContacts = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/contacts');
      if (!res.ok) throw new Error('Falha ao carregar contatos');
      const data: Contact[] = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // ---- Toggle opt-out ----
  async function handleToggleOptOut(id: string, optedOut: boolean) {
    setToggling((prev) => new Set(prev).add(id));
    try {
      const res = await fetch('/api/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, optedOut }),
      });
      if (!res.ok) throw new Error('Falha ao atualizar contato');
      const updated: Contact = await res.json();
      setContacts((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, optedOut: updated.optedOut, optOutAt: updated.optOutAt }
            : c,
        ),
      );
    } catch {
      alert('Erro ao atualizar opt-out. Tente novamente.');
    } finally {
      setToggling((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  // ---- Filtering ----
  const filtered = useMemo(() => {
    let list = contacts;

    // Tab filter
    if (filterTab === 'active') list = list.filter((c) => !c.optedOut);
    if (filterTab === 'optout') list = list.filter((c) => c.optedOut);

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q),
      );
    }

    return list;
  }, [contacts, filterTab, search]);

  // ---- Counts ----
  const totalCount = contacts.length;
  const optOutCount = contacts.filter((c) => c.optedOut).length;
  const activeCount = totalCount - optOutCount;

  // ---- Filter tabs definition ----
  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'Todos', count: totalCount },
    { key: 'active', label: 'Ativos', count: activeCount },
    { key: 'optout', label: 'Opt-out', count: optOutCount },
  ];

  // ---- Loading state ----
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#25d366]" />
      </div>
    );
  }

  // ---- Error state ----
  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 text-red-600">
        <AlertCircle className="h-8 w-8" />
        <p className="text-sm font-medium">{error}</p>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            fetchContacts();
          }}
          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ---- Stats bar ---- */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {totalCount} contato{totalCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
          <ShieldOff className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700">
            {optOutCount} opt-out
          </span>
        </div>
      </div>

      {/* ---- Search + Filter tabs ---- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-[#25d366] focus:outline-none focus:ring-1 focus:ring-[#25d366]"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterTab(tab.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filterTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-[10px] text-gray-400">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Table ---- */}
      {filtered.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl bg-white text-gray-400 shadow-sm ring-1 ring-gray-200">
          <UserX className="h-10 w-10" />
          <p className="text-sm font-medium">Nenhum contato encontrado</p>
          {search && (
            <p className="text-xs">
              Tente outro termo de busca ou mude o filtro.
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3 text-center">Conversas</th>
                <th className="px-4 py-3 text-center">Deals</th>
                <th className="px-4 py-3">Opt-out</th>
                <th className="px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((contact) => {
                const tags = parseTags(contact.tags);
                const isToggling = toggling.has(contact.id);

                return (
                  <tr
                    key={contact.id}
                    className="transition-colors hover:bg-gray-50/60"
                  >
                    {/* Nome */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={contact.name} />
                        <span className="font-medium text-gray-900">
                          {contact.name}
                        </span>
                      </div>
                    </td>

                    {/* Telefone */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {formatPhone(contact.phone)}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3">
                      {contact.email ? (
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          {contact.email}
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>

                    {/* Tags */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {tags.length > 0 ? (
                          tags.map((tag) => <TagBadge key={tag} tag={tag} />)
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </div>
                    </td>

                    {/* Conversas */}
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1 text-gray-600">
                        <MessageSquare className="h-3.5 w-3.5 text-gray-400" />
                        {contact._count.conversations}
                      </div>
                    </td>

                    {/* Deals */}
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1 text-gray-600">
                        <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                        {contact._count.deals}
                      </div>
                    </td>

                    {/* Opt-out status */}
                    <td className="px-4 py-3">
                      {contact.optedOut ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                            <ShieldOff className="h-3 w-3" />
                            Bloqueado
                          </span>
                          {contact.optOutAt && (
                            <span className="text-[11px] text-gray-400">
                              {formatDate(contact.optOutAt)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex w-fit items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Ativo
                        </span>
                      )}
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-3 text-center">
                      <OptOutToggle
                        contact={contact}
                        onToggle={handleToggleOptOut}
                        loading={isToggling}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
