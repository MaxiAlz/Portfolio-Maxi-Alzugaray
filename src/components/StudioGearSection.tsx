import React, { useState } from 'react';
import { User, Star, Cpu, Quote } from 'lucide-react';
import { GearItem, Testimonial } from '../types';

interface StudioGearSectionProps {
  gearList: GearItem[];
  testimonials: Testimonial[];
  onOpenQuote: () => void;
}

export const StudioGearSection: React.FC<StudioGearSectionProps> = ({
  gearList,
  testimonials,
  onOpenQuote
}) => {
  const [selectedGearCategory, setSelectedGearCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Baterías & Redoblantes', 'Platos / Platillos', 'Micrófonos', 'Preamps & Convertidores', 'Monitoreo & Acústica'];

  const filteredGear = selectedGearCategory === 'Todos'
    ? gearList
    : gearList.filter(g => g.category === selectedGearCategory);

  return (
    <section id="studio" className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Bio & Philosophy Block - Apple Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1000"
                alt="Maxi Alzugaray Drum Studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
                <h4 className="font-bold text-zinc-900 dark:text-white text-base">Maxi Alzugaray</h4>
                <p className="text-xs text-primary font-semibold">Baterista de Sesión & Ingeniero de Sonido</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              El Estudio & Trayectoria
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Años dedicados al sonido de batería perfecto.
            </h2>

            <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
              Hola, soy Maxi Alzugaray. Durante más de 12 años me he dedicado a la grabación y producción de baterías acústicas y mezclas analógicas para bandas y artistas independientes de todo el mundo.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              El estudio fue diseñado específicamente para maximizar la respuesta acústica del instrumento. Cada micrófono, preamplificador de válvulas y canal de conversión AD/DA está calibrado para capturar la pegada orgánica y la musicalidad real.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Baterías Multicapa</span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Respuesta dinámica real, ghost notes naturales y afinación precisa para cada género.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Tratamiento Híbrido</span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Suma analógica Neve & SSL combinada con la precisión quirúrgica del entorno digital.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs shadow-xs"
              >
                Grabar con Maxi Alzugaray
              </button>
            </div>
          </div>

        </div>

        {/* Studio Gear Specs */}
        <div className="space-y-8 pt-10 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Equipamiento del Estudio</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Hardware, micrófonos e instrumentos de grado profesional utilizados en cada sesión.</p>

            {/* Category Filters - Apple Pill Style */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGearCategory(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium transition-colors ${selectedGearCategory === cat
                      ? 'bg-primary text-zinc-950 font-bold'
                      : 'bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGear.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:border-primary/60 transition-colors flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 text-primary border border-zinc-200/80 dark:border-zinc-700/80 flex-shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">{item.category}</span>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base mt-0.5">{item.name}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8 pt-10 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Opiniones de Clientes
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Lo que dicen productores & artistas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-4 flex flex-col justify-between"
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
  );
};
