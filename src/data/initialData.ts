import { Service, AudioTrack, SamplePack, StoreProduct, BlogArticle, Testimonial, GearItem, QuoteRequest } from '../types';




import bateriaRemotaImg from '../../assets/images/hearos/hearo_palo.jpg';
import hearoEstudioImg from '../../assets/images/hearos/hearo_estudio.jpg';
import hearoMicrofonosImg from '../../assets/images/hearos/hearo_microfonos.JPG';
import microSnareImg from '../../assets/images/hearos/micro_en_snare.png';
import mapexImg1 from '../../assets/images/baterias/bateria_mapex_promars_1.jpeg';
import mapexImg2 from '../../assets/images/baterias/bateria_mapex_promars_2.jpeg';
import mapexImg3 from '../../assets/images/baterias/bateria_mapex_promars_3.jpeg';
import sonorImg1 from '../../assets/images/baterias/bateria_sonor_01.jpeg';
import sonorImg2 from '../../assets/images/baterias/bateria_sonor_2.jpeg';
import sonorImg3 from '../../assets/images/baterias/bateria_sonor_3.jpeg';
import platillosPortadaImg from '../../assets/images/baterias/platillos_portada.JPG';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'remote-drums',
    title: 'Baterías Remotas',
    subtitle: 'Grabación remota profesional a medida',
    description: `Grabo la batería de tu canción desde mi  studio profesional, teniendo en cuenta el audio que buscás, el instrumento ideal y la ejecución precisa para darle vida y ponche a tu producción.

A través de un flujo de trabajo 100% colaborativo, recibís entre 8 y 10 canales en formato WAV (24-bit / 96kHz) listos para arrastrar a tu DAW y comenzar la mezcla. Adaptamos la configuración de cuerpo (madera o metal) y la microfonía a géneros como Rock, Pop, Indie o Folklore.`,
    iconName: 'Drum',
    image: bateriaRemotaImg,
    basePriceUSD: 120,
    deliverables: [
      '8 a 10 Canales WAV en alta definición (24-bit / 96kHz)',
      'Tomas crudas (Dry) y tomas procesadas en preamps Focusrite Pro',
      'Canales de Room Ambience A/B & Sub-Kick para peso natural',
      'Muestras rápidas en MP3 previa entrega multitrack',
      'Revisiones y ajustes incluidos antes del corte final'
    ],
    turnaroundDays: '3 a 7',
    popular: true,
    features: [
      'Atención personalizada en arreglos y groove',
      'Compatibilidad total con Pro Tools, Cubase, Logic, Ableton o WAVs',
      'Afinación quirúrgica y selección de parches a medida',
      'Video en HD de la sesión de grabación disponible (opcional)'
    ]
  },
  {
    id: 'live-studio-recording',
    title: 'Grabación en Vivo y Estudio',
    subtitle: 'Para bandas y artistas',
    description: 'Servicios de captación y grabación profesional en estudio o en presentaciones en vivo, asegurando fidelidad sonora y dinámica orgánica para bandas y solistas.',
    iconName: 'Radio',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    basePriceUSD: 200,
    deliverables: [
      'Captación multicanal en alta resolución',
      'Micrófonos de alta gama y preamps valvulares',
      'Mezcla previa de monitoreo en vivo',
      'Entregables WAV 24bit/96kHz'
    ],
    turnaroundDays: 5,
    popular: true,
    features: ['Equipo técnico en locación', 'Monitoreo in-ear individual', 'Asesoría acústica']
  },
  {
    id: 'mixing-mastering',
    title: 'Mezcla y Mastering',
    subtitle: 'Balance, potencia y claridad',
    description: 'Tratamiento híbrido y analógico para llevar tus canciones al nivel de producciones comerciales competitivas en plataformas digitales.',
    iconName: 'Sliders',
    image: hearoEstudioImg,
    basePriceUSD: 180,
    deliverables: [
      'Mezcla estéreo + Versión instrumental',
      'Mastering optimizado para Spotify (-14 LUFS) y CD',
      'STEMs por separado',
      'Revisiones incluidas'
    ],
    turnaroundDays: 4,
    popular: true,
    features: ['Suma analógica de 16 canales', 'Procesamiento M/S y True Peak', 'Edición de fase previa']
  },
  {
    id: 'event-production',
    title: 'Producción de Eventos',
    subtitle: 'Diseño y logística técnica',
    description: 'Planificación, coordinación técnica y producción integral para shows en vivo, festivales y eventos corporativos.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    basePriceUSD: 300,
    deliverables: [
      'Rider técnico y stage plan detallado',
      'Dirección técnica y coordinación en escenario',
      'Pruebas de sonido y operación en vivo',
      'Supervisión de seguridad y tiempos'
    ],
    turnaroundDays: 7,
    popular: false,
    features: ['Coordinación de personal de escenario', 'Gestión de requerimientos técnicos', 'Soporte durante todo el evento']
  },
  {
    id: 'backline-rental',
    title: 'Backline para Eventos',
    subtitle: 'Equipamiento profesional de escenario',
    description: 'Alquiler y montaje de instrumental y equipamiento de audio de primer nivel para escenarios, festivales y producciones.',
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    basePriceUSD: 150,
    deliverables: [
      'Baterías de estudio (Pearl, DW, Tama)',
      'Amplificadores de tubo para guitarra y bajo',
      'Montaje, calibración y afinación en escenario',
      'Transporte y asistencia técnica'
    ],
    turnaroundDays: 1,
    popular: false,
    features: ['Equipamiento en impecable estado', 'Parches e insumos nuevos', 'Técnico dedicado en escenario']
  },
  {
    id: 'one-on-one-sessions',
    title: 'Sesiones 1 a 1',
    subtitle: 'Consultoría y mentoría técnica',
    description: 'Clases particulares y consultoría individualizada sobre grabación de baterías, producción musical, microfonía y técnicas de mezcla.',
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800',
    basePriceUSD: 80,
    deliverables: [
      'Sesión de 60 a 90 minutos online o presencial',
      'Análisis detallado de tus proyectos o maquetas',
      'Grabación de la sesión para repaso',
      'Material de lectura y ejercicios prácticos'
    ],
    turnaroundDays: 1,
    popular: false,
    features: ['Atención 100% enfocada en tus metas', 'Revisión de tu setup de estudio', 'Feedback directo sin filtros']
  }
];

export const INITIAL_AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'big-drums-tracks-1',
    title: 'Indie Pop Groove & Big Snare',
    artist: 'Drum Session',
    genre: 'Pop / Indie',
    type: 'portfolio',
    durationSeconds: 270,
    bpm: 85,
    drumStyle: 'Bateria con tambor grande y espaciado, bombo corto y seco para generar contrastes. Se utilizo una afinacion de toms grabes y profundos, para los platos utilice un Hihat de 16" buscando un sonido grande y platos Zidjian A Custom 16" y Zidjian K Dark Crash 18" ',
    coverImage: mapexImg1,
    galleryImages: [mapexImg1, mapexImg2, mapexImg3, hearoMicrofonosImg, microSnareImg, platillosPortadaImg],
    videoUrl: 'https://www.youtube.com/shorts/7Wx4SS7hBJ8',
    hasABComparison: true,
    defaultStem: 'finalSong',
    stems: {
      // demoTrack: '/audio/big-drums-tracks-1/1-demo-cancion.mp3',
      // demoDrums: '/audio/big-drums-tracks-1/2-demo-drums.mp3',
      recordedDrums: '/audio/big-drums-tracks-1/3-recorded-drums.mp3',
      finalSong: '/audio/big-drums-tracks-1/4-cancion-con-bateria.mp3'
    }
  },

  {
    id: 'track-2',
    title: 'Modern Rock Driving Beat',
    artist: 'Proyecto Alternativo - Session',
    genre: 'Rock',
    type: 'portfolio',
    durationSeconds: 52,
    bpm: 124,
    drumStyle: 'Organic Room Ambience, Ludwig Snare 6.5, Thick Kick',
    coverImage: sonorImg1,
    galleryImages: [sonorImg1, sonorImg2, sonorImg3, hearoEstudioImg],
    hasABComparison: true,
    defaultStem: 'finalSong',
    stems: {
      demoTrack: '/audio/track-2/1-demo-cancion.mp3',
      demoDrums: '/audio/track-2/2-demo-drums.mp3',
      recordedDrums: '/audio/track-2/3-recorded-drums.mp3',
      finalSong: '/audio/track-2/4-cancion-con-bateria.mp3'
    }
  },
  {
    id: 'track-3',
    title: 'Indie Pop Vintage Grooves',
    artist: 'Indie Collective - Session',
    genre: 'Pop / Indie',
    type: 'portfolio',
    durationSeconds: 40,
    bpm: 108,
    drumStyle: 'Damped Warm Shells, Soft Ribbon Mics, Clean Hi-Hats',
    coverImage: platillosPortadaImg,
    galleryImages: [platillosPortadaImg, hearoEstudioImg, microSnareImg],
    hasABComparison: false,
    defaultStem: 'finalSong',
    stems: {
      demoTrack: '/audio/track-3/1-demo-cancion.mp3',
      demoDrums: '/audio/track-3/2-demo-drums.mp3',
      recordedDrums: '/audio/track-3/3-recorded-drums.mp3',
      finalSong: '/audio/track-3/4-cancion-con-bateria.mp3'
    }
  },
  {
    id: 'track-4',
    title: 'Prog Poly-Rhythms & Ghost Notes',
    artist: 'Progressive Fusion Band',
    genre: 'Prog / Funk',
    type: 'portfolio',
    durationSeconds: 60,
    bpm: 132,
    drumStyle: 'Dynamic Ghost Notes, Fast Cymbal Chokes, Wide Room',
    coverImage: bateriaRemotaImg,
    galleryImages: [bateriaRemotaImg, hearoMicrofonosImg, mapexImg2],
    hasABComparison: true,
    defaultStem: 'finalSong',
    stems: {
      demoTrack: '/audio/track-4/1-demo-cancion.mp3',
      demoDrums: '/audio/track-4/2-demo-drums.mp3',
      recordedDrums: '/audio/track-4/3-recorded-drums.mp3',
      finalSong: '/audio/track-4/4-cancion-con-bateria.mp3'
    }
  }
];

export const INITIAL_SAMPLE_PACKS: SamplePack[] = [
  {
    id: 'pack-rock-vol1',
    title: 'Organic Punch Rock Drums Vol. 1',
    subtitle: 'Librería de samples grabados en Tama Starclassic Maple',
    category: 'Drum Kit',
    priceUSD: 29,
    coverImage: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=800',
    isFree: false,
    samplesCount: 450,
    format: '24-bit 96kHz WAV + Slate Trigger TCI + Kontakt',
    fileSize: '1.2 GB',
    description: 'Colección masiva de kicks, snares y toms capturados en una sala acústica con techos de 5 metros. Incluye múltiples capas de velocidad (hasta 12 round-robins) y micrófonos directos, sobrecabeza (Overheads) y ambiente (Room).',
    features: [
      'Redoblante Ludwig Supraphonic 14x6.5 de aluminio',
      'Bombo Tama Starclassic 22x18 con Sub-Kick',
      '4 Toms (10", 12", 14", 16")',
      '100% libre de regalías para proyectos comerciales'
    ],
    demoTracks: []
  },
  {
    id: 'pack-snares-metal',
    title: 'Aggressive Metal & Core Snares',
    subtitle: '15 Redoblantes cortantes listos para traspasar mezclas densas',
    category: 'One-Shots',
    priceUSD: 19,
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
    isFree: false,
    samplesCount: 180,
    format: '24-bit 96kHz WAV & TCI',
    fileSize: '450 MB',
    description: 'Snares procesados con ecualización de válvulas, compresión VCA y saturación de cinta analógica para obtener ese chasquido inicial ultra articulado y resonancia controlada.',
    features: [
      'Procesados con Empirical Labs Distressor & Neve 1073',
      'Presets para Slate Trigger 2',
      'Muestras Dry (Secas) y Wet (Reverb de Placa Analógica)'
    ],
    demoTracks: []
  },
  {
    id: 'pack-free-sampler',
    title: 'Maxi Alzugaray Free Drum Essentials',
    subtitle: 'Pack de prueba gratuito con samples, MIDI grooves y una guía de mezcla',
    category: 'One-Shots',
    priceUSD: 0,
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    isFree: true,
    samplesCount: 60,
    format: '24-bit WAV & MIDI',
    fileSize: '210 MB',
    description: 'Una selección curada de mis mejores baterías para que pruebes la calidad de mis grabaciones en tu propio DAW antes de contratar una sesión.',
    features: [
      '10 Snares multicapa',
      '5 BOMBOS de alto impacto',
      '20 Patrones MIDI de batería Rock/Metal',
      'PDF: "Guía de 5 pasos para ecualizar baterías"'
    ],
    demoTracks: []
  }
];

export const INITIAL_STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'prod-preset-cubase',
    title: 'Plantilla de Mezcla Profesional Cubase 13 Pro',
    category: 'Plantillas DAW',
    priceUSD: 35,
    originalPriceUSD: 50,
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    badge: 'MÁS VENDIDO',
    description: 'Mi plantilla exacta de mezcla para Cubase. Ruteo de buses estructurado, compresión paralela de baterías, efectos de espacialidad preconfigurados y cadenas de procesamiento de voz e instrumentos.',
    dawCompatibility: 'Cubase 11, 12 y 13 (Pro)',
    downloadSize: '85 MB',
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'prod-preset-protools',
    title: 'Pro Tools Session Template: Heavy Rock & Metal',
    category: 'Plantillas DAW',
    priceUSD: 35,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    description: 'Estructura de ruteo avanzada para Pro Tools Ultimate / Studio. Incluye grupos VCA, cadenas Sidechain calibradas y buses de sumación estéreo optimizados.',
    dawCompatibility: 'Pro Tools 2020+',
    downloadSize: '90 MB',
    rating: 4.8,
    reviewsCount: 24
  },
  {
    id: 'prod-ebook-drum-mix',
    title: 'E-Book: Secretos de Microfonía y Mezcla de Baterías Acústicas',
    category: 'Guías & PDFs',
    priceUSD: 18,
    originalPriceUSD: 25,
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800',
    badge: 'NUEVO',
    description: 'Guía ilustrada de 85 páginas con diagramas de posición de micrófonos, técnicas para evitar problemas de fase, tablas de frecuencias clave y secretos de compresión paralela.',
    downloadSize: '32 MB (PDF HD)',
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'prod-pack-midi-grooves',
    title: '500+ Organic Rock & Metal MIDI Drum Grooves',
    category: 'Presets',
    priceUSD: 24,
    coverImage: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=800',
    description: 'Patrones MIDI tocados en vivo por Maxi Alzugaray en batería electrónica con dinámicas de humanización reales. Compatibles con Addictive Drums, Superior Drummer 3, EZdrummer y Steven Slate.',
    downloadSize: '15 MB',
    rating: 4.9,
    reviewsCount: 42
  }
];

export const INITIAL_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-phase-alignment',
    title: 'Cómo solucionar la fase en baterías grabadas con múltiples micrófonos',
    slug: 'solucionar-fase-baterias-multimicrofono',
    category: 'Grabación',
    author: 'Maxi Alzugaray',
    date: '10 Ago 2026',
    readTime: '6 min de lectura',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    summary: 'La cancelación de fase es el enemigo N°1 del cuerpo y el ponche en la batería. Aprende a alinear la onda del redoblante superior e inferior y los micrófonos de ambiente.',
    content: [
      'Cuando colocas 12 micrófonos alrededor de un kit de batería, el sonido del redoblante o del bombo llega a cada micrófono a momentos ligeramente distintos debido a la velocidad del sonido en el aire.',
      'Si dos señales están 180° fuera de fase, las frecuencias graves se cancelan casi por completo, dejando un sonido delgado y sin impacto.',
      'En este artículo analizamos la regla 3 a 1 en posicionamiento de mics, el uso del botón de inversión de polaridad (Ø) y la técnica de zoom quirúrgico en la forma de onda de tu DAW.'
    ],
    tags: ['Alineación de Fase', 'Microfonía', 'Baterías', 'Mezcla'],
    commentsCount: 8
  },
  {
    id: 'art-snare-compression',
    title: 'Compresión de Redoblante: VCA vs FET vs Opto en la práctica',
    slug: 'compresion-redoblante-vca-fet-opto',
    category: 'Mezcla',
    author: 'Maxi Alzugaray',
    date: '02 Jul 2026',
    readTime: '8 min de lectura',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
    summary: 'Comparativa en profundidad sobre qué tipo de compresor elegir según el género musical: la agresividad del 1176, el control del DBX 160 y la calidez del LA-2A.',
    content: [
      'El redoblante es el corazón rítmico de canciones de Rock y Pop. La elección del tipo de compresor determina si mantendrás el ataque del palillo o si buscarás una resonancia larga y pegajosa.',
      '1. Compresores FET (ej. 1176): Tiempos de ataque ultra rápidos. Ideales para moldear el transitorio y agregar armónicos crujientes.',
      '2. Compresores VCA (ej. DBX 160, SSL Bus): Snap de ataque súper definido y control de picos firme.',
      '3. Compresores Opto (ej. LA-2A): Curva suave para baladas o secciones donde buscas sostener el cuerpo sin achatar el ataque inicial.'
    ],
    tags: ['Compresión', 'Mezcla', 'Hardware', 'Redoblante'],
    commentsCount: 14
  },
  {
    id: 'art-remote-session-prep',
    title: 'Guía paso a paso para preparar tus maquetas antes de contratar grabación remota',
    slug: 'guia-preparar-maquetas-sesion-remota',
    category: 'Tutoriales',
    author: 'Maxi Alzugaray',
    date: '15 Jun 2026',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    summary: 'Asegura que tu sesión de grabación remota fluya perfectamente preparando el mapa de tempo, guías de guitarra/bajo limpias y referencias de batería en MIDI.',
    content: [
      'Enviar una sesión bien organizada ahorra tiempo y garantiza que el sesionista interprete exactamente lo que tu canción necesita.',
      'Puntos indispensables:',
      '• Mapa de BPM exportado correctamente (incluso si hay cambios de compás).',
      '• Guías de guitarra/teclado grabadas a tiempo estricto.',
      '• Referencias claras de la estructura (Verso, Pre-Coro, Coro, Puente).'
    ],
    tags: ['Grabación Remota', 'DAW', 'Producción Musical'],
    commentsCount: 5
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sebastián "Seba" Rivas',
    role: 'Productor & Guitarrista',
    bandOrStudio: 'Ecos del Norte (Metal Progresivo)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Maxi grabó la batería completa de nuestro álbum de 10 canciones. El nivel de precisión en la interpretación y la calidad del sonido de la sala superaron todas nuestras expectativas. ¡Las tomas llegaron listas para la mezcla!',
    projectType: 'Grabación Remota de Batería'
  },
  {
    id: 'test-2',
    name: 'Mariana Gómez',
    role: 'Cantautora & Directora de Producción',
    bandOrStudio: 'Solo Artist (Pop Rock)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Contraté el servicio de mezcla y mastering para 3 sencillos. Maxi entendió el concepto sonoro desde la primera revisión. Mi música ahora suena potente, clara y con un ponche impresionante en Spotify.',
    projectType: 'Mezcla & Mastering'
  },
  {
    id: 'test-3',
    name: 'Federico M.',
    role: 'Ingeniero de Mezcla',
    bandOrStudio: 'SoundWave Studios Madrid',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Compré la plantilla de Cubase y la librería Punch Rock Drums. Aumentaron exponencialmente la velocidad con la que entrego mis maquetas a clientes. Súper recomendado.',
    projectType: 'Tienda & Samples'
  }
];

export const GEAR_LIST: GearItem[] = [
  {
    id: 'gear-1',
    category: 'Baterías & Redoblantes',
    name: 'Mapex Pro Mars Series (Años 80s)',
    details: 'Medidas: Bombo 22"x16", Toms de 12" y 16", Tambor 14"x6.5". Tono profundo y amplio. Ideal para Rock, Pop, Indie y producciones que busquen cuerpo grave y presencia orgánica.'
  },
  {
    id: 'gear-2',
    category: 'Baterías & Redoblantes',
    name: 'Sonor Essential Force',
    details: 'Medidas: Bombo 22"x20", Toms de 10", 12" y 14". Definición quirúrgica y armónicos controlados. Ideal para Funk, Folklore, Pop moderno y canciones con carga electrónica.'
  },
  {
    id: 'gear-3',
    category: 'Baterías & Redoblantes',
    name: 'Ludwig Supraphonic 14"x6.5" Aluminio & Cajas de Latón/Madera',
    details: 'Tambor Ludwig Supraphonic 14"x6.5" de aluminio repujado, cajas de latón y arce para respuesta seca, crujiente y versátil.'
  },
  {
    id: 'gear-4',
    category: 'Platos / Platillos',
    name: 'Set Profesional Zildjian & Sabian',
    details: 'Ride Zildjian Z Custom 20", Crash Zildjian A Custom 16", Zildjian K Dark Thin Crash 18", Hi-Hats Sabian XS20 14".'
  },
  {
    id: 'gear-5',
    category: 'Micrófonos',
    name: 'Set de Microfonía Shure, AKG & Audio-Technica',
    details: 'Shure SM57 (Snare), Beta 52 / Solomon Sub-Kick (Kick), AKG C414 / D112, condensadores Audio-Technica para Overheads y Room Ambience A/B.'
  },
  {
    id: 'gear-6',
    category: 'Preamps & Convertidores',
    name: 'Focusrite Pro Preamps & Convertidores HD',
    details: 'Preamplificadores analógicos Focusrite Pro para capturar transitorios ultra limpios con conversión en alta definición 24-bit / 48kHz - 96kHz.'
  },
  {
    id: 'gear-7',
    category: 'Monitoreo & Acústica',
    name: 'Estudio Acondicionado & DAW Pro Tools',
    details: 'Sala tratada acústicamente para capturar respuestas de ambiente limpias y controladas. Sistema de grabación principal Pro Tools.'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'q-101',
    date: '11 Ago 2026',
    clientName: 'Alejandro Valenzuela',
    clientEmail: 'ale.valenzuela@gmail.com',
    clientPhone: '+54 9 11 4589-2310',
    serviceId: 'remote-drums',
    serviceTitle: 'Grabación Remota de Batería',
    genre: 'Rock Alternativo',
    songCount: 3,
    projectDetails: 'Buscamos un sonido potente similar a Foo Fighters / Royal Blood. Tenemos maquetas listas con mapa de tempo e instrumentos grabados con click.',
    referenceLinks: 'https://open.spotify.com/track/example-foo-fighters',
    budgetUSD: 360,
    status: 'Pendiente'
  },
  {
    id: 'q-102',
    date: '08 Ago 2026',
    clientName: 'Carla Rossi',
    clientEmail: 'carla@produccionesmusic.es',
    serviceId: 'mixing',
    serviceTitle: 'Mezcla Analógica & Híbrida',
    genre: 'Pop Rock',
    songCount: 1,
    projectDetails: 'Sencillo promocional listo para radio. Baterías grabadas previamente, requerimos suma analógica y balance de voces.',
    budgetUSD: 150,
    status: 'En Revisión'
  }
];
