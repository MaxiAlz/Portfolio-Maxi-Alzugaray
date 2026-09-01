import React from 'react';
import { PortfolioShowcase } from '../components/PortfolioShowcase';
import { AudioTrack, StemKey } from '../types';
import { INITIAL_AUDIO_TRACKS } from '../data/initialData';

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
  return (
    <div className="py-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Trayectoria & Audio Muestras
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Portfolio Musical (4 Audios por Tema)
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Explora canciones en las que trabajé y conmuta libremente entre la demo de la canción, las baterías demo, las tomas grabadas crudas y la canción terminada.
          </p>
        </div>

        {/* Portfolio Showcase Component */}
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
