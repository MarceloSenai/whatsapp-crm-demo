'use client';

import { useState, useMemo } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { cn, timeAgo } from '@/lib/utils';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  avatarUrl: string | null;
  tags: string;
  createdAt: string;
}

interface Message {
  id: string;
  conversationId: string;
  direction: string;
  type: string;
  content: string;
  status: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  contactId: string;
  status: string;
  assignedTo: string | null;
  channel: string;
  lastMessageAt: string | null;
  unreadCount: number;
  contact: Contact;
  messages: Message[];
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const STATUS_TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'open', label: 'Abertos' },
  { key: 'waiting', label: 'Aguardando' },
  { key: 'closed', label: 'Fechados' },
] as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (
    (parts[0][0] ?? '').toUpperCase() +
    (parts[parts.length - 1][0] ?? '').toUpperCase()
  );
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + '...';
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    let list = conversations;

    // Status filter
    if (statusFilter !== 'all') {
      list = list.filter((c) => c.status === statusFilter);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((c) => c.contact.name.toLowerCase().includes(q));
    }

    return list;
  }, [conversations, search, statusFilter]);

  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800">Conversas</h2>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar contato..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-[#25d366] focus:bg-white"
          />
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex border-b border-gray-100 px-3">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={cn(
              'flex-1 border-b-2 py-2 text-xs font-medium transition-colors',
              statusFilter === tab.key
                ? 'border-[#25d366] text-[#25d366]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-gray-400">
            Nenhuma conversa encontrada
          </div>
        ) : (
          filtered.map((conv) => {
            const lastMsg = conv.messages[0];
            const isSelected = conv.id === selectedId;
            const hasUnread = conv.unreadCount > 0;

            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={cn(
                  'flex w-full items-start gap-3 border-b border-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-50',
                  isSelected && 'bg-blue-50 hover:bg-blue-50'
                )}
              >
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-sm font-bold text-white">
                  {getInitials(conv.contact.name)}
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'truncate text-sm',
                        hasUnread
                          ? 'font-bold text-gray-900'
                          : 'font-medium text-gray-800'
                      )}
                    >
                      {conv.contact.name}
                    </span>
                    <span className="ml-2 shrink-0 text-[11px] text-gray-400">
                      {conv.lastMessageAt ? timeAgo(conv.lastMessageAt) : ''}
                    </span>
                  </div>

                  <div className="mt-0.5 flex items-center justify-between">
                    <span
                      className={cn(
                        'truncate text-xs',
                        hasUnread ? 'text-gray-600' : 'text-gray-400'
                      )}
                    >
                      {lastMsg
                        ? truncate(lastMsg.content, 50)
                        : 'Sem mensagens'}
                    </span>

                    <div className="ml-2 flex shrink-0 items-center gap-1.5">
                      {/* Unread badge */}
                      {hasUnread && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#25d366] px-1.5 text-[10px] font-bold text-white">
                          {conv.unreadCount}
                        </span>
                      )}

                      {/* Channel icon */}
                      <MessageCircle className="h-3.5 w-3.5 text-[#25d366]" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
