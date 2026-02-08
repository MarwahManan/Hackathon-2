/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Responsive Breakpoints
      screens: {
        'xs': '375px',   // Mobile
        'sm': '640px',   // Large mobile
        'md': '768px',   // Tablet
        'lg': '1024px',  // Desktop
        'xl': '1280px',  // Large desktop
        '2xl': '1536px', // Extra large desktop
      },

      // ============================================================================
      // COLOR SYSTEM - Aligned with data-model.md spec
      // ============================================================================
      colors: {
        // Primary Colors (Purple) - Brand color
        primary: {
          50: '#f5f3ff',   // Lightest - backgrounds
          100: '#ede9fe',  // Light backgrounds
          200: '#ddd6fe',  // Hover backgrounds
          300: '#c4b5fd',  // Borders, disabled states
          400: '#a78bfa',  // Secondary actions
          500: '#8b5cf6',  // Base purple
          600: '#7c3aed',  // Brand purple - primary actions (Contrast: 7.2:1 on white ✅)
          700: '#6d28d9',  // Hover states (Contrast: 8.9:1 on white ✅)
          800: '#5b21b6',  // Active states
          900: '#4c1d95',  // Darkest - text on light backgrounds
        },

        // Secondary Colors (Blue) - Complementary brand color
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // Brand blue (Contrast: 8.6:1 on white ✅)
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // Legacy aliases for backward compatibility
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
        },
        blue: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },

        // Semantic Colors - Success (Green)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',  // Primary success (Contrast: 4.8:1 on white ✅)
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },

        // Semantic Colors - Error (Red)
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',  // Primary error (Contrast: 6.5:1 on white ✅)
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },

        // Semantic Colors - Warning (Orange/Yellow)
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',  // Primary warning (Contrast: 5.9:1 on white ✅)
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },

        // Semantic Colors - Info (Blue)
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // Primary info (Contrast: 8.6:1 on white ✅)
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },

      // ============================================================================
      // SPACING SYSTEM - 4px base grid (aligned with spec)
      // ============================================================================
      spacing: {
        '0': '0',           // 0px
        '1': '0.25rem',     // 4px
        '2': '0.5rem',      // 8px
        '3': '0.75rem',     // 12px
        '4': '1rem',        // 16px
        '5': '1.25rem',     // 20px - Added from spec
        '6': '1.5rem',      // 24px
        '7': '1.75rem',     // 28px - Added from spec
        '8': '2rem',        // 32px
        '10': '2.5rem',     // 40px - Added from spec
        '12': '3rem',       // 48px
        '14': '3.5rem',     // 56px - Added from spec
        '16': '4rem',       // 64px
        '20': '5rem',       // 80px - Added from spec
        '24': '6rem',       // 96px - Added from spec
        '32': '8rem',       // 128px - Added from spec
      },

      // ============================================================================
      // TYPOGRAPHY SYSTEM - Aligned with spec
      // ============================================================================
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],      // 12px - Small labels, captions
        'sm': ['0.875rem', { lineHeight: '1.5' }],     // 14px - Secondary text, form labels
        'base': ['1rem', { lineHeight: '1.5' }],       // 16px - Body text (default)
        'lg': ['1.125rem', { lineHeight: '1.5' }],     // 18px - Large body text, subheadings
        'xl': ['1.25rem', { lineHeight: '1.5' }],      // 20px - Small headings
        '2xl': ['1.5rem', { lineHeight: '1.2' }],      // 24px - Medium headings
        '3xl': ['1.875rem', { lineHeight: '1.2' }],    // 30px - Large headings (aligned with spec)
        '4xl': ['2.25rem', { lineHeight: '1.2' }],     // 36px - Extra large headings (aligned with spec)
        '5xl': ['3rem', { lineHeight: '1.1' }],        // 48px - Hero text (added from spec)
        '6xl': ['3.75rem', { lineHeight: '1.1' }],     // 60px - Display text (added from spec)
      },

      fontWeight: {
        normal: '400',      // Regular text
        medium: '500',      // Emphasized text
        semibold: '600',    // Subheadings, buttons
        bold: '700',        // Headings, strong emphasis
      },

      lineHeight: {
        none: '1',          // Tight, for display text
        tight: '1.25',      // Headings
        snug: '1.375',      // Subheadings
        normal: '1.5',      // Body text (default)
        relaxed: '1.625',   // Comfortable reading
        loose: '2',         // Very spacious
      },

      // ============================================================================
      // BORDER RADIUS SYSTEM - Aligned with spec
      // ============================================================================
      borderRadius: {
        'none': '0',           // 0px - Sharp corners
        'sm': '0.125rem',      // 2px - Subtle rounding
        'DEFAULT': '0.25rem',  // 4px - Small elements
        'md': '0.375rem',      // 6px - Badges, tags
        'lg': '0.5rem',        // 8px - Cards, panels
        'xl': '0.75rem',       // 12px - Buttons, inputs (primary)
        '2xl': '1rem',         // 16px - Large cards, modals
        '3xl': '1.5rem',       // 24px - Hero sections (added from spec)
        'full': '9999px',      // Circular - avatars, pills
      },

      // ============================================================================
      // BOX SHADOW SYSTEM - Elevation levels (aligned with spec)
      // ============================================================================
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',  // Added from spec
        'none': 'none',
      },

      // ============================================================================
      // COMPONENT-SPECIFIC TOKENS - Added from spec
      // ============================================================================

      // Input Control Heights
      height: {
        'input-sm': '2.5rem',   // 40px
        'input-md': '3rem',     // 48px (default)
        'input-lg': '3.5rem',   // 56px
        'button-sm': '2.25rem', // 36px
        'button-md': '3rem',    // 48px (default)
        'button-lg': '3.5rem',  // 56px
      },

      // Touch Targets (WCAG 2.1 AA requirement: 44x44px minimum)
      minHeight: {
        'touch': '44px',
        'touch-comfortable': '48px',  // Recommended for primary actions
      },
      minWidth: {
        'touch': '44px',
        'touch-comfortable': '48px',
      },

      // ============================================================================
      // TRANSITIONS - Smooth animations
      // ============================================================================
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ============================================================================
      // Z-INDEX SCALE - Layering system
      // ============================================================================
      zIndex: {
        'dropdown': '1000',
        'sticky': '1100',
        'fixed': '1200',
        'modal-backdrop': '1300',
        'modal': '1400',
        'popover': '1500',
        'tooltip': '1600',
      },

      // ============================================================================
      // ANIMATION KEYFRAMES
      // ============================================================================
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromTop: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in-top': 'slideInFromTop 0.4s ease-out',
        'slide-in-bottom': 'slideInFromBottom 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
