'use client';

import { Github, Download, ExternalLink, Database, MessageSquare, Kanban, Megaphone, Users, Cpu, Globe, Layers } from 'lucide-react';

const REPO_URL = 'https://github.com/MarceloSenai/whatsapp-crm-demo';

const modules = [
  {
    icon: MessageSquare,
    title: 'Inbox Omnichannel',
    description: 'Chat WhatsApp-style com layout 3 colunas (conversas, chat, info contato). Auto-respostas simuladas com delay de 2-5s baseadas em keywords do produto Obraxs. Status de mensagem (enviada, entregue, lida) com progressão automática.',
    route: '/inbox',
  },
  {
    icon: Kanban,
    title: 'Pipeline de Vendas',
    description: 'Kanban drag-and-drop com 6 colunas (Novo Lead → Fechado/Ganho). 30 deals de construtoras reais (MRV, Cyrela, Gafisa). Totalizadores por coluna e persistência no banco.',
    route: '/pipeline',
  },
  {
    icon: Megaphone,
    title: 'Campanhas em Massa',
    description: 'Wizard 4 etapas para criar campanhas (conteúdo → audiência → cadência → disparar). Simulação de envio progressivo com métricas em tempo real (enviadas → entregues → lidas → respondidas).',
    route: '/campaigns',
  },
  {
    icon: Users,
    title: 'Gestão de Contatos',
    description: '50 contatos do setor de construção civil com filtros por status. Controle de opt-out com toggle visual e data do bloqueio. Busca por nome e telefone.',
    route: '/contacts',
  },
];

const techStack = [
  { name: 'Next.js 15', detail: 'App Router + Turbopack' },
  { name: 'TypeScript', detail: 'Tipagem estrita' },
  { name: 'Tailwind CSS 4', detail: 'Utility-first styling' },
  { name: 'Prisma 6', detail: 'ORM type-safe' },
  { name: 'PostgreSQL', detail: 'Neon (serverless)' },
  { name: '@dnd-kit', detail: 'Drag-and-drop acessível' },
  { name: 'Lucide React', detail: 'Ícones SVG' },
  { name: 'Vercel', detail: 'Deploy serverless' },
];

const architecture = [
  {
    title: 'Modelo de Dados',
    items: [
      'Contact — 50 contatos com nome, telefone, email, tags, opt-out',
      'Conversation + Message — 20 conversas com 5-15 mensagens cada',
      'Pipeline + Stage + Deal — 1 pipeline, 6 stages, 30 deals',
      'Campaign + CampaignMessage — 3 campanhas com status progressivo',
      'Template — 10 templates aprovados para envio rápido',
    ],
  },
  {
    title: 'Simulador WhatsApp',
    items: [
      '19 regras de keywords baseadas no produto Obraxs',
      'Respostas contextuais: módulos, preço, medição, contratos, cloud, LGPD',
      'Delay aleatório de 2-5 segundos para simular digitação',
      'Progressão de status: sent → delivered (1s) → read (3s)',
      'Fallback inteligente quando nenhuma keyword é detectada',
    ],
  },
  {
    title: 'API Routes',
    items: [
      'GET/POST /api/messages — CRUD mensagens + trigger auto-resposta',
      'GET /api/conversations — Lista com contato e última mensagem',
      'GET/PATCH /api/pipeline — Kanban + mover deals entre stages',
      'GET/POST /api/campaigns — CRUD + POST /[id]/start para disparar',
      'GET/PATCH /api/contacts — Lista + toggle opt-out',
      'GET /api/templates — Templates aprovados para picker',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#25d366]">
            <Cpu className="h-4 w-4" />
            Documentação Técnica
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            WhatsApp CRM Demo
          </h1>
          <p className="text-lg text-gray-600">
            Protótipo funcional de integração WhatsApp + CRM com Inbox Omnichannel,
            Pipeline Kanban e Campanhas em Massa. Construído como referência
            arquitetural para o time de desenvolvimento.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              <Github className="h-4 w-4" />
              Ver no GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={`${REPO_URL}/archive/refs/heads/main.zip`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Download ZIP
            </a>
          </div>
        </div>

        {/* Versões */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Layers className="h-5 w-5 text-[#25d366]" />
            Versões Disponíveis
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-[#25d366] bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                  <span className="text-sm font-bold text-white">TS</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">TypeScript</h3>
                  <span className="rounded-full bg-[#25d366] px-1.5 py-0.5 text-[10px] text-white">Você está aqui</span>
                </div>
              </div>
              <div className="mb-4 space-y-1 text-sm text-gray-600">
                <div className="flex justify-between"><span>Framework</span><span className="font-medium">Next.js 16</span></div>
                <div className="flex justify-between"><span>ORM</span><span className="font-medium">Prisma 6</span></div>
                <div className="flex justify-between"><span>UI</span><span className="font-medium">React + Tailwind</span></div>
                <div className="flex justify-between"><span>Drag & Drop</span><span className="font-medium">@dnd-kit</span></div>
              </div>
              <div className="flex gap-2">
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-center text-xs font-medium text-white hover:bg-gray-800">GitHub TS</a>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#512bd4]">
                  <span className="text-sm font-bold text-white">C#</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">C# / Blazor</h3>
                  <span className="text-xs text-gray-400">ASP.NET Core + Blazor Server</span>
                </div>
              </div>
              <div className="mb-4 space-y-1 text-sm text-gray-600">
                <div className="flex justify-between"><span>Framework</span><span className="font-medium">ASP.NET Core 10</span></div>
                <div className="flex justify-between"><span>ORM</span><span className="font-medium">EF Core 10</span></div>
                <div className="flex justify-between"><span>UI</span><span className="font-medium">Blazor Server + Tailwind</span></div>
                <div className="flex justify-between"><span>Pipeline</span><span className="font-medium">Dropdown Move</span></div>
              </div>
              <div className="flex gap-2">
                <a href="https://github.com/MarceloSenai/whatsapp-crm-demo-csharp" target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-[#512bd4] px-3 py-2 text-center text-xs font-medium text-white hover:bg-[#3b1f9e]">GitHub C#</a>
              </div>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Layers className="h-5 w-5 text-[#25d366]" />
            Módulos
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((mod) => (
              <div
                key={mod.route}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25d366]/10">
                    <mod.icon className="h-5 w-5 text-[#25d366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mod.title}</h3>
                    <code className="text-xs text-gray-400">{mod.route}</code>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Globe className="h-5 w-5 text-[#25d366]" />
            Stack Tecnológica
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="rounded-lg border border-gray-200 bg-white p-3 text-center shadow-sm"
              >
                <div className="text-sm font-semibold text-gray-900">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-500">{tech.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Database className="h-5 w-5 text-[#25d366]" />
            Arquitetura
          </h2>
          <div className="space-y-4">
            {architecture.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="mb-3 font-semibold text-gray-900">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#25d366]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Quick Start (Local)
          </h2>
          <div className="rounded-xl border border-gray-200 bg-gray-900 p-5 font-mono text-sm leading-loose text-gray-100">
            <div className="text-gray-500"># Clone o repositório</div>
            <div>git clone {REPO_URL}.git</div>
            <div>cd whatsapp-crm-demo</div>
            <br />
            <div className="text-gray-500"># Instale dependências</div>
            <div>npm install</div>
            <br />
            <div className="text-gray-500"># Configure o banco (SQLite local ou Postgres)</div>
            <div>cp .env.example .env</div>
            <div>npx prisma db push</div>
            <div>npx tsx prisma/seed.ts</div>
            <br />
            <div className="text-gray-500"># Rode o servidor</div>
            <div>npm run dev</div>
            <br />
            <div className="text-gray-500"># Acesse http://localhost:3000</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          Construído com Next.js + Prisma + Tailwind CSS como referência arquitetural
          para integração WhatsApp + CRM.
        </footer>
      </div>
    </div>
  );
}
