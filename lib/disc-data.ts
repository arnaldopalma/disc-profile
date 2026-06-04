export type DiscType = 'D' | 'I' | 'S' | 'C'

export interface Characteristic {
  name: string
  type: DiscType
}

export const CHARACTERISTICS: Characteristic[] = [
  { name: 'Analítico', type: 'C' },
  { name: 'Emotivo', type: 'I' },
  { name: 'Equilibrado', type: 'S' },
  { name: 'Confiante em si', type: 'D' },
  { name: 'Fácil de conviver', type: 'S' },
  { name: 'Desafiador', type: 'D' },
  { name: 'Paciente', type: 'S' },
  { name: 'Experimentador', type: 'D' },
  { name: 'Incansável', type: 'D' },
  { name: 'Sincero', type: 'S' },
  { name: 'Assertivo', type: 'D' },
  { name: 'Consistente', type: 'C' },
  { name: 'Competitivo', type: 'D' },
  { name: 'Falador', type: 'I' },
  { name: 'Decisivo', type: 'D' },
  { name: 'Modesto', type: 'S' },
  { name: 'Educado', type: 'C' },
  { name: 'Persuasivo', type: 'I' },
  { name: 'Perfeccionista', type: 'C' },
  { name: 'Preciso', type: 'C' },
  { name: 'Acomodado', type: 'S' },
  { name: 'Aventureiro', type: 'D' },
  { name: 'Contestador', type: 'C' },
  { name: 'Contido', type: 'C' },
  { name: 'Cuidadoso', type: 'C' },
  { name: 'Influente', type: 'I' },
  { name: 'Direcionado', type: 'D' },
  { name: 'Lógico', type: 'C' },
  { name: 'Sedutor', type: 'I' },
  { name: 'Rigoroso', type: 'D' },
  { name: 'Aberto', type: 'I' },
  { name: 'Deliberado', type: 'S' },
  { name: 'Entusiasmado', type: 'I' },
  { name: 'Estável', type: 'S' },
  { name: 'Impulsivo', type: 'I' },
  { name: 'Curioso', type: 'C' },
  { name: 'Otimista', type: 'I' },
  { name: 'Previsível', type: 'S' },
  { name: 'Protetor', type: 'S' },
  { name: 'Sensível', type: 'I' },
]

export interface DiscScores {
  D: number
  I: number
  S: number
  C: number
}

export function calculateScores(answers: Record<string, number>): DiscScores {
  const scores: DiscScores = { D: 0, I: 0, S: 0, C: 0 }
  for (const char of CHARACTERISTICS) {
    const score = answers[char.name] || 0
    scores[char.type] += score
  }
  return scores
}

export function scoreToPercent(score: number): number {
  return Math.round((score / 40) * 100)
}

export function determineProfile(scores: DiscScores): string {
  const HIGH_THRESHOLD = 20
  const types: DiscType[] = ['D', 'I', 'S', 'C']
  const highTypes = types.filter(t => scores[t] >= HIGH_THRESHOLD)

  if (highTypes.length === 0) {
    const top = types.sort((a, b) => scores[b] - scores[a])[0]
    return top
  }

  if (highTypes.length === 4) {
    const sorted = highTypes.sort((a, b) => scores[b] - scores[a])
    return sorted.slice(0, 3).join('_')
  }

  return highTypes.join('_')
}

export interface ProfileDescription {
  title: string
  label: string
  summary: string
  relating: string
  skills: string
  motivation: string
  subtraits: string
  styleCard: string
}

export const PROFILE_DESCRIPTIONS: Record<string, ProfileDescription> = {
  D: {
    title: 'Alto Dominância',
    label: 'Autocrata',
    summary:
      'Altamente assertivo, competitivo e ambicioso. Tem grande necessidade de realizar e frequentemente é dinâmico e adaptável, mostrando determinação e capacidade de liderança direta.',
    relating:
      'Pode tratar outras pessoas como um meio para atingir seus objetivos. Tende a não dar grande importância aos sentimentos, seus ou dos outros. O lado competitivo pode gerar desafios e oposição em todos os lugares.',
    skills:
      'Tomador de decisão competente e confiante, capaz de chegar rapidamente a conclusões com informações mínimas. Proficiente ao lidar com situações estressantes — prazer de sucesso contra as probabilidades.',
    motivation:
      'Gosta de sentir que está no controle e busca oportunidades para reforçar seu poder pessoal. Mede progresso por conquistas e sucessos. Detesta depender de outras pessoas.',
    subtraits: 'Determinação, Automotivação e Independência.',
    styleCard: 'Assertivo e Controlado — estilo Impulsionador.',
  },
  I: {
    title: 'Alta Influência',
    label: 'Comunicador',
    summary:
      'Confiante, extrovertido e sociável. Valoriza o contato com outras pessoas e o desenvolvimento de relações positivas. Comunica-se de forma fácil e fluente.',
    relating:
      'Está aberto e confiante em suas habilidades sociais. Seu interesse genuíno nas ideias e sentimentos dos outros é frequentemente considerado encantador.',
    skills:
      'Forte comunicador com assertividade para defender um ponto de vista, além de qualidades intuitivas para entender as perspectivas dos outros e se adaptar a novas situações.',
    motivation:
      'Motivado pelas relações com os outros. Precisa se sentir aceito e reage mal à rejeição. Elogio e aprovação causam forte impressão. Laços próximos formam seu "Grupo de Influência".',
    subtraits: 'Sociabilidade, Entusiasmo e Autoconfiança.',
    styleCard: 'Assertivo e Aberto — estilo Comunicador.',
  },
  S: {
    title: 'Alta Estabilidade',
    label: 'Planejador',
    summary:
      'Paciente, calmo e amigável. Simpático aos pontos de vista dos outros e valoriza a interação positiva. Não é extrovertido por natureza e depende de outros mais assertivos para assumir a liderança.',
    relating:
      'Procura pessoas mais assertivas para iniciar relacionamentos. Seu círculo de amigos é geralmente pequeno, mas muito unido.',
    skills:
      'Confiável e leal, com alfabetização emocional para ser ouvinte e conselheiro eficaz. Persistente — trabalha de forma constante em uma tarefa até concluí-la.',
    motivation:
      'Precisa sentir apoio daqueles ao redor e tempo para se adaptar a novas situações. Tem antipatia inerente à mudança. Interrupções em tarefas são particularmente desmotivadoras.',
    subtraits: 'Paciência, Consideração e Persistência.',
    styleCard: 'Receptivo e Aberto — estilo Planejador.',
  },
  C: {
    title: 'Alta Conformidade',
    label: 'Analista',
    summary:
      'Por natureza não-assertivo, cauteloso e frequentemente reticente. Pode dar impressão de frieza ou desinteresse. Frequentemente surpreendentemente ambicioso, com metas elevadas, mas usa estruturas e regras para atingir objetivos.',
    relating:
      'Dificuldade em formar ou manter relacionamentos íntimos. Amizades normalmente baseadas em interesses mútuos ou objetivos comuns, em vez de considerações emocionais.',
    skills:
      'Autoconfiante, com pensamento estruturado e pontos fortes em organização de fatos, trabalho com detalhes precisos ou sistemas sofisticados.',
    motivation:
      'Certeza acima de tudo. Precisa se sentir completamente seguro de sua posição antes de prosseguir. Forte aversão ao risco — raramente age sem sentir-se absolutamente seguro.',
    subtraits: 'Cooperação, Exatidão e Sensibilidade.',
    styleCard: 'Receptivo e Controlado — estilo Analista.',
  },
  D_I: {
    title: 'Alto Dominância e Influência',
    label: 'Assertivo (Z Preguiçoso)',
    summary:
      'Altamente assertivo, capaz tanto de ação direta e dinâmica quanto de sociabilidade charmosa. Tem objetivos claros com determinação e comprometimento para alcançá-los. Busca ser tanto respeitado quanto genuinamente amado.',
    relating:
      'Fortes habilidades sociais e estilo de comunicação persuasivo. Capaz de grande charme, mas pode adotar abordagem mais exigente sob pressão. Não tem medo de confronto.',
    skills:
      'Prospera em situações que outros acham impossíveis. Disposto a realizar quase qualquer tarefa para alcançar sucesso ou reconhecimento. Ideal clássico para vendas diretas.',
    motivation:
      'Sucesso e reconhecimento. A estagnação é um anátema — precisa estabelecer metas e ambições elevadas.',
    subtraits: 'Automotivação, Independência, Entusiasmo e Autoconfiança.',
    styleCard: 'Intermediário entre Impulsionador e Comunicador — estilo Assertivo.',
  },
  D_S: {
    title: 'Alto Dominância e Estabilidade',
    label: 'Determinado',
    summary:
      'Combinação incomum — representa um estilo único e prático. Seguirá uma linha de ação até o fim, com concentração e determinação. O lado mais cauteloso aparece em condições favoráveis; o aspecto mais urgente emerge sob pressão.',
    relating:
      'Adapta seu estilo social à situação, mostrando um lado mais amistoso quando pode confiar nas pessoas ao redor.',
    skills:
      'Individual que segue uma linha de ação até o fim, utilizando concentração e determinação. Valoriza planejamento cuidadoso.',
    motivation:
      'Controle e poder (Dominância) combinados com certeza e evitar mudanças (Estabilidade). Prefere exercer autoridade para preservar o status quo.',
    subtraits: 'Determinação, Independência, Consideração e Persistência.',
    styleCard: 'Estilo diametralmente oposto — não pode ser analisado em termos de cartão.',
  },
  D_C: {
    title: 'Alto Dominância e Conformidade',
    label: 'Controlado',
    summary:
      'Perfil em forma de "U". Indivíduo altamente formal e estruturado com estilo contundente. Acredita em acertar as coisas e raramente tem medo de expressar sua mente de forma robusta e direta.',
    relating:
      'Relacionar-se com outros (especialmente em nível pessoal) não é alta prioridade. Quando a comunicação é essencial, tende a ser breve e sucinta. Bastante desconfiado dos outros.',
    skills:
      'Motivado pela realização e eficiência, modulado por interesse em detalhes e precisão. Tendência a corrigir erros dos outros que muitos considerariam triviais.',
    motivation:
      'Desejo de realização pessoal e sucesso, aliado ao prazer de concluir tarefas com precisão e eficiência.',
    subtraits: 'Determinação, Automotivação, Exatidão e Sensibilidade.',
    styleCard: 'Intermediário entre Impulsionador e Analista — estilo Controlado.',
  },
  I_S: {
    title: 'Alta Influência e Estabilidade',
    label: 'Conselheiro',
    summary:
      'Orientado para assuntos pessoais e compreensão de outras pessoas. Confiante, caloroso e amigável, mas também capaz de dar ouvidos simpáticos e ajudar com problemas alheios.',
    relating:
      'Dos mais eficazes em se relacionar com pessoas em geral. Socializa facilmente e é capaz de adotar abordagem mais aberta e relaxada quando a situação exige.',
    skills:
      'Habilidades em comunicação e compreensão. Cumpre papéis de apoio com empatia, mas o lado extrovertido permite operar efetivamente em sentido social ou persuasivo.',
    motivation:
      'Evita antagonismo, rejeição e confrontação. Precisa sentir que é apreciado, respeitado e valorizado pelas pessoas ao redor.',
    subtraits: 'Sociabilidade, Autoconfiança, Paciência e Persistência.',
    styleCard: 'Intermediário entre Comunicador e Planejador — estilo Aberto.',
  },
  I_C: {
    title: 'Alta Influência e Conformidade',
    label: 'Comunicador Analítico',
    summary:
      'Combinação aparentemente contraditória. Influência (extroversão, impulsividade) e Conformidade (precisão, regras) se alternam: Influência aparece em situações relaxadas e abertas; Conformidade emerge em circunstâncias formais ou estruturadas.',
    relating:
      'Depende muito das circunstâncias. Em círculos de amigos: comportamento confiante e extrovertido. Em ambiente formal: confiança aparentemente evapora, alinhando-se ao aspecto Conformado.',
    skills:
      'Combina habilidades de Alta-I e Alta-C, mas não ao mesmo tempo. O gerente ideal adapta o ambiente para mostrar o estilo mais apropriado.',
    motivation:
      'Interessado em atenção e aprovação (Influência), mas de forma mais sutil e discreta. Também busca certeza sobre sua posição (Conformidade).',
    subtraits: 'Sociabilidade, Entusiasmo, Cooperação e Sensibilidade.',
    styleCard: 'Influência ligada ao Comunicador e Conformidade ao Analista — estilos opostos.',
  },
  S_C: {
    title: 'Alta Estabilidade e Conformidade',
    label: 'Técnico',
    summary:
      'Calmo e racional. Combina exatidão e precisão com a paciência de trabalhar em um problema até resolvê-lo. Interessado em produzir trabalho de qualidade e frequentemente faz grandes esforços para garantir os melhores resultados.',
    relating:
      'Estilo hesitante dificulta relação com outros em situações desconhecidas. Valoriza amizades e relações fortes, mas disfarçado por estilo aparentemente distante e reservado.',
    skills:
      'Talentos nas áreas de sistemas e procedimentos complexos. Alta Estabilidade dá paciência e persistência; Alta Conformidade traz interesse por ordem e precisão.',
    motivation:
      'Precisa de tempo para planejar e executar. Deseja trabalhar de forma constante sem interrupções. Busca certeza e gosta de sentir-se aceito.',
    subtraits: 'Paciência, Consideração, Cooperação e Exatidão.',
    styleCard: 'Intermediário entre Planejador e Analista — estilo Receptivo.',
  },
  D_I_S: {
    title: 'Alto Dominância, Influência e Estabilidade',
    label: 'Facilitador Independente',
    summary:
      'Estilo sólido e confiável, com fortes habilidades sociais e assertividade rara. Tem forte senso de responsabilidade pessoal e autoconfiança. A combinação de paciência e assertividade resulta em abordagem valiosa.',
    relating:
      'Interage facilmente e habilmente com outros. Autoconfiança para misturar-se com estranhos, mas forte senso de independência e disposição para defender seu ponto de vista.',
    skills:
      'Capaz de alcançar resultados, mas igualmente capaz de considerar cuidadosamente as opções antes de decidir.',
    motivation:
      'Mantém controle sobre suas próprias circunstâncias e impulsiona ambições. Também valoriza relacionamentos positivos e pode adiar metas se conflitar com necessidades alheias.',
    subtraits: 'Independência, Autoconfiança e Persistência.',
    styleCard: 'Perfis com três fatores altos não são diretamente comparáveis ao cartão de estilo.',
  },
  D_I_C: {
    title: 'Alto Dominância, Influência e Conformidade',
    label: 'Dinâmico Estruturado',
    summary:
      'Velocidade de resposta e senso de urgência são características definidoras. Estilo relativamente autocontrolado e ambicioso, com habilidades sociais efetivas que emergem em situações abertas e informais.',
    relating:
      'Em circunstâncias sociais e casuais: estilo amigável e animado. Em situações formais: lado mais direto e determinado se desenvolve.',
    skills:
      'Exibe diferentes habilidades em diferentes situações — pode ser charmoso e entusiasmado, ou direto e franco, dependendo das circunstâncias.',
    motivation:
      'Conquista da ambição pessoal, aceitação e aprovação de outros, e certeza de sua posição.',
    subtraits: 'Automotivação, Entusiasmo e Sensibilidade.',
    styleCard: 'Perfis com três fatores altos não são diretamente comparáveis ao cartão de estilo.',
  },
  D_S_C: {
    title: 'Alto Dominância, Estabilidade e Conformidade',
    label: 'Pragmático Cauteloso',
    summary:
      'Baseado mais em praticidade e pensamento racional do que considerações emocionais. Comportamentos mais assertivos e dominantes esperados em situações difíceis; estilo mais relaxado em circunstâncias menos pressurizadas.',
    relating:
      'Relacionar-se com outros não é área de ênfase. Reage a comentários de outros em vez de oferecer contribuições diretas. Disposição para comunicar em nível pessoal reduz-se sob pressão.',
    skills:
      'Ênfase em resultados e produtividade. Trabalha bem com fatos e sistemas complexos. Abordagem cuidadosa e paciente ajuda a evitar riscos desnecessários.',
    motivation:
      'Obtenção de resultados, tempo para adaptar-se, compreensão completa dos fatos e prevenção de riscos.',
    subtraits: 'Determinação, Consideração e Exatidão.',
    styleCard: 'Perfis com três fatores altos não são diretamente comparáveis ao cartão de estilo.',
  },
  I_S_C: {
    title: 'Alta Influência, Estabilidade e Conformidade',
    label: 'Colaborador',
    summary:
      'Raramente exibirá comportamento claramente assertivo ou direto. Tenta alcançar objetivos através da comunicação, usando habilidades persuasivas ou poderes da discussão racional. Trabalha particularmente bem em equipe.',
    relating:
      'Influência confere estilo extrovertido e amigável; Estabilidade traz habilidades de escuta e paciência; Conformidade adiciona aspecto racional. Combinação poderosa para relações interpessoais.',
    skills:
      'Habilidades em comunicação pessoal e gestão de relacionamentos. Bom jogador de equipe. Capaz de ser extrovertido, mas também receptivo e simpático.',
    motivation:
      'Não é ambicioso por natureza. Motivado por sentimento geral de contentamento — relações positivas, tempo para adaptar-se às mudanças e sensação de certeza sobre sua posição.',
    subtraits: 'Sociabilidade, Paciência e Cooperação.',
    styleCard: 'Perfis com três fatores altos não são diretamente comparáveis ao cartão de estilo.',
  },
}

export const COMMUNICATION_TIPS: Record<string, string[]> = {
  D: [
    'Esteja bem preparado, seja específico, vá direto ao ponto e seja breve',
    'Concentre-se em números: resultados e prazos envolvidos, evitando detalhes em demasia',
    'Atenha-se a assuntos profissionais, procure não abusar da sociabilidade',
    'Não fale de temas irrelevantes e, em vez de apontar pontos negativos, faça sugestões de como alcançar o objetivo',
  ],
  I: [
    'Seja caloroso e amigável, preocupando-se em construir uma relação',
    'Deixe-o controlar o diálogo, para que tenha muitas oportunidades para verbalizar sua criatividade e suas ideias',
    'Não aponte muitos detalhes e não diga diretamente o que fazer — deixe que ele participe das decisões',
    'Prefira interagir em ambientes dinâmicos e mais descontraídos, mostrando interesse em saber como ele está se sentindo',
  ],
  S: [
    'Esforce-se para ser gentil e simpático. Busque construir uma relação de confiança demonstrando interesse genuíno',
    'Demonstre paciência com sua hesitação, compreenda o tempo de que precisam para se adaptar',
    'Apresente o assunto da maneira mais suave possível, concentre-se mais em "como fazer" em vez de "o que fazer"',
    'Procure não ser dominador e exigente, evite mensagens agressivas com tom de voz forte',
  ],
  C: [
    'Prepare-se com antecedência, pois seus padrões são elevados. Dê atenção aos detalhes',
    'Seja formal atendo-se apenas ao tema, mostre ser rigoroso e realista. Não seja generalista',
    'Seja sistemático e lógico em seus pensamentos, apoiando suas afirmações em dados precisos e úteis',
    'Concentre-se mais nos fatos e nas regras e, sempre que possível, ofereça segurança e garantias',
  ],
}

export const DISC_COLORS: Record<DiscType, string> = {
  D: '#EF4444',
  I: '#F59E0B',
  S: '#10B981',
  C: '#3B82F6',
}

export const DISC_LABELS: Record<DiscType, string> = {
  D: 'Dominante',
  I: 'Influente',
  S: 'Estável',
  C: 'Conforme',
}
