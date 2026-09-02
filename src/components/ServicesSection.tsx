import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Service, Currency } from '../types';
import { useNavigate } from 'react-router-dom';

interface ServicesSectionProps {
  services: Service[];
  currency: Currency;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
}) => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/servicios/detalle/${serviceId}`);
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header - Apple Style */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Audio, Grabación & Producción
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Mis Servicios Profesionales
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
            Servicios adaptados a proyectos independientes y productores globales.
          </p>
        </div>

        {/* Services Cards Grid - Simple & Elegant Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-primary/60 transition-all duration-300 group hover:shadow-xl cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              {/* Card Image */}
              <div className="relative aspect-video overflow-hidden bg-zinc-950">
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
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service.id);
                    }}
                    className="w-full py-2.5 px-4 rounded-full bg-white dark:bg-zinc-800 group-hover:bg-primary group-hover:text-zinc-950 text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-700/80 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs group/btn cursor-pointer"
                  >
                    <span>Ver más</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
