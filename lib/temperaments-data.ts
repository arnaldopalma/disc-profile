// Teste de Temperamentos — modelo clássico (Hipócrates / Tim LaHaye / Florence Littauer).
// Fonte: base Access "Temperamentos.mdb" do Arnaldo.
// 4 temperamentos: Popular Sanguíneo, Forte Colérico, Perfeito Melancólico, Sereno Fleumático.
// Formato: 40 linhas (20 forças + 20 fraquezas), cada linha com 1 palavra por temperamento;
// escolhe-se a que mais combina. Conta-se por temperamento => dominante + secundário.

export type Temperament = 'sanguineo' | 'colerico' | 'melancolico' | 'fleumatico'

export interface TemperamentMeta {
  label: string
  full: string
  color: string
  disc: string
  summary: string
  emocoes: string[]
  profissional: string[]
  familia: string[]
  amigo: string[]
}

export const TEMPERAMENTS: Record<Temperament, TemperamentMeta> = {
  sanguineo: {
    label: 'Sanguíneo',
    full: 'Popular Sanguíneo',
    color: '#F59E0B',
    disc: '≈ I (Influente)',
    summary: 'Extrovertido, falante e entusiasmado — a alma das festas.',
    emocoes: [
      'Personalidade cativante', 'Falador, contador de histórias', 'É a alma das festas',
      'Bem humorado', 'Emotivo e demonstra isso', 'Entusiasta e expressivo',
      'Alegre e efervescente', 'Curioso', 'Vive no presente', 'Sincero de coração',
    ],
    profissional: [
      'Oferece-se para tarefas', 'Cria novas atividades', 'Criativo e alegre',
      'Energético e entusiasmado', 'Começa tudo com brilhantismo', 'Estimula os outros ao trabalho',
    ],
    familia: [
      'Torna o lar divertido', 'É apreciado pelos amigos dos filhos',
      'Vê o lado engraçado das crises', 'É um mestre de cerimônias',
    ],
    amigo: [
      'Faz amizades com facilidade', 'Ama as pessoas', 'Regozija-se com elogios',
      'Não guarda ressentimentos', 'Pede desculpas facilmente', 'Gosta de atividades espontâneas',
    ],
  },
  colerico: {
    label: 'Colérico',
    full: 'Forte Colérico',
    color: '#EF4444',
    disc: '≈ D (Dominante)',
    summary: 'Líder nato, dinâmico e orientado a metas e resultados.',
    emocoes: [
      'Líder nato', 'Dinâmico e ativo', 'Compulsivo por mudanças', 'Precisa corrigir erros',
      'Forte vontade própria e decisiva', 'Controla suas emoções', 'Não se abate facilmente',
      'Auto-suficiente e independente', 'Esbanja confiança',
    ],
    profissional: [
      'Orientado por metas', 'Tem visão global', 'Organiza bem o trabalho e as tarefas',
      'Procura soluções práticas', 'Delega tarefas', 'Prospera, mesmo com oposição', 'Realiza suas metas',
    ],
    familia: [
      'Exerce uma sólida liderança', 'Estabelece metas', 'Motiva a família à ação',
      'Tem sempre a resposta certa', 'Organiza o lar',
    ],
    amigo: [
      'Aparentemente quase não precisa de amigos', 'Trabalha para uma atividade de grupo',
      'Lidera e organiza', 'Geralmente está certo e com a razão', 'Sobressai em situações de emergência',
    ],
  },
  melancolico: {
    label: 'Melancólico',
    full: 'Perfeito Melancólico',
    color: '#3B82F6',
    disc: '≈ C (Conforme)',
    summary: 'Profundo, analítico e perfeccionista — busca a excelência.',
    emocoes: [
      'Profundo e pensativo', 'Analítico', 'Sério e cheio de propósitos', 'Talentoso e criativo',
      'Artístico e músico', 'Filosófico e poético', 'Apreciador da beleza', 'Sensível aos outros',
      'Abnegado', 'Cuidadoso', 'Idealista',
    ],
    profissional: [
      'Orientado por horários', 'Perfeccionista, mantém altos padrões', 'Detalhista',
      'Persistente e minucioso', 'Ordeiro e organizado', 'Econômico',
      'Encontra soluções criativas', 'Sempre termina o que começou',
    ],
    familia: [
      'Tem altos padrões de seriedade', 'Quer tudo feito corretamente', 'Mantém a casa em ordem',
      'Sacrifica-se pelos outros', 'Incentiva talentos e estudos',
    ],
    amigo: [
      'Faz amizades, porém com cuidado', 'Evita chamar a atenção sobre si', 'Fiel e devotado',
      'Bom ouvinte', 'Resolve os problemas alheios', 'Tem um profundo cuidado com os outros',
    ],
  },
  fleumatico: {
    label: 'Fleumático',
    full: 'Sereno Fleumático',
    color: '#10B981',
    disc: '≈ S (Estável)',
    summary: 'Calmo, equilibrado e pacífico — pessoa para todas as horas.',
    emocoes: [
      'Acomodado e relaxado', 'Calmo', 'Paciente, equilibrado', 'Leva a vida com coerência',
      'Quieto, porém engraçado', 'Compassivo e bom', 'Mantém as emoções sob controle',
      'Sempre de bem com a vida', 'Pessoa para "todas as horas"',
    ],
    profissional: [
      'Competente e estável', 'Pacífico e amável', 'Habilidade administrativa',
      'Moderador de problemas', 'Evita conflitos', 'Reage bem às pressões',
      'Encontra a maneira fácil nas coisas',
    ],
    familia: [
      'É um bom pai / boa mãe', 'Reserva tempo para os filhos', 'Não tem pressa',
      'Aceita tanto o bom quanto o ruim', 'Dificilmente se agita',
    ],
    amigo: [
      'De fácil convivência', 'Agradável', 'Inofensivo', 'Bom ouvinte',
      'Tem um irônico senso de humor', 'Tem muitos amigos', 'Tem compaixão pelas pessoas',
    ],
  },
}

export const TEMPERAMENT_ORDER: Temperament[] = ['sanguineo', 'colerico', 'melancolico', 'fleumatico']

export interface TempRow {
  kind: 'forca' | 'fraqueza'
  words: Record<Temperament, string>
}

function row(kind: 'forca' | 'fraqueza', s: string, c: string, m: string, f: string): TempRow {
  return { kind, words: { sanguineo: s, colerico: c, melancolico: m, fleumatico: f } }
}

// 40 linhas: 1-20 Forças, 21-40 Fraquezas. Ordem das colunas: Sanguíneo, Colérico, Melancólico, Fleumático.
export const TEMP_ROWS: TempRow[] = [
  // Forças
  row('forca', 'Animado', 'Aventureiro', 'Analítico', 'Adaptável'),
  row('forca', 'Brincalhão', 'Persuasivo', 'Persistente', 'Sereno'),
  row('forca', 'Sociável', 'Enérgico', 'Abnegado', 'Submisso'),
  row('forca', 'Convincente', 'Competitivo', 'Atencioso', 'Controlado'),
  row('forca', 'Refrescante', 'Habilidoso', 'Respeitoso', 'Reservado'),
  row('forca', 'Espirituoso', 'Auto-suficiente', 'Sensível', 'Satisfeito'),
  row('forca', 'Estimulador', 'Positivo', 'Planejador', 'Paciente'),
  row('forca', 'Espontâneo', 'Seguro', 'Organizado', 'Tímido'),
  row('forca', 'Otimista', 'Franco', 'Ordeiro', 'Serviçal'),
  row('forca', 'Engraçado', 'Vigoroso', 'Fiel', 'Amigável'),
  row('forca', 'Encantador', 'Audacioso', 'Minucioso', 'Diplomático'),
  row('forca', 'Alegre', 'Confiante', 'Culto', 'Consistente'),
  row('forca', 'Inspirado', 'Independente', 'Idealista', 'Inofensivo'),
  row('forca', 'Demonstrativo', 'Decidido', 'Profundo', 'Irônico'),
  row('forca', 'Desembaraçado', 'Ativo', 'Musical', 'Mediador'),
  row('forca', 'Conversador', 'Tenaz', 'Pensativo', 'Tolerante'),
  row('forca', 'Vivo', 'Líder', 'Leal', 'Ouvinte'),
  row('forca', 'Atraente', 'Chefe', 'Detalhista', 'Contente'),
  row('forca', 'Popular', 'Produtivo', 'Perfeccionista', 'Agradável'),
  row('forca', 'Vivaz', 'Valente', 'Comportado', 'Equilibrado'),
  // Fraquezas
  row('fraqueza', 'Metido', 'Mandão', 'Acanhado', 'Vazio'),
  row('fraqueza', 'Indisciplinado', 'Insensível', 'Rancoroso', 'Desinteressado'),
  row('fraqueza', 'Repetitivo', 'Inflexível', 'Ressentido', 'Relutante'),
  row('fraqueza', 'Esquecido', 'Franco', 'Complicado', 'Medroso'),
  row('fraqueza', 'Inoportuno', 'Impaciente', 'Inseguro', 'Indeciso'),
  row('fraqueza', 'Imprevisível', 'Frio', 'Impopular', 'Desligado'),
  row('fraqueza', 'Casual', 'Cabeçudo', 'Insatisfeito', 'Hesitante'),
  row('fraqueza', 'Permissivo', 'Orgulhoso', 'Pessimista', 'Simples'),
  row('fraqueza', 'Esquentado', 'Combativo', 'Alienado', 'Incerto'),
  row('fraqueza', 'Ingênuo', 'Corajoso', 'Negativo', 'Indiferente'),
  row('fraqueza', 'Egoísta', 'Workaholic', 'Retraído', 'Preocupado'),
  row('fraqueza', 'Tagarela', 'Indelicado', 'Sensível', 'Tímido'),
  row('fraqueza', 'Desorganizado', 'Imperioso', 'Deprimido', 'Confuso'),
  row('fraqueza', 'Inconstante', 'Intolerante', 'Introvertido', 'Apático'),
  row('fraqueza', 'Desordenado', 'Manipulador', 'Triste', 'Resmungão'),
  row('fraqueza', 'Convencido', 'Obstinado', 'Cético', 'Lento'),
  row('fraqueza', 'Barulhento', 'Tirânico', 'Solitário', 'Preguiçoso'),
  row('fraqueza', 'Distraído', 'Irritável', 'Desconfiado', 'Vagaroso'),
  row('fraqueza', 'Agitado', 'Imprudente', 'Vingativo', 'Relutante'),
  row('fraqueza', 'Instável', 'Astuto', 'Crítico', 'Acomodado'),
]

// Descrições das 6 combinações (cruzamentos). Chave: par ordenado por TEMPERAMENT_ORDER.
export const BLENDS: Record<string, { title: string; text: string[] }> = {
  'sanguineo+colerico': {
    title: 'Popular Sanguíneo com Forte Colérico',
    text: [
      'Ambos são extrovertidos, otimistas e francos. São pessoas de "fala": enquanto o sanguíneo fala por prazer, o colérico fala por negócios.',
      'Este conjunto traz grande potencial de liderança. É uma pessoa divertida, mas realizada; esforçada e determinada, mas não compulsiva sobre realizações. Pode dirigir os outros e convencê-los a gostar da tarefa.',
      'O lado negativo é que pode produzir uma pessoa mandona e impulsiva, que gasta muita energia correndo em círculos e tende a dominar conversas e decisões.',
    ],
  },
  'melancolico+fleumatico': {
    title: 'Perfeito Melancólico com Sereno Fleumático',
    text: [
      'Ambos são introvertidos, mais sérios e profundos no exame das situações, e não querem ser as estrelas.',
      'Esta dupla produz excelentes educadores: a preferência pela pesquisa e estudo do Melancólico é complementada pelo brilhantismo do Fleumático em se dar bem com as pessoas. O equilíbrio do Fleumático impede o Melancólico de cair em depressão.',
      'O ponto negativo é a dificuldade em tomar decisões, pois ambos são lentos nesse processo e há tendência a "deixar para outro dia".',
    ],
  },
  'colerico+melancolico': {
    title: 'Forte Colérico com Perfeito Melancólico',
    text: [
      'Uma combinação que se encaixa e completa as lacunas das respectivas naturezas. Produz uma excelente pessoa de negócios: une liderança, esforço e foco do Colérico com a mente analítica, detalhista e organizada do Melancólico.',
      'É capaz de conseguir o que quer, leve o tempo que levar — tem poder de estabelecer metas, perseverança e paciência. Decisiva, organizada e voltada a resultados.',
      'Levada ao extremo, porém, mesmo suas forças podem se tornar fontes de dominação sobre grupos.',
    ],
  },
  'sanguineo+fleumatico': {
    title: 'Popular Sanguíneo com Sereno Fleumático',
    text: [
      'Ambos adoram se divertir e descansar. O humor é o forte desta dupla que, aliada a uma vida leve, faz dos melhores amigos que alguém possa querer.',
      'O Fleumático nivela os altos e baixos do Sanguíneo, e este alegra o Fleumático. É a melhor combinação para tratar e trabalhar com pessoas — bons pais e líderes comunitários, com a personalidade encantadora do Sanguíneo e a estabilidade do Fleumático.',
      'O lado negativo é mostrar o lado preguiçoso, sem direção para concluir tarefas, e dificuldade para lidar com dinheiro.',
    ],
  },
  'sanguineo+melancolico': {
    title: 'Popular Sanguíneo com Perfeito Melancólico',
    text: [
      'A mais emotiva das combinações: um só corpo lida com os altos e baixos do Sanguíneo associados aos traumas profundos e prolongados do Melancólico.',
      'Esta associação de opostos pode levar a problemas emocionais, pois qualquer progresso que o lado Sanguíneo queira realizar, o lado Melancólico tende a frear.',
      'Quando reconhecemos nossos temperamentos e agimos em busca de equilíbrio, conseguimos controlar nossas forças e fraquezas.',
    ],
  },
  'colerico+fleumatico': {
    title: 'Forte Colérico com Sereno Fleumático',
    text: [
      'São extremamente opostos. Quando a liderança nata do Colérico busca algo, a acomodação natural do Fleumático coloca esta alma numa situação frustrante.',
      'A urgência e a pressa do Colérico cedem à aceitação da mesmice do Fleumático. É o tipo de pessoa que não se permite descansar, pois seus opostos lutam entre si, causando muito conflito interior.',
      'Quando reconhecemos nossos temperamentos e agimos em busca de equilíbrio, conseguimos controlar nossas forças e fraquezas.',
    ],
  },
}

export const ORIGEM = {
  texto:
    'Hipócrates, no século IV a.C., já ensinava que os temperamentos vinham dos 4 "humores" do corpo: o sangue, a bílis amarela, a bílis preta e o fleuma. Desses fluidos vieram as conceituações dos temperamentos.',
  lahaye:
    '"O temperamento influencia tudo quanto você faz — dos hábitos de sono e estudo ao modo como você se relaciona com os outros. Não há influência mais poderosa em sua vida do que o seu temperamento ou a combinação deles." (Tim LaHaye)',
  nota:
    'Não existe temperamento melhor ou pior. Comece a trabalhar no que você tem de melhor e procure o equilíbrio dentro de você e do seu grupo.',
}

export type TempScores = Record<Temperament, number>

// answers: índice da linha (string) -> temperamento escolhido
export function calculateTempScores(answers: Record<string, Temperament>): TempScores {
  const scores: TempScores = { sanguineo: 0, colerico: 0, melancolico: 0, fleumatico: 0 }
  for (const t of Object.values(answers)) {
    if (t in scores) scores[t] += 1
  }
  return scores
}

export function rankTemperaments(scores: TempScores): Temperament[] {
  return [...TEMPERAMENT_ORDER].sort((a, b) => scores[b] - scores[a])
}

export function blendKey(a: Temperament, b: Temperament): string {
  const ordered = [a, b].sort(
    (x, y) => TEMPERAMENT_ORDER.indexOf(x) - TEMPERAMENT_ORDER.indexOf(y)
  )
  return `${ordered[0]}+${ordered[1]}`
}

export const TEMP_TOTAL = TEMP_ROWS.length // 40
