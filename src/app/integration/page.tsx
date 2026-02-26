'use client';

import {
  BookOpen, Cloud, CreditCard, MessageSquare, Shield, Bell,
  Code, Settings, CheckCircle, AlertTriangle, ArrowRight,
  Building, Smartphone, FileText, Zap, Users, Lock, Globe,
  Cpu, Database, ExternalLink, Layers
} from 'lucide-react';

const CODECYCLE_MODULES = [
  'Tesouraria', 'Orçamentos', 'Medições de Obra', 'Conciliação Bancária',
  'Compras', 'Cotações', 'Inventário', 'Centro de Custos', 'Relatórios',
  'App Mobile', 'Contratos', 'Manutenção Preventiva', 'Diário de Obra',
  'Locação de Equipamentos', 'Gestão de Fornecedores',
];

export default function IntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#25d366]">
            <BookOpen className="h-4 w-4" />
            Guia de Integração
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            WhatsApp Business API + ERP CodeCycle
          </h1>
          <p className="text-lg text-gray-600">
            Guia completo para os desenvolvedores da CodeCycle adaptarem este
            demo em uma integração real com a WhatsApp Business Platform
            (Cloud API) no ERP Obraxs.
          </p>
        </div>

        {/* ===== PARTE 1: WhatsApp Business API ===== */}
        <div className="mb-6 rounded-lg bg-[#25d366]/10 p-4">
          <h2 className="text-lg font-bold text-[#25d366]">Parte 1 — WhatsApp Business API na Prática</h2>
          <p className="text-sm text-gray-600">O que é, como funciona, custos e requisitos para usar WhatsApp de verdade.</p>
        </div>

        {/* O que é a Cloud API */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Cloud className="h-5 w-5 text-[#25d366]" />
            O que é a WhatsApp Cloud API?
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              A <strong>WhatsApp Cloud API</strong> é a API oficial da Meta para enviar e receber
              mensagens WhatsApp de forma programática. Desde outubro de 2025, é a única opção
              suportada (a API On-Premises foi descontinuada).
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <Cloud className="mb-1 h-4 w-4 text-blue-500" />
                <div className="text-sm font-medium text-gray-900">100% Cloud</div>
                <div className="text-xs text-gray-500">Infraestrutura hospedada pela Meta. Zero servidores para manter.</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <Zap className="mb-1 h-4 w-4 text-amber-500" />
                <div className="text-sm font-medium text-gray-900">500 msg/s</div>
                <div className="text-xs text-gray-500">Capacidade de até 500 mensagens por segundo sem configuração extra.</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <Globe className="mb-1 h-4 w-4 text-green-500" />
                <div className="text-sm font-medium text-gray-900">Graph API v21.0</div>
                <div className="text-xs text-gray-500">API REST padrão Meta. Mesma infra do Facebook/Instagram.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pré-requisitos */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <CheckCircle className="h-5 w-5 text-[#25d366]" />
            Pré-requisitos
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: Building,
                title: 'Meta Business Account',
                desc: 'Conta empresarial no Meta Business Suite (business.facebook.com). É gratuita.',
                required: true,
              },
              {
                icon: Shield,
                title: 'Verificação de Negócio',
                desc: 'Verificar a empresa no Meta Business Manager com CNPJ, site e documentos. Necessário para templates e limites de envio.',
                required: true,
              },
              {
                icon: Smartphone,
                title: 'Número de Telefone Dedicado',
                desc: 'Um número que NÃO esteja ativo no WhatsApp comum ou WhatsApp Business App. Pode ser fixo ou celular.',
                required: true,
              },
              {
                icon: FileText,
                title: 'Nome de Exibição',
                desc: 'Deve corresponder ao nome da empresa/marca no site. Sem CAPS LOCK (exceto siglas), sem emojis extras.',
                required: true,
              },
              {
                icon: Code,
                title: 'App no Meta Developers',
                desc: 'Criar um app em developers.facebook.com e adicionar o produto "WhatsApp" para obter as credenciais de API.',
                required: true,
              },
              {
                icon: Globe,
                title: 'Servidor com HTTPS (Webhook)',
                desc: 'Endpoint público HTTPS para receber notificações de mensagens recebidas e status de entrega.',
                required: true,
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#25d366]/10">
                  <item.icon className="h-5 w-5 text-[#25d366]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {item.required && (
                      <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600">Obrigatório</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Passo a Passo */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Settings className="h-5 w-5 text-[#25d366]" />
            Passo a Passo — Configuração
          </h2>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Criar conta no Meta Business Suite',
                detail: 'Acesse business.facebook.com e crie uma conta empresarial. Preencha dados da empresa (CNPJ, endereço, site).',
                link: 'https://business.facebook.com',
              },
              {
                step: 2,
                title: 'Verificar o Negócio',
                detail: 'Em Configurações > Central de Segurança > Verificação de Negócio. Envie documentos (contrato social, CNPJ, conta de energia). Aprovação leva 1-5 dias úteis.',
              },
              {
                step: 3,
                title: 'Criar App no Meta for Developers',
                detail: 'Acesse developers.facebook.com > Meus Apps > Criar App > Tipo "Business". Adicione o produto "WhatsApp" no painel do app.',
                link: 'https://developers.facebook.com',
              },
              {
                step: 4,
                title: 'Configurar número de telefone',
                detail: 'No painel WhatsApp do app, adicione um número de telefone. O número receberá um código de verificação por SMS ou ligação.',
              },
              {
                step: 5,
                title: 'Gerar Token de acesso permanente',
                detail: 'Crie um System User no Business Manager com permissão "whatsapp_business_messaging". Gere um token permanente (não use o token temporário do playground).',
              },
              {
                step: 6,
                title: 'Configurar Webhook',
                detail: 'Configure uma URL HTTPS para receber eventos. Campos obrigatórios: "messages" e "message_status". O webhook precisa responder ao challenge de verificação GET.',
              },
              {
                step: 7,
                title: 'Criar Templates de mensagem',
                detail: 'No Business Manager > WhatsApp Manager > Message Templates. Templates passam por aprovação da Meta (geralmente 1-24h). Necessários para iniciar conversas.',
              },
              {
                step: 8,
                title: 'Testar no Sandbox',
                detail: 'Use o playground no painel do app para testar envio para números autorizados antes de ir para produção.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#25d366] text-sm font-bold text-white">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#25d366] hover:underline">
                      {item.link} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conceitos-chave */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Conceitos Importantes
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">Janela de 24 horas</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Quando um cliente envia uma mensagem, abre-se uma <strong>janela de 24 horas</strong> na
                qual a empresa pode responder livremente (mensagens de texto, mídia, etc.). Após 24h sem
                interação do cliente, só é possível enviar <strong>templates pré-aprovados</strong>.
              </p>
              <div className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
                <strong>Exceção:</strong> Se o cliente veio de um anúncio Click-to-WhatsApp, a janela é de 72 horas.
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">Templates de Mensagem</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Templates são mensagens pré-aprovadas pela Meta. Existem 4 categorias:
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-2 text-xs">
                  <span className="font-semibold text-green-700">Marketing</span> — Promoções, ofertas, newsletters
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-xs">
                  <span className="font-semibold text-blue-700">Utility</span> — Pedidos, faturas, atualizações de conta
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-2 text-xs">
                  <span className="font-semibold text-purple-700">Authentication</span> — Códigos OTP, verificação 2FA
                </div>
                <div className="rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs">
                  <span className="font-semibold text-gray-700">Service</span> — Respostas a perguntas do cliente (grátis)
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">Opt-in Obrigatório</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                A empresa <strong>deve obter consentimento explícito</strong> do usuário antes de enviar mensagens.
                O opt-in pode ser coletado via formulário no site, durante uma ligação, por email, ou
                presencialmente. Deve ficar claro que o usuário está concordando em receber mensagens via WhatsApp.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">Limites de Envio</h3>
              <div className="mt-2 grid gap-2 md:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-2 text-center text-xs">
                  <div className="font-bold text-gray-900">Tier 1</div>
                  <div className="text-gray-500">1.000 msg/dia</div>
                  <div className="text-[10px] text-gray-400">Início</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center text-xs">
                  <div className="font-bold text-gray-900">Tier 2</div>
                  <div className="text-gray-500">10.000 msg/dia</div>
                  <div className="text-[10px] text-gray-400">Após qualidade OK</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center text-xs">
                  <div className="font-bold text-gray-900">Tier 3</div>
                  <div className="text-gray-500">100.000 msg/dia</div>
                  <div className="text-[10px] text-gray-400">Expansão</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center text-xs">
                  <div className="font-bold text-gray-900">Ilimitado</div>
                  <div className="text-gray-500">Sem limite</div>
                  <div className="text-[10px] text-gray-400">Qualidade alta</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preços */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <CreditCard className="h-5 w-5 text-[#25d366]" />
            Modelo de Preços (2025/2026)
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm text-gray-600">
              Desde julho de 2025, a cobrança é <strong>por template enviado</strong> (não mais por conversa).
            </p>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Categoria</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Preço (Brasil)</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Quando</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">Marketing</td>
                    <td className="px-4 py-2 text-gray-600">~R$ 0,50/msg</td>
                    <td className="px-4 py-2 text-gray-500">Promoções, campanhas</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">Utility</td>
                    <td className="px-4 py-2 text-gray-600">~R$ 0,15/msg</td>
                    <td className="px-4 py-2 text-gray-500">Pedidos, faturas, rastreamento</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">Authentication</td>
                    <td className="px-4 py-2 text-gray-600">~R$ 0,25/msg</td>
                    <td className="px-4 py-2 text-gray-500">Códigos OTP, 2FA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-gray-900">Service</td>
                    <td className="px-4 py-2 text-green-600 font-medium">Grátis</td>
                    <td className="px-4 py-2 text-gray-500">Resposta a mensagem do cliente (dentro de 24h)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
              <strong>Nota:</strong> Os preços variam por país. Consulte a tabela atualizada em{' '}
              <a href="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" rel="noopener noreferrer" className="underline">
                developers.facebook.com/docs/whatsapp/pricing
              </a>. A primeira 1.000 conversas de serviço por mês são gratuitas.
            </div>
          </div>
        </section>

        {/* Endpoints da API */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Code className="h-5 w-5 text-[#25d366]" />
            Endpoints Principais da Cloud API
          </h2>
          <div className="rounded-xl border border-gray-200 bg-gray-900 p-5 font-mono text-sm leading-loose text-gray-100">
            <div className="text-gray-500"># Enviar mensagem de texto</div>
            <div className="text-green-400">POST</div>
            <div className="text-blue-300">https://graph.facebook.com/v21.0/&#123;PHONE_NUMBER_ID&#125;/messages</div>
            <div className="mt-1 text-gray-400">{'{'}</div>
            <div className="text-gray-400 pl-4">{'"messaging_product": "whatsapp",'}</div>
            <div className="text-gray-400 pl-4">{'"to": "5511999999999",'}</div>
            <div className="text-gray-400 pl-4">{'"type": "text",'}</div>
            <div className="text-gray-400 pl-4">{'"text": { "body": "Olá! Bem-vindo ao Obraxs." }'}</div>
            <div className="text-gray-400">{'}'}</div>
            <br />
            <div className="text-gray-500"># Enviar template</div>
            <div className="text-green-400">POST</div>
            <div className="text-blue-300">https://graph.facebook.com/v21.0/&#123;PHONE_NUMBER_ID&#125;/messages</div>
            <div className="mt-1 text-gray-400">{'{'}</div>
            <div className="text-gray-400 pl-4">{'"messaging_product": "whatsapp",'}</div>
            <div className="text-gray-400 pl-4">{'"to": "5511999999999",'}</div>
            <div className="text-gray-400 pl-4">{'"type": "template",'}</div>
            <div className="text-gray-400 pl-4">{'"template": {'}</div>
            <div className="text-gray-400 pl-8">{'"name": "medicao_aprovada",'}</div>
            <div className="text-gray-400 pl-8">{'"language": { "code": "pt_BR" },'}</div>
            <div className="text-gray-400 pl-8">{'"components": [...]'}</div>
            <div className="text-gray-400 pl-4">{'}'}</div>
            <div className="text-gray-400">{'}'}</div>
            <br />
            <div className="text-gray-500"># Webhook — receber mensagens (POST no seu servidor)</div>
            <div className="text-amber-400">POST /webhook/whatsapp</div>
            <div className="mt-1 text-gray-400">{'{'}</div>
            <div className="text-gray-400 pl-4">{'"entry": [{'}</div>
            <div className="text-gray-400 pl-8">{'"changes": [{'}</div>
            <div className="text-gray-400 pl-12">{'"value": {'}</div>
            <div className="text-gray-400 pl-16">{'"messages": [{ "from": "5511...", "text": {...} }]'}</div>
            <div className="text-gray-400 pl-12">{'}'}</div>
            <div className="text-gray-400 pl-8">{'}]'}</div>
            <div className="text-gray-400 pl-4">{'}]'}</div>
            <div className="text-gray-400">{'}'}</div>
          </div>
        </section>

        {/* ===== PARTE 2: Guia para Devs CodeCycle ===== */}
        <div className="mb-6 mt-12 rounded-lg bg-[#512bd4]/10 p-4">
          <h2 className="text-lg font-bold text-[#512bd4]">Parte 2 — Guia para Desenvolvedores CodeCycle</h2>
          <p className="text-sm text-gray-600">Como adaptar este demo para integrar WhatsApp real no ERP Obraxs.</p>
        </div>

        {/* Visão Geral da Adaptação */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Layers className="h-5 w-5 text-[#512bd4]" />
            De Demo para Produção — O Que Muda
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Aspecto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Demo (Atual)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Produção (Meta API)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Envio de Mensagem', 'Salva no banco local', 'POST para Graph API da Meta'],
                  ['Recebimento', 'Simulador com keywords', 'Webhook HTTP recebe do WhatsApp'],
                  ['Status (✓✓)', 'setTimeout progressivo', 'Webhook message_status'],
                  ['Templates', 'Dados estáticos no banco', 'Registrados no Meta Business Manager'],
                  ['Contatos', 'Seed de 50 contatos', 'Sincronização com base de clientes do ERP'],
                  ['Autenticação', 'Sem auth', 'OAuth 2.0 + JWT + controle de permissões'],
                  ['Opt-in', 'Campo no banco', 'Fluxo real de consentimento com audit trail'],
                  ['Campanhas', 'Simulação progressiva', 'Envio real com rate limiting da Meta'],
                  ['Multi-tenant', 'Banco único', 'Schema por empresa ou WhatsApp Number ID por filial'],
                ].map(([aspecto, demo, prod], i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{aspecto}</td>
                    <td className="px-4 py-2 text-gray-500">{demo}</td>
                    <td className="px-4 py-2 text-gray-600">{prod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Arquitetura Proposta */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Database className="h-5 w-5 text-[#512bd4]" />
            Arquitetura Proposta para Produção
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="rounded-lg bg-gray-900 p-5 font-mono text-xs leading-relaxed text-gray-100">
              <pre>{`
┌─────────────┐     ┌──────────────────────┐     ┌────────────────────┐
│  Navegador  │────▶│  ERP Obraxs (Web)    │────▶│  WhatsApp Cloud    │
│  (Blazor/   │◀────│                      │◀────│  API (Meta)        │
│   React)    │     │  ┌──────────────┐    │     │                    │
└─────────────┘     │  │ Message      │    │     │  POST /messages    │
                    │  │ Service      │────│─────│  Webhook callback  │
                    │  └──────────────┘    │     └────────────────────┘
                    │  ┌──────────────┐    │
                    │  │ WhatsApp     │    │     ┌────────────────────┐
                    │  │ Gateway      │────│─────│  Redis / Queue     │
                    │  │ Service      │    │     │  (rate limiting +  │
                    │  └──────────────┘    │     │   retry)           │
                    │  ┌──────────────┐    │     └────────────────────┘
                    │  │ Template     │    │
                    │  │ Manager      │    │     ┌────────────────────┐
                    │  └──────────────┘    │     │  PostgreSQL        │
                    │  ┌──────────────┐    │─────│  (messages, logs,  │
                    │  │ Contact      │    │     │   contacts, audit) │
                    │  │ Sync         │────│     └────────────────────┘
                    │  └──────────────┘    │
                    └──────────────────────┘
              `}</pre>
            </div>
          </div>
        </section>

        {/* Etapas de Adaptação */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <ArrowRight className="h-5 w-5 text-[#512bd4]" />
            Etapas de Adaptação
          </h2>
          <div className="space-y-4">
            {[
              {
                fase: 'Fase 1',
                title: 'Criar WhatsApp Gateway Service',
                desc: 'Serviço centralizado que encapsula todas as chamadas à Cloud API da Meta. Responsável por envio, recebimento (webhook), e gestão de tokens.',
                tasks: [
                  'Configurar variáveis de ambiente: WHATSAPP_TOKEN, PHONE_NUMBER_ID, WEBHOOK_VERIFY_TOKEN',
                  'Implementar POST /messages para Graph API com retry e exponential backoff',
                  'Implementar endpoint GET /webhook para verificação (challenge) + POST /webhook para receber mensagens',
                  'Mapear webhook events: message, message_status (sent, delivered, read, failed)',
                  'Implementar fila (Redis/RabbitMQ) para mensagens outbound com rate limiting',
                ],
                color: 'bg-blue-500',
              },
              {
                fase: 'Fase 2',
                title: 'Adaptar Message Service',
                desc: 'Substituir o simulador por chamadas reais. Manter a mesma interface para o frontend.',
                tasks: [
                  'Substituir WhatsAppSimulator por chamada ao Gateway Service',
                  'Substituir setTimeout de status por webhook events reais',
                  'Adicionar campo whatsapp_message_id na tabela Message (ID retornado pela Meta)',
                  'Implementar idempotência no webhook (dedup por wamid)',
                  'Tratar erros da API (rate limit 429, token expirado, número inválido)',
                ],
                color: 'bg-green-500',
              },
              {
                fase: 'Fase 3',
                title: 'Integrar com Base de Clientes do ERP',
                desc: 'Sincronizar contatos do módulo de clientes do Obraxs com a base do CRM WhatsApp.',
                tasks: [
                  'Criar sync bidirecional: Cliente ERP ↔ Contato WhatsApp CRM',
                  'Normalizar telefones (E.164: +5511999999999)',
                  'Implementar opt-in/opt-out real com audit trail (quem, quando, como)',
                  'Tags automáticas baseadas em dados do ERP (ex: "construtora", "fornecedor", "locadora")',
                  'Webhook de atualização: quando contato muda no ERP, atualiza no CRM',
                ],
                color: 'bg-purple-500',
              },
              {
                fase: 'Fase 4',
                title: 'Template Manager',
                desc: 'Gerenciar templates de mensagem que são registrados na Meta.',
                tasks: [
                  'CRUD local de templates sincronizado com a API de templates da Meta',
                  'Fluxo de aprovação: rascunho → enviado para Meta → aprovado/rejeitado',
                  'Templates contextuais: medição aprovada, contrato vencendo, boleto gerado, NF emitida',
                  'Variáveis dinâmicas mapeadas para dados do ERP ({{nome_obra}}, {{valor}}, {{vencimento}})',
                  'Preview de template antes do envio com dados reais do contato',
                ],
                color: 'bg-amber-500',
              },
              {
                fase: 'Fase 5',
                title: 'Campanhas com Envio Real',
                desc: 'Adaptar o módulo de campanhas para envio real respeitando limites da Meta.',
                tasks: [
                  'Respeitar tier de envio atual da conta (1k, 10k, 100k, ilimitado)',
                  'Implementar rate limiting adaptativo baseado no tier',
                  'Monitorar quality rating da conta (verde, amarelo, vermelho)',
                  'Pausar campanha automaticamente se quality rating degradar',
                  'Métricas reais de entrega vindas dos webhooks (vs simulação atual)',
                ],
                color: 'bg-red-500',
              },
              {
                fase: 'Fase 6',
                title: 'Autenticação e Multi-tenant',
                desc: 'Adicionar segurança e suporte a múltiplas empresas do grupo CodeCycle.',
                tasks: [
                  'Autenticação via JWT com roles (admin, atendente, visualizador)',
                  'Cada empresa/filial com seu WABA (WhatsApp Business Account) e Phone Number ID',
                  'Isolamento de dados por tenant (schema-per-tenant ou row-level security)',
                  'Audit log: quem enviou, para quem, quando, qual template',
                  'Dashboard administrativo com métricas consolidadas cross-tenant',
                ],
                color: 'bg-indigo-500',
              },
            ].map((fase) => (
              <div key={fase.fase} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <span className={`rounded-full ${fase.color} px-2.5 py-1 text-xs font-bold text-white`}>{fase.fase}</span>
                  <h3 className="font-semibold text-gray-900">{fase.title}</h3>
                </div>
                <p className="mb-3 text-sm text-gray-600">{fase.desc}</p>
                <ul className="space-y-1.5">
                  {fase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Templates sugeridos para o ERP */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <MessageSquare className="h-5 w-5 text-[#512bd4]" />
            Templates Sugeridos para o ERP Obraxs
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                name: 'medicao_aprovada',
                category: 'Utility',
                body: 'Olá {{1}}! A medição #{{2}} da obra {{3}} foi aprovada no valor de {{4}}. Fatura disponível no portal.',
              },
              {
                name: 'contrato_vencimento',
                category: 'Utility',
                body: 'Aviso: O contrato {{1}} da obra {{2}} vence em {{3}} dias. Acesse o sistema para renovar ou solicitar aditivo.',
              },
              {
                name: 'boleto_gerado',
                category: 'Utility',
                body: '{{1}}, seu boleto de R$ {{2}} vencimento {{3}} referente ao contrato {{4}} está disponível. Link: {{5}}',
              },
              {
                name: 'manutencao_preventiva',
                category: 'Utility',
                body: 'Equipamento {{1}} precisa de manutenção preventiva programada para {{2}}. Confirme disponibilidade.',
              },
              {
                name: 'novo_lead_boas_vindas',
                category: 'Marketing',
                body: 'Olá {{1}}! Obrigado pelo interesse no Obraxs. Sou {{2}} da equipe comercial. Como posso ajudar?',
              },
              {
                name: 'proposta_enviada',
                category: 'Marketing',
                body: '{{1}}, sua proposta personalizada do Obraxs foi enviada por email. Valor: {{2}}/mês para {{3}} usuários. Dúvidas?',
              },
              {
                name: 'nf_emitida',
                category: 'Utility',
                body: 'NF {{1}} emitida no valor de R$ {{2}} para o contrato {{3}}. PDF disponível no portal do cliente.',
              },
              {
                name: 'compra_aprovada',
                category: 'Utility',
                body: 'Solicitação de compra #{{1}} aprovada. Fornecedor: {{2}}. Valor: R$ {{3}}. Pedido será emitido.',
              },
            ].map((tpl) => (
              <div key={tpl.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <code className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">{tpl.name}</code>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                    tpl.category === 'Marketing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {tpl.category}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-gray-600">{tpl.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Módulos do ERP que podem se beneficiar */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Cpu className="h-5 w-5 text-[#512bd4]" />
            Módulos do ERP com Integração WhatsApp
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm text-gray-600">
              Cada módulo do Obraxs pode disparar notificações automáticas via WhatsApp:
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {CODECYCLE_MODULES.map((mod) => (
                <div key={mod} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  <span className="h-2 w-2 rounded-full bg-[#25d366]" />
                  {mod}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Variáveis de Ambiente */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Lock className="h-5 w-5 text-[#512bd4]" />
            Variáveis de Ambiente para Produção
          </h2>
          <div className="rounded-xl border border-gray-200 bg-gray-900 p-5 font-mono text-sm leading-loose text-gray-100">
            <div className="text-gray-500"># WhatsApp Cloud API</div>
            <div><span className="text-amber-300">WHATSAPP_TOKEN</span>=EAA...seu_token_permanente</div>
            <div><span className="text-amber-300">WHATSAPP_PHONE_NUMBER_ID</span>=123456789012345</div>
            <div><span className="text-amber-300">WHATSAPP_BUSINESS_ACCOUNT_ID</span>=987654321098765</div>
            <div><span className="text-amber-300">WHATSAPP_WEBHOOK_VERIFY_TOKEN</span>=meu_token_secreto_aleatorio</div>
            <br />
            <div className="text-gray-500"># Banco de dados</div>
            <div><span className="text-amber-300">DATABASE_URL</span>=postgresql://user:pass@host/db</div>
            <br />
            <div className="text-gray-500"># Fila de mensagens</div>
            <div><span className="text-amber-300">REDIS_URL</span>=redis://localhost:6379</div>
            <br />
            <div className="text-gray-500"># Segurança</div>
            <div><span className="text-amber-300">JWT_SECRET</span>=chave_secreta_forte</div>
            <div><span className="text-amber-300">ENCRYPTION_KEY</span>=chave_para_dados_sensiveis</div>
          </div>
        </section>

        {/* Checklist de Go-Live */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <CheckCircle className="h-5 w-5 text-[#512bd4]" />
            Checklist de Go-Live
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              {[
                { check: 'Meta Business Account verificado e aprovado', category: 'Meta' },
                { check: 'Número de telefone dedicado registrado', category: 'Meta' },
                { check: 'Token permanente de System User gerado', category: 'Meta' },
                { check: 'Templates de mensagem aprovados', category: 'Meta' },
                { check: 'Webhook HTTPS configurado e respondendo', category: 'Infra' },
                { check: 'Fila de mensagens (Redis/RabbitMQ) operacional', category: 'Infra' },
                { check: 'Rate limiting implementado (respeitar tier)', category: 'Código' },
                { check: 'Retry com exponential backoff implementado', category: 'Código' },
                { check: 'Idempotência no webhook (dedup por wamid)', category: 'Código' },
                { check: 'Normalização de telefones (E.164)', category: 'Código' },
                { check: 'Opt-in collection com audit trail', category: 'Compliance' },
                { check: 'Política de privacidade atualizada', category: 'Compliance' },
                { check: 'LGPD: consentimento explícito registrado', category: 'Compliance' },
                { check: 'Monitoramento: quality rating, delivery rate, error rate', category: 'Ops' },
                { check: 'Alertas: token expirado, quality degraded, rate limit', category: 'Ops' },
                { check: 'Testes E2E com número sandbox antes de produção', category: 'QA' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 text-transparent">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">{item.check}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    item.category === 'Meta' ? 'bg-blue-100 text-blue-700' :
                    item.category === 'Infra' ? 'bg-purple-100 text-purple-700' :
                    item.category === 'Código' ? 'bg-green-100 text-green-700' :
                    item.category === 'Compliance' ? 'bg-red-100 text-red-700' :
                    item.category === 'Ops' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Links úteis */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <ExternalLink className="h-5 w-5 text-[#25d366]" />
            Links Úteis
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { title: 'WhatsApp Business Platform', url: 'https://business.whatsapp.com/products/business-platform' },
              { title: 'Cloud API — Get Started', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/get-started' },
              { title: 'Webhook Setup Guide', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks' },
              { title: 'Message Templates', url: 'https://developers.facebook.com/docs/whatsapp/message-templates' },
              { title: 'Pricing (por país)', url: 'https://developers.facebook.com/docs/whatsapp/pricing' },
              { title: 'Rate Limits & Quality', url: 'https://developers.facebook.com/docs/whatsapp/messaging-limits' },
              { title: 'Postman Collection', url: 'https://www.postman.com/meta/whatsapp-business-platform/collection/wlk6lh4/whatsapp-cloud-api' },
              { title: 'Meta Developer Hub', url: 'https://business.whatsapp.com/developers/developer-hub' },
            ].map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:border-[#25d366] hover:bg-[#25d366]/5"
              >
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-[#25d366]" />
                <span className="text-sm font-medium text-gray-700">{link.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          Guia de integração WhatsApp Business API para desenvolvedores CodeCycle.<br />
          Este demo é uma referência arquitetural — adapte os módulos conforme a necessidade do ERP Obraxs.
        </footer>
      </div>
    </div>
  );
}
