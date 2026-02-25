import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NAMES = [
  'Ana Silva', 'Bruno Costa', 'Carla Oliveira', 'Daniel Santos', 'Elena Pereira',
  'Felipe Souza', 'Gabriela Lima', 'Henrique Ferreira', 'Isabela Rodrigues', 'João Almeida',
  'Karen Nascimento', 'Lucas Barbosa', 'Mariana Ribeiro', 'Nathan Carvalho', 'Olívia Gomes',
  'Pedro Martins', 'Queila Araújo', 'Rafael Cardoso', 'Sophia Mendes', 'Thiago Correia',
  'Ursula Dias', 'Vinícius Rocha', 'Wanda Teixeira', 'Xavier Moura', 'Yasmin Castro',
  'Amanda Freitas', 'Bernardo Pinto', 'Camila Nunes', 'Diego Monteiro', 'Eduarda Campos',
  'Fernando Ramos', 'Giovanna Lopes', 'Hugo Azevedo', 'Íris Vieira', 'Julio Andrade',
  'Larissa Duarte', 'Matheus Cunha', 'Natália Melo', 'Otávio Borges', 'Patrícia Guimarães',
  'Raul Sampaio', 'Sara Medeiros', 'Tiago Cavalcanti', 'Valentina Reis', 'Wesley Fonseca',
  'Ximena Batista', 'Yago Moreira', 'Zara Nogueira', 'Arthur Peixoto', 'Beatriz Tavares',
];

const TAGS = ['lead', 'cliente', 'vip', 'inativo', 'prospecto', 'parceiro', 'enterprise', 'startup', 'pme'];

const MESSAGES_IN = [
  'Oi, gostaria de saber mais sobre o produto.',
  'Qual o preço do plano enterprise?',
  'Vocês fazem integração com SAP?',
  'Preciso de suporte técnico.',
  'Quando posso agendar uma demo?',
  'O sistema suporta multi-tenant?',
  'Gostei da apresentação, quero avançar.',
  'Qual o prazo de implementação?',
  'Vocês atendem empresas de construção civil?',
  'Temos interesse em 50 licenças.',
  'Podem enviar a proposta por email?',
  'Como funciona o suporte 24/7?',
  'O contrato é mensal ou anual?',
  'Preciso falar com o comercial.',
  'Estou comparando com a concorrência.',
];

const MESSAGES_OUT = [
  'Olá! Claro, posso te ajudar. Qual sua necessidade principal?',
  'Nosso plano enterprise é R$ 299/mês por usuário.',
  'Sim, temos integração nativa com SAP, Oracle e TOTVS.',
  'Vou transferir para nosso time técnico. Um momento!',
  'Podemos agendar para amanhã às 14h. Funciona?',
  'Sim! Arquitetura multi-tenant com isolamento completo.',
  'Ótimo! Vou preparar a proposta comercial.',
  'O prazo médio é de 4 a 6 semanas.',
  'Com certeza! Temos vários clientes nesse segmento.',
  'Para 50 licenças temos desconto progressivo de 15%.',
  'Claro! Qual email de preferência?',
  'Nosso suporte funciona via chat, email e telefone 24/7.',
  'Oferecemos ambos. Anual tem 20% de desconto.',
  'Vou conectar você com o gerente de contas.',
  'Entendo! Posso fazer um comparativo para você?',
];

const DEAL_TITLES = [
  'Licenciamento ERP', 'Migração Cloud', 'Consultoria BI', 'Implantação CRM',
  'Suporte Premium', 'Treinamento Equipe', 'Integração API', 'Setup Infraestrutura',
  'Automação Processos', 'Dashboard Analytics', 'App Mobile Custom', 'Segurança Dados',
  'Backup Cloud', 'Plano Enterprise', 'Módulo Fiscal', 'Portal Cliente',
  'Gateway Pagamentos', 'Chatbot IA', 'ETL Pipeline', 'Data Lake',
  'Monitoramento 24/7', 'Pentest Anual', 'SLA Premium', 'Expansão Licenças',
  'POC Machine Learning', 'Redesign UX', 'Migração Banco', 'API Gateway',
  'Kubernetes Setup', 'CI/CD Pipeline',
];

const TEMPLATE_CONTENTS = [
  { name: 'Boas-vindas', category: 'utility', content: 'Olá {{nome}}! Bem-vindo(a) à nossa plataforma. Estamos à disposição para ajudar.' },
  { name: 'Follow-up Demo', category: 'marketing', content: 'Oi {{nome}}, como foi a experiência com a demo? Gostaria de agendar uma conversa para esclarecer dúvidas?' },
  { name: 'Proposta Enviada', category: 'utility', content: '{{nome}}, a proposta #{{numero}} foi enviada para {{email}}. Qualquer dúvida, estamos aqui!' },
  { name: 'Lembrete Reunião', category: 'utility', content: 'Lembrete: sua reunião com {{consultor}} está agendada para {{data}} às {{hora}}.' },
  { name: 'Black Friday', category: 'marketing', content: '🔥 {{nome}}, aproveite! 40% de desconto em todos os planos até sexta. Use o cupom BF2026.' },
  { name: 'NPS', category: 'utility', content: 'Oi {{nome}}! De 0 a 10, o quanto você recomendaria nossos serviços? Responda com o número.' },
  { name: 'Reativação', category: 'marketing', content: '{{nome}}, sentimos sua falta! Temos novidades incríveis. Que tal uma conversa rápida?' },
  { name: 'Confirmação Pagamento', category: 'utility', content: 'Pagamento de R$ {{valor}} confirmado. Obrigado, {{nome}}! Comprovante em {{link}}.' },
  { name: 'Convite Evento', category: 'marketing', content: '{{nome}}, você está convidado(a) para nosso webinar "{{tema}}" no dia {{data}}. Inscreva-se!' },
  { name: 'Suporte Ticket', category: 'utility', content: 'Seu chamado #{{ticket}} foi aberto. Prazo de resposta: {{prazo}}h. Acompanhe em {{link}}.' },
];

function randomPhone() {
  const ddd = [11, 21, 31, 41, 51, 61, 71, 81, 19, 27][Math.floor(Math.random() * 10)];
  const num = Math.floor(Math.random() * 900000000 + 100000000);
  return `+55${ddd}9${num}`;
}

function randomTags(): string {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...TAGS].sort(() => 0.5 - Math.random());
  return JSON.stringify(shuffled.slice(0, count));
}

function randomDate(daysBack: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  d.setHours(Math.floor(Math.random() * 12) + 8, Math.floor(Math.random() * 60));
  return d;
}

async function main() {
  console.log('🌱 Seeding database...');

  // Clean
  await prisma.campaignMessage.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.template.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.pipeline.deleteMany();
  await prisma.contact.deleteMany();

  // Templates
  for (const t of TEMPLATE_CONTENTS) {
    await prisma.template.create({
      data: { name: t.name, category: t.category, content: t.content, status: 'approved' },
    });
  }
  console.log('  ✅ 10 templates');

  // Contacts
  const contacts = [];
  for (let i = 0; i < 50; i++) {
    const c = await prisma.contact.create({
      data: {
        name: NAMES[i],
        phone: randomPhone(),
        email: `${NAMES[i].toLowerCase().replace(' ', '.')}@email.com`,
        tags: randomTags(),
        optedOut: i >= 47,
        optOutAt: i >= 47 ? randomDate(10) : null,
      },
    });
    contacts.push(c);
  }
  console.log('  ✅ 50 contatos');

  // Conversations + Messages
  for (let i = 0; i < 20; i++) {
    const contact = contacts[i];
    const msgCount = Math.floor(Math.random() * 11) + 5;
    const startDate = randomDate(14);

    const conv = await prisma.conversation.create({
      data: {
        contactId: contact.id,
        status: i < 12 ? 'open' : i < 17 ? 'waiting' : 'closed',
        assignedTo: ['Carlos', 'Marina', 'Roberto', null][Math.floor(Math.random() * 4)],
        channel: 'whatsapp',
        unreadCount: i < 12 ? Math.floor(Math.random() * 5) : 0,
      },
    });

    let lastMsgDate = startDate;
    for (let m = 0; m < msgCount; m++) {
      const isInbound = m % 2 === 0;
      lastMsgDate = new Date(lastMsgDate.getTime() + Math.random() * 3600000);
      await prisma.message.create({
        data: {
          conversationId: conv.id,
          direction: isInbound ? 'inbound' : 'outbound',
          content: isInbound
            ? MESSAGES_IN[Math.floor(Math.random() * MESSAGES_IN.length)]
            : MESSAGES_OUT[Math.floor(Math.random() * MESSAGES_OUT.length)],
          status: isInbound ? 'read' : ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)],
          createdAt: lastMsgDate,
        },
      });
    }

    await prisma.conversation.update({
      where: { id: conv.id },
      data: { lastMessageAt: lastMsgDate },
    });
  }
  console.log('  ✅ 20 conversas com mensagens');

  // Pipeline + Stages
  const pipeline = await prisma.pipeline.create({ data: { name: 'Pipeline Comercial' } });
  const stageData = [
    { name: 'Novo Lead', order: 0, color: '#94a3b8' },
    { name: 'Primeiro Contato', order: 1, color: '#60a5fa' },
    { name: 'Qualificado', order: 2, color: '#a78bfa' },
    { name: 'Proposta Enviada', order: 3, color: '#fbbf24' },
    { name: 'Negociação', order: 4, color: '#f97316' },
    { name: 'Fechado/Ganho', order: 5, color: '#22c55e' },
  ];

  const stages = [];
  for (const s of stageData) {
    const stage = await prisma.stage.create({
      data: { ...s, pipelineId: pipeline.id },
    });
    stages.push(stage);
  }

  // Deals
  for (let i = 0; i < 30; i++) {
    const stageIdx = Math.floor(Math.random() * 6);
    await prisma.deal.create({
      data: {
        title: DEAL_TITLES[i],
        contactId: contacts[i % 30].id,
        stageId: stages[stageIdx].id,
        value: Math.floor(Math.random() * 50000 + 5000),
        notes: i % 3 === 0 ? 'Contato demonstrou alto interesse' : null,
      },
    });
  }
  console.log('  ✅ 1 pipeline, 6 stages, 30 deals');

  // Campaigns
  const completedCampaign = await prisma.campaign.create({
    data: {
      name: 'Promoção Janeiro',
      templateText: 'Olá {{nome}}! Comece 2026 com 30% de desconto. Responda SIM para saber mais.',
      status: 'completed',
      rateLimit: 20,
      startedAt: randomDate(30),
      completedAt: randomDate(25),
    },
  });
  for (let i = 0; i < 15; i++) {
    await prisma.campaignMessage.create({
      data: {
        campaignId: completedCampaign.id,
        contactId: contacts[i].id,
        status: ['sent', 'delivered', 'read', 'replied'][Math.floor(Math.random() * 4)],
        sentAt: randomDate(28),
        deliveredAt: randomDate(28),
        readAt: Math.random() > 0.3 ? randomDate(27) : null,
        repliedAt: Math.random() > 0.7 ? randomDate(26) : null,
      },
    });
  }

  const runningCampaign = await prisma.campaign.create({
    data: {
      name: 'Webinar IA 2026',
      templateText: '{{nome}}, participe do nosso webinar sobre IA aplicada em {{data}}! Vagas limitadas.',
      status: 'running',
      rateLimit: 10,
      startedAt: new Date(),
    },
  });
  for (let i = 15; i < 35; i++) {
    await prisma.campaignMessage.create({
      data: {
        campaignId: runningCampaign.id,
        contactId: contacts[i % 47].id,
        status: i < 25 ? 'delivered' : 'pending',
        sentAt: i < 25 ? new Date() : null,
        deliveredAt: i < 22 ? new Date() : null,
      },
    });
  }

  await prisma.campaign.create({
    data: {
      name: 'Follow-up Q1',
      templateText: 'Oi {{nome}}, tudo bem? Vimos que você demonstrou interesse em {{produto}}. Podemos conversar?',
      status: 'draft',
      rateLimit: 30,
      audienceFilter: JSON.stringify({ tags: ['lead', 'prospecto'] }),
    },
  });

  console.log('  ✅ 3 campanhas');
  console.log('🎉 Seed complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
