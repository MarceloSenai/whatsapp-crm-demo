// Simulador de respostas WhatsApp baseado no produto OBRAXS (ERP para construção civil)

const RESPONSE_MAP: { keywords: string[]; responses: string[] }[] = [
  {
    keywords: ['preço', 'valor', 'quanto', 'custo', 'investimento', 'plano', 'mensalidade'],
    responses: [
      'O Obraxs tem planos a partir do módulo básico. Depende de quantos usuários e módulos você precisa. Posso enviar a tabela de preços?',
      'O investimento varia conforme o número de usuários e módulos ativos. Para construtoras de médio porte, nossos clientes investem em média R$ 1.500 a R$ 5.000/mês. Quer uma proposta personalizada?',
      'Nossos planos são modulares — você começa com o que precisa e escala sem custo adicional por módulo. Qual o tamanho da sua operação?',
    ],
  },
  {
    keywords: ['módulo', 'modulo', 'funcionalidade', 'recurso', 'ferramenta'],
    responses: [
      'O Obraxs tem 15 módulos integrados: Tesouraria, Orçamentos, Medições de Obra, Conciliação Bancária, Compras, Cotações, Inventário, Centro de Custos, Relatórios, App Mobile e mais. Qual área te interessa mais?',
      'Os módulos mais procurados são Medições de Obra, Controle de Contratos e Tesouraria. São totalmente integrados — nada de planilha paralela. Quer que eu detalhe algum?',
      'São 15 módulos que cobrem toda a operação: do orçamento à medição, da compra ao financeiro. Tudo na nuvem. Posso fazer uma demo focada no módulo que você mais precisa.',
    ],
  },
  {
    keywords: ['obra', 'construção', 'construtora', 'engenharia', 'canteiro'],
    responses: [
      'O Obraxs foi feito especificamente para construção civil! Diferente de ERPs genéricos, nossos módulos entendem medição de obra, aditivos contratuais, diário de obra e controle de equipamentos.',
      'Atendemos construtoras, empresas de locação de equipamentos e prestadoras de serviços técnicos. Mais de 100 empresas já usam. Em qual segmento vocês atuam?',
      'Perfeito! O Obraxs foi desenhado para o setor de construção. Centralizamos vendas, contratos, operação, manutenção e financeiro numa única plataforma.',
    ],
  },
  {
    keywords: ['contrato', 'aditivo', 'medição', 'medicao'],
    responses: [
      'No Obraxs, o ciclo completo do contrato é digital: proposta, aprovação, assinatura, aditivos, medições e faturamento. Tudo com versionamento automático.',
      'As medições de obra são feitas diretamente no sistema, com aprovação digital e geração automática de fatura. Acabou a planilha de medição!',
      'Controle total de contratos: prazos, aditivos, reajustes automáticos e alertas de vencimento. Você tem visibilidade em tempo real de todos os contratos da empresa.',
    ],
  },
  {
    keywords: ['financeiro', 'tesouraria', 'fluxo de caixa', 'contas', 'pagamento', 'boleto'],
    responses: [
      'O módulo de Tesouraria do Obraxs inclui fluxo de caixa, contas a pagar/receber, conciliação bancária automática e dashboards financeiros em tempo real.',
      'Temos conciliação bancária automática, plano de contas configurável e centro de custos por obra/contrato. Tudo integrado com os módulos operacionais.',
      'O financeiro é integrado com compras e contratos — quando uma medição é aprovada, o faturamento é gerado automaticamente. Zero retrabalho.',
    ],
  },
  {
    keywords: ['compra', 'estoque', 'material', 'fornecedor', 'cotação', 'cotacao'],
    responses: [
      'O fluxo de compras é completo: solicitação → cotação com fornecedores → pedido → recebimento → inventário. Tudo rastreável.',
      'Sim! Temos Solicitação de Compra, Cotações (com comparativo automático), Pedidos, Recebimento de Materiais e Inventário. Integrado com o financeiro.',
      'O controle de materiais inclui transferência entre obras, inventário e alertas de estoque mínimo. Você sabe exatamente o que tem em cada canteiro.',
    ],
  },
  {
    keywords: ['manutenção', 'manutencao', 'preventiva', 'equipamento', 'locação', 'locacao'],
    responses: [
      'O Obraxs tem manutenção preventiva programada com alertas automáticos. Ideal para empresas de locação de equipamentos. Acabaram as manutenções esquecidas!',
      'Para locação de equipamentos, controlamos toda a vida do ativo: entrada, saída, manutenção preventiva, disponibilidade e custos. Tudo no sistema.',
      'As manutenções são agendadas automaticamente com base em horas de uso ou tempo. O sistema avisa antes de vencer. Quer ver na prática?',
    ],
  },
  {
    keywords: ['planilha', 'excel', 'controle paralelo', 'manual', 'retrabalho'],
    responses: [
      'Esse é exatamente o problema que o Obraxs resolve! Nossos clientes relatam redução de 70% no tempo de gestão ao sair das planilhas.',
      'Com o Obraxs, você centraliza tudo: contratos, financeiro, compras, medições e manutenção. Sem planilhas paralelas, sem retrabalho.',
      'Entendo a dor! A maioria dos nossos clientes vinha de planilhas. A migração é assistida — te ajudamos a importar os dados e treinar a equipe.',
    ],
  },
  {
    keywords: ['nuvem', 'cloud', 'acesso', 'mobile', 'celular', 'app', 'aplicativo'],
    responses: [
      'O Obraxs é 100% na nuvem. Acesse de qualquer lugar: computador, tablet ou celular. Tem app mobile nativo para Android e iOS.',
      'Sim! Funciona no navegador e temos app mobile. O engenheiro no canteiro consegue registrar medição, aprovar compra ou consultar contrato pelo celular.',
      'Cloud com backup automático diário. Seus dados estão seguros e acessíveis de qualquer dispositivo. Também somos compliance com a LGPD.',
    ],
  },
  {
    keywords: ['segurança', 'lgpd', 'backup', 'dado', 'proteção'],
    responses: [
      'Levamos segurança a sério: backup automático, criptografia, controle de permissões por perfil e total compliance com a LGPD.',
      'Cada usuário tem permissões configuráveis. O diretor vê tudo, o engenheiro vê a obra dele, o estagiário vê o que você liberar.',
      'Seus dados são criptografados e com backup automático. Temos certificações de segurança e estamos 100% adequados à LGPD.',
    ],
  },
  {
    keywords: ['integração', 'integrar', 'api', 'erp', 'sistema'],
    responses: [
      'O Obraxs tem API aberta e integrações via webhook. Conectamos com bancos, sistemas contábeis e outras ferramentas que você já usa.',
      'Temos integrações prontas e API REST para desenvolvimentos customizados. Qual sistema você precisa integrar?',
      'Sim! Muitos clientes integram o Obraxs com o sistema contábil existente. Fazemos a ponte via API ou importação/exportação de dados.',
    ],
  },
  {
    keywords: ['demo', 'demonstração', 'demonstracao', 'teste', 'trial', 'conhecer', 'ver'],
    responses: [
      'Claro! A demo é personalizada e gratuita, sem compromisso. Mostramos os módulos mais relevantes para sua operação. Qual horário funciona para você?',
      'A demonstração leva cerca de 40 minutos e é totalmente personalizada para seu segmento (construtora, locadora ou prestadora). Quando seria bom?',
      'Posso agendar uma demo online para amanhã mesmo! Não precisa cartão de crédito. Me passa seu email que envio o convite.',
    ],
  },
  {
    keywords: ['implantação', 'implementação', 'migração', 'implantar', 'começar'],
    responses: [
      'A implantação do Obraxs é assistida: configuramos a empresa, importamos dados, treinamos a equipe e acompanhamos os primeiros 90 dias.',
      'O processo tem 4 etapas: Setup da empresa → Configuração de contratos → Controle operacional → Análise de resultados. Em média 30 dias para estar rodando.',
      'Fazemos a migração dos dados das suas planilhas e sistemas antigos. Você não perde histórico. O treinamento é incluso no plano.',
    ],
  },
  {
    keywords: ['relatório', 'relatorio', 'dashboard', 'indicador', 'kpi', 'resultado'],
    responses: [
      'Temos dashboards em tempo real com os principais KPIs: rentabilidade por obra, fluxo de caixa, status de contratos, produtividade e mais.',
      'Os relatórios gerenciais são customizáveis. Você define quais indicadores quer acompanhar. Exporta em PDF, Excel ou visualiza online.',
      'O dashboard executivo mostra visão geral de todas as obras, contratos e financeiro num único lugar. O diretor adora!',
    ],
  },
  {
    keywords: ['obrigado', 'valeu', 'agradeço', 'thanks'],
    responses: [
      'Por nada! Qualquer dúvida sobre o Obraxs, estou aqui.',
      'Disponha! Se quiser agendar uma demo personalizada, é só falar.',
      'Imagina! O Obraxs vai transformar a gestão da sua empresa. Conta comigo!',
    ],
  },
  {
    keywords: ['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'hey'],
    responses: [
      'Olá! Bem-vindo ao Obraxs. Como posso te ajudar hoje?',
      'Oi! Sou da equipe comercial do Obraxs. Está buscando uma solução para gestão de obras e contratos?',
      'Olá! Tudo bem? Você chegou no canal certo. O Obraxs é a plataforma de gestão para construção civil. O que gostaria de saber?',
    ],
  },
  {
    keywords: ['sim', 'quero', 'pode', 'vamos', 'bora', 'ok', 'pode ser'],
    responses: [
      'Ótimo! Vou preparar tudo. Me passa seu email corporativo que envio os detalhes.',
      'Perfeito! Vou agendar. Prefere de manhã ou à tarde?',
      'Show! Já estou encaminhando. Você vai receber um email com o link da reunião.',
    ],
  },
  {
    keywords: ['concorrente', 'sienge', 'mega', 'uau', 'globaltec', 'comparar'],
    responses: [
      'O diferencial do Obraxs é ser focado em contratos e operação de campo, não só financeiro. Temos módulos que ERPs genéricos não oferecem, como medição digital e manutenção preventiva.',
      'Muitos clientes migraram de outros sistemas. O Obraxs se destaca pela facilidade de uso, implantação rápida e por ser 100% cloud com app mobile.',
      'Posso fazer um comparativo detalhado. O Obraxs foi construído especificamente para construção civil — não é um ERP genérico adaptado.',
    ],
  },
  {
    keywords: ['não', 'cancelar', 'desistir', 'parar', 'depois'],
    responses: [
      'Entendo! Fico à disposição quando precisar. O Obraxs vai estar aqui.',
      'Sem problemas! Se mudar de ideia, é só chamar. Posso enviar um material por email para você analisar com calma?',
      'Tudo bem! Vou enviar um resumo por email para você avaliar no seu tempo. Qualquer dúvida, me chama.',
    ],
  },
];

const FALLBACK_RESPONSES = [
  'Entendi! Posso te mostrar como o Obraxs resolve isso na prática. Quer agendar uma demo?',
  'Boa pergunta! Vou consultar com o time técnico e te retorno em seguida.',
  'Interessante! O Obraxs tem funcionalidade pra isso. Posso te mostrar em uma demonstração rápida.',
  'Anotado! Vou encaminhar para o consultor responsável pela sua região. Ele retorna em breve.',
  'Recebido! Mais de 100 empresas de construção já usam o Obraxs. Posso te contar como funciona?',
  'Entendi a necessidade. O módulo de Gestão de Contratos do Obraxs provavelmente resolve. Quer ver?',
  'Obrigado pela informação! Vou preparar uma proposta adequada para o tamanho da sua operação.',
];

export function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const rule of RESPONSE_MAP) {
    const matched = rule.keywords.some((kw) => {
      const normalizedKw = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return msg.includes(normalizedKw);
    });
    if (matched) {
      return rule.responses[Math.floor(Math.random() * rule.responses.length)];
    }
  }

  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

export function randomDelay(): number {
  return Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
}
