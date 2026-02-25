import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Contatos realistas: engenheiros, diretores, gestores de construtoras e locadoras
const NAMES = [
  'Ricardo Mendes', 'Fernanda Albuquerque', 'Carlos Eduardo Silva', 'Patrícia Rocha', 'Marcos Tavares',
  'Juliana Ferreira', 'André Nascimento', 'Camila Santana', 'Roberto Gomes', 'Luciana Barros',
  'Thiago Martins', 'Daniela Correia', 'Gustavo Peixoto', 'Vanessa Lima', 'Rodrigo Azevedo',
  'Beatriz Campos', 'Leonardo Duarte', 'Mariana Teixeira', 'Paulo Henrique Costa', 'Aline Ribeiro',
  'Fábio Monteiro', 'Renata Cardoso', 'Eduardo Nunes', 'Cláudia Vieira', 'Alexandre Borges',
  'Tatiana Freitas', 'Diego Sampaio', 'Isabela Andrade', 'Márcio Cunha', 'Priscila Ramos',
  'Bruno Cavalcanti', 'Larissa Medeiros', 'Sérgio Guimarães', 'Natália Lopes', 'Jorge Batista',
  'Carolina Pinto', 'Rafael Moreira', 'Amanda Fonseca', 'Felipe Nogueira', 'Gabriela Araújo',
  'Henrique Santos', 'Simone Pereira', 'Vinícius Dias', 'Adriana Castro', 'Leandro Oliveira',
  'Cristina Melo', 'Rogério Souza', 'Débora Barbosa', 'Marcelo Reis', 'Fernanda Torres',
];

const TAGS = ['lead', 'cliente', 'vip', 'inativo', 'prospecto', 'construtora', 'locadora', 'prestadora', 'pme'];

// Mensagens inbound — dúvidas reais sobre ERP Obraxs para construção civil
const MESSAGES_IN = [
  'Oi, vi o site de vocês. O Obraxs funciona para construtoras de médio porte?',
  'Quanto custa o plano para 15 usuários?',
  'Vocês integram com o sistema contábil que já usamos?',
  'Precisamos de controle de medição de obra. O sistema faz isso?',
  'Quero agendar uma demonstração para minha equipe.',
  'O sistema roda no celular? Meus engenheiros ficam no canteiro o dia todo.',
  'Hoje usamos tudo em planilha e está um caos. Vocês ajudam na migração?',
  'Qual o prazo de implantação do Obraxs?',
  'Temos 8 obras simultâneas. Consigo ver o financeiro de todas num dashboard?',
  'O módulo de compras faz cotação com fornecedores automaticamente?',
  'Como funciona o controle de contratos e aditivos?',
  'Preciso de relatório de rentabilidade por obra. Tem isso?',
  'Vocês têm clientes no segmento de locação de equipamentos?',
  'O sistema controla manutenção preventiva de equipamentos?',
  'Estamos comparando o Obraxs com o Sienge. Qual o diferencial?',
  'Podem enviar a proposta comercial por email?',
  'O Obraxs é seguro? Temos dados sensíveis de contratos.',
  'Quero entender melhor o módulo de tesouraria.',
  'Vocês fazem treinamento da equipe na implantação?',
  'Preciso de controle de estoque por obra. O sistema faz isso?',
];

// Mensagens outbound — respostas da equipe comercial Obraxs
const MESSAGES_OUT = [
  'Olá! O Obraxs foi feito especificamente para construção civil. Perfeito para médio porte!',
  'Para 15 usuários, o investimento fica em torno de R$ 2.800/mês com todos os módulos. Posso detalhar?',
  'Sim! Temos API aberta e integrações prontas com os principais sistemas contábeis do mercado.',
  'Com certeza! O módulo de Medições de Obra é um dos nossos destaques. Medição digital com aprovação online.',
  'Ótimo! A demo é personalizada e gratuita. Prefere de manhã ou à tarde?',
  'Sim! O Obraxs tem app mobile nativo. O engenheiro registra medição, aprova compra e consulta contrato pelo celular.',
  'Fazemos toda a migração assistida. Importamos dados das planilhas e treinamos a equipe. Sem perda de histórico!',
  'A implantação média leva 30 dias. Temos 4 etapas: Setup → Contratos → Operação → Análise.',
  'Exato! O dashboard executivo mostra visão consolidada de todas as obras, contratos e financeiro em tempo real.',
  'O fluxo é completo: solicitação → cotação automática → comparativo → pedido → recebimento → inventário.',
  'Controle total: proposta, aprovação, assinatura digital, aditivos com versionamento e alertas de vencimento.',
  'Temos relatórios de rentabilidade por obra, por contrato e por centro de custo. Exporta PDF e Excel.',
  'Sim! Atendemos construtoras, locadoras de equipamentos e prestadoras de serviços técnicos.',
  'O módulo de manutenção preventiva agenda automaticamente com base em horas de uso ou tempo. Alertas automáticos!',
  'O Obraxs é focado em contratos e operação de campo. Temos medição digital, manutenção preventiva e app mobile nativos.',
  'Claro! Me confirma o email que envio a proposta detalhada ainda hoje.',
  'Total segurança: backup automático, criptografia, controle de permissões por perfil e compliance LGPD.',
  'A Tesouraria inclui fluxo de caixa, contas a pagar/receber, conciliação bancária e dashboards financeiros.',
  'O treinamento é incluso! Capacitamos toda a equipe e acompanhamos os primeiros 90 dias de uso.',
  'Sim! Controle de estoque por obra com transferência entre canteiros, inventário e alertas de estoque mínimo.',
];

// Deals com contexto real de venda de ERP para construção
const DEAL_TITLES = [
  'Implantação Obraxs - MRV Engenharia', 'Migração ERP - Construtora Cyrela', 'Módulo Financeiro - Locadora ABC',
  'Demo + Proposta - Tenda Construtora', 'Treinamento Equipe - JBS Construções', 'Plano Enterprise - Eztec',
  'Integração Contábil - Patriani', 'App Mobile Setup - Helbor', 'Módulo Compras - Direcional',
  'Controle Medições - Gafisa', 'Manutenção Preventiva - Locadora XYZ', 'Dashboard Financeiro - Even',
  'Consultoria Implantação - Lavvi', 'Módulo Estoque - Mills Locação', 'Tesouraria + Conciliação - Viver Inc.',
  'Gestão Contratos - Cury Construtora', 'Módulo Orçamentos - Moura Dubeux', 'Setup Completo - Pacaembu Const.',
  'POC 30 dias - Tecnisa', 'Expansão Licenças - Tegra Inc.', 'Suporte Premium - RNI Negócios',
  'Integração Bancária - Plano&Plano', 'Controle de Obras - MPD Engenharia', 'Módulo Cotações - Kallas Inc.',
  'App Canteiro - Método Engenharia', 'Setup Multi-obra - Vitacon', 'Centro de Custos - Mitre Realty',
  'Relatórios Gerenciais - Croma', 'Modulo Inventário - Solaris Const.', 'Piloto 3 Obras - Habitasul',
];

// Templates com contexto Obraxs
const TEMPLATE_CONTENTS = [
  { name: 'Boas-vindas Obraxs', category: 'utility', content: 'Olá {{nome}}! Bem-vindo(a) ao Obraxs. Sua plataforma de gestão para construção civil está ativa. Qualquer dúvida, estamos aqui!' },
  { name: 'Follow-up Demo', category: 'marketing', content: 'Oi {{nome}}, como foi a demonstração do Obraxs? Gostaria de agendar uma conversa para esclarecer dúvidas sobre os módulos?' },
  { name: 'Proposta Enviada', category: 'utility', content: '{{nome}}, a proposta #{{numero}} do Obraxs foi enviada para {{email}}. Inclui módulos, valores e cronograma de implantação.' },
  { name: 'Lembrete Demo', category: 'utility', content: 'Lembrete: sua demonstração do Obraxs com {{consultor}} está agendada para {{data}} às {{hora}}. Link: {{link}}' },
  { name: 'Oferta Implantação', category: 'marketing', content: '{{nome}}, até o final do mês: implantação com 50% de desconto + 3 meses de suporte premium grátis. Responda para saber mais!' },
  { name: 'NPS Obraxs', category: 'utility', content: 'Oi {{nome}}! De 0 a 10, o quanto você recomendaria o Obraxs? Sua opinião nos ajuda a melhorar.' },
  { name: 'Reativação Lead', category: 'marketing', content: '{{nome}}, vimos que você conheceu o Obraxs há um tempo. Temos novidades nos módulos de medição e manutenção. Bora conversar?' },
  { name: 'Webinar Construção', category: 'marketing', content: '{{nome}}, participe do webinar "Gestão Digital de Obras com o Obraxs" no dia {{data}}. Vagas limitadas! Inscreva-se.' },
  { name: 'Treinamento Agendado', category: 'utility', content: '{{nome}}, o treinamento do Obraxs para sua equipe está confirmado para {{data}}. Duração: 2h. Link de acesso: {{link}}' },
  { name: 'Suporte Ticket', category: 'utility', content: 'Seu chamado #{{ticket}} foi registrado no suporte Obraxs. Prazo de resposta: {{prazo}}h. Acompanhe em {{link}}.' },
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
  console.log('🌱 Seeding database (contexto Obraxs)...');

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
  console.log('  ✅ 10 templates Obraxs');

  // Contacts
  const contacts = [];
  for (let i = 0; i < 50; i++) {
    const c = await prisma.contact.create({
      data: {
        name: NAMES[i],
        phone: randomPhone(),
        email: `${NAMES[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '.')}@email.com`,
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
  console.log('  ✅ 20 conversas com mensagens reais');

  // Pipeline + Stages
  const pipeline = await prisma.pipeline.create({ data: { name: 'Pipeline Comercial Obraxs' } });
  const stageData = [
    { name: 'Novo Lead', order: 0, color: '#94a3b8' },
    { name: 'Demo Agendada', order: 1, color: '#60a5fa' },
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
        value: Math.floor(Math.random() * 80000 + 10000),
        notes: i % 3 === 0 ? 'Empresa demonstrou alto interesse nos módulos de medição e contratos' : null,
      },
    });
  }
  console.log('  ✅ 1 pipeline, 6 stages, 30 deals Obraxs');

  // Campaigns
  const completedCampaign = await prisma.campaign.create({
    data: {
      name: 'Lançamento Módulo Medições 2.0',
      templateText: 'Olá {{nome}}! O novo módulo de Medições de Obra do Obraxs está no ar. Medição digital com aprovação online. Agende uma demo gratuita!',
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
      name: 'Webinar: Gestão Digital de Obras',
      templateText: '{{nome}}, participe do webinar "Elimine planilhas da sua construtora com o Obraxs" no dia 15/03! Vagas limitadas. Responda SIM para inscrição.',
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
      name: 'Follow-up Leads Construção',
      templateText: 'Oi {{nome}}, tudo bem? Você conheceu o Obraxs recentemente. Temos condições especiais para implantação este mês. Quer saber mais?',
      status: 'draft',
      rateLimit: 30,
      audienceFilter: JSON.stringify({ tags: ['lead', 'prospecto', 'construtora'] }),
    },
  });

  console.log('  ✅ 3 campanhas Obraxs');
  console.log('🎉 Seed complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
