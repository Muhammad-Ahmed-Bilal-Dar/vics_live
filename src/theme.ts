import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

// Create theme settings for both light and dark modes
const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#a5d6a7', // Light green color
            contrastText: '#333333', // Dark text for better contrast on light green
          },
          secondary: {
            main: '#4caf50', // Complementary darker green
          },
          background: {
            default: '#f8f9fa',
            paper: '#ffffff',
          },
          status: {
            operational: '#4caf50', // green
            maintenance: '#ff9800', // orange
            offline: '#f44336', // red
            active: '#4caf50', // green
            inactive: '#f44336', // red
            pending: '#ff9800', // orange
          },
          charger: {
            dc: '#1976d2', // blue
            ac: '#ff9800', // orange
          }
        }
      : {
          // Dark mode palette
          primary: {
            main: '#81c784',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#66bb6a',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
          },
          status: {
            operational: '#66bb6a', // lighter green for dark mode
            maintenance: '#ffb74d', // lighter orange for dark mode
            offline: '#ef5350', // lighter red for dark mode
            active: '#66bb6a', // lighter green for dark mode
            inactive: '#ef5350', // lighter red for dark mode
            pending: '#ffb74d', // lighter orange for dark mode
          },
          charger: {
            dc: '#42a5f5', // lighter blue for dark mode
            ac: '#ffb74d', // lighter orange for dark mode
          }
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14, // Base font size
    // Sidebar menu text styling
    sidebarMenuItem: {
      fontSize: '0.875rem', // Smaller font size for sidebar items
      fontWeight: 400,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem', // Smaller font size for list items
        },
      },
    },
  },
});

// Create theme with default light mode
const theme = createTheme(getDesignTokens('light'));

// Add custom theme properties for TypeScript
declare module '@mui/material/styles' {
  interface Palette {
    status: {
      operational: string;
      maintenance: string;
      offline: string;
      active: string;
      inactive: string;
      pending: string;
    };
    charger: {
      dc: string;
      ac: string;
    };
  }
  
  interface PaletteOptions {
    status?: {
      operational?: string;
      maintenance?: string;
      offline?: string;
      active?: string;
      inactive?: string;
      pending?: string;
    };
    charger?: {
      dc?: string;
      ac?: string;
    };
  }

  interface TypographyVariants {
    sidebarMenuItem: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    sidebarMenuItem?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sidebarMenuItem: true;
  }
}

export { theme as default, getDesignTokens }; 