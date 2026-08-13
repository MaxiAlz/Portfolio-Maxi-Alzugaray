import React, { useState } from 'react';
import { User, Mail, Trash2 } from 'lucide-react';
import { Service, SamplePack, StoreProduct, BlogArticle, QuoteRequest } from '../types';

interface AdminCMSProps {
  quotes: QuoteRequest[];
  onUpdateQuoteStatus: (id: string, newStatus: QuoteRequest['status']) => void;
  services: Service[];
  onAddService: (newService: Service) => void;
  onDeleteService: (id: string) => void;
  samplePacks: SamplePack[];
  onAddSamplePack: (pack: SamplePack) => void;
  products: StoreProduct[];
  onAddProduct: (prod: StoreProduct) => void;
  articles: BlogArticle[];
  onAddArticle: (article: BlogArticle) => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  quotes,
  onUpdateQuoteStatus,
  services,
  onAddService,
  onDeleteService,
  samplePacks,
  onAddSamplePack,
  products,
  onAddProduct,
  articles,
  onAddArticle
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'quotes' | 'services' | 'store'>('overview');

  // New Service Form State
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceSubtitle, setNewServiceSubtitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(100);

  // New Store Product Form State
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Presets' | 'Sample Packs' | 'Plantillas DAW' | 'Guías & PDFs'>('Plantillas DAW');
  const [newProdPrice, setNewProdPrice] = useState(25);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;

    const created: Service = {
      id: `svc-${Date.now()}`,
      title: newServiceTitle,
      subtitle: newServiceSubtitle || 'Servicio Personalizado de Audio',
      description: 'Servicio añadido desde el panel de administración CMS.',
      iconName: 'Sliders',
      basePriceUSD: newServicePrice,
      deliverables: ['Archivos de audio de alta resolución', 'Revisiones ilimitadas'],
      turnaroundDays: 3,
      features: ['Atención directa por Maxi Alzugaray']
    };

    onAddService(created);
    setNewServiceTitle('');
    setNewServiceSubtitle('');
    alert('¡Servicio publicado con éxito!');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle.trim()) return;

    const created: StoreProduct = {
      id: `prod-${Date.now()}`,
      title: newProdTitle,
      category: newProdCategory,
      priceUSD: newProdPrice,
      coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
      description: 'Recurso digital creado para optimizar tus producciones.',
      downloadSize: '45 MB',
      rating: 5.0,
      reviewsCount: 1
    };

    onAddProduct(created);
    setNewProdTitle('');
    alert('¡Producto añadido a la tienda con éxito!');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header Banner */}
        <div className="bg-white dark:bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Panel CMS Autoadministrable
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Administración Maxi Alzugaray</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Gestiona cotizaciones de clientes, servicios, tienda digital y recursos en tiempo real.</p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#f5f5f7] dark:bg-zinc-950 p-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeSubTab === 'overview' ? 'bg-primary text-zinc-950 font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Métricas
            </button>
            <button
              onClick={() => setActiveSubTab('quotes')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors relative ${
                activeSubTab === 'quotes' ? 'bg-primary text-zinc-950 font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Cotizaciones
              {quotes.filter(q => q.status === 'Pendiente').length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px]">
                  {quotes.filter(q => q.status === 'Pendiente').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveSubTab('services')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeSubTab === 'services' ? 'bg-primary text-zinc-950 font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Servicios
            </button>
            <button
              onClick={() => setActiveSubTab('store')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeSubTab === 'store' ? 'bg-primary text-zinc-950 font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Tienda & Samples
            </button>
          </div>
        </div>

        {/* SUBTAB 1: OVERVIEW METRICS */}
        {activeSubTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 shadow-sm">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Ingresos Estimados</span>
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">$3,450 USD</span>
                <span className="text-[11px] text-primary block font-semibold">+18% este mes</span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 shadow-sm">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Cotizaciones Recibidas</span>
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">{quotes.length}</span>
                <span className="text-[11px] text-zinc-500 block">{quotes.filter(q => q.status === 'Pendiente').length} pendientes de respuesta</span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 shadow-sm">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Descargas Sample Packs</span>
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">1,280</span>
                <span className="text-[11px] text-zinc-500 block">340 packs gratuitos</span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 shadow-sm">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Servicios Activos</span>
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">{services.length}</span>
                <span className="text-[11px] text-zinc-500 block">Baterías, Mezcla, Mastering</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Estado de Disponibilidad de Grabación</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Configura la etiqueta pública de tu disponibilidad para clientes.</p>
              <div className="flex items-center gap-4">
                <span className="px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                  🟢 ABIERTO - Fechas disponibles para esta semana
                </span>
                <button
                  onClick={() => alert('Estado actualizado a Ocupado')}
                  className="px-4 py-2 rounded-full bg-[#f5f5f7] dark:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 font-bold"
                >
                  Cambiar Estado
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: QUOTES MANAGEMENT */}
        {activeSubTab === 'quotes' && (
          <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>Bandeja de Solicitudes de Cotización ({quotes.length})</span>
            </h3>

            <div className="space-y-4">
              {quotes.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/80 dark:border-zinc-800 pb-3">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">{q.date}</span>
                      <h4 className="font-bold text-zinc-900 dark:text-white text-base">{q.clientName}</h4>
                      <p className="text-xs text-primary font-semibold">{q.clientEmail} • {q.clientPhone || 'Sin teléfono'}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-500 mr-1">Estado:</span>
                      <select
                        value={q.status}
                        onChange={(e) => onUpdateQuoteStatus(q.id, e.target.value as QuoteRequest['status'])}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-primary p-2 rounded-xl"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Revisión">En Revisión</option>
                        <option value="Cotizado">Cotizado</option>
                        <option value="Aceptado">Aceptado</option>
                        <option value="Rechazado">Rechazado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <strong className="text-zinc-500 dark:text-zinc-400 block">Servicio:</strong>
                      <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{q.serviceTitle}</span>
                    </div>
                    <div>
                      <strong className="text-zinc-500 dark:text-zinc-400 block">Canciones / Estilo:</strong>
                      <span className="text-zinc-900 dark:text-zinc-200">{q.songCount} tema(s) • {q.genre}</span>
                    </div>
                    <div>
                      <strong className="text-zinc-500 dark:text-zinc-400 block">Presupuesto Estimado:</strong>
                      <span className="text-primary font-bold">${q.budgetUSD} USD</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
                    <strong>Detalles del Proyecto:</strong> {q.projectDetails}
                  </p>

                  {q.referenceLinks && (
                    <p className="text-xs text-primary truncate">
                      <strong>Referencia:</strong> {q.referenceLinks}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: SERVICES MANAGEMENT */}
        {activeSubTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Service Form */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Agregar Nuevo Servicio</h3>
              <form onSubmit={handleCreateService} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">Nombre del Servicio</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Reamping de Bajo Válvula"
                    value={newServiceTitle}
                    onChange={(e) => setNewServiceTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">Subtítulo Descriptivo</label>
                  <input
                    type="text"
                    placeholder="Ej. Preamps Ampeg SVT a tubos"
                    value={newServiceSubtitle}
                    onChange={(e) => setNewServiceSubtitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">Precio Base (USD)</label>
                  <input
                    type="number"
                    min={10}
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(parseInt(e.target.value) || 50)}
                    className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs"
                >
                  Publicar Servicio
                </button>
              </form>
            </div>

            {/* Existing Services List */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Servicios Públicos Actuales</h3>
              <div className="space-y-3">
                {services.map((svc) => (
                  <div key={svc.id} className="p-4 bg-[#f5f5f7] dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{svc.title}</h4>
                      <p className="text-xs text-primary font-semibold">${svc.basePriceUSD} USD</p>
                    </div>
                    <button
                      onClick={() => onDeleteService(svc.id)}
                      className="p-2 text-zinc-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: STORE MANAGEMENT */}
        {activeSubTab === 'store' && (
          <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-3xl space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Agregar Producto a la Tienda Digital</h3>
            <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">Título del Producto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Preset de Snare Superior Drummer"
                  value={newProdTitle}
                  onChange={(e) => setNewProdTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">Categoría</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                >
                  <option value="Plantillas DAW">Plantillas DAW</option>
                  <option value="Presets">Presets</option>
                  <option value="Sample Packs">Sample Packs</option>
                  <option value="Guías & PDFs">Guías & PDFs</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">Precio USD</label>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(parseInt(e.target.value) || 10)}
                  className="w-full p-2.5 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs"
                >
                  Publicar en la Tienda
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
