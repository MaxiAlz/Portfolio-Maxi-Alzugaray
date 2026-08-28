import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Sliders,
  Music2,
  Volume2,
  Disc,
  Drum,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AudioTrack } from '../types';

import heroEstudio from '../../assets/images/hearos/hearo_estudio.jpg';
import heroMicrofonos from '../../assets/images/hearos/hearo_microfonos.JPG';
import heroPalo from '../../assets/images/hearos/hearo_palo.jpg';

interface HeroProps {
  onOpenQuote: () => void;
  onNavigateTab: (tab: string) => void;
  featuredTrack: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack) => void;
}

const HERO_SLIDES = [
  {
    id: 'estudio',
    image: heroEstudio,
    tag: 'Estudio de Grabación',
    title: 'Acústica Calibrada & Sonido Real',
    description: 'Espacio de creación consciente, donde la experimentación y el detalle técnico están siempre al servicio de la música.'
  },
  {
    id: 'microfonos',
    image: heroMicrofonos,
    tag: 'Cadena de Microfonía',
    title: 'Microfonía & Preamplificación Pro',
    description: 'Cadena analógica de primera línea que garantiza presencia, pegada y claridad en cada producción.'
  },
  {
    id: 'palo',
    image: heroPalo,
    tag: 'Sesión & Performance',
    title: 'Baterías en Acción',
    description: 'Groove, versatilidad y pasión volcados en cada toma de grabación para elevar tu tema musical.'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onNavigateTab,
  featuredTrack,
  isPlaying,
  onTogglePlay
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      className="relative overflow-hidden bg-zinc-950 text-white pt-12 pb-20 border-b border-zinc-800/80 transition-colors duration-200 min-h-160 flex flex-col justify-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out transform ${idx === currentSlide
              ? 'opacity-100 scale-105'
              : 'opacity-0 scale-100 pointer-events-none'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Dark Overlay Layer (Capa para oscurecer la imagen y no perder legibilidad en las letras) */}
        <div className="absolute inset-0 bg-zinc-950/75 backdrop-contrast-110" />

        {/* Dynamic Gradient Backdrop */}
        <div className="absolute inset-0 bg-linear-to- from-zinc-950 via-zinc-950/60 to-zinc-950/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/40 to-zinc-950/90" />

        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-primary/20 blur-[140px] pointer-events-none rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Availability & Active Slide Tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-semibold text-primary shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>Sesiones de Batería Online · Ingeniería de Audio</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-medium text-zinc-200">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>{HERO_SLIDES[currentSlide].tag}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight uppercase text-white leading-[1.1] drop-shadow-md">
              Baterías, audio  <br className="hidden sm:inline" />
              <span className="text-primary">
                Pasión y carácter.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-zinc-200 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-xs">
              {HERO_SLIDES[currentSlide].description}
            </p>

            {/* CTA Buttons - Apple Pill Style */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-100 dark:text-zinc-950 font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Drum className="w-4 h-4 stroke-[2.5]" />
                Solicitar un servicio
              </button>

              <button
                onClick={() => onNavigateTab('portfolio')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-700/80 text-white font-semibold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Music2 className="w-4 h-4 text-primary" />
                Ver Muestras de audio
              </button>
            </div>

            {/* Carousel Controls & Feature Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/90 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xs">
                <button
                  onClick={handlePrevSlide}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90 cursor-pointer"
                  aria-label="Anterior imagen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide
                        ? 'w-7 bg-primary'
                        : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                        }`}
                      aria-label={`Ir a diapositiva ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextSlide}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90 cursor-pointer"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Feature Highlights */}
              <div className="flex items-center gap-6 text-xs font-medium text-zinc-300">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  <span>Estudio Profesional</span>
                </div>
                <div className="flex items-center gap-2">
                  <Disc className="w-4 h-4 text-primary" />
                  <span>Equipamiento Premium</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Studio Player Card Preview */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:shadow-primary/5">

              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-semibold text-zinc-200">
                    Muestra de Audio en Vivo
                  </span>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">
                  96kHz / 24bit
                </span>
              </div>

              {/* Cover & Play Controls */}
              <div className="mt-5 relative rounded-2xl overflow-hidden aspect-video bg-zinc-950 border border-zinc-800 group">
                <img
                  src={featuredTrack.coverImage}
                  alt={featuredTrack.title}
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to- from-zinc-950 via-zinc-950/30 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => onTogglePlay(featuredTrack)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer ${isPlaying
                      ? 'bg-primary text-zinc-950 scale-105 shadow-lg shadow-primary/30'
                      : 'bg-white/90 text-zinc-900 hover:bg-primary hover:text-zinc-950 scale-100 shadow-md'
                      }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Track Genre Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-[11px] font-semibold text-primary">
                  {featuredTrack.genre} • {featuredTrack.bpm} BPM
                </div>
              </div>

              {/* Track Info */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-zinc-100 text-base">{featuredTrack.title}</h4>
                  <p className="text-xs text-zinc-400 font-normal">{featuredTrack.artist}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Sintetizador Audio</span>
                </div>
              </div>

              {/* Waveform Animation */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80">
                <div className="flex items-center gap-1 h-7 justify-between px-1">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const heights = [30, 65, 45, 90, 75, 40, 85, 100, 60, 45, 80, 95, 50, 70, 85, 40, 90, 60, 75, 100, 50, 80, 35, 90, 65, 40, 80, 55];
                    const heightPercent = heights[i % heights.length];
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-primary' : 'bg-zinc-700'
                          }`}
                        style={{
                          height: isPlaying ? `${heightPercent}%` : '20%',
                        }}
                      />
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Minimalist Key Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-zinc-800/80">
          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 backdrop-blur-md text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">80+</span>
            <span className="text-xs text-zinc-400 font-medium tracking-wide mt-1 block">Canciones Producidas</span>
          </div>

          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 backdrop-blur-md text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">9+</span>
            <span className="text-xs text-zinc-400 font-medium tracking-wide mt-1 block">Años de Trayectoria</span>
          </div>

          {/* <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 backdrop-blur-md text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">96kHz</span>
            <span className="text-xs text-zinc-400 font-medium tracking-wide mt-1 block">Audio Multipista HD</span>
          </div> */}

          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 backdrop-blur-md text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">100%</span>
            <span className="text-xs text-zinc-400 font-medium tracking-wide mt-1 block">Personalizado para cada cancion</span>
          </div>
        </div>

      </div>
    </section>
  );
};
