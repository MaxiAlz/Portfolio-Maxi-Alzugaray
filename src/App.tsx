import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Currency,
  AudioTrack,
  Service,
  SamplePack,
  StoreProduct,
  BlogArticle,
  QuoteRequest,
  CartItem
} from './types';
import {
  INITIAL_SERVICES,
  INITIAL_AUDIO_TRACKS,
  INITIAL_SAMPLE_PACKS,
  INITIAL_STORE_PRODUCTS,
  INITIAL_BLOG_ARTICLES,
  INITIAL_TESTIMONIALS,
  INITIAL_QUOTES
} from './data/initialData';
import { audioEngine } from './utils/audioSynth';

import { Navbar } from './components/Navbar';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { QuoteModal } from './components/QuoteModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminCMS } from './components/AdminCMS';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { applyTheme } from './theme/theme';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { SamplesPage } from './pages/SamplesPage';

export default function App() {
  // Global Dark/Light Mode state (Always starts in Light mode per requirement)
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  // Navigation & View States
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<Currency>('USD');

  // Dynamic Content Data (with localStorage persistence)
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('maxi_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === INITIAL_SERVICES.length) {
          return parsed.map((svc: Service, idx: number) => ({
            ...svc,
            image: INITIAL_SERVICES[idx]?.image || svc.image
          }));
        }
      } catch (e) { }
    }
    return INITIAL_SERVICES;
  });

  const [samplePacks, setSamplePacks] = useState<SamplePack[]>(() => {
    const saved = localStorage.getItem('maxi_samplePacks');
    return saved ? JSON.parse(saved) : INITIAL_SAMPLE_PACKS;
  });

  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>(() => {
    const saved = localStorage.getItem('maxi_products');
    return saved ? JSON.parse(saved) : INITIAL_STORE_PRODUCTS;
  });

  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>(() => {
    const saved = localStorage.getItem('maxi_articles');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_ARTICLES;
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('maxi_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Cart & Modal States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [preSelectedQuoteServiceId, setPreSelectedQuoteServiceId] = useState<string>('remote-drums');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('maxi_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('maxi_samplePacks', JSON.stringify(samplePacks));
  }, [samplePacks]);

  useEffect(() => {
    localStorage.setItem('maxi_products', JSON.stringify(storeProducts));
  }, [storeProducts]);

  useEffect(() => {
    localStorage.setItem('maxi_quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Audio engine player toggle
  const handleTogglePlay = (track?: AudioTrack) => {
    const targetTrack = track || currentTrack || INITIAL_AUDIO_TRACKS[0];

    if (currentTrack?.id === targetTrack.id && isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(targetTrack);
      setIsPlaying(true);
      audioEngine.playTrack(
        targetTrack.genre,
        targetTrack.bpm,
        (time) => setElapsedTime(time)
      );
    }
  };

  const handleClosePlayer = () => {
    audioEngine.stop();
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    audioEngine.setVolume(vol);
  };

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  // Cart operations
  const handleAddToCart = (item: StoreProduct | SamplePack) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product: item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quote operations
  const handleOpenQuoteModal = (serviceId?: string) => {
    if (serviceId) setPreSelectedQuoteServiceId(serviceId);
    setIsQuoteOpen(true);
  };

  const handleSubmitQuote = (quoteData: Omit<QuoteRequest, 'id' | 'date' | 'status'>) => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `q-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pendiente'
    };
    setQuotes((prev) => [newQuote, ...prev]);
  };

  // CMS Admin Operations
  const handleUpdateQuoteStatus = (id: string, newStatus: QuoteRequest['status']) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const handleAddService = (newSvc: Service) => {
    setServices((prev) => [...prev, newSvc]);
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddProduct = (newProd: StoreProduct) => {
    setStoreProducts((prev) => [newProd, ...prev]);
  };

  const handleAddSamplePack = (newPack: SamplePack) => {
    setSamplePacks((prev) => [newPack, ...prev]);
  };

  const handleAddArticle = (newArt: BlogArticle) => {
    setBlogArticles((prev) => [newArt, ...prev]);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 selection:bg-primary selection:text-zinc-950">

        {/* Navigation Header */}
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          isAdminOpen={isAdminOpen}
          setIsAdminOpen={setIsAdminOpen}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        {/* Main Content Render */}
        <main className="flex-1">
          {isAdminOpen ? (
            <AdminCMS
              quotes={quotes}
              onUpdateQuoteStatus={handleUpdateQuoteStatus}
              services={services}
              onAddService={handleAddService}
              onDeleteService={handleDeleteService}
              samplePacks={samplePacks}
              onAddSamplePack={handleAddSamplePack}
              products={storeProducts}
              onAddProduct={handleAddProduct}
              articles={blogArticles}
              onAddArticle={handleAddArticle}
            />
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route
                path="/inicio"
                element={
                  <HomePage
                    services={services}
                    featuredTrack={INITIAL_AUDIO_TRACKS[0]}
                    isPlaying={isPlaying}
                    onTogglePlay={handleTogglePlay}
                    onOpenQuote={handleOpenQuoteModal}
                    testimonials={INITIAL_TESTIMONIALS}
                  />
                }
              />
              <Route
                path="/servicios"
                element={
                  <ServicesPage
                    services={services}
                    onOpenQuote={handleOpenQuoteModal}
                  />
                }
              />
              <Route
                path="/servicios/detalle/:id"
                element={
                  <ServiceDetailPage
                    services={services}
                    onOpenQuote={handleOpenQuoteModal}
                    isPlaying={isPlaying}
                    currentTrack={currentTrack}
                    onTogglePlay={handleTogglePlay}
                  />
                }
              />
              <Route
                path="/portfolio"
                element={
                  <PortfolioPage
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    onTogglePlay={handleTogglePlay}
                  />
                }
              />
              <Route
                path="/equipamiento"
                element={<EquipmentPage />}
              />
              <Route
                path="/librerias-samples"
                element={
                  <SamplesPage
                    samplePacks={samplePacks}
                    onAddToCart={handleAddToCart}
                    isPlaying={isPlaying}
                    currentTrack={currentTrack}
                    onTogglePlay={handleTogglePlay}
                  />
                }
              />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          )}
        </main>

        {/* Persistent Global Floating Audio Player Bar */}
        <AudioPlayerBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => handleTogglePlay()}
          onClosePlayer={handleClosePlayer}
          elapsedTime={elapsedTime}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Quote Request Modal */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          services={services}
          preSelectedServiceId={preSelectedQuoteServiceId}
          onSubmitQuote={handleSubmitQuote}
        />

        {/* Shopping Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          currency={currency}
        />

        {/* Footer */}
        <Footer onOpenQuote={() => handleOpenQuoteModal()} />

      </div>
    </BrowserRouter>
  );
}
