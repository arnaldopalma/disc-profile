// Teste de Pontos Fortes — baseado nos 34 talentos do Clifton StrengthsFinder (Gallup).
// Formato: escolha forçada entre pares de afirmações (estilo Gallup).
// As afirmações em 1ª pessoa são originais (pt-BR), inspiradas nas descrições dos 34 talentos.

export type StrengthDomain = 'execucao' | 'influencia' | 'relacionamento' | 'estrategico'

export interface DomainMeta {
  label: string
  short: string
  color: string
}

export const DOMAINS: Record<StrengthDomain, DomainMeta> = {
  execucao: { label: 'Persistência & Execução', short: 'Execução', color: '#7C3AED' },
  influencia: { label: 'Influenciar Pessoas', short: 'Influência', color: '#F59E0B' },
  relacionamento: { label: 'Relacionar-se com Pessoas', short: 'Relacionamento', color: '#10B981' },
  estrategico: { label: 'Pensamento Estratégico', short: 'Estratégico', color: '#3B82F6' },
}

export const DOMAIN_ORDER: StrengthDomain[] = ['execucao', 'influencia', 'relacionamento', 'estrategico']

export interface Strength {
  id: string
  name: string
  domain: StrengthDomain
  description: string
  statements: string[]
  apply?: string
  watch?: string
}

export const STRENGTHS: Strength[] = [
  // ── PERSISTÊNCIA & EXECUÇÃO ──
  {
    id: 'responsabilidade',
    name: 'Responsabilidade',
    domain: 'execucao',
    description:
      'Assume um compromisso psicológico de cumprir o que promete. É comprometido com valores estáveis como honestidade e lealdade.',
    statements: [
      'Quando assumo um compromisso, cumpro até o fim, custe o que custar.',
      'As pessoas confiam em mim porque faço o que prometo.',
      'Levo a honestidade e a lealdade muito a sério.',
    ],
  },
  {
    id: 'realizacao',
    name: 'Realização',
    domain: 'execucao',
    description:
      'Tem grande perseverança e capacidade de trabalho. Sente satisfação em estar ocupado e produtivo.',
    statements: [
      'Sinto satisfação em estar sempre ocupado e produtivo.',
      'Tenho muita energia e disposição para trabalhar duro.',
      'No fim do dia, preciso sentir que produzi algo concreto.',
    ],
  },
  {
    id: 'foco',
    name: 'Foco',
    domain: 'execucao',
    description:
      'Escolhe uma direção e a segue, fazendo as correções necessárias para manter o curso. Define prioridades e age.',
    statements: [
      'Defino prioridades claras e sigo na direção escolhida.',
      'Consigo dizer não ao que me desvia do meu objetivo.',
      'Faço correções de rota sem perder o alvo de vista.',
    ],
  },
  {
    id: 'prudencia',
    name: 'Prudência',
    domain: 'execucao',
    description:
      'Tem grande cuidado ao tomar decisões ou fazer escolhas. Antecipa os obstáculos.',
    statements: [
      'Penso bem antes de decidir e antecipo os riscos.',
      'Sou cuidadoso nas escolhas que faço.',
      'Prefiro avaliar os obstáculos antes de agir.',
    ],
  },
  {
    id: 'imparcialidade',
    name: 'Imparcialidade',
    domain: 'execucao',
    description:
      'Tem consciência aguda da necessidade de tratar todas as pessoas da mesma maneira, com regras claras.',
    statements: [
      'Acho importante tratar todas as pessoas com as mesmas regras.',
      'Defendo regras claras e iguais para todos.',
      'Não gosto de privilégios ou exceções injustas.',
    ],
  },
  {
    id: 'crenca',
    name: 'Crença',
    domain: 'execucao',
    description:
      'Tem valores fundamentais inalteráveis, dos quais emerge um propósito definido para a vida.',
    statements: [
      'Tenho valores fundamentais que guiam tudo o que faço.',
      'Minha vida tem um propósito definido por aquilo em que acredito.',
      'Não abro mão daquilo que considero certo.',
    ],
  },
  {
    id: 'organizacao',
    name: 'Organização',
    domain: 'execucao',
    description:
      'Sabe organizar com flexibilidade, descobrindo como pessoas e recursos se combinam para o máximo de produtividade.',
    statements: [
      'Gosto de arranjar pessoas e recursos para render o máximo.',
      'Coordeno muitas peças ao mesmo tempo com flexibilidade.',
      'Encontro o melhor jeito de encaixar tudo para funcionar.',
    ],
  },
  {
    id: 'disciplina',
    name: 'Disciplina',
    domain: 'execucao',
    description: 'Aprecia rotina e estrutura. Seu mundo é descrito pela ordem que cria.',
    statements: [
      'Aprecio rotina, ordem e estrutura no meu dia.',
      'Crio sistemas e prazos para manter tudo sob controle.',
      'Trabalho melhor quando o ambiente é organizado.',
    ],
  },
  {
    id: 'restauracao',
    name: 'Restauração',
    domain: 'execucao',
    description: 'É hábil em lidar com problemas: descobre o que está errado e resolve.',
    statements: [
      'Gosto de identificar o que está errado e consertar.',
      'Sou bom em resolver problemas que travam os outros.',
      'Diante de uma falha, parto logo para a solução.',
    ],
  },

  // ── INFLUENCIAR PESSOAS ──
  {
    id: 'comando',
    name: 'Comando',
    domain: 'influencia',
    description: 'Tem presença. Assume o controle de uma situação e toma decisões.',
    statements: [
      'Assumo o controle quando a situação precisa de direção.',
      'Não tenho medo de tomar decisões difíceis e dizer o que penso.',
      'Tenho presença e as pessoas costumam me seguir.',
    ],
  },
  {
    id: 'competicao',
    name: 'Competição',
    domain: 'influencia',
    description:
      'Mede seu progresso comparando-o ao desempenho dos outros. Esforça-se para conquistar o primeiro lugar.',
    statements: [
      'Meço meu progresso comparando com o desempenho dos outros.',
      'Adoro competir e quero sempre o primeiro lugar.',
      'Vencer me motiva mais do que apenas participar.',
    ],
  },
  {
    id: 'significancia',
    name: 'Significância',
    domain: 'influencia',
    description: 'Gosta de ser visto como importante. É independente e deseja ser reconhecido.',
    statements: [
      'Quero que meu trabalho seja reconhecido como importante.',
      'Busco deixar uma marca e ser visto pelos outros.',
      'Tenho necessidade de me destacar e ser independente.',
    ],
  },
  {
    id: 'excelencia',
    name: 'Maximizador',
    domain: 'influencia',
    description:
      'Concentra-se nos pontos fortes para estimular a excelência. Busca transformar algo muito bom em algo soberbo.',
    statements: [
      'Prefiro transformar algo bom em algo excepcional.',
      'Foco nos pontos fortes para chegar à excelência.',
      'Não me contento com o suficiente; quero o melhor.',
    ],
  },
  {
    id: 'comunicacao',
    name: 'Comunicação',
    domain: 'influencia',
    description: 'Coloca suas ideias em palavras com facilidade. Tem boas conversas e é bom apresentador.',
    statements: [
      'Tenho facilidade para colocar minhas ideias em palavras.',
      'Gosto de apresentar, contar histórias e prender a atenção.',
      'Sei explicar as coisas de um jeito que envolve as pessoas.',
    ],
  },
  {
    id: 'ativacao',
    name: 'Ativação',
    domain: 'influencia',
    description: 'Gosta de fazer as coisas acontecerem, transformando ideias em ações. É frequentemente impaciente.',
    statements: [
      'Gosto de transformar ideias em ação rapidamente.',
      'Fico impaciente quando as coisas demoram a sair do papel.',
      'Prefiro começar logo e ajustar no caminho.',
    ],
  },
  {
    id: 'carisma',
    name: 'Carisma',
    domain: 'influencia',
    description: 'Adora conhecer pessoas novas e conquistá-las. Sente satisfação em quebrar o gelo.',
    statements: [
      'Adoro conhecer pessoas novas e conquistá-las.',
      'Quebrar o gelo com estranhos é fácil e prazeroso para mim.',
      'Faço contato com gente nova com naturalidade.',
    ],
  },
  {
    id: 'auto-afirmacao',
    name: 'Autoconfiança',
    domain: 'influencia',
    description:
      'Sente-se confiante para administrar a própria vida. Tem uma bússola interna que dá confiança em suas decisões.',
    statements: [
      'Tenho confiança na minha capacidade de tocar minha vida.',
      'Confio no meu julgamento para tomar decisões.',
      'Sinto que tenho uma bússola interna que me orienta.',
    ],
  },

  // ── RELACIONAR-SE COM PESSOAS ──
  {
    id: 'relacionamento',
    name: 'Relacionamento',
    domain: 'relacionamento',
    description: 'Prefere relacionamentos íntimos. Sente satisfação em ajudar amigos a conquistar objetivos.',
    statements: [
      'Valorizo relações próximas e profundas com poucas pessoas.',
      'Sinto satisfação em ajudar meus amigos a vencer.',
      'Prefiro aprofundar laços a ter muitos conhecidos.',
    ],
  },
  {
    id: 'individualizacao',
    name: 'Individualização',
    domain: 'relacionamento',
    description:
      'Tem curiosidade sobre as qualidades únicas de cada pessoa e como elas podem trabalhar juntas produtivamente.',
    statements: [
      'Tenho curiosidade sobre o que torna cada pessoa única.',
      'Percebo como pessoas diferentes podem se complementar.',
      'Reparo nas qualidades particulares de cada um.',
    ],
  },
  {
    id: 'empatia',
    name: 'Empatia',
    domain: 'relacionamento',
    description: 'Percebe as emoções dos outros, colocando-se na pele e na situação alheia.',
    statements: [
      'Percebo facilmente as emoções das pessoas ao redor.',
      'Consigo me colocar no lugar do outro.',
      'Sinto o que os outros sentem, quase como se fosse comigo.',
    ],
  },
  {
    id: 'adaptabilidade',
    name: 'Adaptabilidade',
    domain: 'relacionamento',
    description: 'Prefere "ir com a maré". Centrado no agora, aceita as coisas como vêm.',
    statements: [
      'Prefiro ir com a maré e lidar com as coisas como elas vêm.',
      'Vivo bem o presente, um dia de cada vez.',
      'Mudanças de planos não me incomodam.',
    ],
  },
  {
    id: 'conexao',
    name: 'Conexão',
    domain: 'relacionamento',
    description: 'Acredita nas relações entre todas as coisas e que há uma razão para tudo o que acontece.',
    statements: [
      'Acredito que existe uma razão para tudo o que acontece.',
      'Vejo ligações entre todas as coisas.',
      'Sinto que fazemos parte de algo maior.',
    ],
  },
  {
    id: 'desenvolvimento',
    name: 'Desenvolvimento',
    domain: 'relacionamento',
    description: 'Reconhece e cultiva o potencial dos outros. Tem satisfação com cada pequena melhoria.',
    statements: [
      'Tenho satisfação em ver as pessoas evoluírem.',
      'Percebo o potencial dos outros e gosto de cultivá-lo.',
      'Comemoro cada pequeno progresso de quem ajudo.',
    ],
  },
  {
    id: 'positivo',
    name: 'Positivo',
    domain: 'relacionamento',
    description: 'Tem entusiasmo contagiante. É alegre e estimula os outros.',
    statements: [
      'Tenho um entusiasmo que costuma contagiar os outros.',
      'Sou alegre e animo as pessoas ao redor.',
      'Enxergo o lado bom das situações.',
    ],
  },
  {
    id: 'inclusao',
    name: 'Inclusão',
    domain: 'relacionamento',
    description: 'Aceita bem os outros. Importa-se com quem se sente excluído e se esforça para incluir.',
    statements: [
      'Me importo com quem está se sentindo de fora.',
      'Faço questão de incluir todo mundo.',
      'Aceito bem as pessoas como elas são.',
    ],
  },
  {
    id: 'harmonia',
    name: 'Harmonia',
    domain: 'relacionamento',
    description: 'Procura consenso. Não gosta de conflitos; busca pontos de concordância.',
    statements: [
      'Procuro consenso e evito conflitos.',
      'Busco os pontos em comum entre as pessoas.',
      'Prefiro acordo a discussão.',
    ],
  },

  // ── PENSAMENTO ESTRATÉGICO ──
  {
    id: 'pensamento-estrategico',
    name: 'Pensamento Estratégico',
    domain: 'estrategico',
    description:
      'Cria maneiras alternativas de agir. Detecta rapidamente padrões e as questões importantes de qualquer cenário.',
    statements: [
      'Diante de um cenário, enxergo rápido os caminhos possíveis.',
      'Detecto padrões e o que realmente importa numa situação.',
      'Crio alternativas de ação com facilidade.',
    ],
  },
  {
    id: 'ideativo',
    name: 'Ideação',
    domain: 'estrategico',
    description: 'É fascinado por ideias. Descobre conexões entre fenômenos aparentemente não relacionados.',
    statements: [
      'Sou fascinado por ideias e conceitos.',
      'Encontro conexões entre coisas aparentemente sem relação.',
      'Adoro o momento em que uma ideia nova surge.',
    ],
  },
  {
    id: 'input',
    name: 'Input',
    domain: 'estrategico',
    description: 'Tem desejo ardente de saber mais. Gosta de coletar e arquivar todo tipo de informação.',
    statements: [
      'Tenho um desejo constante de saber mais.',
      'Gosto de coletar e guardar informações de todo tipo.',
      'Sou curioso e acumulo conhecimento útil.',
    ],
  },
  {
    id: 'inteleccao',
    name: 'Intelecção',
    domain: 'estrategico',
    description: 'Caracterizado pela atividade intelectual. É introspectivo e aprecia discussões profundas.',
    statements: [
      'Gosto de pensar a fundo e refletir sozinho.',
      'Aprecio discussões intelectuais e profundas.',
      'Minha atividade mental quase nunca para.',
    ],
  },
  {
    id: 'futurista',
    name: 'Futurista',
    domain: 'estrategico',
    description: 'É inspirado pelo futuro e pelo que ele pode ser. Inspira os outros com suas visões.',
    statements: [
      'Me inspiro no que o futuro pode ser.',
      'Gosto de imaginar e descrever o que vem por aí.',
      'Minhas visões de futuro animam as pessoas.',
    ],
  },
  {
    id: 'analitico',
    name: 'Analítico',
    domain: 'estrategico',
    description: 'Procura razões e causas. Pensa sobre todos os fatores que podem afetar uma situação.',
    statements: [
      'Procuro as causas e as razões por trás das coisas.',
      'Gosto de examinar todos os fatores antes de concluir.',
      'Questiono com dados: "prove para mim".',
    ],
  },
  {
    id: 'estudioso',
    name: 'Estudioso',
    domain: 'estrategico',
    description:
      'Tem grande desejo de aprender e aprimorar-se. É motivado pelo processo de aprendizagem em si.',
    statements: [
      'Tenho grande prazer em aprender continuamente.',
      'O processo de aprender me motiva mais que o resultado.',
      'Gosto de me aprimorar em novos assuntos.',
    ],
  },
  {
    id: 'contexto',
    name: 'Contexto',
    domain: 'estrategico',
    description: 'Gosta de pensar no passado. Entende o presente estudando sua história.',
    statements: [
      'Entendo o presente estudando a história das coisas.',
      'Gosto de olhar para o passado para compreender o agora.',
      'Buscar a origem de algo me ajuda a decidir.',
    ],
  },
]

// Como aplicar (uso prático) e ponto de atenção (a "sombra" do talento) — por talento.
const EXTRA: Record<string, { apply: string; watch: string }> = {
  responsabilidade: {
    apply: 'Assuma os compromissos visíveis e críticos — você vira a pessoa em quem todos confiam para entregar.',
    watch: 'Aprenda a dizer "não": seu senso de dever pode te sobrecarregar.',
  },
  realizacao: {
    apply: 'Defina metas diárias concretas; sua energia rende mais com uma lista para vencer.',
    watch: 'Nem tudo precisa de produtividade — reserve tempo para descansar sem culpa.',
  },
  foco: {
    apply: 'Use sua clareza de prioridades para manter equipes no rumo e cortar distrações.',
    watch: 'Cuidado com a rigidez: às vezes vale ouvir desvios que trazem boas ideias.',
  },
  prudencia: {
    apply: 'Coloque-se onde decisões exigem cautela e avaliação de risco.',
    watch: 'Não deixe a análise virar paralisia; nem toda escolha pede tanta deliberação.',
  },
  imparcialidade: {
    apply: 'Crie regras e processos claros que garantam tratamento justo a todos.',
    watch: 'Pessoas e situações têm exceções legítimas — flexibilize quando for justo.',
  },
  crenca: {
    apply: 'Busque trabalho alinhado aos seus valores; é onde você dá o seu melhor.',
    watch: 'Lembre-se de que outros têm valores diferentes, igualmente válidos.',
  },
  organizacao: {
    apply: 'Assuma projetos com muitas variáveis — você brilha coordenando pessoas e recursos.',
    watch: 'Nem todos acompanham seu ritmo de rearranjo; comunique as mudanças.',
  },
  disciplina: {
    apply: 'Estruture rotinas e prazos; você entrega com consistência onde há ordem.',
    watch: 'Ambientes caóticos te incomodam — desenvolva tolerância ao imprevisto.',
  },
  restauracao: {
    apply: 'Vá para onde há problemas a resolver; você energiza ao consertar o que travou.',
    watch: 'Não foque só no que está errado — reconheça também o que já vai bem.',
  },
  comando: {
    apply: 'Busque papéis que exijam decisões firmes e clareza sob pressão.',
    watch: 'Sua franqueza pode intimidar — calibre o tom com quem é mais sensível.',
  },
  competicao: {
    apply: 'Procure ambientes com placar e metas; a comparação te impulsiona.',
    watch: 'Nem tudo é competição; cuide para não desvalorizar quem coopera.',
  },
  significancia: {
    apply: 'Persiga projetos de impacto visível e que deixem a sua marca.',
    watch: 'Reconhecimento externo é bom, mas não deixe ele definir o seu valor.',
  },
  excelencia: {
    apply: 'Invista no que já é bom para torná-lo excepcional, em vez de só consertar fraquezas.',
    watch: 'Padrões altos podem frustrar — aceite que nem tudo precisa ser soberbo.',
  },
  comunicacao: {
    apply: 'Assuma apresentações, narrativas e o papel de dar voz às ideias do grupo.',
    watch: 'Ouça tanto quanto fala; deixe espaço para os mais quietos.',
  },
  ativacao: {
    apply: 'Seja o motor que tira ideias do papel e cria movimento.',
    watch: 'Pressa demais gera erros; às vezes vale planejar antes de agir.',
  },
  carisma: {
    apply: 'Use sua facilidade social para abrir portas e conectar pessoas novas.',
    watch: 'Aprofunde alguns laços — nem toda relação precisa ser ampla e rápida.',
  },
  'auto-afirmacao': {
    apply: 'Confie no seu julgamento em decisões incertas; sua segurança acalma o grupo.',
    watch: 'Excesso de confiança fecha ouvidos — busque dados e opiniões contrárias.',
  },
  relacionamento: {
    apply: 'Invista em poucas relações profundas; é onde você gera mais valor.',
    watch: 'Abra espaço para novas pessoas além do seu círculo próximo.',
  },
  individualizacao: {
    apply: 'Monte times aproveitando o que cada pessoa tem de único.',
    watch: 'Cuidado para não criar exceções demais que confundam o grupo.',
  },
  empatia: {
    apply: 'Use sua leitura emocional para mediar conflitos e dar feedback humano.',
    watch: 'Não absorva as emoções dos outros a ponto de se esgotar.',
  },
  adaptabilidade: {
    apply: 'Vá para ambientes dinâmicos onde reagir bem ao imprevisto é valioso.',
    watch: 'Estruture algumas metas de longo prazo; viver só o agora pode dispersar.',
  },
  conexao: {
    apply: 'Ajude o time a enxergar o propósito maior por trás das tarefas.',
    watch: 'Nem tudo tem um significado oculto — alguns fatos são só acaso.',
  },
  desenvolvimento: {
    apply: 'Assuma mentoria e formação de pessoas; você floresce vendo os outros crescer.',
    watch: 'Invista onde há real potencial; nem todos querem ser desenvolvidos.',
  },
  positivo: {
    apply: 'Leve energia e ânimo aos times, especialmente em momentos difíceis.',
    watch: 'Reconheça os problemas reais; otimismo não pode virar negação.',
  },
  inclusao: {
    apply: 'Garanta que ninguém fique de fora — você cria pertencimento.',
    watch: 'Incluir todos pode atrasar decisões; saiba quando fechar o grupo.',
  },
  harmonia: {
    apply: 'Atue como ponte para gerar consenso e reduzir atritos.',
    watch: 'Evitar todo conflito esconde divergências úteis; deixe-as aparecer.',
  },
  'pensamento-estrategico': {
    apply: 'Seja chamado para traçar caminhos e antecipar cenários.',
    watch: 'Comunique o raciocínio; o que é óbvio para você não é para os outros.',
  },
  ideativo: {
    apply: 'Gere opções e conexões novas em sessões de brainstorm.',
    watch: 'Nem toda ideia precisa virar projeto; ajude a priorizar e executar.',
  },
  input: {
    apply: 'Vire a fonte de informação e referência do time.',
    watch: 'Coletar não basta — transforme conhecimento em ação.',
  },
  inteleccao: {
    apply: 'Reserve tempo para pensar a fundo antes de decidir.',
    watch: 'Não fique só na reflexão; converta o pensamento em entrega.',
  },
  futurista: {
    apply: 'Inspire as pessoas pintando aonde podemos chegar.',
    watch: 'Conecte a visão ao presente; futuro sem passos vira só sonho.',
  },
  analitico: {
    apply: 'Seja a checagem de realidade do time, com dados e causas.',
    watch: 'Excesso de análise pode travar; nem tudo exige prova completa.',
  },
  estudioso: {
    apply: 'Busque papéis com aprendizado contínuo e novos domínios.',
    watch: 'Aprender não é o fim — aplique o que você estuda.',
  },
  contexto: {
    apply: 'Use a história e os precedentes para iluminar decisões atuais.',
    watch: 'O passado informa, mas não engessa; o contexto muda.',
  },
}

for (const s of STRENGTHS) {
  const e = EXTRA[s.id]
  if (e) {
    s.apply = e.apply
    s.watch = e.watch
  }
}

export const STRENGTH_BY_ID: Record<string, Strength> = Object.fromEntries(
  STRENGTHS.map((s) => [s.id, s])
)

// Quantas vezes cada talento aparece no teste (= número de "rodadas" do round-robin).
export const ROUNDS = 5

export interface PairItem {
  id: string
  text: string
}
export interface TestPair {
  a: PairItem
  b: PairItem
}

// Gera os pares de forma determinística (mesmo teste para todos, reprodutível no servidor).
// Usa o "método do círculo" do round-robin: a cada rodada todos os 34 talentos aparecem
// exatamente uma vez, contra um oponente diferente. ROUNDS rodadas => cada talento aparece
// ROUNDS vezes, sempre contra talentos distintos.
function buildPairs(): TestPair[] {
  const ids = STRENGTHS.map((s) => s.id)
  const n = ids.length // 34 (par)
  const pairs: TestPair[] = []
  const seen: Record<string, number> = {} // quantas vezes cada talento já apareceu (p/ rotacionar afirmações)

  let arr = Array.from({ length: n }, (_, i) => i)

  function pick(id: string): PairItem {
    const s = STRENGTH_BY_ID[id]
    const count = seen[id] ?? 0
    seen[id] = count + 1
    return { id, text: s.statements[count % s.statements.length] }
  }

  for (let r = 0; r < ROUNDS; r++) {
    for (let i = 0; i < n / 2; i++) {
      const idA = ids[arr[i]]
      const idB = ids[arr[n - 1 - i]]
      // alterna o lado (a/b) para o talento não ficar sempre na mesma coluna
      if ((r + i) % 2 === 0) {
        pairs.push({ a: pick(idA), b: pick(idB) })
      } else {
        pairs.push({ a: pick(idB), b: pick(idA) })
      }
    }
    // rotaciona mantendo o primeiro elemento fixo
    const fixed = arr[0]
    const rest = arr.slice(1)
    rest.unshift(rest.pop() as number)
    arr = [fixed, ...rest]
  }

  return pairs
}

export const TEST_PAIRS: TestPair[] = buildPairs()

export type StrengthScores = Record<string, number>

// answers: índice do par (string) -> id do talento escolhido
export function calculateStrengthScores(answers: Record<string, string>): StrengthScores {
  const scores: StrengthScores = {}
  for (const s of STRENGTHS) scores[s.id] = 0
  for (const chosen of Object.values(answers)) {
    if (chosen in scores) scores[chosen] += 1
  }
  return scores
}

export function getTop5(scores: StrengthScores): string[] {
  return [...STRENGTHS]
    .sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))
    .slice(0, 5)
    .map((s) => s.id)
}

export function getDomainScores(scores: StrengthScores): Record<StrengthDomain, number> {
  const out: Record<StrengthDomain, number> = {
    execucao: 0,
    influencia: 0,
    relacionamento: 0,
    estrategico: 0,
  }
  for (const s of STRENGTHS) out[s.domain] += scores[s.id] ?? 0
  return out
}

export const TOTAL_POINTS = TEST_PAIRS.length // 85 — 1 ponto por par
