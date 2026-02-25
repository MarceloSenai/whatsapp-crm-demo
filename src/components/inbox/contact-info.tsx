'use client';

import { formatPhone, parseTags, timeAgo } from '@/lib/utils';
import { MessageCircle, Mail, Calendar, User, X } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  avatarUrl: string | null;
  tags: string;
  createdAt: string;
}

interface ContactInfoProps {
  contact: Contact | null;
  onClose?: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (
    (parts[0][0] ?? '').toUpperCase() +
    (parts[parts.length - 1][0] ?? '').toUpperCase()
  );
}

const TAG_COLORS: Record<string, string> = {
  vip: 'bg-yellow-100 text-yellow-800',
  lead: 'bg-blue-100 text-blue-800',
  cliente: 'bg-green-100 text-green-800',
  suporte: 'bg-purple-100 text-purple-800',
  novo: 'bg-cyan-100 text-cyan-800',
};

function tagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] ?? 'bg-gray-100 text-gray-700';
}

export default function ContactInfo({ contact, onClose }: ContactInfoProps) {
  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center border-l border-gray-200 bg-white p-4">
        <div className="text-center text-sm text-gray-400">
          <User className="mx-auto mb-2 h-10 w-10 text-gray-300" />
          <p>Selecione uma conversa para ver os detalhes do contato</p>
        </div>
      </div>
    );
  }

  const tags = parseTags(contact.tags);

  return (
    <div className="flex h-full flex-col border-l border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <span className="text-sm font-semibold text-gray-700">Contato</span>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center border-b border-gray-100 px-4 py-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-xl font-bold text-white">
          {getInitials(contact.name)}
        </div>
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          {contact.name}
        </h3>
        <p className="text-sm text-gray-500">{formatPhone(contact.phone)}</p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="border-b border-gray-100 px-4 py-3">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
            Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="flex-1 px-4 py-3">
        <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-gray-400">
          Informações
        </span>

        <div className="space-y-3">
          {/* Canal */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
              <MessageCircle className="h-4 w-4 text-[#25d366]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Canal</p>
              <p className="text-sm font-medium text-gray-700">WhatsApp</p>
            </div>
          </div>

          {/* Email */}
          {contact.email && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                <Mail className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-700">
                  {contact.email}
                </p>
              </div>
            </div>
          )}

          {/* Criado em */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50">
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Criado em</p>
              <p className="text-sm font-medium text-gray-700">
                {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
