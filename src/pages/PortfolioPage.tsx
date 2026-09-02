import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioShowcase } from '../components/PortfolioShowcase';
import { AudioTrack, StemKey } from '../types';
import { INITIAL_AUDIO_TRACKS } from '../data/initialData';
import {
  ArrowLeft,
  Music2,
  Sliders,
  Disc,
  ArrowRight
} from 'lucide-react';

import hearoMicrofonosImg from '../../assets/images/hearos/hearo_microfonos.JPG';
import logoMaxi from '../../assets/images/logos/logo_maxi_negro.png';

interface PortfolioPageProps {
  currentTrack: AudioTrack | null;
  currentStemKey?: StemKey;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack, stemKey?: StemKey) => void;
  onSelectStem?: (track: AudioTrack, stemKey: StemKey) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  currentTrack,
  currentStemKey = 'finalSong',
  isPlaying,
  onTogglePlay,
  onSelectStem
}) => {
  const navigate = useNavigate();

  return (
    <div className="pb-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Visual Hero Header Section */}
      <section className="relative overflow-hidden bg-zinc-950 text-white min-h-120 flex items-center border-b border-zinc-800/80 mb-12">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={hearoMicrofonosImg}
            alt="Portfolio Musical - Maxi Alzugaray"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Dark Overlay Layers */}
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-contrast-110" />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-primary/20 blur-[150px] pointer-events-none rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 space-y-8">
          {/* Back Button & Brand Badge */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate('/inicio')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors bg-zinc-900/80 border border-zinc-700/80 px-4 py-2 rounded-full backdrop-blur-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Inicio</span>
            </button>


          </div>

          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">

              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-primary" />
                <span>Multitrack & Stems Audios A/B</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.1] drop-shadow-md">
              Portfolio <br className="hidden sm:inline" />
              <span className="text-primary">Musical & Muestras de Audio </span>
            </h1>

            <p className="text-zinc-200 text-base sm:text-xl font-normal leading-relaxed max-w-3xl drop-shadow-xs">
              Aquí podrás ver y escuchar algunos de mis trabajos realizados en estudio.
              Escucha la <span className="text-primary font-bold">batería sola (Recorded Drums)</span> y en <span className="text-primary font-bold">contexto completo con la canción</span>. Si la canción ya está disponible en plataformas, podrás encontrar el link directo en su descripción.
            </p>

            {/* Quick Metrics Bar */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl">
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Modo de Escucha</span>
                <span className="text-base font-bold text-primary">A/B Comparativo</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Formato Audio</span>
                <span className="text-base font-bold text-white">24bit / 48kHz HD</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Variedad de Estilos</span>
                <span className="text-base font-bold text-white">Rock, Metal, Pop, Funk</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs text-zinc-400 block font-medium">Grabación</span>
                <span className="text-base font-bold text-primary">Estudio Profesional</span>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/servicios')}
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar Grabación de Batería</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/equipamiento')}
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-white font-semibold text-sm backdrop-blur-md transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Music2 className="w-4 h-4 text-primary" />
                <span>Ver Equipamiento del Estudio</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Showcase Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <PortfolioShowcase
          tracks={INITIAL_AUDIO_TRACKS}
          currentTrack={currentTrack}
          currentStemKey={currentStemKey}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onSelectStem={onSelectStem}
        />
      </div>
    </div>
  );
};

