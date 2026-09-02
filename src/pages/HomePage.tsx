import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { Service, AudioTrack, Testimonial } from '../types';
import { useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Drum, Sliders, Mic, Cpu } from 'lucide-react';

import fotoPerfil from '../../assets/images/hearos/foto_perfil.jpg';

interface HomePageProps {
  services: Service[];
  featuredTrack: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack) => void;
  onOpenQuote: (serviceId?: string) => void;
  testimonials: Testimonial[];
}

export const HomePage: React.FC<HomePageProps> = ({
  services,
  featuredTrack,
  isPlaying,
  onTogglePlay,
  onOpenQuote,
  testimonials
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero
        onOpenQuote={() => onOpenQuote()}
        onNavigateTab={(tab) => {
          if (tab === 'portfolio') navigate('/portfolio');
          else if (tab === 'services') navigate('/servicios');
          else if (tab === 'studio') navigate('/equipamiento');
          else if (tab === 'samples') navigate('/librerias-samples');
        }}
        featuredTrack={featuredTrack}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
      />

      {/* Bio & Philosophy Section */}
      <section className="py-20 bg-[#f5f5f7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* Biography Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl relative group">
                <img
                  src={fotoPerfil}
                  alt="Maximiliano Alzugaray"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base">Maximiliano Alzugaray</h4>
                  <p className="text-xs text-primary font-semibold">Baterista de Sesión & Técnico de Audio</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Sobre Mí & Filosofía de Trabajo
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                La musica desde una mirada global
              </h2>

              <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                Soy <strong>Maximiliano Alzugaray</strong>, baterista y técnico de audio con una amplia trayectoria tanto en escenarios como en estudios de grabación. A lo largo de mi carrera he formado parte de distintos proyectos musicales, recorriendo diversos géneros y escenarios en diferentes lugares del país.
              </p>

              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Mi enfoque está en acompañar la música desde el instrumento, buscando siempre aportar musicalidad, energía y un sonido auténtico que potencie cada canción. Gracias a mi formación en audio y experiencia en estudio, puedo abordar cada grabación con una mirada integral, cuidando tanto la interpretación como la calidad técnica del sonido.
              </p>

              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
                Trabajo habitualmente en estilos como <strong>rock, indie, pop y folklore</strong>, adaptando mi ejecución y el tratamiento del audio a las necesidades y personalidad de cada artista o proyecto. Mi objetivo en cada sesión es lograr tomas naturales, sólidas y expresivas, que encajen perfectamente con la identidad de tu música.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider  flex items-center gap-1.5">
                    <Drum className="w-4 h-4" /> Baterías de Sesión
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Rock, Indie, Pop y Folklore con ejecución orgánica y afinación precisa.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider  flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Mirada Integral de Audio
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Técnico de audio cuidando la interpretación y la calidad sonora del multitrack.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenQuote()}
                  className="px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Solicitar un servicio
                </button>
                <button
                  onClick={() => navigate('/equipamiento')}
                  className="px-6 py-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold text-xs transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Ver Equipamiento
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection
        services={services}
        currency="USD"
        onSelectServiceForQuote={(id) => onOpenQuote(id)}
      />

      <section className="py-20 bg-[#f5f5f7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* Testimonials / Reseñas */}
          <div className="space-y-8 pt-10 border-t border-zinc-200/80 dark:border-zinc-800">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Reseñas & Opiniones
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Lo que dicen productores & artistas</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-4 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-primary/40" />
                    <div>
                      <h5 className="text-xs font-bold text-zinc-900 dark:text-white">{t.name}</h5>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.role} • <span className="text-primary">{t.bandOrStudio}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
