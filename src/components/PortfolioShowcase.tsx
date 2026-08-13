import React, { useState } from 'react';
import { Play, Pause, Music, Sliders, Volume2 } from 'lucide-react';
import { AudioTrack } from '../types';

interface PortfolioShowcaseProps {
  tracks: AudioTrack[];
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onTogglePlay
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [abStateMap, setAbStateMap] = useState<Record<string, 'mix' | 'raw'>>({});

  const genres = ['Todos', 'Metal', 'Rock', 'Pop / Indie', 'Prog / Funk'];

  const filteredTracks = selectedGenre === 'Todos'
    ? tracks
    : tracks.filter(t => t.genre === selectedGenre);

  const toggleAB = (trackId: string) => {
    setAbStateMap(prev => ({
      ...prev,
      [trackId]: prev[trackId] === 'raw' ? 'mix' : 'raw'
    }));
  };

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Muestras de Audio & Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Demostración de Audio A/B.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl">
              Escucha ejemplos reales grabados en el estudio. Compara la toma cruda de baterías con la mezcla final procesada.
            </p>
          </div>

          {/* Genre Filters - Apple Pill Style */}
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedGenre === g
                    ? 'bg-primary text-zinc-950 font-bold shadow-xs'
                    : 'bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTracks.map((track) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;
            const currentABMode = abStateMap[track.id] || 'mix';

            return (
              <div
                key={track.id}
                className={`bg-[#f5f5f7] dark:bg-zinc-900/90 border rounded-3xl p-6 transition-all duration-300 relative group overflow-hidden ${
                  isThisPlaying ? 'border-primary shadow-md' : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  
                  {/* Track Cover Image + Play Overlay */}
                  <div className="relative w-full sm:w-28 h-28 rounded-2xl overflow-hidden bg-zinc-950 flex-shrink-0 shadow-xs">
                    <img
                      src={track.coverImage}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        onClick={() => onTogglePlay(track)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
                          isThisPlaying
                            ? 'bg-primary text-zinc-950 shadow-md'
                            : 'bg-white/90 text-zinc-900 hover:bg-primary hover:text-zinc-950 shadow-xs'
                        }`}
                      >
                        {isThisPlaying ? (
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>

                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-[10px] font-semibold text-white">
                      {track.bpm} BPM
                    </span>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-primary">
                        {track.genre}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">0:{track.durationSeconds}</span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">{track.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">{track.artist}</p>

                    <div className="text-xs text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800/80 p-2 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="truncate">{track.drumStyle}</span>
                    </div>
                  </div>

                </div>

                {/* A/B Comparison Control Toggle */}
                {track.hasABComparison && (
                  <div className="mt-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Volume2 className="w-3.5 h-3.5 text-primary" />
                      <span>Modo A/B:</span>
                    </div>

                    <div className="flex bg-white dark:bg-zinc-800 p-1 rounded-full border border-zinc-200/80 dark:border-zinc-700/80">
                      <button
                        onClick={() => toggleAB(track.id)}
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-colors ${
                          currentABMode === 'raw'
                            ? 'bg-primary text-zinc-950'
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        Baterías RAW
                      </button>
                      <button
                        onClick={() => toggleAB(track.id)}
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-colors ${
                          currentABMode === 'mix'
                            ? 'bg-primary text-zinc-950'
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        Mezcla Final
                      </button>
                    </div>
                  </div>
                )}

                {/* Animated Waveform bar */}
                <div className="mt-4 flex items-center gap-1 h-4 overflow-hidden">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all ${
                        isThisPlaying ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'
                      }`}
                      style={{
                        height: isThisPlaying ? `${Math.sin(i * 0.5) * 40 + 60}%` : '25%',
                      }}
                    />
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
