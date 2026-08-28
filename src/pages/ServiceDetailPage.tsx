import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Service, AudioTrack } from '../types';
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, Sliders, ArrowRight } from 'lucide-react';
import { RemoteDrumsServiceDetail } from '../components/RemoteDrumsServiceDetail';

interface ServiceDetailPageProps {
  services: Service[];
  onOpenQuote: (serviceId: string) => void;
  isPlaying?: boolean;
  currentTrack?: AudioTrack | null;
  onTogglePlay?: (track: AudioTrack) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  services,
  onOpenQuote,
  isPlaying = false,
  currentTrack = null,
  onTogglePlay
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
          className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Servicios
        </button>
      </div>
    );
  }

  // Use flagship custom view for Online Remote Drum Recording
  if (service.id === 'remote-drums') {
    return (
      <RemoteDrumsServiceDetail
        service={service}
        onOpenQuote={onOpenQuote}
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        onTogglePlay={onTogglePlay}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 min-h-screen pb-16">
      {/* Full-width Top Hero Section with Background Image & Dark Overlay */}
      <section className="relative overflow-hidden bg-zinc-950 text-white min-h-105 flex items-center border-b border-zinc-800/80 mb-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={service.image || 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1200'}
            alt={service.title}
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Dark Overlay Layer */}
          <div className="absolute inset-0 bg-zinc-950/75 backdrop-contrast-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 space-y-6">
          {/* Navigation Back Button */}
          <div>
            <button
              onClick={() => navigate('/servicios')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors bg-zinc-900/80 border border-zinc-700/80 px-4 py-2 rounded-full backdrop-blur-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Servicios</span>
            </button>
          </div>

          {/* Hero Main Content */}
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-primary text-zinc-950 font-bold text-xs uppercase tracking-wider inline-block">
              Servicio Especializado
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight drop-shadow-md">
              {service.title}
            </h1>
            {service.subtitle && (
              <p className="text-zinc-200 text-base sm:text-xl font-normal leading-relaxed drop-shadow-xs">
                {service.subtitle}
              </p>
            )}

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenQuote(service.id)}
                className="px-7 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar este Servicio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

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
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
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
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: CTA Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-[#f5f5f7] dark:bg-zinc-900/90 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 space-y-6 shadow-lg">

              <div className="space-y-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Servicio Personalizado</span>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{service.title}</h3>
              </div>

              {service.turnaroundDays && (
                <div className="p-3 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Tiempo estimado: <strong className="text-zinc-900 dark:text-white">{service.turnaroundDays} días hábiles</strong></span>
                </div>
              )}

              <button
                onClick={() => onOpenQuote(service.id)}
                className="w-full py-4 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
                <span>Solicitar este Servicio</span>
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
