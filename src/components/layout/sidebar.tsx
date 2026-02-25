'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Kanban, Megaphone, Users, Info, Github, Download } from 'lucide-react';

const navItems = [
  { href: '/inbox', label: 'Inbox', icon: MessageSquare },
  { href: '/pipeline', label: 'Pipeline', icon: Kanban },
  { href: '/campaigns', label: 'Campanhas', icon: Megaphone },
  { href: '/contacts', label: 'Contatos', icon: Users },
  { href: '/about', label: 'Sobre', icon: Info },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
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
        <a
          href="https://github.com/MarceloSenai/whatsapp-crm-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Github className="h-5 w-5" />
          <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Código Fonte
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
  );
}
