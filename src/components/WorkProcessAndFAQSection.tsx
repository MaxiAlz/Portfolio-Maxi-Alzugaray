import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, Music2, FileAudio, RotateCcw, Send, Layers } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: '¿Cómo vas a recibir los tracks?',
    answer: 'Recibirás entre 8 y 10 canales en formato WAV por cada toma de batería que se haya realizado. El proceso es sencillo y siempre vas a contar con mi acompañamiento en cada etapa.\n\nPrimero, me envías las pistas de tus canciones junto con el BPM de cada una. Si tenés una programación de batería o alguna referencia sonora, podés incluirla.\n\nEn caso de que todavía no tengas una idea definida, podemos trabajarla juntos hasta encontrar la interpretación que mejor se adapte al estilo y la energía de tu música.\n\nUna vez finalizada la grabación, te envío los tracks por separado en formato WAV, listos para incorporar a tu DAW y comenzar la mezcla.'
  },
  {
    question: '¿Se pueden hacer devoluciones o revisiones?',
    answer: 'Sí, por supuesto. Durante el proceso de grabación te enviaré muestras rápidas en MP3 para que escuches y confirmes cada toma antes de la entrega final.'
  },
  {
    question: '¿Puedo hacer correcciones una vez que recibí los tracks?',
    answer: 'Una vez aprobadas las muestras y entregado el multitrack, el trabajo se considera finalizado. Si más adelante querés realizar cambios, podemos agendar una nueva sesión como una producción adicional.'
  }
];

export const WorkProcessAndFAQSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Metodología & Respuestas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Modalidad de Trabajo & Preguntas Frecuentes
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Un proceso ágil, transparente y acompañado paso a paso desde el primer contacto hasta la entrega multitrack.
          </p>
        </div>

        {/* Modalidad de Trabajo - Visual Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
            <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">1. Envío de Pistas & BPM</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Me envías tus canciones junto con el tempo (BPM). Podés adjuntar maquetas o referencias de estilo.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
            <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">2. Co-creación & Arreglos</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Si no tenés una idea definida, trabajamos juntos la interpretación adaptada al carácter de tu tema.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
            <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">3. Muestras MP3 & Revisión</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Te comparto tomas en MP3 para escuchar y confirmar la ejecución previa a la entrega final.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 relative group">
            <span className="w-8 h-8 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center justify-center">4</span>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">4. Multitrack 8-10 Canales WAV</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Recibirás entre 8 y 10 pistas independientes en HD (formatos WAV) listas para incorporar a tu mezcla.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center pb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span>Preguntas Frecuentes</span>
            </h3>
          </div>

          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-zinc-900 dark:text-white text-base sm:text-lg cursor-pointer select-none"
                >
                  <span>{faq.question}</span>
                  <div className={`p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-zinc-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 border-t border-zinc-200/60 dark:border-zinc-800/80">
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-4 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
