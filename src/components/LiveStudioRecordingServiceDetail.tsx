import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service, AudioTrack } from '../types';
import {
  ArrowLeft,
  Sliders,
  ArrowRight,
  Radio,
  Mic,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Award,
  Music,
  CheckCircle2,
  ShieldCheck,
  Disc,
  HelpCircle,
  Volume2
} from 'lucide-react';

// Authentic images provided in assets/images/grabacion_vivo_estudio
import studioImg from '../../assets/images/grabacion_vivo_estudio/IMG_2897.JPG.jpeg';
import marioBreuerImg from '../../assets/images/grabacion_vivo_estudio/IMG_3215.JPG.jpeg';
import recordingRigImg from '../../assets/images/grabacion_vivo_estudio/IMG_3219.JPG.jpeg';
import ponchoStageImg from '../../assets/images/grabacion_vivo_estudio/IMG_4583.JPG.jpeg';
import ponchoArtistsImg from '../../assets/images/grabacion_vivo_estudio/IMG_4681.JPG.jpeg';
import cineteatroCatamarcaImg from '../../assets/images/grabacion_vivo_estudio/IMG_5715.JPG.jpeg';
import logoMaxi from '../../assets/images/logos/logo_maxi_negro.png';

interface LiveStudioRecordingServiceDetailProps {
  service: Service;
  onOpenQuote: (serviceId: string) => void;
  isPlaying?: boolean;
  currentTrack?: AudioTrack | null;
  onTogglePlay?: (track: AudioTrack) => void;
}

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  location: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'studio-session',
    image: studioImg,
    title: 'Grabación Profesional en Estudio',
    subtitle: 'Captación de Batería & Acústica Controlada',
    badge: 'Sesión en Estudio',
    description: 'Entorno tratado acústicamente con microfonía multipista calibrada para captar la respuesta orgánica, el golpe y la dinámica precisa de cada instrumento.',
    location: 'Estudio de Grabación'
  },
  {
    id: 'mario-breuer',
    image: marioBreuerImg,
    title: 'Sesión con el Mtro. Mario Breuer',
    subtitle: 'Ingeniería de Audio al Máximo Nivel',
    badge: 'Hito de Prestigio',
    description: 'Despliegue de nuestro equipamiento en locación donde grabó el legendario ingeniero de grabación y mastering Mario Breuer (referente histórico del rock argentino y latinoamericano).',
    location: 'Sesión Especial en Recinto'
  },
  {
    id: 'mobile-rig',
    image: recordingRigImg,
    title: 'Sistema de Grabación en Rack Móvil',
    subtitle: 'Hardware de Alta Gama Desplegado en Locación',
    badge: 'Equipamiento Móvil',
    description: 'Rack móvil equipado con preamplificadores, conversores de alta resolución, splits aislados y sistema de redundancia transportado especialmente para sesiones en vivo y externas.',
    location: 'Sistema Móvil en Rack'
  },
  {
    id: 'poncho-stage',
    image: ponchoStageImg,
    title: 'Fiesta Nacional del Poncho 2026',
    subtitle: 'Escenario "El Patio" – Captura Multipista en Vivo',
    badge: 'Festival en Vivo',
    description: 'Grabación multitrack en vivo en uno de los festivales más convocantes del país, registrando espectáculos completos con alta fidelidad y la energía del público.',
    location: 'Fiesta del Poncho, Escenario El Patio'
  },
  {
    id: 'poncho-artists',
    image: ponchoArtistsImg,
    title: 'Multitrack de Múltiples Artistas',
    subtitle: 'Registro en Directo y Dinámica de Escenario',
    badge: 'Producción en Vivo',
    description: 'Captación continua de diferentes bandas y solistas con splits analógicos dedicados, asegurando pistas limpias e independientes del sonido de sala (PA).',
    location: 'Fiesta del Poncho, Escenario El Patio'
  },
  {
    id: 'cine-teatro',
    image: cineteatroCatamarcaImg,
    title: 'Cine Teatro Catamarca',
    subtitle: 'Grabación en Vivo en Sala Teatral Histórica',
    badge: 'Teatro & Acústica',
    description: 'Registro sonoro en una sala clásica de prestigio arquitectónico y acústico, capturando micrófonos de sala para preservar la calidez y reverberación natural del teatro.',
    location: 'Cine Teatro Catamarca'
  }
];

const FAQS = [
  {
    question: '¿Cómo se realiza la grabación en vivo sin afectar el sonido de sala ni a los músicos?',
    answer: 'Utilizamos splitters analógicos pasivos con aislamiento galvánico por transformador. Esto divide la señal de cada micrófono del escenario en dos caminos completamente independientes: uno va a la consola de sala/monitores del evento y el otro ingresa directamente a nuestro sistema de grabación. De esta manera no se genera ruido, bucles de masa (hum) ni interferencia alguna con el show.'
  },
  {
    question: '¿Cuántos canales simultáneos pueden grabar en vivo o en estudio?',
    answer: 'Contamos con un sistema multicanal modular capaz de registrar hasta 32 canales independientes en simultáneo en alta resolución (24-bit / 48kHz o 96kHz), cubriendo desde bandas completas con batería hiper-microfoneada hasta formaciones orquestales, percusiones y solistas.'
  },
  {
    question: '¿Pueden trasladar el equipamiento a un recinto o teatro específico fuera del estudio?',
    answer: 'Sí, contamos con un sistema de grabación móvil en rack (flight-cases profesionales) especialmente diseñado para ser transportado a teatros, salas de ensayo, festivales o locaciones singulares. Llevamos preamps, conversores, cableado multicore, micrófonos y monitoreo propio.'
  },
  {
    question: '¿En qué formato y soporte se entrega el material grabado?',
    answer: 'Una vez finalizada la sesión o el show, entregamos todos los tracks individuales en formato WAV sin compresión (24-bit / 48kHz o 96kHz), rotulados de forma estándar, alineados en fase y listos para importar en cualquier DAW (Pro Tools, Cubase, Reaper, Ableton, Logic). Además, incluimos una mezcla testigo estéreo para escucha inmediata.'
  },
  {
    question: '¿Se puede contratar también la mezcla y masterización del material grabado?',
    answer: 'Por supuesto. Podemos ocuparnos del ciclo completo: captación multitrack en vivo/estudio, edición, afinación si se requiere, mezcla estéreo y mastering para plataformas digitales (Spotify, Apple Music, YouTube) o lanzamientos discográficos.'
  }
];

export const LiveStudioRecordingServiceDetail: React.FC<LiveStudioRecordingServiceDetailProps> = ({
  service,
  onOpenQuote,
}) => {
  const navigate = useNavigate();

  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 min-h-screen pb-20">

      {/* 1. HERO SECTION CON FONDO ELEGANTE */}
      <section className="relative overflow-hidden bg-zinc-950 text-white min-h-[520px] flex items-center border-b border-zinc-800/80 mb-12">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={marioBreuerImg}
            alt="Grabación de Audio en Estudio y en Vivo"
            className="w-full h-full object-cover object-center scale-105 filter blur-[2px]"
          />
          {/* Capas oscuras y viñeta para legibilidad */}
          <div className="absolute inset-0 bg-zinc-950/85 backdrop-contrast-110" />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/45" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-primary/20 blur-[150px] pointer-events-none rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 space-y-8">
          {/* Header Bar: Botón de Regreso y Logo */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate('/servicios')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors bg-zinc-900/80 border border-zinc-700/80 px-4 py-2 rounded-full backdrop-blur-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Servicios</span>
            </button>

            <div className="hidden sm:flex items-center gap-2.5 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full backdrop-blur-md">
              <img src={logoMaxi} alt="Maxi Alzugaray" className="h-5 w-auto object-contain invert" />
              <span className="text-xs font-bold text-zinc-200 tracking-tight">MAXI ALZUGARAY · AUDIO & PRODUCCIÓN</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-primary text-zinc-950 font-bold text-xs uppercase tracking-wider">
                Captación Profesional · Estudio & On-Location
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-primary" />
                <span>Multitrack en Vivo & Teatros</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.1] drop-shadow-md">
              Grabación de Audio <br className="hidden sm:inline" />
              <span className="text-primary">en Estudio y en Vivo</span>
            </h1>

            <p className="text-zinc-200 text-base sm:text-xl font-normal leading-relaxed max-w-3xl drop-shadow-xs">
              Captación sonora multicanal de máxima fidelidad acústica y dinámica. Desarrollamos sesiones en nuestro{' '}
              <strong className="text-white font-semibold">estudio de grabación</strong> y trasladamos nuestro{' '}
              <strong className="text-primary font-semibold">sistema móvil de alta gama</strong> a teatros, festivales y recintos para registrar conciertos y producciones con estándares de clase internacional.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl">
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Resolución Máxima</span>
                <span className="text-base font-bold text-white">24-bit / 96kHz</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Arquitectura de Señal</span>
                <span className="text-base font-bold text-primary">Splits Aislados</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Equipamiento</span>
                <span className="text-base font-bold text-white">Rack Móvil & Estudio</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Entregables</span>
                <span className="text-base font-bold text-primary">WAVs Multitrack</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuote(service.id)}
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar Cotización de Grabación</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#casos-destacados"
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-white font-semibold text-sm backdrop-blur-md transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-primary" />
                <span>Ver Trabajos & Galería Vertical</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* 2. SECCIÓN 1: GRABACIÓN EN ESTUDIO (IMG_2897) */}
        <section className="p-6 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Columna Imagen Vertical (Studio) */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setLightboxIndex(0)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-sm w-full aspect-[3/4]"
              >
                <img
                  src={studioImg}
                  alt="Grabación en Estudio - Maxi Alzugaray"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[11px] font-bold text-primary flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Estudio de Grabación</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-wider text-zinc-300 font-semibold block">Captación Acústica</span>
                  <h3 className="text-white font-bold text-lg drop-shadow-sm">Sesión en Sala Tratada</h3>
                  <p className="text-zinc-300 text-xs mt-1">Microfonía multipista y posicionamiento milimétrico</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-primary text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Ampliar Fotografía
                  </span>
                </div>
              </div>
            </div>

            {/* Columna Texto y Especificaciones */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <Mic className="w-4 h-4" />
                  <span>Acústica Controlada & Máxima Fidelidad</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  Grabación en Estudio: El Sonido que Define tu Proyecto
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  En el estudio cuidamos cada eslabón de la cadena de audio para que tus instrumentos suenen con cuerpo, definición y profundidad natural. Desde la puesta a punto acústica del instrumento (parches, afinación, cuerdas y calibres) hasta la microfonía y preamplificación analógica.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Microfonía Multipista Calibrada</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Uso de micrófonos dinámicos, de condensador y de cinta colocados en puntos óptimos para coherencia de fase y dinámica real.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Tomas Sin Compromisos</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Monitoreo individual sin latencia en auriculares para que cada músico toque cómodo, con la referencia perfecta y máxima expresividad.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Ambiente & Room Microphones</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Captura del aire de la sala para obtener una profundidad espacial tridimensional que no se logra con plugins artificiales.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Formatos Listos para Mezcla</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Entregamos stems y multitrack organizados, rotulados y alineados, listos para enviar a cualquier ingeniero de mezcla del mundo.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. SECCIÓN 2: HITO DESTACADO - SESIÓN CON MARIO BREUER & RACK MÓVIL (IMG_3215 & IMG_3219) */}
        <section id="casos-destacados" className="p-6 sm:p-10 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] pointer-events-none rounded-full" />

          {/* Encabezado del Hito */}
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Hito de Prestigio · Rig Móvil Profesional</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Equipamiento Desplegado para la Sesión del Mtro. Mario Breuer
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Tuvimos el inmenso honor de trasladar y configurar todo nuestro sistema de grabación multicanal en un recinto donde grabó el reconocido ingeniero de grabación y mastering <strong className="text-white font-semibold">Mario Breuer</strong>, una de las leyendas vivientes de la producción musical en habla hispana (Charly García, Soda Stereo, Patricio Rey y sus Redonditos de Ricota, Sumo, Fito Páez).
            </p>
          </div>

          {/* Tarjetas Verticales de las 2 Imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Foto 1: Mario Breuer en acción */}
            <div
              onClick={() => setLightboxIndex(1)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-lg flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                <img
                  src={marioBreuerImg}
                  alt="Mario Breuer grabando con nuestro equipamiento"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[11px] font-bold text-primary flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Mario Breuer en Control</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-primary text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Ver en Pantalla Completa
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2 bg-zinc-900/90">
                <h4 className="font-bold text-white text-base">Sesión de Grabación con Mario Breuer</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Registro en vivo con el legendario ingeniero argentino. Una prueba irrefutable de que nuestra cadena de audio y setup técnico responden con la máxima solvencia y exigencia profesional.
                </p>
              </div>
            </div>

            {/* Foto 2: Sistema de Grabación en Rack */}
            <div
              onClick={() => setLightboxIndex(2)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-lg flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                <img
                  src={recordingRigImg}
                  alt="Sistema de Grabación en Rack Móvil"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[11px] font-bold text-primary flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Rack de Grabación Móvil</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-primary text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Ver en Pantalla Completa
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2 bg-zinc-900/90">
                <h4 className="font-bold text-white text-base">Sistema Móvil de Alta Definición</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  El sistema montado y llevado al recinto: interfaces multicanal, preamplificadores de bajo ruido y respaldo de almacenamiento dual para asegurar cada segundo de toma sin pérdida de datos.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonio / Destacado de Audio */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-300 flex items-start gap-3 relative z-10">
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Estándar de calidad sin excusas:</strong> Transportar equipamiento a una locación y satisfacer las demandas de un referente como Mario Breuer exige una calibración estricta de ganancias, headroom holgado, cableado de grado touring y un orden operativo impecable. Ponemos este mismo rigor a disposición de tu proyecto musical.
            </p>
          </div>
        </section>

        {/* 4. SECCIÓN 3: EN VIVO EN FESTIVALES - FIESTA DEL PONCHO (IMG_4583 & IMG_4681) */}
        <section className="p-6 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <Radio className="w-4 h-4" />
                <span>Multitrack en Vivo · Grandes Festivales</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Fiesta Nacional del Poncho: Escenario "El Patio"
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                Registramos en vivo a múltiples artistas en uno de los festivales más importantes de Argentina. Capturar un evento masivo exige velocidad de adaptación, cambios ágiles entre bandas y un aislamiento de señal que garantice pistas puras sin ruido de sala.
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shrink-0 shadow-2xs">
              <span className="text-primary font-bold">Múltiples Artistas</span> Registrados en Directo
            </div>
          </div>

          {/* Grilla Vertical 2 Fotos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Foto 1: Escenario El Patio */}
            <div
              onClick={() => setLightboxIndex(3)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                <img
                  src={ponchoStageImg}
                  alt="Fiesta del Poncho - Escenario El Patio"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[11px] font-bold text-primary flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>Escenario "El Patio"</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-bold text-base">La Vibra del Directo & Convocatoria</h4>
                  <p className="text-xs text-zinc-300 mt-1">Captura de micrófonos de escenario y ambiente de público</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-primary text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Ampliar Fotografía
                  </span>
                </div>
              </div>
            </div>

            {/* Foto 2: Grabando a varios artistas */}
            <div
              onClick={() => setLightboxIndex(4)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                <img
                  src={ponchoArtistsImg}
                  alt="Artistas en vivo en Fiesta del Poncho"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[11px] font-bold text-primary flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5" />
                  <span>Multitrack Artistas</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-bold text-base">Pistas Limpias Multicanal</h4>
                  <p className="text-xs text-zinc-300 mt-1">Independencia total del sistema de sonido en vivo</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-primary text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Ampliar Fotografía
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SECCIÓN 4: TEATROS HISTÓRICOS - CINE TEATRO CATAMARCA (IMG_5715) */}
        <section className="p-6 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Columna Texto */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  <span>Teatros & Espacios Emblemáticos</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  Grabación en Vivo en el Cine Teatro Catamarca
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Las salas teatrales poseen una acústica viva y una resonancia natural que ningún plugin puede emular. En el prestigioso <strong className="text-zinc-900 dark:text-white font-semibold">Cine Teatro Catamarca</strong> realizamos grabaciones multicanal que combinan la cercanía íntima de los instrumentos con la majestuosidad de la sala.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white">Microfonía de Sala dedicada (Room/Ambience)</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">Pares estéreo calibrados para inmortalizar la acústica del teatro y los aplausos del público.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white">Coordinación Total con Técnicos de Sala</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">Integración limpia con el personal de sonido e iluminación del teatro sin entorpecer el desarrollo del show.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white">Dinámica y Rango para Géneros Acústicos</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">Ideal para conciertos de música popular, folklore, tango, orquestas de cámara y bandas acústicas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Imagen Vertical (Cine Teatro Catamarca) */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div
                onClick={() => setLightboxIndex(5)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-sm w-full aspect-[3/4]"
              >
                <img
                  src={cineteatroCatamarcaImg}
                  alt="Grabación en Vivo Cine Teatro Catamarca"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[11px] font-bold text-primary flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Cine Teatro Catamarca</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-wider text-zinc-300 font-semibold block">Patrimonio & Acústica</span>
                  <h3 className="text-white font-bold text-lg drop-shadow-sm">Concierto en Directo</h3>
                  <p className="text-zinc-300 text-xs mt-1">Calidez espacial y rango dinámico natural</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-primary text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Ampliar Fotografía
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. GALERÍA VERTICAL INTERACTIVA (6 IMÁGENES) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block">Galería Visual Vertical</span>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Producciones, Locaciones & Equipamiento
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Haz clic en cualquier imagen para abrir el visor en alta resolución con información detallada de cada sesión.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md aspect-[3/4]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/95 via-zinc-950/40 to-transparent" />
                <div className="absolute top-2.5 left-2.5 bg-zinc-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-zinc-800 text-[10px] font-bold text-primary">
                  {item.badge}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-bold text-xs sm:text-sm line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">{item.location}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="w-9 h-9 rounded-full bg-primary text-zinc-950 flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ESPECIFICACIONES TÉCNICAS & WORKFLOW */}
        <section className="p-8 sm:p-10 rounded-3xl bg-zinc-900 text-white border border-zinc-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block">Infraestructura & Confiabilidad</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Flujo Técnico de Grabación
            </h2>
            <p className="text-zinc-400 text-sm">
              Tanto en estudio como en vivo, garantizamos seguridad de datos, transparencia en la señal y cero contratiempos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                01
              </div>
              <h4 className="font-bold text-base text-white">Aislamiento & Split Pasivo</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Separamos eléctricamente cada canal para evitar bucles de masa (hum) o caídas de tensión entre el sistema de sonido del evento y la grabación.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                02
              </div>
              <h4 className="font-bold text-base text-white">Redundancia de Grabación</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                En shows en vivo no existen segundas tomas. Grabamos simultáneamente en medios de almacenamiento primario y espejo de respaldo en tiempo real.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                03
              </div>
              <h4 className="font-bold text-base text-white">Entrega Pro & Mix Testigo</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Exportación multitrack 24-bit en WAV sin proceso innecesario para preservar el rango dinámico, acompañado de una mezcla estéreo de referencia rápida.
              </p>
            </div>
          </div>
        </section>

        {/* 8. PREGUNTAS FRECUENTES (FAQS) */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block">Dudas Comunes</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
              Todo lo que necesitas saber antes de contratar una sesión de grabación en estudio o cobertura en vivo.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full py-4 px-5 text-left font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      openFaqIndex === idx ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 9. BANNER CTA / COTIZACIÓN */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-60 bg-primary/20 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-primary text-zinc-950 font-bold text-xs uppercase tracking-wider inline-block">
              Planifica tu Próxima Grabación
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              ¿Listo para captar tu sonido con máxima fidelidad?
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Escríbenos contándonos sobre tu banda, concierto, fecha de show o sesión de estudio. Coordinaremos el rider técnico, canales requeridos y presupuesto a medida.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onOpenQuote(service.id)}
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-xl hover:shadow-primary/30 transition-all inline-flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar Presupuesto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/portfolio')}
                className="px-7 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-sm transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Disc className="w-4 h-4 text-primary" />
                <span>Explorar Portfolio Completo</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* 10. LIGHTBOX MODAL EN FORMATO VERTICAL */}
      {lightboxIndex !== null && activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Contenedor del Modal */}
          <div
            className="relative max-w-3xl w-full flex flex-col items-center max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de Cierre */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-20 w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Botón Anterior */}
            <button
              onClick={prevLightbox}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:text-primary hover:bg-zinc-800 flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Anterior (Flecha izquierda)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Botón Siguiente */}
            <button
              onClick={nextLightbox}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/80 border border-zinc-700 text-white hover:text-primary hover:bg-zinc-800 flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Siguiente (Flecha derecha)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Fotografía Vertical Optimizada */}
            <div className="relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl flex items-center justify-center max-h-[72vh]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[72vh] w-auto object-contain rounded-2xl select-none"
              />
            </div>

            {/* Información al pie del visor */}
            <div className="mt-3 text-center space-y-1 max-w-xl px-4">
              <div className="inline-flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold uppercase tracking-wider">
                  {activeItem.badge}
                </span>
                <span className="text-zinc-400 text-xs font-semibold">
                  {lightboxIndex + 1} de {GALLERY_ITEMS.length}
                </span>
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg">
                {activeItem.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
