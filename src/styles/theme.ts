// Theme configuration following 60-30-10 rule
export const theme = {
  colors: {
    // Primary colors (60% - backgrounds)
    primary: {
      dark: '#1F2937',      // Main dark gray background
      darker: '#111827',    // Darker variant
      light: '#374151',     // Lighter variant
    },
    
    // Secondary colors (30% - content areas)
    secondary: {
      white: '#FFFFFF',     // White content fields
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      }
    },
    
    // Accent colors (10% - interactive elements)
    accent: {
      green: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        500: '#10B981',      // Active status, success
        600: '#059669',
        700: '#047857',
      },
      yellow: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        500: '#F59E0B',      // CTA buttons, warnings
        600: '#D97706',
      },
      lavender: {
        50: '#F5F3FF',
        100: '#EDE9FE',
        500: '#8B5CF6',      // Soft UX elements
        600: '#7C3AED',
      }
    },
    
    // Status colors
    status: {
      online: '#10B981',    // Green for online status
      offline: '#6B7280',   // Gray for offline
      warning: '#F59E0B',   // Yellow for warnings
      error: '#EF4444',     // Red for errors
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  }
} as const;

export type Theme = typeof theme;