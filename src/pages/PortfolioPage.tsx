import React from 'react';
import { PortfolioShowcase } from '../components/PortfolioShowcase';
import { AudioTrack } from '../types';
import { INITIAL_AUDIO_TRACKS } from '../data/initialData';

interface PortfolioPageProps {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay
}) => {
  return (
    <div className="py-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Trayectoria & Audio Muestras
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Portfolio Musical & Comparación A/B
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Explora canciones en las que trabajé, escucha el audio de baterías en bruto (RAW) y compáralo con la mezcla final procesada.
          </p>
        </div>

        {/* Portfolio Showcase Component */}
        <PortfolioShowcase
          tracks={INITIAL_AUDIO_TRACKS}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
        />

      </div>
    </div>
  );
};
