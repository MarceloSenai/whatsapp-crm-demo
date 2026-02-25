'use client';

import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  conversationId: string;
  direction: string;
  type: string;
  content: string;
  status: string;
  createdAt: string;
}

interface MessageBubbleProps {
  message: Message;
}

function formatTime(date: string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function StatusTicks({ status }: { status: string }) {
  if (status === 'read') {
    return <CheckCheck className="h-3.5 w-3.5 text-blue-500" />;
  }
  if (status === 'delivered') {
    return <CheckCheck className="h-3.5 w-3.5 text-gray-400" />;
  }
  return <Check className="h-3.5 w-3.5 text-gray-400" />;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === 'outbound';

  return (
    <div
      className={cn('flex w-full', isOutbound ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'relative max-w-[65%] rounded-lg px-3 py-2 shadow-sm',
          isOutbound
            ? 'rounded-tr-none bg-[#dcf8c6]'
            : 'rounded-tl-none bg-white'
        )}
      >
        {/* Tail */}
        <div
          className={cn(
            'absolute top-0 h-0 w-0',
            isOutbound
              ? 'right-[-6px] border-l-[6px] border-t-[6px] border-l-transparent border-t-[#dcf8c6]'
              : 'left-[-6px] border-r-[6px] border-t-[6px] border-r-transparent border-t-white'
          )}
        />

        <p className="whitespace-pre-wrap break-words text-sm text-gray-800">
          {message.content}
        </p>

        <div className="mt-1 flex items-center justify-end gap-1">
          <span className="text-[10px] leading-none text-gray-500">
            {formatTime(message.createdAt)}
          </span>
          {isOutbound && <StatusTicks status={message.status} />}
        </div>
      </div>
    </div>
  );
}
