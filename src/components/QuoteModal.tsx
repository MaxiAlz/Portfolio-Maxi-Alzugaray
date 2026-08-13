import React, { useState } from 'react';
import { X, Sliders, CheckCircle2, Send } from 'lucide-react';
import { Service, QuoteRequest } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  preSelectedServiceId?: string;
  onSubmitQuote: (quote: Omit<QuoteRequest, 'id' | 'date' | 'status'>) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  services,
  preSelectedServiceId,
  onSubmitQuote
}) => {
  if (!isOpen) return null;

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedServiceId || services[0]?.id || 'remote-drums'
  );
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [genre, setGenre] = useState('Rock / Metal');
  const [songCount, setSongCount] = useState<number>(1);
  const [projectDetails, setProjectDetails] = useState('');
  const [referenceLinks, setReferenceLinks] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    onSubmitQuote({
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      genre,
      songCount,
      projectDetails,
      referenceLinks,
      budgetUSD: selectedService.basePriceUSD * songCount
    });

    setSubmittedSuccess(true);
  };

  const handleCloseAll = () => {
    setSubmittedSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative text-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto shadow-2xl transition-colors duration-200">
        
        <button
          onClick={handleCloseAll}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedSuccess ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">¡Solicitud Enviada con Éxito!</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Gracias, <strong>{clientName}</strong>. Maxi Alzugaray ha recibido los detalles de tu proyecto para <strong>{selectedService.title}</strong>.
              </p>
              <p className="text-xs text-primary font-semibold bg-[#f5f5f7] dark:bg-zinc-950 p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 mt-4">
                ⏱ Respondo cotizaciones en un plazo máximo de 12 horas a tu correo: {clientEmail}.
              </p>
            </div>

            <button
              onClick={handleCloseAll}
              className="px-8 py-2.5 rounded-full bg-primary text-zinc-950 font-bold text-xs shadow-xs"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Header */}
            <div className="space-y-1 border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Formulario de Cotización
              </span>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Cuéntame sobre tu Proyecto.</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Recibe una estimación de presupuesto y disponibilidad de fechas sin compromiso.</p>
            </div>

            {/* Step 1: Service & Song Count */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                1. Servicio Requerido:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedServiceId === s.id
                        ? 'bg-primary/15 border-primary text-zinc-900 dark:text-white font-semibold shadow-xs'
                        : 'bg-[#f5f5f7] dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                    }`}
                  >
                    <h4 className="text-xs font-bold text-primary">{s.title}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{s.subtitle}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                    Cantidad de Canciones:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={songCount}
                    onChange={(e) => setSongCount(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                    Estilo / Género Musical:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Heavy Metal, Indie Rock, Pop..."
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Project Info & Reference Links */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                2. Detalles de la Producción:
              </label>

              <textarea
                rows={3}
                placeholder="Describe tu visión sonora (ej: 'Buscamos baterías potentes estilo Foo Fighters, tempo 130 BPM, tenemos maquetas...')"
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
              />

              <input
                type="text"
                placeholder="Link de referencia (Spotify, YouTube o Drive con maquetas)..."
                value={referenceLinks}
                onChange={(e) => setReferenceLinks(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Step 3: Contact Details */}
            <div className="space-y-3 pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                3. Tus Datos de Contacto:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-500 dark:text-zinc-400 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-500 dark:text-zinc-400 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@estudio.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Price Estimate Summary */}
            <div className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">Presupuesto Estimado</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">
                  ${selectedService.basePriceUSD * songCount} USD
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar Cotización
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
