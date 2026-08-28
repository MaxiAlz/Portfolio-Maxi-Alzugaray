export type Currency = 'USD' | 'EUR' | 'ARS';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  genre: 'Rock' | 'Metal' | 'Pop / Indie' | 'Prog / Funk' | 'Custom';
  type: 'portfolio' | 'sample';
  durationSeconds: number;
  bpm: number;
  audioFreq: number; // For synth frequency pitch simulation
  drumStyle: string;
  coverImage: string;
  hasABComparison?: boolean;
  samplePackId?: string;
  price?: number;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image?: string;
  basePriceUSD: number;
  deliverables: string[];
  turnaroundDays: number | string;
  popular?: boolean;
  features: string[];
}

export interface SamplePack {
  id: string;
  title: string;
  subtitle: string;
  category: 'Drum Kit' | 'One-Shots' | 'MIDI Grooves' | 'Presets';
  priceUSD: number;
  coverImage: string;
  isFree?: boolean;
  samplesCount: number;
  format: string; // e.g. "24-bit 96kHz WAV, TCI, Kontakt"
  fileSize: string;
  demoTracks: AudioTrack[];
  description: string;
  features: string[];
}

export interface StoreProduct {
  id: string;
  title: string;
  category: 'Presets' | 'Sample Packs' | 'Plantillas DAW' | 'Guías & PDFs';
  priceUSD: number;
  originalPriceUSD?: number;
  coverImage: string;
  badge?: string;
  description: string;
  dawCompatibility?: string;
  downloadSize: string;
  rating: number;
  reviewsCount: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Grabación' | 'Mezcla' | 'Equipamiento' | 'Tutoriales';
  author: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
  tags: string[];
  commentsCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  bandOrStudio: string;
  avatar: string;
  rating: number;
  comment: string;
  projectType: string;
}

export interface GearItem {
  id: string;
  category: 'Baterías & Redoblantes' | 'Platos / Platillos' | 'Micrófonos' | 'Preamps & Convertidores' | 'Monitoreo & Acústica';
  name: string;
  details: string;
  image?: string;
}

export interface CartItem {
  product: StoreProduct | SamplePack;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceId: string;
  serviceTitle: string;
  genre: string;
  songCount: number;
  projectDetails: string;
  referenceLinks?: string;
  budgetUSD?: number;
  status: 'Pendiente' | 'En Revisión' | 'Cotizado' | 'Aceptado' | 'Rechazado';
}

export interface AdminStats {
  totalRevenueUSD: number;
  activeQuotes: number;
  totalDownloads: number;
  totalStoreSales: number;
}
