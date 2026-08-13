import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Service } from '../types';
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, Sliders, ArrowRight } from 'lucide-react';

interface ServiceDetailPageProps {
  services: Service[];
  onOpenQuote: (serviceId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  services,
  onOpenQuote
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="py-24 text-center space-y-6 max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Servicio no encontrado</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">El servicio solicitado no existe o ha sido movido.</p>
        <button
          onClick={() => navigate('/servicios')}
          className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Servicios
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Back Button & Navigation Breadcrumb */}
        <div>
          <button
            onClick={() => navigate('/servicios')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors bg-[#f5f5f7] dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200/80 dark:border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Servicios</span>
          </button>
        </div>

        {/* Hero Image & Banner */}
        <div className="relative aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 shadow-xl">
          <img
            src={service.image || 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1200'}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="px-3 py-1 rounded-full bg-primary text-zinc-950 font-bold text-[10px] uppercase tracking-wider">
              Servicio Especializado
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{service.title}</h1>
            {service.subtitle && (
              <p className="text-zinc-300 text-sm sm:text-base font-normal max-w-2xl">{service.subtitle}</p>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Description & Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Detailed Description */}
            <div className="bg-[#f5f5f7] dark:bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 space-y-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Descripción del Servicio</h2>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {/* Deliverables List */}
            {service.deliverables && service.deliverables.length > 0 && (
              <div className="bg-[#f5f5f7] dark:bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Entregables Incluidos</span>
                </h3>
                <div className="space-y-3 pt-2">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Guarantees & Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-[#f5f5f7] dark:bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Garantías de Calidad & Proceso</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
                      <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: CTA Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#f5f5f7] dark:bg-zinc-900/90 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 space-y-6 shadow-lg">
              
              <div className="space-y-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Servicio Personalizado</span>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{service.title}</h3>
              </div>

              {service.turnaroundDays && (
                <div className="p-3 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Tiempo estimado: <strong className="text-zinc-900 dark:text-white">{service.turnaroundDays} días hábiles</strong></span>
                </div>
              )}

              <button
                onClick={() => onOpenQuote(service.id)}
                className="w-full py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar un Servicio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
                Recibe atención directa y respuesta en menos de 12 horas.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
