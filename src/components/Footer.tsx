import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drum, Mail, MapPin, Instagram, Youtube, Music2, ArrowRight } from 'lucide-react';

import logoMaxi from '../../assets/images/logos/logo_maxi_negro.png';

interface FooterProps {
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoMaxi} alt="Maxi Alzugaray" className="h-8 w-auto object-contain dark:invert" />
              <span className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">Maxi Alzugaray</span>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-sm">
              Estudio profesional especializado en grabación remota de baterías acústicas multipista, captación en estudio/vivo, mezcla y librerías de producción.
            </p>

            <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>contacto@maxialzugaray.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Estudio de Grabación & Audio Profesional</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-primary uppercase tracking-wider text-[11px]">Navegación</h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><Link to="/inicio" className="hover:text-primary">Inicio</Link></li>
              <li><Link to="/servicios" className="hover:text-primary">Servicios de Audio</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary">Portfolio & Muestras</Link></li>
              <li><Link to="/equipamiento" className="hover:text-primary">Equipamiento</Link></li>
              <li><Link to="/librerias-samples" className="hover:text-primary">Librerías & Samples</Link></li>
            </ul>
          </div>

          {/* Services Quick */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-primary uppercase tracking-wider text-[11px]">Servicios</h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><button onClick={() => onOpenQuote()} className="hover:text-primary">Baterías Remotas</button></li>
              <li><button onClick={() => onOpenQuote()} className="hover:text-primary">Grabación en Vivo y Estudio</button></li>
              <li><button onClick={() => onOpenQuote()} className="hover:text-primary">Mezcla y Mastering</button></li>
              <li><button onClick={() => onOpenQuote()} className="hover:text-primary">Producción de Eventos</button></li>
              <li><button onClick={() => onOpenQuote()} className="hover:text-primary">Sesiones 1 a 1</button></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary uppercase tracking-wider text-[11px]">Newsletter</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Recibe artículos sobre microfonía, técnicas de mezcla y cupones exclusivos.
            </p>

            {newsletterSubscribed ? (
              <p className="text-xs text-primary font-bold bg-[#f5f5f7] dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
                ✓ ¡Suscripción confirmada! Te enviaremos recursos gratuitos.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full p-2.5 rounded-full bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-primary hover:bg-primary-hover text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Suscribirme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Maxi Alzugaray Studio. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <Music2 className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
