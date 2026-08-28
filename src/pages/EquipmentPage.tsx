import React, { useState } from 'react';
import { GearItem } from '../types';
import { GEAR_LIST } from '../data/initialData';
import { Cpu, ShieldCheck, CheckCircle2, Sliders, Mic, Disc, Layers } from 'lucide-react';

export const EquipmentPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Baterías & Redoblantes', 'Platos / Platillos', 'Micrófonos', 'Preamps & Convertidores', 'Monitoreo & Acústica'];

  const filteredGear = selectedCategory === 'Todos'
    ? GEAR_LIST
    : GEAR_LIST.filter(g => g.category === selectedCategory);

  return (
    <div className="py-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header - EL ESTUDIO */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            El Estudio & Especificaciones Técnicas
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            El Estudio
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Trabajo desde mi <strong>home studio profesional</strong>, un espacio diseñado y tratado especialmente para la grabación de baterías, pensado para obtener un sonido natural y controlado.
          </p>

          {/* Quick Studio Gear Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-4 text-left">
            <div className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <Sliders className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Preamps</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Focusrite Pro</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <Mic className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Micrófonos</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Shure, AKG, Audio-Technica</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <Cpu className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">DAW</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Pro Tools</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <Disc className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Batería</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Mapex Pro Mars (90’s)</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <Layers className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Tambores</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Madera y Metal</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <Disc className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Platillos</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Zildjian y Paiste</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat
                  ? 'bg-primary text-zinc-950 shadow-xs font-bold'
                  : 'bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gear Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGear.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:border-primary/60 transition-all duration-300 flex items-start gap-4 shadow-xs hover:shadow-md"
            >
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 text-primary border border-zinc-200/80 dark:border-zinc-700/80 shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">{item.category}</span>
                <h3 className="font-bold text-zinc-900 dark:text-white text-lg">{item.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">{item.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Calibration & Quality Banner */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Sonido Profesional Orgánico</h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Este set de herramientas, sumado a la experiencia y dedicación en cada toma, me permite entregar baterías con un sonido profesional, listas para integrarse de forma orgánica en cualquier producción musical.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-primary bg-white dark:bg-zinc-950 px-4 py-2.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>24bit / 96kHz High Definition</span>
          </div>
        </div>

      </div>
    </div>
  );
};
