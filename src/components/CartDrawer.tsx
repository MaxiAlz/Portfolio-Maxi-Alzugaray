import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CartItem, Currency } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const subtotalUSD = cartItems.reduce((sum, item) => sum + (item.product.priceUSD * item.quantity), 0);
  const discountUSD = (subtotalUSD * appliedDiscount);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const formatPrice = (priceUSD: number) => {
    if (currency === 'EUR') return `€${Math.round(priceUSD * 0.92)}`;
    if (currency === 'ARS') return `$${(priceUSD * 1300).toLocaleString('es-AR')}`;
    return `$${priceUSD} USD`;
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'MAXI10' || promoCode.trim().toUpperCase() === 'DRUMS') {
      setAppliedDiscount(0.15); // 15% discount
      alert('¡Código de descuento aplicado! 15% OFF en tu compra.');
    } else {
      alert('Código inválido. Intenta con "MAXI10".');
    }
  };

  const handleSimulateCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckoutSuccess(true);
  };

  const handleFinish = () => {
    onClearCart();
    setIsCheckoutSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 w-full max-w-md h-full flex flex-col justify-between p-6 text-zinc-900 dark:text-zinc-100 relative overflow-y-auto shadow-2xl transition-colors duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Tu Carrito</h3>
            <span className="text-xs bg-primary/20 text-primary font-bold px-2.5 py-0.5 rounded-full">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isCheckoutSuccess ? (
          <div className="py-12 text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">¡Gracias por tu Compra!</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Tus archivos digitales están listos para ser descargados inmediatamente.
              </p>
            </div>

            <div className="p-4 bg-[#f5f5f7] dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-2 text-left text-xs">
              <span className="font-bold text-primary block">Archivos Listos:</span>
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                  <span className="truncate">{item.product.title}</span>
                  <button
                    onClick={() => alert(`Iniciando descarga de ${item.product.title}`)}
                    className="p-1 px-2 rounded-full bg-primary text-zinc-950 font-bold flex items-center gap-1 text-[10px]"
                  >
                    <Download className="w-3 h-3" /> Descargar
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-full bg-primary text-zinc-950 font-bold text-xs"
            >
              Volver a la Tienda
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 my-auto">
            <ShoppingBag className="w-10 h-10 text-zinc-400 mx-auto" />
            <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200">El carrito está vacío</h4>
            <p className="text-xs text-zinc-500">Explora las librerías de samples, presets o plantillas en la tienda.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-[#f5f5f7] dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 flex gap-3 items-center"
              >
                <img src={item.product.coverImage} alt={item.product.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.product.title}</h4>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white block mt-0.5">
                    {formatPrice(item.product.priceUSD)}
                  </span>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-5 h-5 bg-white dark:bg-zinc-800 rounded-full text-xs font-bold text-zinc-700 dark:text-zinc-300"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-5 h-5 bg-white dark:bg-zinc-800 rounded-full text-xs font-bold text-zinc-700 dark:text-zinc-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-2 text-zinc-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Checkout Summary */}
        {!isCheckoutSuccess && cartItems.length > 0 && (
          <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 space-y-3">
            
            {/* Promo code input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código Cupón (ej: MAXI10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 p-2 rounded-xl bg-[#f5f5f7] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white uppercase placeholder:normal-case"
              />
              <button
                onClick={handleApplyPromo}
                className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs"
              >
                Aplicar
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-zinc-900 dark:text-white font-semibold">{formatPrice(subtotalUSD)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Descuento (15% OFF):</span>
                  <span>-{formatPrice(discountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
                <span>Total:</span>
                <span>{formatPrice(totalUSD)}</span>
              </div>
            </div>

            <button
              onClick={handleSimulateCheckout}
              className="w-full py-3 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Completar Pago Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Descarga inmediata tras confirmación de pago</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
