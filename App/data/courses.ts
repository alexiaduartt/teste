export type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoId: string; 
};

export type Course = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  lessons: Lesson[];
};

export const CATEGORIES = ['Tecnologia', 'Design', 'Gerência', 'Idiomas'];

const DEFAULT_LESSONS: Lesson[] = [
  { id: '1', title: 'Boas-vindas e Visão Geral', duration: '05:00', videoId: 'vid_01' },
  { id: '2', title: 'Conceitos Fundamentais', duration: '10:30', videoId: 'vid_02' },
  { id: '3', title: 'Configuração e Primeiros Passos', duration: '12:15', videoId: 'vid_03' },
  { id: '4', title: 'Ferramentas Essenciais', duration: '08:45', videoId: 'vid_04' },
  { id: '5', title: 'Técnicas Intermediárias', duration: '15:20', videoId: 'vid_05' },
  { id: '6', title: 'Aula Prática: Parte 1', duration: '20:00', videoId: 'vid_06' },
  { id: '7', title: 'Aula Prática: Parte 2', duration: '22:10', videoId: 'vid_07' },
  { id: '8', title: 'Erros Comuns e Como Evitar', duration: '14:50', videoId: 'vid_08' },
  { id: '9', title: 'Projeto Final / Estudo de Caso', duration: '30:00', videoId: 'vid_09' },
  { id: '10', title: 'Conclusão e Próximos Passos', duration: '06:40', videoId: 'vid_10' },
];

export const MOCKED_COURSES: Course[] = [
  {
    id: '1',
    title: 'Crie seus Primeiros Jogos com Python',
    imageUrl: 'https://images.prismic.io/voitto-blog/MmY2NTNiNzQtMjIwYy00MjAyLWEyNzQtZWRmNjg4YzVjODhl_duoccivosu7mybnh2tejuzplkppqmvadhwb7vdctki-kl8j0g6bgaows2-0gmdsa8cthxkip4icnhvi27fmlpibuptrd6v7ukj4vhda3sewjs-vbollou6tdwpjkmoclislvgop-qqv8q2ozog',
    description: 'Sempre quis criar seu próprio jogo? Neste curso prático e imersivo, você vai aprender os fundamentos da lógica de programação moderna utilizando Python.',
    category: 'Tecnologia',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '2',
    title: 'Desenvolvimento Web: HTML e CSS do Zero',
    imageUrl: 'https://web.dev/static/images/learn-header.png',
    description: 'Transforme ideias em sites reais! Este curso é a porta de entrada para a web. Domine a semântica do HTML5 e o poder do CSS3.',
    category: 'Tecnologia',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '3',
    title: 'Robótica Iniciante com Arduino',
    imageUrl: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg',
    description: 'Entre no fascinante mundo da eletrônica e da automação! Vamos usar a placa Arduino para criar circuitos inteligentes.',
    category: 'Tecnologia',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '5',
    title: 'Lógica de Programação com Minecraft',
    imageUrl: 'https://i.pinimg.com/1200x/7a/a3/0c/7aa30c0658b18c60becc10a3563360b9.jpg',
    description: 'Aprender a programar não precisa ser chato. Utilize o universo criativo do Minecraft para entender conceitos complexos.',
    category: 'Tecnologia',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '4',
    title: 'Design de Apps: Prototipagem no Figma',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/960px-Figma-logo.svg.png',
    description: 'Antes de escrever uma linha de código, todo grande aplicativo começa com um design sólido. Aprenda a ferramenta mais utilizada do mercado.',
    category: 'Design',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '6',
    title: 'Fundamentos de UX/UI Design',
    imageUrl: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/adobe_xd_logo_icon_170999.png',
    description: 'Entenda a diferença entre Interface (UI) e Experiência do Usuário (UX). Crie produtos digitais fáceis e intuitivos.',
    category: 'Design',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '7',
    title: 'Metodologias Ágeis com Scrum',
    imageUrl: 'https://seeklogo.com/images/S/scrum-logo-565686E737-seeklogo.com.png',
    description: 'Aprenda a gerenciar projetos de tecnologia como as grandes startups. O Scrum é o framework ágil mais popular do mundo.',
    category: 'Gerência',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '8',
    title: 'Liderança e Inteligência Emocional',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    description: 'Um bom gestor precisa saber lidar com pessoas. Este curso foca nas "Soft Skills" essenciais para a liderança.',
    category: 'Gerência',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '9',
    title: 'Inglês Técnico para Desenvolvedores',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png',
    description: 'Pare de depender do tradutor! Este curso é focado 100% no vocabulário de TI. Aprenda os termos técnicos mais usados.',
    category: 'Idiomas',
    lessons: DEFAULT_LESSONS
  },
  {
    id: '10',
    title: 'Espanhol Básico para Viagens',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png',
    description: 'Planejando sua próxima viagem? Aprenda o essencial do espanhol para se virar em qualquer país hispanofalante.',
    category: 'Idiomas',
    lessons: DEFAULT_LESSONS
  },
];