import { useState, useMemo } from 'react'
import { 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Avatar,
  ThemeProvider,
  Breadcrumbs,
  Link,
  createTheme,
  PaletteMode,
  StyledEngineProvider,
  Direction
} from '@mui/material'
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import StationModules from './components/StationModules'
import Appointments from './components/Appointments'
import UserManagement from './components/Management/UserManagement'
import StationManagement from './components/Management/StationManagement'
import AreaManagement from './components/Management/AreaManagement'
import Settings from './components/Settings'
import { getDesignTokens } from './theme'
import { LanguageProvider, useLanguage, getTextDirection } from './utils/i18n/LanguageContext'
import { SupportedLanguage } from './utils/i18n/translations'
import './App.css'

// Create rtl and ltr caches for emotion
const createDirectionCache = (direction: Direction) => {
  return createCache({
    key: direction === 'rtl' ? 'muirtl' : 'muiltr',
    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
  });
};

// Calculate the width for the main content area based on drawer state
const getContentWidth = (open: boolean, drawerWidth: number) => {
  return {
    width: {
      sm: `calc(100% - ${open ? drawerWidth : 64}px)`,
      xs: '100%',
    },
    ml: {
      sm: open ? `${drawerWidth}px` : '64px',
      xs: 0,
    },
    transition: (theme: any) => theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
};

// Wrapper for AppContent to have access to the language context
const AppWithLanguage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  // Determine text direction based on language
  const direction = getTextDirection(language);
  
  // Create the appropriate cache
  const cache = useMemo(() => createDirectionCache(direction), [direction]);
  
  return (
    <CacheProvider value={cache}>
      <AppContent 
        language={language} 
        setLanguage={setLanguage}
        direction={direction}
      />
    </CacheProvider>
  );
};

// App content with props from the language context
interface AppContentProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  direction: Direction;
}

const AppContent: React.FC<AppContentProps> = ({ language, setLanguage, direction }) => {
  const drawerWidth = 240;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentModule, setCurrentModule] = useState('Dashboard');
  const [mode, setMode] = useState<PaletteMode>('light');

  // Create theme based on current mode and direction
  const theme = useMemo(() => {
    const tokens = getDesignTokens(mode);
    return createTheme({
      ...tokens,
      direction: direction,
    });
  }, [mode, direction]);
  
  // Extract parent and sub module from path like "Management/User"
  const modulePathParts = currentModule.split('/');
  const parentModule = modulePathParts.length > 1 ? modulePathParts[0] : '';
  const subModule = modulePathParts.length > 1 ? modulePathParts[1] : '';
  const isManagementSubmodule = parentModule === 'Management';

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModuleSelect = (module: string) => {
    setCurrentModule(module);
  };
  
  const handleThemeChange = (newMode: PaletteMode) => {
    setMode(newMode);
  };
  
  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
  };

  // Function to render the appropriate module content
  const renderModuleContent = () => {
    if (currentModule === 'Dashboard') {
      return <Dashboard visible={true} />;
    } else if (currentModule === 'Station') {
      return <StationModules visible={true} onModuleSelect={(subModule) => console.log(`Selected: ${subModule}`)} />;
    } else if (currentModule === 'Appointments') {
      return <Appointments visible={true} />;
    } else if (currentModule === 'Management/User') {
      return <UserManagement visible={true} />;
    } else if (currentModule === 'Management/Station') {
      return <StationManagement visible={true} />;
    } else if (currentModule === 'Management/Area') {
      return <AreaManagement visible={true} />;
    } else if (currentModule === 'Settings') {
      return <Settings 
        visible={true} 
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />;
    } else if (isManagementSubmodule) {
      return (
        <Box sx={{ p: 3, animation: 'fadeIn 0.6s ease-in-out' }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {subModule} Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is the {subModule} Management module content. It's currently under development.
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">
            {currentModule} Module
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This module is under development.
          </Typography>
        </Box>
      );
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          
          {/* Top Navigation Bar */}
          <AppBar position="fixed" sx={getContentWidth(sidebarOpen, drawerWidth)}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="toggle drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              
              {/* Breadcrumbs for submodules */}
              {isManagementSubmodule ? (
                <Breadcrumbs 
                  separator={<NavigateNextIcon fontSize="small" />} 
                  aria-label="breadcrumb"
                  sx={{ flexGrow: 1, color: 'inherit' }}
                >
                  <Link 
                    color="inherit" 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleModuleSelect(parentModule);
                    }}
                    sx={{ fontWeight: 'medium' }}
                  >
                    {parentModule}
                  </Link>
                  <Typography color="inherit" sx={{ fontWeight: 'bold' }}>{subModule}</Typography>
                </Breadcrumbs>
              ) : (
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  {currentModule}
                </Typography>
              )}
              
              <IconButton color="inherit" sx={{ mx: 1 }}>
                <SearchIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ mx: 1 }}>
                <NotificationsIcon />
              </IconButton>
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                U
              </Avatar>
            </Toolbar>
          </AppBar>
          
          {/* Sidebar */}
          <Sidebar 
            open={sidebarOpen} 
            onToggle={handleDrawerToggle} 
            onModuleSelect={handleModuleSelect} 
          />
          
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              ...getContentWidth(sidebarOpen, drawerWidth),
              pt: { xs: 8, sm: 9 },
              flexGrow: 1,
              bgcolor: 'background.default',
            }}
          >
            {renderModuleContent()}
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

// Main App component with LanguageProvider wrapper
function App() {
  return (
    <LanguageProvider>
      <AppWithLanguage />
    </LanguageProvider>
  );
}

export default App;
