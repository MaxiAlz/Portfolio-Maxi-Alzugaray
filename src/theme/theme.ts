export interface ThemeColors {
  brand: {
    primary: string;
    hover: string;
    light: string;
    glow: string;
  };
  bg: {
    main: string;
    card: string;
    nav: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: {
    main: string;
    subtle: string;
  };
}

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark';
  storageKey: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * ARCHIVO DE TEMA / THEME CONFIGURATION FILE
 * Modifica estos valores para personalizar los colores de la aplicación en modo claro y oscuro.
 */
export const themeConfig: ThemeConfig = {
  defaultTheme: 'light',
  storageKey: 'maxi_theme_mode',
  
  // Configuración del Tema Claro (Light Theme)
  light: {
    brand: {
      primary: '#2ecc71',
      hover: '#27ae60',
      light: 'rgba(46, 204, 113, 0.15)',
      glow: 'rgba(46, 204, 113, 0.25)',
    },
    bg: {
      main: '#ffffff',
      card: '#f4f4f5', // zinc-100
      nav: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: '#18181b', // zinc-900
      secondary: '#52525b', // zinc-600
      muted: '#71717a', // zinc-500
    },
    border: {
      main: '#e4e4e7', // zinc-200
      subtle: 'rgba(228, 228, 231, 0.8)',
    },
  },

  // Configuración del Tema Oscuro (Dark Theme)
  dark: {
    brand: {
      primary: '#2ecc71',
      hover: '#27ae60',
      light: 'rgba(46, 204, 113, 0.15)',
      glow: 'rgba(46, 204, 113, 0.25)',
    },
    bg: {
      main: '#09090b', // zinc-950
      card: '#18181b', // zinc-900
      nav: 'rgba(9, 9, 11, 0.8)',
    },
    text: {
      primary: '#f4f4f5', // zinc-100
      secondary: '#a1a1aa', // zinc-400
      muted: '#71717a', // zinc-500
    },
    border: {
      main: '#27272a', // zinc-800
      subtle: 'rgba(39, 39, 42, 0.8)',
    },
  },
};

/**
 * Aplica los valores de color como variables CSS en el root del documento.
 */
export function applyTheme(isDark: boolean): void {
  const currentTheme = isDark ? themeConfig.dark : themeConfig.light;
  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  root.style.setProperty('--brand-primary', currentTheme.brand.primary);
  root.style.setProperty('--brand-hover', currentTheme.brand.hover);
  root.style.setProperty('--brand-light', currentTheme.brand.light);
  root.style.setProperty('--brand-glow', currentTheme.brand.glow);
  root.style.setProperty('--bg-main', currentTheme.bg.main);
  root.style.setProperty('--bg-card', currentTheme.bg.card);
  root.style.setProperty('--bg-nav', currentTheme.bg.nav);
  root.style.setProperty('--text-primary', currentTheme.text.primary);
  root.style.setProperty('--text-secondary', currentTheme.text.secondary);
  root.style.setProperty('--text-muted', currentTheme.text.muted);
  root.style.setProperty('--border-main', currentTheme.border.main);
  root.style.setProperty('--border-subtle', currentTheme.border.subtle);
}
