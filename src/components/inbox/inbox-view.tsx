'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquareText, PanelRightOpen, PanelRightClose } from 'lucide-react';
import ConversationList from '@/components/inbox/conversation-list';
import ChatPanel from '@/components/inbox/chat-panel';
import ContactInfo from '@/components/inbox/contact-info';

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

export default function InboxView() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [showContactInfo, setShowContactInfo] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/conversations');
      if (res.ok) {
        const data: Conversation[] = await res.json();
        setConversations(data);
      }
    } catch {
      // silently fail
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Poll every 3s
  useEffect(() => {
    const interval = setInterval(fetchConversations, 3000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const selectedContact = selectedConversation?.contact ?? null;

  return (
    <div className="flex h-full">
      {/* Left column - Conversation list */}
      <div className="w-80 shrink-0">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
        />
      </div>

      {/* Center column - Chat */}
      <div className="flex flex-1 flex-col">
        {selectedConversationId ? (
          <div className="relative flex h-full flex-col">
            {/* Toggle contact info button */}
            <button
              onClick={() => setShowContactInfo((v) => !v)}
              className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              title={
                showContactInfo ? 'Esconder detalhes' : 'Mostrar detalhes'
              }
            >
              {showContactInfo ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
            </button>

            <ChatPanel
              conversationId={selectedConversationId}
              conversation={selectedConversation}
            />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gray-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <MessageSquareText className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-500">
              WhatsApp CRM
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Selecione uma conversa para começar
            </p>
          </div>
        )}
      </div>

      {/* Right column - Contact info (collapsible) */}
      {showContactInfo && (
        <div className="w-72 shrink-0">
          <ContactInfo
            contact={selectedContact}
            onClose={() => setShowContactInfo(false)}
          />
        </div>
      )}
    </div>
  );
}
