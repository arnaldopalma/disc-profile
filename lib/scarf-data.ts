// Teste SCARF — modelo de David Rock (neurociência social).
// 5 domínios: Status, Certeza, Autonomia, Relacionamento, Justiça.
// Fonte do teste: planilha do Arnaldo (extraída de scarfsolutions.com/selfassessment).
// Formato: 14 perguntas, 5 opções cada (a-e). Cada opção corresponde a um domínio:
//   a = Status · b = Certeza · c = Autonomia · d = Relacionamento · e = Justiça

export type ScarfDomain = 'status' | 'certeza' | 'autonomia' | 'relacionamento' | 'justica'

export interface ScarfDomainMeta {
  label: string
  en: string
  color: string
  summary: string
  description: string[]
  tip: string
}

export const SCARF_DOMAINS: Record<ScarfDomain, ScarfDomainMeta> = {
  status: {
    label: 'Status',
    en: 'Status',
    color: '#E11D48',
    summary: 'Importância relativa, respeito e senso de pertencimento.',
    description: [
      'Status refere-se à necessidade social de importância comparativa, significado, respeito e estima. Não está diretamente conectado com a posição hierárquica de uma pessoa, mas com a sua percepção e senso de pertencimento aos ambientes e contextos onde vive.',
      'Se o Status é o domínio que mais o impulsiona, você tende a ser competitivo. É provável que continue argumentando para fazer com que sua opinião prevaleça, e fique entediado quando não existem desafios.',
      'A percepção de Status aumenta quando você é desafiado, quando adquire uma nova habilidade, quando recebe apoio do líder para melhorar seu desempenho, e quando aquilo que faz é reconhecido como parte importante dos resultados alcançados.',
    ],
    tip: 'Busque desafios, novas habilidades e reconhecimento pelo seu papel nos resultados.',
  },
  certeza: {
    label: 'Certeza',
    en: 'Certainty',
    color: '#2563EB',
    summary: 'Previsibilidade, clareza e planejamento.',
    description: [
      'A incerteza requer mais energia neural, já que o cérebro registra ambiguidades como um sinal de erro ou tensão, algo que precisa ser corrigido para se sentir confortável novamente. Por isso todos necessitam de certo nível de segurança.',
      'Se você é impulsionado pela Certeza, gosta das coisas bem planejadas, não gosta de surpresas ou mudanças de última hora. Provavelmente tem afinidade com sistemas e processos e costuma se tornar o organizador das atividades.',
      'Fique atento para que a Certeza não limite seu envolvimento com coisas novas (aprender algo diferente, conhecer pessoas e lugares novos). Você pode ficar irritado quando pessoas deixam tudo para o último minuto ou mudam de ideia — lembre-se de que não estão fazendo isso para irritar você.',
    ],
    tip: 'Faça perguntas para esclarecer expectativas; não espere que os outros o procurem.',
  },
  autonomia: {
    label: 'Autonomia',
    en: 'Autonomy',
    color: '#7C3AED',
    summary: 'Senso de controle e liberdade de escolha.',
    description: [
      'Se sua Autonomia é alta, você provavelmente gosta de estar no controle, de ter a "última palavra" e não gosta muito de receber ordens.',
      'A percepção de autonomia está relacionada ao aumento de bem-estar e à melhora do funcionamento cognitivo e da saúde. A sensação de controle sobre aspectos da vida provoca bem-estar tão grande quanto a sensação de prosperidade econômica. Aumentar a responsabilidade sem aumentar a autonomia na mesma proporção é um dos principais fatores de estresse.',
      'Autonomia também se relaciona ao senso de controle sobre os eventos e à percepção de como seu comportamento afeta o resultado de uma situação.',
    ],
    tip: 'Procure atividades que permitam tomar mais decisões, mesmo dentro de parâmetros rígidos.',
  },
  relacionamento: {
    label: 'Relacionamento',
    en: 'Relatedness',
    color: '#059669',
    summary: 'Confiança, pertencimento e conexão com pessoas.',
    description: [
      'Um ambiente colaborativo depende de relacionamentos saudáveis, baseados em confiança e empatia — determinados pelo sentimento de pertencimento aos grupos dos quais fazemos parte. Cada vez que conhece alguém, o cérebro automaticamente o classifica como amigo ou inimigo.',
      'Se o relacionamento é o domínio que mais o define, você provavelmente lembra de coisas sobre as outras pessoas, se esforça para manter as relações sociais e espera que os outros também façam isso. Tem facilidade para se conectar e adora fazer os outros se sentirem especiais.',
      'É possível que você espere mais das pessoas do que elas podem oferecer, e se ofenda quando recusam seus convites para socializar.',
    ],
    tip: 'Procure oportunidades de se conectar; evite trabalhar isolado ou onde conversas não são bem-vindas.',
  },
  justica: {
    label: 'Justiça',
    en: 'Fairness',
    color: '#D97706',
    summary: 'Percepção de trocas e tratamentos justos.',
    description: [
      'A percepção de injustiça gera uma intensa resposta emocional no cérebro (sistema límbico), minando a confiança e aumentando hostilidade e resistência. As pessoas percebem a justiça em termos relativos: sentem-se mais satisfeitas com uma troca justa de recompensa mínima do que com uma troca injusta de recompensa substancial.',
      'A necessidade de justiça é tão forte que muitos se dispõem a lutar por causas que acreditam ser justas, e muitos permanecem numa organização apenas por entenderem que ela busca fazer a coisa certa.',
      'Se você é movido por Justiça, provavelmente não fica triste quando sua opinião é vencida por outra melhor, mas odeia quando alguém trapaceia para ganhar. Pessoas que furam fila o irritam profundamente, e você pode se ver defendendo os outros sem ter sido solicitado.',
    ],
    tip: 'Procure compreender as razões por trás das decisões antes de julgá-las.',
  },
}

export const SCARF_ORDER: ScarfDomain[] = ['status', 'certeza', 'autonomia', 'relacionamento', 'justica']

// Mapeamento fixo por letra (gabarito da planilha)
const LETTER_DOMAIN: Record<string, ScarfDomain> = {
  a: 'status',
  b: 'certeza',
  c: 'autonomia',
  d: 'relacionamento',
  e: 'justica',
}

export interface ScarfOption {
  domain: ScarfDomain
  text: string
}
export interface ScarfQuestion {
  text: string
  options: ScarfOption[] // sempre em ordem a..e (status, certeza, autonomia, relacionamento, justica)
}

function q(text: string, a: string, b: string, c: string, d: string, e: string): ScarfQuestion {
  return {
    text,
    options: [
      { domain: LETTER_DOMAIN.a, text: a },
      { domain: LETTER_DOMAIN.b, text: b },
      { domain: LETTER_DOMAIN.c, text: c },
      { domain: LETTER_DOMAIN.d, text: d },
      { domain: LETTER_DOMAIN.e, text: e },
    ],
  }
}

export const SCARF_QUESTIONS: ScarfQuestion[] = [
  q(
    'Vários membros da equipe da qual você faz parte estão discordando entre si e procuram você para pedir ajuda. Primeiramente, você:',
    'Pensa que seria mais fácil se estivesse no comando, para simplesmente dizer o que eles devem fazer',
    'Esclarece o que eles esperam de você',
    'Tenta resolver o problema sem ter que falar com ninguém',
    'Conversa com cada parte separadamente para ouvir o ponto de vista de cada um',
    'Procura por uma solução que seja satisfatória a todos'
  ),
  q(
    'Alguém está atrasado para a reunião. Qual é a sua reação?',
    'Você sente que foi negligenciado pela pessoa',
    'Você verifica qual era a hora, data e local corretos',
    'Você gostaria de estar com seu laptop, para não perder tempo esperando',
    'Você se pergunta o que pode ter provocado o atraso',
    'Você se irrita porque se esforçou muito para chegar a tempo'
  ),
  q(
    'Você recebeu um feedback negativo do seu líder sobre um projeto importante. Você:',
    'Fica decepcionado consigo por não ter atendido às expectativas do seu líder',
    'Pede mais detalhes sobre o feedback',
    'Decide fazer as coisas do seu jeito nos projetos futuros',
    'Se sente constrangido e evita seu chefe pelo resto da semana',
    'Pensa que o feedback negligenciou os aspectos positivos'
  ),
  q(
    'Um atendente do suporte técnico pede para que você espere na linha. Você:',
    'Fica irritado, pois ele não está dando a atenção devida a você',
    'Fica pensando sobre quanto tempo vai ter que esperar',
    'Usa o tempo para responder e-mails',
    'Sente pena da pessoa que colocou você em espera, ela parecia estressada',
    'Espera pacientemente, já que todos estão no mesmo barco'
  ),
  q(
    'Hoje é o seu primeiro dia como gestor e você está pensando sobre sua nova equipe. A sua primeira reunião é:',
    'Com seu superior, para descobrir o que é importante para a equipe',
    'Com toda a equipe, para esclarecer as expectativas',
    'Com cada membro da equipe, para descobrir como cada um gosta de ser gerenciado',
    'Um almoço descontraído para conhecer as pessoas',
    'Com o RH, para comparar seu salário com o do resto da equipe'
  ),
  q(
    'Você está indo para o aeroporto, onde vai embarcar para um voo internacional. Você:',
    'Chega ao aeroporto pontualmente, o avião não vai decolar sem você',
    'Chega ao aeroporto com muito tempo de sobra, chegar atrasado o estressa',
    'Se preocupa com a falta de opções para filmes e refeições',
    'Espera se sentar ao lado de alguém que seja agradável',
    'Torce para ser transferido para a classe executiva por conta do seu programa de milhas'
  ),
  q(
    'Sua família está pressionando você para passar mais tempo com eles. Você:',
    'Sente-se frustrado, pois eles não entendem o quão ocupado você está',
    'Gostaria de saber como fazê-los felizes',
    'Concorda com eles, desde que você decida o que vão fazer',
    'Sente-se mal por tê-los magoado',
    'Fica irritado com a falta de reconhecimento do seu esforço'
  ),
  q(
    'Você está procurando por um carro novo. Como você decide qual carro comprar?',
    'Não preciso discutir muito, eu já sei qual carro comprar',
    'Leio e comparo as avaliações da indústria',
    'Vou até as maiores concessionárias, onde há uma gama de escolhas ampla',
    'Minha família sempre compra em uma concessionária local; vou comprar lá também',
    'Acho o melhor preço através da internet'
  ),
  q(
    'Você se inscreveu em um novo treinamento. Você está:',
    'Satisfeito por poder melhorar suas qualificações',
    'Nervoso por conta das expectativas que serão postas sobre você',
    'Preocupado, podem pedir para você fazer algo que não o agrada',
    'Animado porque poderá conhecer pessoas novas',
    'Com esperança de que todos se esforcem igualmente'
  ),
  q(
    'Você está levando um velho amigo para jantar. É mais provável que você:',
    'O leve para o novo restaurante da cidade',
    'O leve onde as críticas são relativamente boas',
    'Primeiro descubra qual é a comida preferida do seu amigo para depois decidir onde ir',
    'Vá para o seu restaurante favorito, onde todos se conhecem',
    'Ligue para ele, assim vocês podem decidir juntos'
  ),
  q(
    'Amigos vão passar o final de semana na sua casa. Você:',
    'Preferiria que a viagem fosse na primavera, quando a cidade fica mais linda e as árvores estão floridas',
    'Passa a semana toda planejando o itinerário',
    'Espera ter um tempo para recarregar suas energias durante o final de semana',
    'Espera poder aproveitar bem o tempo com eles',
    'Envia sugestões do que podem fazer, assim eles escolhem as mais interessantes'
  ),
  q(
    'Seu chefe quer sair com você para comemorar o sucesso do último projeto. Você:',
    'Fica feliz por ele reconhecer o seu trabalho duro',
    'Esclarece com seu chefe o que exatamente o agradou',
    'Espera que possa escolher o lugar',
    'Sugere fazer algo com toda a equipe',
    'Acha ótimo que ele gaste um pouco da fortuna dele com você'
  ),
  q(
    'Sua equipe está trabalhando em um projeto importante, porém vocês precisam esperar pela decisão de outros departamentos. Você:',
    'Se estressa com a impressão de que isso vai comprometer a sua credibilidade',
    'Fala com os outros gerentes para saber mais detalhes',
    'Sente-se prejudicado por conta de toda essa burocracia',
    'Pensa no impacto que isso vai gerar na moral da sua equipe',
    'Gostaria que os outros entendessem o quanto isso prejudica sua equipe'
  ),
  q(
    'Está difícil conectar-se com alguns jovens da sua equipe. Você:',
    'Diz a eles que devem respeitá-lo, pois você é o gerente deles',
    'Fala com outros gerentes para descobrir o que funcionou para eles',
    'Lê artigos na internet à procura de coisas que possam ser implementadas',
    'Chama-os para um almoço, assim você pode melhorar a conexão com eles',
    'Pergunta a eles como você pode trabalhar esse problema'
  ),
]

export type ScarfScores = Record<ScarfDomain, number>

// answers: índice da pergunta (string) -> domínio escolhido
export function calculateScarfScores(answers: Record<string, ScarfDomain>): ScarfScores {
  const scores: ScarfScores = { status: 0, certeza: 0, autonomia: 0, relacionamento: 0, justica: 0 }
  for (const d of Object.values(answers)) {
    if (d in scores) scores[d] += 1
  }
  return scores
}

// Ranking dos domínios do maior para o menor
export function rankScarf(scores: ScarfScores): ScarfDomain[] {
  return [...SCARF_ORDER].sort((a, b) => scores[b] - scores[a])
}

export const SCARF_TOTAL = SCARF_QUESTIONS.length // 14
