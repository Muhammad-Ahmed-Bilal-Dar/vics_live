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
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'; 
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 
import LawMisLogo from '../../assets/LAW-MIS-logo.svg'; 
import LAW_MISUserProfile from '../Profile/LAW-MISUserProfile'; 
import LAW_MISChangePassword from '../Profile/LAW-MISChangePassword'; 
import LawMisAddWorkshopForm from '../LawMisWorkshopForm/LawMisAddWorkshopForm';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';

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

// Add interface for workshop data
interface Workshop {
    id: string;
    name: string;
    location: string;
    contactPerson: string;
    phoneNumber: string;
    email: string;
    status: 'active' | 'inactive';
    lastInspection: string;
    rating: number;
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

  // Add dummy workshop data
  const workshops: Workshop[] = [
    {
        id: 'WS001',
        name: 'AutoCare Workshop',
        location: 'Gulberg, Lahore',
        contactPerson: 'Ahmed Khan',
        phoneNumber: '0300-1234567',
        email: 'ahmed@autocare.com',
        status: 'active',
        lastInspection: '2024-03-15',
        rating: 4.5
    },
    {
        id: 'WS002',
        name: 'City Motors Service',
        location: 'Defence, Lahore',
        contactPerson: 'Sara Malik',
        phoneNumber: '0300-7654321',
        email: 'sara@citymotors.com',
        status: 'active',
        lastInspection: '2024-03-10',
        rating: 4.2
    }
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ListAltIcon />}
              sx={{ fontWeight: 'bold', borderRadius: 2 }}
            >
              Stations List
            </Button>
            <Button
                variant="contained"
                color="primary" 
                startIcon={<AddIcon />}
                onClick={handleAddNewWorkshop}
                sx={{ fontWeight: 'bold', borderRadius: 2 }}
            >
                Add New Workshop
            </Button>
          </Box>
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

      {/* Workshop Cards Grid */}
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {workshops.map((workshop) => (
            <Paper
              key={workshop.id}
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 8 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                minHeight: 260,
                background: 'linear-gradient(135deg, #f8fafc 60%, #e3f2fd 100%)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                  {workshop.name}
                </Typography>
                <Chip
                  label={workshop.status.toUpperCase()}
                  color={workshop.status === 'active' ? 'success' : 'error'}
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <LocationOnIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {workshop.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <PersonIcon color="action" fontSize="small" />
                <Typography variant="body2">{workshop.contactPerson}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <PhoneIcon color="action" fontSize="small" />
                <Typography variant="body2">{workshop.phoneNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <EmailIcon color="action" fontSize="small" />
                <Typography variant="body2">{workshop.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <StarIcon sx={{ color: '#fbc02d' }} fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 0.5 }}>{workshop.rating}</Typography>
                <Typography variant="body2" color="text.secondary">/5</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Last Inspection:
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{workshop.lastInspection}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
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

  return (
    <DashboardContainer
      sidebarOpen={drawerOpen}
      onSidebarToggle={handleDrawerToggle}
      sidebarItems={sidebarItems}
      sidebarFooterLogos={lawMisFooterLogos}
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
      <Container maxWidth="xl" sx={{ p: 0 }}>
        {renderContent()}
      </Container>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={confirmLogoutOpen}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
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
    </DashboardContainer>
  );
};

export default LawMisDashboard;

