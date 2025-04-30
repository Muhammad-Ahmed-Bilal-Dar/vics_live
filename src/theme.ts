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
          },
          divider: 'rgba(255, 255, 255, 0.12)', // Divider color used in Sidebar
          action: {
            hover: 'rgba(255, 255, 255, 0.1)' // Hover color used in Sidebar
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
          },
          divider: 'rgba(255, 255, 255, 0.12)', // Divider color used in Sidebar
          action: {
            hover: 'rgba(255, 255, 255, 0.1)' // Hover color used in Sidebar
          }
        }),
  },
  // Sidebar dimensions
  sidebar: {
    drawerWidth: 220,
    closedDrawerWidth: 50,
    itemHeight: 40,
    subItemHeight: 36,
    subItemPadding: 3,
    iconMargin: 2
  },
  // Typography settings
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14, // Base font size
    // Sidebar menu text styling
    sidebarMenuItem: {
      fontSize: '0.8rem', // Font size for sidebar items
      fontWeight: 400,
      overflow: 'visible',
      whiteSpace: 'normal',
      lineHeight: 1.2,
    },
    sidebarSubMenuItem: {
      fontSize: '0.75rem', // Font size for submenu items
      fontWeight: 400,
      overflow: 'visible',
      whiteSpace: 'normal',
      lineHeight: 1.2,
    }
  },
  spacing: 8, // Base spacing unit (8px)
  // Transitions
  transitions: {
    easing: {
      // Default easing curves
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  // Component overrides
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem', // Smaller font size for list items
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.12)'
        }
      }
    }
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
    sidebarSubMenuItem: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    sidebarMenuItem?: React.CSSProperties;
    sidebarSubMenuItem?: React.CSSProperties;
  }
  
  // Add custom theme section for sidebar
  interface Theme {
    sidebar: {
      drawerWidth: number;
      closedDrawerWidth: number;
      itemHeight: number;
      subItemHeight: number;
      subItemPadding: number;
      iconMargin: number;
    }
  }
  
  interface ThemeOptions {
    sidebar?: {
      drawerWidth?: number;
      closedDrawerWidth?: number;
      itemHeight?: number;
      subItemHeight?: number;
      subItemPadding?: number;
      iconMargin?: number;
    }
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sidebarMenuItem: true;
    sidebarSubMenuItem: true;
  }
}

export { theme as default, getDesignTokens }; 