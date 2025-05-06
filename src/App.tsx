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
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Dashboard from './components/Dashboard'
import StationModules from './components/StationModules'
import Appointments from './components/Appointments'
import UserManagement from './components/Management/UserManagement'
import StationManagement from './components/Management/StationManagement'
import AreaManagement from './components/Management/AreaManagement'
import Settings from './components/Settings'
import { getDesignTokens } from './theme'
import './App.css'

// Shared dashboard components
import { 
  DashboardContainer, 
  generateVicsSidebarItems, 
  generateLawMisSidebarItems, 
  lawMisFooterLogos, 
  vicsFooterLogos 
} from './components/Shared'

// Authentication and role selection components
import Login from './components/Login/Login'
import RoleSelection from './components/RoleSelection/RoleSelection'
import LawMisLogin from './components/Login/LawMisLogin'
import LawMisUserRegister from './components/Register/LawMisUserRegister'
import LawMisDashboard from './components/Dashboard/LawMisDashboard'
import LAW_MISUserProfile from './components/Profile/LAW-MISUserProfile'
import LAW_MISChangePassword from './components/Profile/LAW-MISChangePassword'

// Calculate the width for the main content area based on drawer state
const getContentWidth = (open: boolean, drawerWidth: number) => {
  return {
    width: {
      sm: `calc(100% - ${open ? drawerWidth : 50}px)`,
      xs: '100%',
    },
    marginLeft: {
      sm: open ? `${drawerWidth}px` : '50px',
      xs: 0,
    },
    transition: (theme: any) => theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
};

// Define Role and Dashboard Types
type SelectedRole = 'VICS_ADMIN' | 'LAW_MIS' | null;
type LawMisDashboardType = 'USER' | 'ADMIN' | null;
type LawMisUserView = 'LOGIN' | 'REGISTER';
type CurrentLawMisView = 'DASHBOARD' | 'PROFILE' | 'CHANGE_PASSWORD' | 'ADD_WORKSHOP';

function App() {
  const drawerWidth = 200;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentModule, setCurrentModule] = useState('Dashboard');
  const [mode, setMode] = useState<PaletteMode>('light');
  
  // --- Authentication and Navigation State --- 
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);
  const [lawMisDashboardType, setLawMisDashboardType] = useState<LawMisDashboardType>(null);
  const [lawMisUserView, setLawMisUserView] = useState<LawMisUserView>('LOGIN');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [lawMisLoggedInAs, setLawMisLoggedInAs] = useState<LawMisDashboardType>(null);
  const [currentLawMisView, setCurrentLawMisView] = useState<CurrentLawMisView>('DASHBOARD');

  // Create theme based on current mode
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  // Extract parent and sub module from path like "Management/User"
  const modulePathParts = currentModule.split('/');
  const parentModule = modulePathParts.length > 1 ? modulePathParts[0] : '';
  const subModule = modulePathParts.length > 1 ? modulePathParts[1] : '';
  const isManagementSubmodule = parentModule === 'Management';

  // --- VICS App Handlers ---
  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleModuleSelect = (module: string) => setCurrentModule(module);
  const handleThemeChange = (newMode: PaletteMode) => setMode(newMode);

  // --- Navigation and Auth Handlers ---
  const handleRoleSelect = (role: SelectedRole) => {
    setSelectedRole(role);
    // If LAW-MIS is selected, default to USER login type
    setLawMisDashboardType(role === 'LAW_MIS' ? 'USER' : null);
    setLawMisUserView('LOGIN');
    setIsLoggedIn(false);
    setLawMisLoggedInAs(null);
    setCurrentLawMisView('DASHBOARD');
  };
  
  const handleLoginSuccess = () => {
    if (selectedRole === 'VICS_ADMIN') {
      setIsLoggedIn(true);
    } else if (selectedRole === 'LAW_MIS') {
      // Set the login type based on the selected dashboard type
      setLawMisLoggedInAs(lawMisDashboardType);
      console.log(`LAW-MIS ${lawMisDashboardType} Logged In`);
    }
    setCurrentLawMisView('DASHBOARD');
  };

  // Logout handler (resets everything, including the view)
  const handleGoBackToRoleSelection = () => {
      setSelectedRole(null);
      setIsLoggedIn(false);
      setLawMisDashboardType(null);
      setLawMisLoggedInAs(null);
      setLawMisUserView('LOGIN');
      setCurrentLawMisView('DASHBOARD');
  };
  
  // Navigate to Register page
  const handleRegisterClick = () => {
      setLawMisUserView('REGISTER');
  };
  
  // Handle successful registration (navigate back to login)
  const handleRegisterSuccess = () => {
       setLawMisUserView('LOGIN');
  };
  
  // Go back from Register page to Login page
  const handleGoBackToLawMisLogin = () => {
      setLawMisUserView('LOGIN');
  };

  // --- New handlers for navigating within LAW-MIS logged-in section ---
  const navigateToLawMisUserProfile = () => {
      setCurrentLawMisView('PROFILE');
  };
  const navigateToChangePassword = () => {
      setCurrentLawMisView('CHANGE_PASSWORD');
  };
  const navigateToLawMisDashboard = () => {
       setCurrentLawMisView('DASHBOARD');
  };

  const navigateToAddWorkshop = () => {
      setCurrentLawMisView('ADD_WORKSHOP');
  };

  // --- VICS App Content Rendering --- (Keep this separate for clarity)
  const renderVicsAppContent = () => {
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
      return <Settings visible={true} onThemeChange={handleThemeChange} />;
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

  // --- Main Conditional Rendering Logic --- 
  const renderContent = () => {
    // 1. No Role Selected? Show RoleSelection.
    if (!selectedRole) {
      return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }

    // 2. VICS ADMIN Selected?
    if (selectedRole === 'VICS_ADMIN') {
      if (!isLoggedIn) {
        // Show VICS Login
        return <Login onLoginSuccess={handleLoginSuccess} onGoBack={handleGoBackToRoleSelection} />;
      } else {
        // Show VICS Main App Layout with shared components
        const sidebarItems = generateVicsSidebarItems(currentModule, handleModuleSelect);
        
        return (
          <DashboardContainer
            // Sidebar props
            sidebarOpen={sidebarOpen}
            onSidebarToggle={handleDrawerToggle}
            sidebarItems={sidebarItems}
            sidebarFooterLogos={vicsFooterLogos}
            
            // Navbar props
            logoSrc="/vite.svg" // Replace with your actual VICS logo path
            logoAlt="VICS Logo"
            userInfo={{
              name: "VICS Admin",
              email: "admin@vics.com",
              role: "Administrator"
            }}
            onLogout={handleGoBackToRoleSelection}
            showSearch={true}
            showNotifications={true}
          >
            {/* Main content */}
            <Box>
              {currentModule !== 'Dashboard' && (
                <Breadcrumbs 
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                  sx={{ mb: 2 }}
                >
                  <Link
                    color="inherit"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleModuleSelect('Dashboard');
                    }}
                  >
                    Dashboard
                  </Link>
                {isManagementSubmodule ? (
                    <>
                      <Link
                        color="inherit"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          // Don't navigate, just prevent default
                        }}
                      >
                      {parentModule}
                    </Link>
                      <Typography color="text.primary">{subModule}</Typography>
                    </>
                  ) : (
                    <Typography color="text.primary">{currentModule}</Typography>
                  )}
                  </Breadcrumbs>
              )}
              
              {renderVicsAppContent()} 
            </Box>
          </DashboardContainer>
        );
      }
    }

    // 3. LAW-MIS Selected? Show login screen directly
    if (selectedRole === 'LAW_MIS') {
      // If not logged in yet
       if (!lawMisLoggedInAs) { 
               if (lawMisUserView === 'LOGIN') {
          return <LawMisLogin 
                      onLoginSuccess={handleLoginSuccess} 
            onGoBack={handleGoBackToRoleSelection}
                      onRegisterClick={handleRegisterClick}
            dashboardType={lawMisDashboardType}
            setLoginType={(type) => setLawMisDashboardType(type)}
                   />;
        } else {
                   return <LawMisUserRegister 
                       onRegisterSuccess={handleRegisterSuccess}
                       onGoBack={handleGoBackToLawMisLogin}
               />;
           }
       } else { 
        // If logged in, show appropriate dashboard
        if (lawMisLoggedInAs === 'USER') {
          // Show LAW-MIS User Dashboard with appropriate content
          return (
            <LawMisDashboard 
                    onLogout={handleGoBackToRoleSelection} 
                    currentView={currentLawMisView} 
                    onNavigateBack={navigateToLawMisDashboard} 
                    onNavigateToChangePassword={navigateToChangePassword}
              onNavigateToUserProfile={navigateToLawMisUserProfile}
              onNavigateToMap={() => console.log('Map navigation not implemented')}
                    onNavigateToAddWorkshop={navigateToAddWorkshop}
            />
          );
        } else {
          // Show LAW-MIS Admin Dashboard (not implemented yet)
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom>LAW-MIS Admin Dashboard</Typography>
              <Typography variant="body1" gutterBottom>This dashboard is currently under development.</Typography>
              <Button variant="contained" color="primary" onClick={handleGoBackToRoleSelection}>Logout</Button>
            </Box>
          );
        }
       }
    }

    // Fallback
    return <Typography>Unknown state. Please refresh the page.</Typography>;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          overflow: 'auto',
          animation: 'appFadeIn 0.5s ease-in-out',
          '@keyframes appFadeIn': {
            '0%': {
              opacity: 0,
            },
            '100%': {
              opacity: 1,
            },
          },
        }}
      >
      {renderContent()} 
      </Box>
    </ThemeProvider>
  );
}

export default App;
