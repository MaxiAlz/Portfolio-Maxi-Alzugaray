import React from 'react';
import { Download, Layers, CheckCircle2, Play, Pause, ShoppingBag } from 'lucide-react';
import { SamplePack, Currency, AudioTrack } from '../types';

interface SamplePackLibraryProps {
  packs: SamplePack[];
  currency: Currency;
  onAddToCart: (item: SamplePack) => void;
  isPlaying: boolean;
  currentTrack: AudioTrack | null;
  onTogglePlay: (track: AudioTrack) => void;
}

export const SamplePackLibrary: React.FC<SamplePackLibraryProps> = ({
  packs,
  currency,
  onAddToCart,
  isPlaying,
  currentTrack,
  onTogglePlay
}) => {
  const formatPrice = (priceUSD: number, isFree?: boolean) => {
    if (isFree || priceUSD === 0) return 'GRATIS';
    if (currency === 'EUR') return `€${Math.round(priceUSD * 0.92)}`;
    if (currency === 'ARS') return `$${(priceUSD * 1300).toLocaleString('es-AR')}`;
    return `$${priceUSD} USD`;
  };

  return (
    <section id="samples" className="py-20 bg-[#f5f5f7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Librerías de Batería & Samples
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Drum Packs & One-Shots HD.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Muestras de baterías reales multicapa grabadas a 24-bit/96kHz. Listas para Slate Trigger 2, Kontakt y cualquier DAW.
          </p>
        </div>

        {/* Packs Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack) => {
            const demoTrack: AudioTrack = {
              id: `demo-${pack.id}`,
              title: pack.title,
              artist: 'Maxi Alzugaray Sample Demo',
              genre: 'Metal',
              type: 'sample',
              durationSeconds: 30,
              bpm: 120,
              audioFreq: 200,
              drumStyle: pack.format,
              coverImage: pack.coverImage
            };

            const isThisPlaying = isPlaying && currentTrack?.id === demoTrack.id;

            return (
              <div
                key={pack.id}
                className="bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-primary/60 transition-all duration-300 group hover:shadow-xl"
              >
                <div>
                  {/* Image & Badge */}
                  <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                    <img
                      src={pack.coverImage}
                      alt={pack.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                    {/* Badge */}
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-xs ${
                      pack.isFree
                        ? 'bg-primary text-zinc-950'
                        : 'bg-zinc-900 text-white border border-zinc-700'
                    }`}>
                      {pack.isFree ? 'DESCARGA GRATUITA' : 'PREMIUM PACK'}
                    </span>

                    {/* Audio Play Preview Button */}
                    <button
                      onClick={() => onTogglePlay(demoTrack)}
                      className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur text-white hover:text-primary text-xs font-semibold flex items-center gap-2"
                    >
                      {isThisPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isThisPlaying ? 'Pausar' : 'Escuchar Muestra'}</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-primary uppercase tracking-wider">{pack.category}</span>
                      <span>{pack.samplesCount} Samples ({pack.fileSize})</span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {pack.title}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {pack.description}
                    </p>

                    <div className="p-3 bg-[#f5f5f7] dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                      <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Compatibilidad:</span>
                      <p className="text-xs text-primary font-mono">{pack.format}</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {pack.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Precio</span>
                      <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {formatPrice(pack.priceUSD, pack.isFree)}
                      </span>
                    </div>

                    {pack.isFree ? (
                      <button
                        onClick={() => alert(`Descargando pack gratuito: ${pack.title}`)}
                        className="px-5 py-2 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </button>
                    ) : (
                      <button
                        onClick={() => onAddToCart(pack)}
                        className="px-5 py-2 rounded-full bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Al Carrito
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
