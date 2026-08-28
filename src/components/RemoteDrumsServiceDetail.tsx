import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service, AudioTrack } from '../types';
import { INITIAL_AUDIO_TRACKS, INITIAL_TESTIMONIALS } from '../data/initialData';
import {
  ArrowLeft,
  Sliders,
  ArrowRight,
  Play,
  Pause,
  Music2,
  Star,
  Globe,
  ChevronDown,
  HelpCircle,
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';

import mapexImg1 from '../../assets/images/baterias/bateria_mapex_promars_1.jpeg';
import mapexImg2 from '../../assets/images/baterias/bateria_mapex_promars_2.jpeg';
import mapexImg3 from '../../assets/images/baterias/bateria_mapex_promars_3.jpeg';

import sonorImg1 from '../../assets/images/baterias/bateria_sonor_01.jpeg';
import sonorImg2 from '../../assets/images/baterias/bateria_sonor_2.jpeg';
import sonorImg3 from '../../assets/images/baterias/bateria_sonor_3.jpeg';

import drumsMapImg from '../../assets/images/otros/drums_delivered_to_map.jpg';

interface RemoteDrumsServiceDetailProps {
  service: Service;
  onOpenQuote: (serviceId: string) => void;
  isPlaying?: boolean;
  currentTrack?: AudioTrack | null;
  onTogglePlay?: (track: AudioTrack) => void;
}

const INTERNATIONAL_COUNTRIES = [
  { flagUrl: 'https://flagcdn.com/w40/us.png', name: 'Estados Unidos' },
  { flagUrl: 'https://flagcdn.com/w40/ie.png', name: 'Irlanda' },
  { flagUrl: 'https://flagcdn.com/w40/is.png', name: 'Islandia' },
  { flagUrl: 'https://flagcdn.com/w40/es.png', name: 'España' },
  { flagUrl: 'https://flagcdn.com/w40/fi.png', name: 'Finlandia' },
  { flagUrl: 'https://flagcdn.com/w40/ar.png', name: 'Argentina' },
  { isWorld: true, name: 'Y más países' }
];

const FAQS = [
  {
    question: '¿Cómo vas a recibir los tracks?',
    answer: 'Recibirás entre 8 y 10 canales en formato WAV por cada toma de batería realizada.\n\nPrimero, me envías las pistas de tus canciones junto con el BPM de cada una. Si tenés una programación de batería o alguna referencia sonora, podés incluirla.\n\nEn caso de que todavía no tengas una idea definida, podemos trabajarla juntos hasta encontrar la interpretación que mejor se adapte al estilo y la energía de tu música.\n\nUna vez finalizada la grabación, te envío los tracks por separado en formato WAV (24-bit / 48kHz - 96kHz), listos para incorporar a tu DAW y comenzar la mezcla.'
  },
  {
    question: '¿Se pueden hacer devoluciones o revisiones?',
    answer: 'Sí, por supuesto. Durante el proceso de grabación te enviaré muestras rápidas en MP3 para que escuches y confirmes cada toma antes de la entrega final del multitrack.'
  },
  {
    question: '¿Puedo hacer correcciones una vez que recibí los tracks?',
    answer: 'Una vez aprobadas las muestras y entregado el multitrack, el trabajo se considera finalizado. Si más adelante querés realizar cambios estructurales o nuevas tomas, podemos agendar una nueva sesión como una producción adicional.'
  }
];

export const RemoteDrumsServiceDetail: React.FC<RemoteDrumsServiceDetailProps> = ({
  service,
  onOpenQuote,
  isPlaying = false,
  currentTrack = null,
  onTogglePlay
}) => {
  const navigate = useNavigate();
  const [activeMapexPhoto, setActiveMapexPhoto] = useState<string>(mapexImg1);
  const [activeSonorPhoto, setActiveSonorPhoto] = useState<string>(sonorImg1);

  // Lightbox Modal state
  const [lightboxData, setLightboxData] = useState<{
    images: string[];
    currentIndex: number;
    title: string;
  } | null>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const mapexPhotos = [mapexImg1, mapexImg2, mapexImg3];
  const sonorPhotos = [sonorImg1, sonorImg2, sonorImg3];

  const openMapexLightbox = (index: number) => {
    setLightboxData({
      images: mapexPhotos,
      currentIndex: index,
      title: 'Batería Mapex Pro Mars (Años 80s)'
    });
  };

  const openSonorLightbox = (index: number) => {
    setLightboxData({
      images: sonorPhotos,
      currentIndex: index,
      title: 'Batería Sonor Essential Force'
    });
  };

  const openMapLightbox = () => {
    setLightboxData({
      images: [drumsMapImg],
      currentIndex: 0,
      title: 'Mapa Mundial de Baterías Grabadas & Enviadas de Forma Remota'
    });
  };

  const nextLightboxImage = () => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      currentIndex: (lightboxData.currentIndex + 1) % lightboxData.images.length
    });
  };

  const prevLightboxImage = () => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      currentIndex: (lightboxData.currentIndex - 1 + lightboxData.images.length) % lightboxData.images.length
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 min-h-screen pb-20">

      {/* 1. Full-width Hero Header with Dark Overlay */}
      <section className="relative overflow-hidden bg-zinc-950 text-white min-h-[480px] flex items-center border-b border-zinc-800/80 mb-12">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={service.image || mapexImg1}
            alt="Grabación de Baterías Remotas"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Dark Overlay Layer */}
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-contrast-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-primary/20 blur-[150px] pointer-events-none rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 space-y-8">
          {/* Back Button */}
          <div>
            <button
              onClick={() => navigate('/servicios')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors bg-zinc-900/80 border border-zinc-700/80 px-4 py-2 rounded-full backdrop-blur-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Servicios</span>
            </button>
          </div>

          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-primary text-zinc-950 font-bold text-xs uppercase tracking-wider">
                Servicio Principal / Flagship
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Envíos Internacionales Multitrack</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.1] drop-shadow-md">
              Grabación de <br className="hidden sm:inline" />
              <span className="text-primary">Baterías Remotas & Online</span>
            </h1>

            <p className="text-zinc-200 text-base sm:text-xl font-normal leading-relaxed max-w-3xl drop-shadow-xs">
              Grabo la batería de tu canción desde mi studio profesional. Aportamos musicalidad, energía y un sonido auténtico a medida de tu producción, entregando entre 8 y 10 canales en formato WAV (24-bit / 48kHz - 96kHz).
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl">
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Entrega Estimada</span>
                <span className="text-base font-bold text-white">3 a 7 Días Hábiles</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Multitrack WAV</span>
                <span className="text-base font-bold text-primary">8 - 10 canales</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Resolución Audio</span>
                <span className="text-base font-bold text-white">24bit / 48kHz - 96kHz</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Muestras de audio</span>
                <span className="text-base font-bold text-primary">Incluidas en MP3</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuote(service.id)}
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar una Sesión / Cotización</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/portfolio')}
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-white font-semibold text-sm backdrop-blur-md transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Music2 className="w-4 h-4 text-primary" />
                <span>Ver Muestras de Audio en Vivo</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* 2. Global Reach Section (Países & Mapa de envíos de baterías grabadas) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            {/* Text & Country Flags */}
            <div className="space-y-6 max-w-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <Globe className="w-4 h-4" />
                  <span>Alcance Global & Producciones Remotas</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  Baterías grabadas para artistas de todo el mundo
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
                  He tenido la oportunidad de grabar sesiones remotas para discos, singles y producciones independientes en múltiples países, adaptándome a diferentes culturas sonoras y exigencias de producción.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {INTERNATIONAL_COUNTRIES.map((country, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2.5 shadow-2xs"
                  >
                    {country.isWorld ? (
                      <Globe className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <img
                        src={country.flagUrl}
                        alt={country.name}
                        className="w-5 h-3.5 object-cover rounded-xs border border-zinc-200/60 dark:border-zinc-800 shrink-0"
                      />
                    )}
                    <span>{country.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* World Map Image Card */}
            <div className="w-full lg:w-120 shrink-0">
              <div
                onClick={openMapLightbox}
                className="relative rounded-2xl overflow-hidden bg-[#e8e8ed] dark:bg-zinc-950 border border-zinc-300/80 dark:border-zinc-800 shadow-xl group cursor-pointer hover:border-primary/50 transition-all"
              >
                <img
                  src={drumsMapImg}
                  alt="Mapa de Baterías Grabadas y Enviadas de Forma Remota"
                  className="w-full h-auto max-h-85 rounded-3xl  object-contain p-2 transition-all duration-300 group-hover:scale-102"
                />

                {/* Hover Overlay Badge */}
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                  <div className="px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 backdrop-blur-md flex items-center gap-2 shadow-xl">
                    <ZoomIn className="w-4 h-4 text-primary" />
                    <span>Ver mapa en pantalla completa</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. FEATURED DRUM KITS SHOWCASE WITH REAL PHOTOS & CONTAINED FITTING */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Backline disponible para sesiones presenciales y remotas</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Baterias y Gear Disponible
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Kit 1: Mapex Pro Mars */}
            <div className="bg-[#f5f5f7] dark:bg-zinc-900/90 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden flex flex-col justify-between shadow-lg group hover:border-primary/50 transition-all">

              {/* Photo Viewer Container with object-contain */}
              <div className="space-y-3 p-6 pb-0">
                <div
                  onClick={() => openMapexLightbox(mapexPhotos.indexOf(activeMapexPhoto))}
                  className="relative h-72 sm:h-88 rounded-2xl overflow-hidden bg-[#e8e8ed] dark:bg-zinc-950 border border-zinc-300/80 dark:border-zinc-800 flex items-center justify-center cursor-pointer group/img"
                >
                  {/* Subtle blur background for aesthetic fill */}
                  <img
                    src={activeMapexPhoto}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 pointer-events-none"
                  />
                  {/* Main Contained Image */}
                  <img
                    src={activeMapexPhoto}
                    alt="Batería Mapex Pro Mars Años 80s"
                    className="relative z-10 max-h-full max-w-full object-contain p-2 transition-all duration-300 group-hover/img:scale-102"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-primary text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-md">
                      Tonos Graves & Sonido Grande
                    </span>
                  </div>

                  {/* Expand Icon Hover Overlay */}
                  <div className="absolute inset-0 z-20 bg-zinc-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                    <div className="px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 backdrop-blur-md flex items-center gap-2 shadow-xl">
                      <ZoomIn className="w-4 h-4 text-primary" />
                      <span>Ver imagen completa</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 pt-1">
                  {mapexPhotos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMapexPhoto(img)}
                      onDoubleClick={() => openMapexLightbox(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden bg-[#e8e8ed] dark:bg-zinc-950 border-2 transition-all cursor-pointer ${activeMapexPhoto === img ? 'border-primary scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                      <img src={img} alt={`Mapex thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Kit Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                      Mapex Pro Mars (Años 80s)
                    </h3>
                    <button
                      onClick={() => openMapexLightbox(mapexPhotos.indexOf(activeMapexPhoto))}
                      className="p-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors cursor-pointer"
                      title="Ver fotos en pantalla completa"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider">
                    Bombo 22"x16" • Toms 12" y 16" • Tambor 14"x6.5"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  La uso mucho para estilos como <strong>Rock, Pop, Indie</strong> o para canciones que busquen tonos graves, profundos y un sonido de amplio volumen y presencia orgánica.
                </p>

                <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🎸 Rock</span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🎤 Pop</span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🎨 Indie</span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🔊 Tonos Graves</span>
                </div>
              </div>

            </div>

            {/* Kit 2: Sonor Essential Force */}
            <div className="bg-[#f5f5f7] dark:bg-zinc-900/90 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden flex flex-col justify-between shadow-lg group hover:border-primary/50 transition-all">

              {/* Photo Viewer Container with object-contain */}
              <div className="space-y-3 p-6 pb-0">
                <div
                  onClick={() => openSonorLightbox(sonorPhotos.indexOf(activeSonorPhoto))}
                  className="relative h-72 sm:h-88 rounded-2xl overflow-hidden bg-[#e8e8ed] dark:bg-zinc-950 border border-zinc-300/80 dark:border-zinc-800 flex items-center justify-center cursor-pointer group/img"
                >
                  {/* Subtle blur background for aesthetic fill */}
                  <img
                    src={activeSonorPhoto}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 pointer-events-none"
                  />
                  {/* Main Contained Image */}
                  <img
                    src={activeSonorPhoto}
                    alt="Batería Sonor Essential Force"
                    className="relative z-10 max-h-full max-w-full object-contain p-2 transition-all duration-300 group-hover/img:scale-102"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-primary text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-md">
                      Definición & Armónicos Controlados
                    </span>
                  </div>

                  {/* Expand Icon Hover Overlay */}
                  <div className="absolute inset-0 z-20 bg-zinc-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                    <div className="px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 backdrop-blur-md flex items-center gap-2 shadow-xl">
                      <ZoomIn className="w-4 h-4 text-primary" />
                      <span>Ver imagen completa</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 pt-1">
                  {sonorPhotos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSonorPhoto(img)}
                      onDoubleClick={() => openSonorLightbox(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden bg-[#e8e8ed] dark:bg-zinc-950 border-2 transition-all cursor-pointer ${activeSonorPhoto === img ? 'border-primary scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                      <img src={img} alt={`Sonor thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Kit Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                      Sonor Essential Force
                    </h3>
                    <button
                      onClick={() => openSonorLightbox(sonorPhotos.indexOf(activeSonorPhoto))}
                      className="p-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors cursor-pointer"
                      title="Ver fotos en pantalla completa"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider">
                    Bombo 22"x20" • Toms 10", 12" y 14"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Perfecta para estilos que necesiten <strong>buena definición y armónicos controlados</strong>. La uso mucho para géneros como <strong>Funk, Folklore, Pop</strong> o canciones con carga electrónica.
                </p>

                <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🎷 Funk</span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🪗 Folklore</span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🎧 Pop & Electrónica</span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">🎯 Definición</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4. SET DE PLATILLOS (CYMBALS SHOWCASE) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest block">
              Set de Platillos Profesional
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              Platillos Zildjian & Sabian en el Estudio
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Seleccionados minuciosamente para ofrecer un corte de frecuencias agudas brillante y musical sin saturar la mezcla.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">Ride 20"</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Zildjian Z Custom 20"</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Ping súper definido, campana potente y articulación rítmica destacada.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">Crash Main 16"</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Zildjian A Custom 16"</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Ataque brillante, explosión rápida y caída limpia de frecuencias.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">Crash Dark 18"</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Zildjian K Dark Thin 18"</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Complejidad armónica cálida y resonancia oscura de gran musicalidad.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">Hi-Hats 14"</span>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base">Sabian XS20 14"</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Chasquido seco, respuesta directa y articulación nítida de baqueta.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Audio Samples Player Showcase */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                Muestras de Grabación en Vivo
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Escuchá el ponche y la calidad de las baterías
              </h2>
            </div>

            <button
              onClick={() => navigate('/portfolio')}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              <span>Ver todas las muestras en el Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INITIAL_AUDIO_TRACKS.map((track) => {
              const isCurrentPlaying = currentTrack?.id === track.id && isPlaying;
              return (
                <div
                  key={track.id}
                  className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-4 hover:border-primary/50 transition-all group"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#e8e8ed] dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 shrink-0">
                    <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover opacity-80" />
                    <button
                      onClick={() => onTogglePlay && onTogglePlay(track)}
                      className={`absolute inset-0 m-auto w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${isCurrentPlaying
                        ? 'bg-primary text-zinc-950 scale-105 shadow-md shadow-primary/30'
                        : 'bg-white/90 text-zinc-900 hover:bg-primary hover:text-zinc-950'
                        }`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{track.genre} • {track.bpm} BPM</span>
                      <span className="text-[10px] text-zinc-500 font-semibold">96kHz HD</span>
                    </div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm truncate">{track.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{track.drumStyle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Modalidad de Trabajo (Visual 4-Step Process) */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Paso a Paso
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Modalidad de Trabajo
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
              Un flujo sencillo y acompañado en cada etapa de la producción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
              <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">1. Envío de Pistas & BPM</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                Me envías las pistas de tus canciones junto con el tempo (BPM). Si tenés una programación de batería o alguna referencia sonora, podés incluirla.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
              <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">2. Co-creación & Arreglos</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                En caso de que todavía no tengas una idea definida, trabajamos juntos hasta encontrar la interpretación que mejor se adapte al estilo de tu canción.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
              <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">3. Muestras MP3 de Revisión</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                Durante el proceso de grabación te envío muestras rápidas en MP3 para que escuches y confirmes cada toma antes de la entrega final.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
              <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">4. Entrega Multitrack 8-10 WAV</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                Una vez finalizada y aprobada la grabación, te envío los tracks por separado en formato WAV (24-bit / 48kHz - 96kHz), listos para incorporar a tu DAW.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Testimonials & Client Reviews */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Reseñas & Opiniones
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Lo que dicen productores & artistas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-primary/40" />
                  <div>
                    <h5 className="text-xs font-bold text-zinc-900 dark:text-white">{t.name}</h5>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.role} • <span className="text-primary">{t.bandOrStudio}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FAQ Accordion */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Preguntas Frecuentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span>Dudas sobre el servicio de Baterías Remotas</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-zinc-900 dark:text-white text-base sm:text-lg cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <div className={`p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-zinc-500'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 border-t border-zinc-200/60 dark:border-zinc-800/80">
                      <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-4 font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Final CTA Banner */}
        <section className="p-10 rounded-3xl bg-zinc-950 text-white border border-zinc-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-160 h-40 bg-primary/20 blur-[100px] pointer-events-none rounded-full" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              ¿Listo para empezar?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Dale la batería orgánica y el ponche que tu producción merece
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Hablemos sobre tu proyecto. Recibirás respuesta directa y asesoría en menos de 12 horas.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenQuote(service.id)}
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-lg hover:shadow-primary/30 transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar una Cotización</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* 10. LIGHTBOX FULLSCREEN MODAL */}
      {lightboxData && (
        <div
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-50 bg-black/90 dark:bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in"
        >
          {/* Lightbox Top Header Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl flex items-center justify-between text-white border-b border-zinc-800 pb-4 z-10"
          >
            <div>
              <h3 className="font-extrabold text-base sm:text-xl text-primary">{lightboxData.title}</h3>
              <p className="text-xs text-zinc-400">
                Foto {lightboxData.currentIndex + 1} de {lightboxData.images.length}
              </p>
            </div>

            <button
              onClick={() => setLightboxData(null)}
              className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-primary hover:text-zinc-950 text-white transition-all cursor-pointer"
              title="Cerrar (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Display with Navigation Arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center py-4 my-auto overflow-hidden"
          >
            {/* Prev Arrow Button */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-primary hover:text-zinc-950 text-white border border-zinc-700/80 transition-all cursor-pointer shadow-xl"
              title="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image display */}
            <img
              src={lightboxData.images[lightboxData.currentIndex]}
              alt={lightboxData.title}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl transition-all duration-300"
            />

            {/* Next Arrow Button */}
            <button
              onClick={nextLightboxImage}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-primary hover:text-zinc-950 text-white border border-zinc-700/80 transition-all cursor-pointer shadow-xl"
              title="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Thumbnails Strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 pt-2 z-10"
          >
            {lightboxData.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxData({ ...lightboxData, currentIndex: idx })}
                className={`relative w-20 h-14 rounded-xl overflow-hidden bg-zinc-900 border-2 transition-all cursor-pointer ${lightboxData.currentIndex === idx ? 'border-primary scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
