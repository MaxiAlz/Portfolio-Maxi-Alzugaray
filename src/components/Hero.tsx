import React from 'react';
import { Play, Pause, Sliders, CheckCircle2, Music2, ShieldCheck, Sparkles, Volume2, Drumstick, FileAudio, AudioWaveform, Radio, RadioIcon, SoupIcon, Disc, Drum } from 'lucide-react';
import { AudioTrack } from '../types';

interface HeroProps {
  onOpenQuote: () => void;
  onNavigateTab: (tab: string) => void;
  featuredTrack: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onNavigateTab,
  featuredTrack,
  isPlaying,
  onTogglePlay
}) => {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pt-12 pb-20 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-primary/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Hero Text Content - Minimalist Apple Style */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Apple Style Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-primary shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Sesiones de Batería Online · Ingeniería de Audio</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight uppercase text-zinc-900 dark:text-white leading-[1.1]">
              Baterías, audio  <br className="hidden sm:inline" />
              <span className="text-primary">
                Pasion y carácter.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Espacio de creación consciente, donde la experimentación y el detalle técnico están siempre al servicio de la musica.
            </p>

            {/* CTA Buttons - Apple Pill Style */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-95"
              >
                <Drum className="w-4 h-4 stroke-[2.5]" />
                Solicitar un servicio
              </button>

              <button
                onClick={() => onNavigateTab('portfolio')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm transition-all flex items-center justify-center gap-2.5 active:scale-95"
              >
                <Music2 className="w-4 h-4 text-primary" />
                Ver Muestras de audio
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>Estudio Profesional</span>
              </div>
              <div className="flex items-center gap-2">
                <Disc className="w-4 h-4 text-primary" />
                <span>Equipamiento de Primer Nivel</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Studio Player Card Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">

              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                    Muestra de Audio en Vivo
                  </span>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  96kHz / 24bit
                </span>
              </div>

              {/* Cover & Play Controls */}
              <div className="mt-5 relative rounded-2xl overflow-hidden aspect-video bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group">
                <img
                  src={featuredTrack.coverImage}
                  alt={featuredTrack.title}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => onTogglePlay(featuredTrack)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 ${isPlaying
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
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur text-[11px] font-semibold text-primary">
                  {featuredTrack.genre} • {featuredTrack.bpm} BPM
                </div>
              </div>

              {/* Track Info */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{featuredTrack.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">{featuredTrack.artist}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-full">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Sintetizador Audio</span>
                </div>
              </div>

              {/* Waveform Animation */}
              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-1 h-7 justify-between px-1">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const heights = [30, 65, 45, 90, 75, 40, 85, 100, 60, 45, 80, 95, 50, 70, 85, 40, 90, 60, 75, 100, 50, 80, 35, 90, 65, 40, 80, 55];
                    const heightPercent = heights[i % heights.length];
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'
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

        {/* Minimalist Apple Key Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="bg-white dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">150+</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mt-1 block">Canciones Producidas</span>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">12+</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mt-1 block">Años de Trayectoria</span>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">96kHz</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mt-1 block">Audio Multipista HD</span>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block tracking-tight">100%</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mt-1 block">Calidad Garantizada</span>
          </div>
        </div>

      </div>
    </section>
  );
};
