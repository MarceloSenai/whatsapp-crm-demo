const RESPONSE_MAP: { keywords: string[]; responses: string[] }[] = [
  {
    keywords: ['preço', 'valor', 'quanto', 'custo', 'investimento'],
    responses: [
      'O valor do plano básico é R$ 99/mês. Quer saber mais detalhes?',
      'Temos planos a partir de R$ 99/mês. Posso enviar a tabela completa?',
      'Depende da quantidade de usuários. Qual o tamanho da equipe?',
    ],
  },
  {
    keywords: ['obrigado', 'valeu', 'agradeço', 'thanks'],
    responses: [
      'Por nada! Qualquer dúvida, estou aqui 😊',
      'Disponha! Fico feliz em ajudar.',
      'Imagina! Precisando é só chamar.',
    ],
  },
  {
    keywords: ['horário', 'funciona', 'atendimento', 'expediente'],
    responses: [
      'Funcionamos de seg a sex, 8h às 18h.',
      'Nosso atendimento é de segunda a sexta, das 8h às 18h.',
      'Estamos disponíveis em horário comercial. Posso te ajudar agora?',
    ],
  },
  {
    keywords: ['demo', 'demonstração', 'teste', 'trial'],
    responses: [
      'Claro! Posso agendar uma demo para amanhã. Qual horário prefere?',
      'Temos trial gratuito de 14 dias. Quer que eu ative?',
      'A demonstração leva cerca de 30 minutos. Quando seria bom?',
    ],
  },
  {
    keywords: ['contrato', 'prazo', 'fidelidade', 'cancelar'],
    responses: [
      'Nosso contrato é flexível: mensal sem fidelidade ou anual com 20% de desconto.',
      'Sem fidelidade! Você pode cancelar quando quiser.',
      'Oferecemos planos mensais e anuais. O anual tem desconto especial.',
    ],
  },
  {
    keywords: ['integração', 'api', 'webhook', 'conectar'],
    responses: [
      'Temos API REST completa e webhooks em tempo real. Documentação disponível!',
      'Sim! Integramos com os principais ERPs e CRMs do mercado.',
      'Nossa API é bem documentada. Posso enviar o link da documentação?',
    ],
  },
  {
    keywords: ['suporte', 'ajuda', 'problema', 'erro', 'bug'],
    responses: [
      'Entendi a situação. Vou abrir um chamado para o time técnico.',
      'Pode me detalhar o problema? Vou verificar imediatamente.',
      'Nosso time de suporte está analisando. Retorno em breve!',
    ],
  },
  {
    keywords: ['proposta', 'orçamento', 'negociar'],
    responses: [
      'Vou preparar uma proposta personalizada. Qual seu email?',
      'Com certeza! Preciso de algumas informações para montar a proposta.',
      'Posso enviar a proposta ainda hoje. Me passa o email corporativo?',
    ],
  },
  {
    keywords: ['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'hey'],
    responses: [
      'Olá! Tudo bem? Como posso te ajudar hoje?',
      'Oi! Seja bem-vindo(a)! Em que posso ajudar?',
      'Olá! Prazer em falar com você. O que precisa?',
    ],
  },
  {
    keywords: ['sim', 'quero', 'pode', 'vamos', 'bora', 'ok'],
    responses: [
      'Ótimo! Vou providenciar isso agora mesmo.',
      'Perfeito! Já estou encaminhando.',
      'Show! Vou organizar tudo e te retorno em seguida.',
    ],
  },
  {
    keywords: ['não', 'cancelar', 'desistir', 'parar'],
    responses: [
      'Entendo! Se mudar de ideia, estou por aqui.',
      'Sem problemas! Qualquer coisa é só chamar.',
      'Tudo bem! Fico à disposição quando precisar.',
    ],
  },
];

const FALLBACK_RESPONSES = [
  'Entendi! Pode me contar mais detalhes?',
  'Certo, vou verificar isso para você.',
  'Ok! Algo mais que eu possa ajudar?',
  'Interessante! Me fala mais sobre isso.',
  'Anotado! Vou encaminhar para o time responsável.',
  'Recebi sua mensagem. Vou analisar e retorno em breve.',
  'Obrigado pela informação! Vou dar andamento.',
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
