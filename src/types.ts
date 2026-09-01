export type Currency = 'USD' | 'EUR' | 'ARS';

export type StemKey = 'demoTrack' | 'demoDrums' | 'recordedDrums' | 'finalSong';

export interface AudioStems {
  demoTrack?: string;     // 1- Demo de la canción
  demoDrums?: string;     // 2- Demo drums
  recordedDrums?: string; // 3- Recorded Drums
  finalSong?: string;     // 4- Canción con la batería que grabé
}

export const STEM_LABELS: Record<StemKey, { label: string; description: string }> = {
  demoTrack: { label: '1. Demo Canción', description: 'Demo previa sin la batería final' },
  demoDrums: { label: '2. Demo Drums', description: 'Batería demo / MIDI de referencia' },
  recordedDrums: { label: '3. Recorded Drums', description: 'Baterías grabadas crudas / multitrack' },
  finalSong: { label: '4. Canción Final', description: 'Canción terminada con la batería grabada' }
};

export interface GalleryMediaItem {
  type: 'image' | 'video';
  url: string;         // MP4 video path or YouTube/Vimeo link, or Image path
  thumbnail?: string;  // Preview image for video
  title?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  genre: 'Rock' | 'Metal' | 'Pop / Indie' | 'Prog / Funk' | 'Custom';
  type: 'portfolio' | 'sample';
  durationSeconds: number;
  bpm: number;
  audioFreq?: number; // For synth frequency pitch simulation fallback
  drumStyle: string;
  coverImage: string;
  galleryImages?: string[]; // Multiple session & gear photos
  videoUrl?: string;        // Session video link (e.g. MP4 or YouTube)
  galleryItems?: GalleryMediaItem[]; // Gallery with photos & videos mixed
  hasABComparison?: boolean;
  samplePackId?: string;
  price?: number;
  stems?: AudioStems;
  defaultStem?: StemKey;
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
