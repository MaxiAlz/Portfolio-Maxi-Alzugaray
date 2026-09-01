import React, { useState } from 'react';
import {
  Play,
  Pause,
  Sliders,
  Volume2,
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Drum,
  Video,
  Film
} from 'lucide-react';
import { AudioTrack, StemKey, STEM_LABELS, GalleryMediaItem } from '../types';

interface PortfolioShowcaseProps {
  tracks: AudioTrack[];
  currentTrack: AudioTrack | null;
  currentStemKey?: StemKey;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack, stemKey?: StemKey) => void;
  onSelectStem?: (track: AudioTrack, stemKey: StemKey) => void;
}

interface LightboxState {
  items: GalleryMediaItem[];
  currentIndex: number;
  title: string;
}

const STEM_OPTIONS: { key: StemKey; number: string; title: string }[] = [
  { key: 'demoTrack', number: '1', title: 'Demo Canción' },
  { key: 'demoDrums', number: '2', title: 'Demo Drums' },
  { key: 'recordedDrums', number: '3', title: 'Recorded Drums' },
  { key: 'finalSong', number: '4', title: 'Canción con Batería' }
];

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  tracks,
  currentTrack,
  currentStemKey = 'finalSong',
  isPlaying,
  onTogglePlay,
  onSelectStem
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');

  // Lightbox Modal state for track photos & videos
  const [lightboxData, setLightboxData] = useState<LightboxState | null>(null);

  const genres = ['Todos', 'Metal', 'Rock', 'Pop / Indie', 'Prog / Funk'];

  const filteredTracks = selectedGenre === 'Todos'
    ? tracks
    : tracks.filter(t => t.genre === selectedGenre);

  const openLightbox = (items: GalleryMediaItem[], index: number, title: string) => {
    setLightboxData({
      items,
      currentIndex: index,
      title
    });
  };

  const nextLightboxItem = () => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      currentIndex: (lightboxData.currentIndex + 1) % lightboxData.items.length
    });
  };

  const prevLightboxItem = () => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      currentIndex: (lightboxData.currentIndex - 1 + lightboxData.items.length) % lightboxData.items.length
    });
  };

  const renderMediaContent = (item: GalleryMediaItem) => {
    if (item.type === 'video') {
      const url = item.url;
      if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')) {
        let embedUrl = url;
        if (url.includes('watch?v=')) {
          embedUrl = url.replace('watch?v=', 'embed/');
        } else if (url.includes('youtu.be/')) {
          embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
        }
        return (
          <iframe
            src={embedUrl}
            title={item.title || 'Video de la Sesión'}
            className="w-full h-[65vh] rounded-2xl border border-zinc-800 shadow-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      } else {
        return (
          <video
            src={url}
            controls
            autoPlay
            className="max-w-full max-h-[70vh] rounded-2xl border border-zinc-800 shadow-2xl object-contain"
          />
        );
      }
    }

    return (
      <img
        src={item.url}
        alt={item.title || 'Foto de la Sesión'}
        className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
      />
    );
  };

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Muestras de Audio & Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Demostración de Audio.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl">
              Escucha la evolución de cada tema pasando en tiempo real entre los audios disponibles (maqueta, batería demo, tomas crudas y mezcla final).
            </p>
          </div>

          {/* Genre Filters - Apple Pill Style */}
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${selectedGenre === g
                  ? 'bg-primary text-zinc-950 font-bold shadow-xs'
                  : 'bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks List (Full Detail View) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTracks.map((track) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;

            // Only include stems that are defined on this track!
            const availableStems = track.stems
              ? STEM_OPTIONS.filter(opt => Boolean(track.stems?.[opt.key]))
              : [];

            // Determine initial/active stem key
            let activeStemKey: StemKey = 'finalSong';
            if (isThisPlaying && currentStemKey) {
              activeStemKey = currentStemKey as StemKey;
            } else if (track.defaultStem && track.stems?.[track.defaultStem]) {
              activeStemKey = track.defaultStem;
            } else if (availableStems.length > 0) {
              activeStemKey = availableStems[0].key;
            }

            // Build media items array (photos + video if available)
            const mediaItems: GalleryMediaItem[] = [];

            if (track.videoUrl) {
              mediaItems.push({
                type: 'video',
                url: track.videoUrl,
                thumbnail: track.coverImage,
                title: `Video Sesión - ${track.title}`
              });
            }

            if (track.galleryItems && track.galleryItems.length > 0) {
              mediaItems.push(...track.galleryItems);
            } else if (track.galleryImages && track.galleryImages.length > 0) {
              track.galleryImages.forEach((imgUrl, i) => {
                mediaItems.push({
                  type: 'image',
                  url: imgUrl,
                  thumbnail: imgUrl,
                  title: `Foto ${i + 1} - ${track.title}`
                });
              });
            } else {
              mediaItems.push({
                type: 'image',
                url: track.coverImage,
                thumbnail: track.coverImage,
                title: track.title
              });
            }

            return (
              <div
                key={track.id}
                className={`bg-[#f5f5f7] dark:bg-zinc-900/90 border rounded-3xl p-6 sm:p-7 transition-all duration-300 relative group flex flex-col justify-between ${isThisPlaying ? 'border-primary shadow-lg ring-1 ring-primary/40' : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm'
                  }`}
              >
                <div className="space-y-5">
                  {/* Track Main Info Header */}
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">

                    {/* Track Cover Image + Play Overlay */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-950 shrink-0 shadow-md">
                        <img
                          src={track.coverImage}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                          <button
                            onClick={() => onTogglePlay(track, activeStemKey)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-md ${isThisPlaying
                              ? 'bg-primary text-zinc-950 scale-105'
                              : 'bg-white/90 text-zinc-900 hover:bg-primary hover:text-zinc-950'
                              }`}
                            title={isThisPlaying ? 'Pausar reproducción' : 'Reproducir audio'}
                          >
                            {isThisPlaying ? (
                              <Pause className="w-5 h-5 fill-current" />
                            ) : (
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            )}
                          </button>
                        </div>

                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-xs text-[10px] font-bold text-white tracking-wide">
                          {track.bpm} BPM
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 sm:hidden">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                          {track.genre}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug">{track.title}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{track.artist}</p>
                      </div>
                    </div>

                    {/* Track Title Info (Desktop) */}
                    <div className="hidden sm:block flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                          {track.genre}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                          Duración ~ {Math.floor(track.durationSeconds / 60)}:{track.durationSeconds % 60 < 10 ? '0' : ''}{track.durationSeconds % 60}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white truncate tracking-tight">{track.title}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{track.artist}</p>
                    </div>

                  </div>

                  {/* Audio Stems Selector UI (Renders ONLY defined stems) */}
                  {availableStems.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-bold">
                          <Volume2 className="w-4 h-4 text-primary" />
                          <span>Audios Disponibles ({availableStems.length}):</span>
                        </div>
                        {isThisPlaying && STEM_LABELS[activeStemKey] && (
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 truncate max-w-42.5">
                            Sonando: {STEM_LABELS[activeStemKey].label}
                          </span>
                        )}
                      </div>

                      <div className={`grid gap-1.5 p-1.5 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/90 shadow-2xs ${availableStems.length === 1 ? 'grid-cols-1' : availableStems.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
                        }`}>
                        {availableStems.map((opt) => {
                          const isActive = isThisPlaying && activeStemKey === opt.key;
                          return (
                            <button
                              key={opt.key}
                              onClick={() => {
                                if (onSelectStem) {
                                  onSelectStem(track, opt.key);
                                } else {
                                  onTogglePlay(track, opt.key);
                                }
                              }}
                              className={`px-2.5 py-2 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${isActive
                                ? 'bg-primary text-zinc-950 shadow-xs font-bold ring-1 ring-primary/50 scale-[1.02]'
                                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
                                }`}
                              title={STEM_LABELS[opt.key].description}
                            >
                              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono shrink-0 ${isActive ? 'bg-zinc-950 text-white font-bold' : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                }`}>
                                {opt.number}
                              </span>
                              <span className="truncate">{opt.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Audio Description & Drum Setup Details Section */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      <Drum className="w-4 h-4 text-primary" />
                      <span>Detalles de Grabación & Equipamiento:</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xs space-y-2">
                      <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                        {track.drumStyle}
                      </p>
                    </div>
                  </div>

                  {/* Session Media Gallery (Photos & Video Support) */}
                  {mediaItems.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                          <Camera className="w-4 h-4 text-primary" />
                          <span>Galería de la Sesión & Video ({mediaItems.length}):</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          Haz clic para ver
                        </span>
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {mediaItems.map((media, idx) => (
                          <button
                            key={idx}
                            onClick={() => openLightbox(mediaItems, idx, `Sesión: ${track.title}`)}
                            className="relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group/img cursor-pointer hover:border-primary transition-colors"
                          >
                            <img
                              src={media.thumbnail || media.url}
                              alt={media.title || `Media ${idx + 1}`}
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                            />

                            {/* Overlay Badge for Videos vs Photos */}
                            {media.type === 'video' ? (
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white gap-0.5">
                                <div className="w-7 h-7 rounded-full bg-primary text-zinc-950 flex items-center justify-center shadow-md">
                                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-primary">VIDEO</span>
                              </div>
                            ) : (
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Animated Waveform bar */}
                <div className="mt-5 flex items-center gap-1 h-3.5 overflow-hidden">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all ${isThisPlaying ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-800'
                        }`}
                      style={{
                        height: isThisPlaying ? `${Math.sin(i * 0.4) * 45 + 55}%` : '25%',
                      }}
                    />
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Lightbox Modal for Photos & Videos */}
      {lightboxData && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center">

            {/* Header info & Close */}
            <div className="absolute -top-12 left-0 right-0 flex items-center justify-between text-white px-2">
              <span className="text-sm font-bold tracking-tight flex items-center gap-2">
                {lightboxData.items[lightboxData.currentIndex]?.type === 'video' ? (
                  <Film className="w-4 h-4 text-primary" />
                ) : (
                  <Camera className="w-4 h-4 text-primary" />
                )}
                <span>{lightboxData.title} ({lightboxData.currentIndex + 1} de {lightboxData.items.length})</span>
              </span>
              <button
                onClick={() => setLightboxData(null)}
                className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                title="Cerrar vista previa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Media Content View (Image or Video) */}
            <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              {renderMediaContent(lightboxData.items[lightboxData.currentIndex])}

              {/* Prev / Next controls */}
              {lightboxData.items.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxItem}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-zinc-700/80 backdrop-blur-md transition-transform active:scale-95 cursor-pointer z-10"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextLightboxItem}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-zinc-700/80 backdrop-blur-md transition-transform active:scale-95 cursor-pointer z-10"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Bar */}
            {lightboxData.items.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto p-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl max-w-full">
                {lightboxData.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxData({ ...lightboxData, currentIndex: idx })}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${lightboxData.currentIndex === idx
                      ? 'border-primary scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={item.thumbnail || item.url} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary fill-current" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
