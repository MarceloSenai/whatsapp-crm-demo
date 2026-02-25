'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SendHorizontal, FileText, Loader2, X } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  status: string;
  variables: string | null;
}

interface MessageInputProps {
  conversationId: string;
  onSend: () => void;
}

export default function MessageInput({
  conversationId,
  onSend,
}: MessageInputProps) {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const maxHeight = 4 * 24; // 4 lines * ~24px line height
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [content]);

  // Close template dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        templateRef.current &&
        !templateRef.current.contains(e.target as Node)
      ) {
        setShowTemplates(false);
      }
    }
    if (showTemplates) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showTemplates]);

  const fetchTemplates = useCallback(async () => {
    if (templates.length > 0) return;
    setLoadingTemplates(true);
    try {
      const res = await fetch('/api/templates');
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingTemplates(false);
    }
  }, [templates.length]);

  const handleToggleTemplates = () => {
    const next = !showTemplates;
    setShowTemplates(next);
    if (next) {
      fetchTemplates();
    }
  };

  const handleSelectTemplate = (template: Template) => {
    setContent(template.content);
    setShowTemplates(false);
    textareaRef.current?.focus();
  };

  const handleSend = async () => {
    const trimmed = content.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, content: trimmed }),
      });
      if (res.ok) {
        setContent('');
        onSend();
      }
    } catch {
      // silently fail
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
      <div className="flex items-end gap-2">
        {/* Template picker */}
        <div className="relative" ref={templateRef}>
          <button
            onClick={handleToggleTemplates}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
            title="Templates"
          >
            <FileText className="h-5 w-5" />
          </button>

          {showTemplates && (
            <div className="absolute bottom-12 left-0 z-50 w-72 rounded-lg border border-gray-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
                <span className="text-sm font-semibold text-gray-700">
                  Templates
                </span>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto p-1">
                {loadingTemplates ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                ) : templates.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-400">
                    Nenhum template disponivel
                  </p>
                ) : (
                  templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => handleSelectTemplate(tpl)}
                      className="w-full rounded-md px-3 py-2 text-left transition-colors hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-800">
                        {tpl.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                        {tpl.content}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          rows={1}
          disabled={sending}
          className="flex-1 resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-[#25d366] focus:ring-1 focus:ring-[#25d366] disabled:opacity-50"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!content.trim() || sending}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white transition-colors hover:bg-[#128c7e] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {sending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
