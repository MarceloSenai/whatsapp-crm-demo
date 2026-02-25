# WhatsApp CRM Demo

Protótipo funcional de integração WhatsApp + CRM com **Inbox Omnichannel**, **Pipeline Kanban** e **Campanhas em massa**.

Demo para equipe de desenvolvimento usar como base arquitetural.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS 4**
- **Prisma** + SQLite (zero config)
- **@dnd-kit** (drag-and-drop no Kanban)
- **WhatsApp simulado** (auto-respostas com delay realista)

## Setup

```bash
# Instalar dependências
npm install

# Gerar Prisma client + criar banco
npx prisma generate
npx prisma db push

# Popular com dados de demonstração
npx tsx prisma/seed.ts

# Rodar dev server
npm run dev
```

Abrir http://localhost:3000

## Módulos

### Inbox Omnichannel (`/inbox`)
- Chat WhatsApp-like com bolhas, ticks de status
- Lista de conversas com filtros (Abertos/Aguardando/Fechados)
- **Auto-respostas simuladas** — envie uma mensagem e receba resposta em 2-5s
- Painel de informações do contato
- Picker de templates

### Pipeline Kanban (`/pipeline`)
- 6 estágios: Novo Lead → Primeiro Contato → Qualificado → Proposta → Negociação → Fechado
- **Drag-and-drop** para mover deals entre estágios
- Cards com valor em R$, contato e tags
- Totalizadores por coluna

### Campanhas (`/campaigns`)
- Lista com status (Rascunho, Enviando, Concluída)
- Wizard 4 etapas: Conteúdo → Audiência → Cadência → Revisão
- **Simulação de disparo** — mensagens progridem (pending→sent→delivered→read→replied)
- Barras de progresso em tempo real

### Contatos (`/contacts`)
- 50 contatos com nomes brasileiros
- Filtros: Todos/Ativos/Opt-out
- Gestão de opt-out (compliance WhatsApp)
- Tags coloridas, busca

## Dados de Demo

O seed popula:
- 50 contatos com telefones +55
- 20 conversas com histórico de mensagens
- 1 pipeline com 6 estágios e 30 deals
- 3 campanhas (rascunho, rodando, concluída)
- 10 templates aprovados

## Simulador WhatsApp

O arquivo `src/lib/whatsapp-simulator.ts` contém o motor de auto-respostas:
- Respostas contextuais baseadas em keywords (preço, demo, suporte, etc.)
- Delay random de 2-5 segundos
- Progressão de status: sent → delivered (1s) → read (3s)

Para customizar respostas, edite o `RESPONSE_MAP` no arquivo.
