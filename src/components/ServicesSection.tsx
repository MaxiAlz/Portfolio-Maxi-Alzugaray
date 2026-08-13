import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, X } from 'lucide-react';
import { Service, Currency } from '../types';

interface ServicesSectionProps {
  services: Service[];
  currency: Currency;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  currency,
  onSelectServiceForQuote
}) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<Service | null>(null);

  const formatPrice = (baseUSD: number) => {
    if (currency === 'EUR') return `€${Math.round(baseUSD * 0.92)}`;
    if (currency === 'ARS') return `$${(baseUSD * 1300).toLocaleString('es-AR')}`;
    return `$${baseUSD} USD`;
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header - Apple Style */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Servicios Profesionales
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Audio, Grabación & Producción
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Soluciones de ingeniería de audio adaptadas a proyectos independientes y productores globales.
          </p>
        </div>

        {/* Services Cards Grid - Simple & Elegant Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-primary/60 transition-all duration-300 group hover:shadow-xl"
            >
              {/* Card Image */}
              <div className="relative aspect-video overflow-hidden bg-zinc-950 cursor-pointer" onClick={() => setSelectedServiceModal(service)}>
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=800'}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent" />
              </div>

              {/* Card Body & Ver Más Action */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                  <button
                    onClick={() => setSelectedServiceModal(service)}
                    className="w-full py-2.5 px-4 rounded-full bg-white dark:bg-zinc-800 hover:bg-primary hover:text-zinc-950 text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-700/80 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs group/btn"
                  >
                    <span>Ver más</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Detailed Modal Popup */}
        {selectedServiceModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">

              {/* Close Button */}
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              {selectedServiceModal.image && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-950">
                  <img
                    src={selectedServiceModal.image}
                    alt={selectedServiceModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Modal Header */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Detalle del Servicio</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">{selectedServiceModal.title}</h3>
                {selectedServiceModal.subtitle && (
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{selectedServiceModal.subtitle}</p>
                )}
              </div>

              {/* Full Description */}
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">{selectedServiceModal.description}</p>

              {/* Estimated Turnaround Time */}
              {selectedServiceModal.turnaroundDays && (
                <div className="inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-[#f5f5f7] dark:bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Tiempo estimado de entrega: <strong className="text-zinc-900 dark:text-zinc-100">{selectedServiceModal.turnaroundDays} días hábiles</strong></span>
                </div>
              )}

              {/* Deliverables List */}
              {selectedServiceModal.deliverables && selectedServiceModal.deliverables.length > 0 && (
                <div className="space-y-3 bg-[#f5f5f7] dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Entregables Incluidos:</h4>
                  <ul className="space-y-2">
                    {selectedServiceModal.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features / Quality Guarantees */}
              {selectedServiceModal.features && selectedServiceModal.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">Garantías de Calidad:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedServiceModal.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => {
                    setSelectedServiceModal(null);
                    onSelectServiceForQuote(selectedServiceModal.id);
                  }}
                  className="w-full py-3 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm text-center shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Solicitar Consulta / Cotización</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
