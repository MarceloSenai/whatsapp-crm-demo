'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MessageSquare, Kanban, Megaphone, Users, Info, Github, Download, RotateCcw } from 'lucide-react';

const navItems = [
  { href: '/inbox', label: 'Inbox', icon: MessageSquare },
  { href: '/pipeline', label: 'Pipeline', icon: Kanban },
  { href: '/campaigns', label: 'Campanhas', icon: Megaphone },
  { href: '/contacts', label: 'Contatos', icon: Users },
  { href: '/about', label: 'Sobre', icon: Info },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [resetting, setResetting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleReset() {
    setResetting(true);
    setShowConfirm(false);
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        router.refresh();
        window.location.reload();
      } else {
        alert('Erro ao resetar. Tente novamente.');
      }
    } catch {
      alert('Erro de conexão. Tente novamente.');
    } finally {
      setResetting(false);
    }
  }

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center bg-[#1e293b] py-4">
        {/* Logo */}
        <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366]">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/15 text-[#25d366]'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="flex flex-col items-center gap-2 pb-2">
          <button
            onClick={() => setShowConfirm(true)}
            disabled={resetting}
            className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-amber-500/20 hover:text-amber-400 disabled:opacity-50"
          >
            <RotateCcw className={`h-5 w-5 ${resetting ? 'animate-spin' : ''}`} />
            <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Resetar Demo
            </span>
          </button>
          <a
            href="https://github.com/MarceloSenai/whatsapp-crm-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Github className="h-5 w-5" />
            <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Codigo Fonte
            </span>
          </a>
          <a
            href="https://github.com/MarceloSenai/whatsapp-crm-demo/archive/refs/heads/main.zip"
            className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Download className="h-5 w-5" />
            <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Download ZIP
            </span>
          </a>
        </div>
      </aside>

      {/* Reset confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <RotateCcw className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Resetar Demo?</h3>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Todos os dados (conversas, mensagens, deals, campanhas) serão apagados e recriados com os dados iniciais do demo.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="flex-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
