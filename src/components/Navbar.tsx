import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disc, Sliders, Drum, Layers, Cpu, ShoppingBag, User, Menu, X, Sun, Moon } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  isAdminOpen,
  setIsAdminOpen,
  isDark,
  setIsDark
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/inicio', label: 'Inicio', icon: Disc },
    { path: '/servicios', label: 'Servicios', icon: Sliders },
    { path: '/portfolio', label: 'Portfolio', icon: Drum },
    { path: '/equipamiento', label: 'Equipamiento', icon: Cpu },
    { path: '/librerias-samples', label: 'Librerías & Samples', icon: Layers },
  ];

  const isLinkActive = (path: string) => {
    if (isAdminOpen) return false;
    const current = location.pathname;
    if (path === '/inicio' && (current === '/inicio' || current === '/')) return true;
    if (path === '/servicios' && current.startsWith('/servicios')) return true;
    return current === path;
  };

  const handleNavClick = (path: string) => {
    setIsAdminOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo & Branding - Apple Minimalist */}
          <Link
            to="/inicio"
            onClick={() => setIsAdminOpen(false)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white">
                  MAXI ALZUGARAY
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal -mt-0.5">
                Audio Engineering · Drums · Programming
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    active
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions (Dark Mode, Cart, Admin Toggle) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Ver Carrito"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-zinc-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Toggle */}
            <button
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-full text-xs font-medium transition-colors ${
                isAdminOpen
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
              title="Panel Admin CMS"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400"
            >
              {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-zinc-700 dark:text-zinc-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-zinc-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-6 space-y-3 w-full">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary/15 text-primary font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <div className="w-2 h-2 rounded-full bg-primary" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-medium text-center flex items-center justify-center gap-2"
            >
              <User className="w-3.5 h-3.5 text-primary" />
              {isAdminOpen ? 'Cerrar Panel CMS' : 'Panel Administrador (CMS)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
