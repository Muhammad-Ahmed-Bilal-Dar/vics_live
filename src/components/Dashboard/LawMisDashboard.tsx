import React, { useState } from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    Button, 
    IconButton, 
    useTheme, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'; 
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 
import LawMisLogo from '../../assets/LAW-MIS-logo.svg'; 
import LAW_MISUserProfile from '../Profile/LAW-MISUserProfile'; 
import LAW_MISChangePassword from '../Profile/LAW-MISChangePassword'; 
import LawMisAddWorkshopForm from '../LawMisWorkshopForm/LawMisAddWorkshopForm';

// Import shared dashboard components
import { DashboardContainer, generateLawMisSidebarItems, lawMisFooterLogos } from '../Shared';

// --- Card Styles --- 
const cardStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    borderRadius: 2,
    color: (theme: any) => theme.palette.primary.contrastText, 
    height: '100%', 
};

// --- Component Props --- Define types for props
type CurrentLawMisView = 'DASHBOARD' | 'PROFILE' | 'CHANGE_PASSWORD' | 'ADD_WORKSHOP';

interface LawMisDashboardProps {
    onLogout: () => void; 
    currentView: CurrentLawMisView; 
    onNavigateBack: () => void; 
    onNavigateToChangePassword: () => void; 
    onNavigateToUserProfile: () => void;
    onNavigateToMap: () => void;
    onNavigateToAddWorkshop: () => void;
}

// --- Dashboard Component --- 
const LawMisDashboard: React.FC<LawMisDashboardProps> = ({ 
    onLogout, 
    currentView, 
    onNavigateBack, 
    onNavigateToChangePassword, 
    onNavigateToUserProfile,
    onNavigateToMap,
    onNavigateToAddWorkshop,
}) => { 
  console.log(`LawMisDashboard rendering view: ${currentView}`); 
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  
  // Handlers
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLogoutClick = () => {
    setConfirmLogoutOpen(true);
  };
  
  const handleCloseConfirmDialog = () => {
    setConfirmLogoutOpen(false);
  };
  
  const handleConfirmLogout = () => {
    console.log("Logout confirmed");
    onLogout(); 
    handleCloseConfirmDialog();
  };

  const handleAddNewWorkshop = () => {
    console.log("Add New Workshop Clicked - Navigating..."); 
    onNavigateToAddWorkshop();
  };

  // Placeholder data for dashboard
  const summaryData = [
    { title: 'VEHICLE SEARCH', count: 0, icon: <SearchIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.dashboardCard.vehicleSearch }, 
    { title: 'NEW REGISTERED VEHICLES', count: 0, icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.dashboardCard.newVehicles }, 
    { title: 'INSPECTION FAILED', count: 0, icon: <HighlightOffIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.dashboardCard.inspectionFailed },
    { title: 'INSPECTION PASSED', count: 0, icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.dashboardCard.inspectionPassed }, 
  ];

  // Generate sidebar items for LAW-MIS
  const sidebarItems = generateLawMisSidebarItems(
    currentView,
    onNavigateBack,
    (view) => {
      if (view === 'PROFILE') {
        onNavigateToUserProfile();
      } else if (view === 'CHANGE_PASSWORD') {
        onNavigateToChangePassword();
      }
    }
  );

  // --- Dashboard-specific content --- 
  const renderDashboardContent = () => (
    <>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
           WORKSHOPS LIST 
        </Typography>
        <Button
            variant="contained"
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddNewWorkshop}
        >
            Add New Workshop
        </Button>
      </Box>

      {/* Summary Cards - Using modern Grid syntax */}
      <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', mt: 1, py: 1 }}>
        {summaryData.map((item, index) => (
          <Box key={index} sx={{ minWidth: 200, flex: 1 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                ...cardStyles, 
                backgroundColor: item.bgColor
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ color: 'inherit', fontWeight: 'bold' }}>{item.title}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{item.count}</Typography>
              </Box>
              <IconButton sx={{ color: 'inherit', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%' }}>
                {React.cloneElement(item.icon, { sx: { fontSize: 32 } })}
              </IconButton>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Placeholder for the main content area */}
      <Paper sx={{ mt: 3, p: 2, minHeight: '400px', width: '100%' }}>
        <Typography variant="body1">Workshop list table or other content will go here...</Typography>
      </Paper>
    </>
  );

  // Determine which content to render based on currentView
  const renderContent = () => {
    switch(currentView) {
      case 'DASHBOARD':
        return renderDashboardContent();
      case 'PROFILE':
        return <LAW_MISUserProfile onGoBack={onNavigateBack} />;
      case 'CHANGE_PASSWORD':
        return <LAW_MISChangePassword onGoBack={onNavigateBack} />;
      case 'ADD_WORKSHOP':
        return <LawMisAddWorkshopForm onNavigateBack={onNavigateBack} />;
      default:
        return <Typography>Unknown view</Typography>;
    }
  };

  // --- Main Render --- 
  return (
    <>
      <DashboardContainer
        // Sidebar props
        sidebarOpen={drawerOpen}
        onSidebarToggle={handleDrawerToggle}
        sidebarItems={sidebarItems}
        sidebarFooterLogos={lawMisFooterLogos}
        
        // Navbar props
        logoSrc={LawMisLogo}
        logoAlt="LAW-MIS Logo"
        userInfo={{
          name: "Muhammad Ahmed Bilal Dar",
          email: "mahmeddar2000@gmail.com",
          role: "Workshop User"
        }}
        onLogout={handleLogoutClick}
        onNavigateToProfile={onNavigateToUserProfile}
        onNavigateToChangePassword={onNavigateToChangePassword}
      >
        {/* Main content */}
        <Container maxWidth="xl" sx={{ p: 0 }}>
          {renderContent()}
        </Container>
      </DashboardContainer>
      
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={confirmLogoutOpen}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LawMisDashboard;

