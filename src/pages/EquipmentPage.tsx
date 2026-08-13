import React, { useState } from 'react';
import { GearItem } from '../types';
import { GEAR_LIST } from '../data/initialData';
import { Cpu, ShieldCheck } from 'lucide-react';

export const EquipmentPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Baterías & Redoblantes', 'Platos / Platillos', 'Micrófonos', 'Preamps & Convertidores', 'Monitoreo & Acústica'];

  const filteredGear = selectedCategory === 'Todos'
    ? GEAR_LIST
    : GEAR_LIST.filter(g => g.category === selectedCategory);

  return (
    <div className="py-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Especificaciones Técnicas
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Equipamiento del Estudio
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Hardware analógico, microfonía de referencia, instrumentos acústicos y convertidores HD utilizados en cada sesión.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
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
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 text-primary border border-zinc-200/80 dark:border-zinc-700/80 flex-shrink-0">
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

        {/* Studio Calibration Banner */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Acondicionamiento & Calibración</h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Sala tratada acústicamente para capturar la respuesta dinámica natural del instrumento sin resonancias ni reflejos indeseados.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-primary bg-white dark:bg-zinc-950 px-4 py-2.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>24bit / 96kHz High Definition</span>
          </div>
        </div>

      </div>
    </div>
  );
};
