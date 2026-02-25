'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, MoreVertical } from 'lucide-react';
import { cn, formatPhone } from '@/lib/utils';
import MessageBubble from '@/components/inbox/message-bubble';
import MessageInput from '@/components/inbox/message-input';

interface Message {
  id: string;
  conversationId: string;
  direction: string;
  type: string;
  content: string;
  status: string;
  createdAt: string;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  avatarUrl: string | null;
  tags: string;
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

interface ChatPanelProps {
  conversationId: string;
  conversation?: Conversation;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  open: { label: 'Aberto', color: 'bg-green-100 text-green-700' },
  waiting: { label: 'Aguardando', color: 'bg-yellow-100 text-yellow-700' },
  closed: { label: 'Fechado', color: 'bg-gray-100 text-gray-600' },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (
    (parts[0][0] ?? '').toUpperCase() +
    (parts[parts.length - 1][0] ?? '').toUpperCase()
  );
}

export default function ChatPanel({
  conversationId,
  conversation,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageCountRef = useRef(0);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/messages?conversationId=${conversationId}`
      );
      if (res.ok) {
        const data: Message[] = await res.json();
        setMessages(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Initial fetch
  useEffect(() => {
    setLoading(true);
    setMessages([]);
    lastMessageCountRef.current = 0;
    fetchMessages();
  }, [conversationId, fetchMessages]);

  // Poll every 2s
  useEffect(() => {
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (messages.length > lastMessageCountRef.current) {
      // Small delay to ensure DOM has painted new messages
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
    lastMessageCountRef.current = messages.length;
  }, [messages.length]);

  const contact = conversation?.contact;
  const status = conversation?.status ?? 'open';
  const statusInfo = STATUS_MAP[status] ?? STATUS_MAP.open;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-3">
          {contact && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-sm font-bold text-white">
              {getInitials(contact.name)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900">
                {contact?.name ?? 'Conversa'}
              </h3>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  statusInfo.color
                )}
              >
                {statusInfo.label}
              </span>
            </div>
            {contact && (
              <p className="text-xs text-gray-500">
                {formatPhone(contact.phone)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200">
            <Phone className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto bg-[#e5ddd5] px-4 py-4"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ccc\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      >
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#25d366]" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="rounded-lg bg-white/80 px-4 py-2 text-sm text-gray-500 shadow-sm">
              Nenhuma mensagem ainda. Envie a primeira!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <MessageInput conversationId={conversationId} onSend={fetchMessages} />
    </div>
  );
}
