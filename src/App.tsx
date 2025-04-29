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
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import StationModules from './components/StationModules'
import Appointments from './components/Appointments'
import UserManagement from './components/Management/UserManagement'
import StationManagement from './components/Management/StationManagement'
import AreaManagement from './components/Management/AreaManagement'
import Settings from './components/Settings'
import { getDesignTokens } from './theme'
import './App.css'
import Login from './components/Login/Login'
import RoleSelection from './components/RoleSelection/RoleSelection'
import LawMisSelection from './components/LawMisSelection/LawMisSelection'
import LawMisUserLogin from './components/Login/LawMisUserLogin'
import LawMisAdminLogin from './components/Login/LawMisAdminLogin'
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
    setLawMisDashboardType(null);
    setLawMisUserView('LOGIN');
    setIsLoggedIn(false);
    setLawMisLoggedInAs(null);
    setCurrentLawMisView('DASHBOARD');
  };

  const handleLawMisDashboardSelect = (dashboardType: LawMisDashboardType) => {
    setLawMisDashboardType(dashboardType);
    setLawMisUserView('LOGIN');
    setIsLoggedIn(false);
    setLawMisLoggedInAs(null);
    setCurrentLawMisView('DASHBOARD');
  };
  
  const handleLoginSuccess = () => {
    if (selectedRole === 'VICS_ADMIN') {
      setIsLoggedIn(true);
    } else if (selectedRole === 'LAW_MIS') {
       if (lawMisDashboardType === 'USER') {
           console.log('LAW-MIS User Logged In');
           setLawMisLoggedInAs('USER');
       } else if (lawMisDashboardType === 'ADMIN') {
           console.log('LAW-MIS Admin Logged In');
           setLawMisLoggedInAs('ADMIN');
       }
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

  // Go back from LAW-MIS Login/Register pages to LAW-MIS Selection
  const handleGoBackToLawMisSelection = () => {
      setLawMisDashboardType(null);
      setIsLoggedIn(false);
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
        // Show VICS Main App Layout
        return (
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar 
              position="fixed" 
              sx={{
                width: '100%',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: theme.palette.secondary.main
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="toggle drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                {isManagementSubmodule ? (
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ flexGrow: 1, color: 'inherit' }}>
                    <Link color="inherit" href="#" onClick={(e) => { e.preventDefault(); handleModuleSelect(parentModule); }} sx={{ fontWeight: 'medium' }}>
                      {parentModule}
                    </Link>
                    <Typography color="inherit" sx={{ fontWeight: 'bold' }}>{subModule}</Typography>
                  </Breadcrumbs>
                ) : (
                  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}> {currentModule} </Typography>
                )}
                <IconButton color="inherit" sx={{ mx: 1 }}> <SearchIcon /> </IconButton>
                <IconButton color="inherit" sx={{ mx: 1 }}> <NotificationsIcon /> </IconButton>
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}> U </Avatar>
              </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex' }}>
              <Sidebar open={sidebarOpen} onToggle={handleDrawerToggle} onModuleSelect={handleModuleSelect} />
              <Box 
                component="main" 
                sx={{ 
                  flexGrow: 1,
                  pt: { xs: 8, sm: 9 },
                  width: { sm: `calc(100% - ${sidebarOpen ? 200 : 50}px)`, xs: '100%' },
                  transition: (theme) => theme.transitions.create(['width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                  bgcolor: 'background.default',
                }}
              >
                {renderVicsAppContent()} 
              </Box>
            </Box>
          </Box>
        );
      }
    }

    // 3. LAW-MIS Selected?
    if (selectedRole === 'LAW_MIS') {
       // Check if a specific LAW-MIS dashboard type is chosen
       if (!lawMisDashboardType) {
            return <LawMisSelection onSelectDashboard={handleLawMisDashboardSelect} onGoBack={handleGoBackToRoleSelection} />;
       }
       
       // Check if logged into LAW-MIS portal
       if (!lawMisLoggedInAs) { 
           if (lawMisDashboardType === 'USER') {
               // Check if user is on Login or Register view
               if (lawMisUserView === 'LOGIN') {
                  return <LawMisUserLogin 
                      onLoginSuccess={handleLoginSuccess} 
                      onGoBack={handleGoBackToLawMisSelection} 
                      onRegisterClick={handleRegisterClick}
                   />;
               } else { // lawMisUserView === 'REGISTER'
                   return <LawMisUserRegister 
                       onRegisterSuccess={handleRegisterSuccess}
                       onGoBack={handleGoBackToLawMisLogin}
                   />;
               }
           } else if (lawMisDashboardType === 'ADMIN') {
               // LAW-MIS Admin only has login view
               return <LawMisAdminLogin 
                   onLoginSuccess={handleLoginSuccess} 
                   onGoBack={handleGoBackToLawMisSelection} 
               />;
           }
       } else { 
            // --- Render LAW-MIS Layout (AppBar, Sidebar, Content Area) --- 
            // This structure is now always rendered when logged into LAW-MIS
             return <LawMisDashboard 
                    onLogout={handleGoBackToRoleSelection} 
                    onNavigateToUserProfile={navigateToLawMisUserProfile}
                    currentView={currentLawMisView} 
                    onNavigateBack={navigateToLawMisDashboard} 
                    onNavigateToChangePassword={navigateToChangePassword}
                    onNavigateToMap={() => console.warn("Map navigation not implemented yet") }
                    onNavigateToAddWorkshop={navigateToAddWorkshop}
                />;
       }
    }

    // Fallback
    return <Box sx={{p:3}}> <Typography>Unexpected Application State</Typography> </Box>;
  };

  // --- Render the application --- 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderContent()} 
    </ThemeProvider>
  );
}

export default App;
