import React from 'react';
import { Play, Pause, Volume2, VolumeX, Download, Disc, X } from 'lucide-react';
import { AudioTrack } from '../types';

interface AudioPlayerBarProps {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClosePlayer: () => void;
  elapsedTime: number;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onClosePlayer,
  elapsedTime,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute
}) => {
  if (!currentTrack) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const progressPercent = Math.min((elapsedTime / currentTrack.durationSeconds) * 100, 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 border-t border-zinc-200/80 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl backdrop-blur-xl transition-all duration-200">
      
      {/* Top Progress Bar */}
      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 cursor-pointer relative group">
        <div
          className="bg-primary h-full transition-all duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-[280px] sm:max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex-shrink-0 relative group">
            <img
              src={currentTrack.coverImage}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-xs flex items-center justify-center">
                <Disc className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">{currentTrack.title}</h4>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="truncate">{currentTrack.artist}</span>
              <span>•</span>
              <span className="text-primary font-semibold">{currentTrack.bpm} BPM</span>
            </div>
          </div>
        </div>

        {/* Center Playback Controls */}
        <div className="flex flex-col items-center gap-0.5 flex-1 max-w-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 flex items-center justify-center shadow-xs transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Time indicator */}
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-1.5">
            <span>{formatTime(elapsedTime)}</span>
            <span>/</span>
            <span>{formatTime(currentTrack.durationSeconds)}</span>
          </div>
        </div>

        {/* Right Volume & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Mute/Volume Slider */}
          <div className="hidden sm:flex items-center gap-2 bg-[#f5f5f7] dark:bg-zinc-900 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-zinc-800">
            <button
              onClick={onToggleMute}
              className="text-zinc-500 hover:text-primary transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-primary" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Download Sample button */}
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert(`Descargando muestra de audio de alta resolución: ${currentTrack.title}.wav`);
            }}
            className="p-2 rounded-full bg-[#f5f5f7] dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors hidden md:flex items-center gap-1.5 text-xs font-medium"
            title="Descargar Muestra WAV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>WAV</span>
          </a>

          {/* Close Player */}
          <button
            onClick={onClosePlayer}
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            title="Cerrar reproductor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
