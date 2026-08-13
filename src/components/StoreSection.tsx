import React, { useState } from 'react';
import { ShoppingBag, Star, Download } from 'lucide-react';
import { StoreProduct, Currency } from '../types';

interface StoreSectionProps {
  products: StoreProduct[];
  currency: Currency;
  onAddToCart: (product: StoreProduct) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  products,
  currency,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProductModal, setSelectedProductModal] = useState<StoreProduct | null>(null);

  const categories = ['Todos', 'Plantillas DAW', 'Presets', 'Guías & PDFs'];

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const formatPrice = (priceUSD: number) => {
    if (currency === 'EUR') return `€${Math.round(priceUSD * 0.92)}`;
    if (currency === 'ARS') return `$${(priceUSD * 1300).toLocaleString('es-AR')}`;
    return `$${priceUSD} USD`;
  };

  return (
    <section id="shop" className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Tienda Digital
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Plantillas & Presets DAW.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl">
              Optimiza tu flujo de trabajo de producción musical con mis recursos listos para usar en Cubase, Pro Tools, Logic y VSTs.
            </p>
          </div>

          {/* Category Tabs - Apple Pill Style */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-zinc-950 font-bold shadow-xs'
                    : 'bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-primary/60 transition-all duration-300 group hover:shadow-lg"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative aspect-square bg-zinc-950 overflow-hidden cursor-pointer" onClick={() => setSelectedProductModal(product)}>
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-zinc-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-primary uppercase tracking-wider text-[11px]">{product.category}</span>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-xs">{product.rating}</span>
                      <span className="text-zinc-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setSelectedProductModal(product)}
                    className="font-bold text-zinc-900 dark:text-white text-base hover:text-primary transition-colors cursor-pointer line-clamp-2"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {product.dawCompatibility && (
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 p-2 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 font-mono">
                      DAW: <span className="text-primary font-semibold">{product.dawCompatibility}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-zinc-200/80 dark:border-zinc-800">
                  <div>
                    {product.originalPriceUSD && (
                      <span className="text-xs text-zinc-400 line-through block">
                        {formatPrice(product.originalPriceUSD)}
                      </span>
                    )}
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">
                      {formatPrice(product.priceUSD)}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2.5 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold transition-all shadow-xs"
                    title="Añadir al Carrito"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Product Modal Preview */}
        {selectedProductModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
              <button
                onClick={() => setSelectedProductModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                ✕
              </button>

              <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-950">
                <img src={selectedProductModal.coverImage} alt={selectedProductModal.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{selectedProductModal.category}</span>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{selectedProductModal.title}</h3>
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">{selectedProductModal.description}</p>

              <div className="p-3 bg-[#f5f5f7] dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 text-xs space-y-1">
                <p><strong className="text-zinc-900 dark:text-zinc-200">Tamaño de descarga:</strong> {selectedProductModal.downloadSize}</p>
                {selectedProductModal.dawCompatibility && (
                  <p><strong className="text-zinc-900 dark:text-zinc-200">Compatibilidad:</strong> {selectedProductModal.dawCompatibility}</p>
                )}
                <p><strong className="text-zinc-900 dark:text-zinc-200">Licencia:</strong> Uso ilimitado personal y comercial</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white">{formatPrice(selectedProductModal.priceUSD)}</span>
                <button
                  onClick={() => {
                    onAddToCart(selectedProductModal);
                    setSelectedProductModal(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-primary text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Al Carrito
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
