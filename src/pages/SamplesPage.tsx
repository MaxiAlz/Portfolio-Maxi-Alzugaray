import React from 'react';
import { SamplePackLibrary } from '../components/SamplePackLibrary';
import { SamplePack, AudioTrack } from '../types';
import { INITIAL_SAMPLE_PACKS } from '../data/initialData';

interface SamplesPageProps {
  samplePacks: SamplePack[];
  onAddToCart: (item: SamplePack) => void;
  isPlaying: boolean;
  currentTrack: AudioTrack | null;
  onTogglePlay: (track: AudioTrack) => void;
}

export const SamplesPage: React.FC<SamplesPageProps> = ({
  samplePacks,
  onAddToCart,
  isPlaying,
  currentTrack,
  onTogglePlay
}) => {
  return (
    <div className="py-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Recursos Digitales & Samples
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Librerías de Batería & One-Shots HD
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Muestras de baterías multicapa grabadas en estudio profesional, listas para comprar y descargar inmediatamente.
          </p>
        </div>

        {/* Sample Pack Library */}
        <SamplePackLibrary
          packs={samplePacks || INITIAL_SAMPLE_PACKS}
          currency="USD"
          onAddToCart={onAddToCart}
          isPlaying={isPlaying}
          currentTrack={currentTrack}
          onTogglePlay={onTogglePlay}
        />

      </div>
    </div>
  );
};
