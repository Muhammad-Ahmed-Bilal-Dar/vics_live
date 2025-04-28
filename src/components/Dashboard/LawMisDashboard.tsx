import React, { useState } from 'react';
import { 
    Box, 
    AppBar, 
    Toolbar,
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Button, 
    IconButton, 
    CssBaseline, 
    useTheme, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
} from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles'; // Keep styled for DrawerHeader
import MenuIcon from '@mui/icons-material/Menu'; 
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'; 
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import LawMisLogo from '../../assets/LAW-MIS-logo.svg'; 
import LawMisSidebar from '../Sidebar/LawMisSidebar'; // <-- Import the new sidebar component
import LAW_MISUserProfile from '../Profile/LAW-MISUserProfile'; // <-- Updated Import
import LAW_MISChangePassword from '../Profile/LAW-MISChangePassword'; // <-- Correctly named component

// --- Drawer Dimensions (Keep for calculating main content margin) --- 
const drawerWidth = 0;
const closedDrawerWidth = 0; 

// --- Removed Drawer Mixins and StyledDrawer --- 

// --- Header for spacing (Keep for main content offset) --- 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar, 
}));

// --- Card Styles --- 
const cardStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    borderRadius: 2,
    color: '#fff', 
    height: '100%', 
};

// --- Component Props --- Define types for props
type CurrentLawMisView = 'DASHBOARD' | 'PROFILE' | 'CHANGE_PASSWORD'; // <-- Update type

interface LawMisDashboardProps {
    onLogout: () => void; 
    currentView: CurrentLawMisView; 
    onNavigateBack: () => void; 
    onNavigateToChangePassword: () => void; 
    onNavigateToUserProfile: () => void;
    onNavigateToMap: () => void;
}

// --- Dashboard Component --- 
const LawMisDashboard: React.FC<LawMisDashboardProps> = ({ 
    onLogout, 
    currentView, 
    onNavigateBack, 
    onNavigateToChangePassword, 
    onNavigateToUserProfile,
    onNavigateToMap,
}) => { 
  console.log(`LawMisDashboard rendering view: ${currentView}`); 
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false); 
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null); 
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl); 
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  // --- Profile Menu Handlers ---
  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setProfileMenuAnchorEl(null);
  };

  // --- Logout Dialog Handlers ---
  const handleLogoutClick = () => {
      handleCloseProfileMenu(); // Close profile menu first
      setConfirmLogoutOpen(true); // Then open confirm dialog
  };
  const handleCloseConfirmDialog = () => {
      setConfirmLogoutOpen(false);
  };
  const handleConfirmLogout = () => {
      console.log("Logout confirmed");
      onLogout(); 
      handleCloseConfirmDialog(); // Close dialog after logout
  };

  // Placeholder data
  const summaryData = [
    { title: 'VEHICLE SEARCH', count: 0, icon: <SearchIcon sx={{ fontSize: 40 }} />, bgColor: '#29b6f6' }, 
    { title: 'NEW REGISTERED VEHICLES', count: 0, icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />, bgColor: '#ab47bc' }, 
    { title: 'INSPECTION FAILED', count: 0, icon: <HighlightOffIcon sx={{ fontSize: 40 }} />, bgColor: '#ef5350' },
    { title: 'INSPECTION PASSED', count: 0, icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />, bgColor: '#26a69a' }, 
  ];

  const handleAddNewWorkshop = () => {
    console.log("Add New Workshop Clicked"); 
  };

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

       {/* Summary Cards Grid */}
       <Grid container spacing={3} sx={{ mt: 1, overflowX: 'auto', py: 1 }} wrap="nowrap">
          {summaryData.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ minWidth: 200 }}>
                    <Paper elevation={3} sx={{ ...cardStyles, backgroundColor: item.bgColor }}>
                       <Box>
                          <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold' }}>{item.title}</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{item.count}</Typography>
                       </Box>
                       <IconButton sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%' }}>
                          {React.cloneElement(item.icon, { sx: { fontSize: 32 } })}
                       </IconButton>
                  </Paper>
              </Grid>
          ))}
       </Grid>

       {/* Placeholder for the main content area */}
       <Paper sx={{ mt: 3, p: 2, minHeight: '400px', width: '100%' }}>
          <Typography variant="body1">Workshop list table or other content will go here...</Typography>
       </Paper>
    </>
  );

  // --- Main Render --- 
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Fixed AppBar - Replaced Logout with Profile Icon */}
      <AppBar 
          position="fixed" 
          sx={{ 
              zIndex: theme.zIndex.drawer + 1, 
              bgcolor: theme.palette.secondary.main, 
          }}
       >
        <Toolbar>
          {/* Menu Button */}
          <IconButton
             sx={{ 
                marginRight: 2, 
                color: theme.palette.getContrastText(theme.palette.secondary.main) 
            }} 
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          {/* Logo - Moved to left */}
          <Box 
            component="img"
            src={LawMisLogo}
            alt="LAW-MIS Logo"
            sx={{ height: 40, mr: 2 }} // Removed flexGrow, added margin-right
          />
          {/* Spacer to push profile icon right */}
          <Box sx={{ flexGrow: 1 }} /> 

          {/* Profile Icon Button */}
          <IconButton
             sx={{ p: 0 }} // Remove padding for avatar
             aria-label="account of current user"
             aria-controls={isProfileMenuOpen ? 'profile-menu-appbar' : undefined}
             aria-haspopup="true"
             onClick={handleOpenProfileMenu} // <-- Open profile menu
             color="inherit"
          >
             {/* Use Avatar or AccountCircleIcon */}
             <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
                 {/* Placeholder Initial - Replace with user initial if available */}
                 A 
             </Avatar> 
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* Profile Menu */}
       <Menu
            id="profile-menu-appbar"
            anchorEl={profileMenuAnchorEl}
            anchorOrigin={{
              vertical: 'bottom', // Position below the anchor
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isProfileMenuOpen}
            onClose={handleCloseProfileMenu}
            sx={{ mt: '5px' }} // Add slight margin-top
        >
            {/* Static User Info */}
            <MenuItem disabled sx={{ '&.Mui-disabled': { opacity: 1 }}}> 
                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Name: muhammad ahmed bilal dar" />
            </MenuItem>
             <MenuItem disabled sx={{ '&.Mui-disabled': { opacity: 1 }}}> 
                <ListItemIcon><EmailIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Email: mahmeddar2000@gmail.com" />
            </MenuItem>
             <MenuItem disabled sx={{ '&.Mui-disabled': { opacity: 1 }}}> 
                <ListItemIcon><BadgeIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Role: Workshop User" />
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            {/* Actions */}
            <MenuItem onClick={onNavigateToChangePassword}>
                <ListItemIcon><KeyIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Change Password</ListItemText>
            </MenuItem>
            <MenuItem onClick={onNavigateToUserProfile}>
                <ListItemIcon><ManageAccountsIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Update Profile</ListItemText>
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            {/* Logout */}
            <MenuItem onClick={handleLogoutClick}> 
                <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: 'error' }}>LOGOUT</ListItemText>
            </MenuItem>
        </Menu>

      {/* Render the new LawMisSidebar component */}
      <LawMisSidebar open={drawerOpen} />

      {/* Main Content Area */}
      <Box 
          component="main" 
          sx={{ 
              flexGrow: 1, 
              p: 3, 
              marginLeft: drawerOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`, 
              width: `calc(100% - ${drawerOpen ? drawerWidth : closedDrawerWidth}px)`,
              transition: theme.transitions.create(['margin', 'width'], { 
                  easing: theme.transitions.easing.sharp,
                  duration: drawerOpen ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
              }),
          }}
      >
        <DrawerHeader /> {/* Spacer for fixed AppBar */}
        <Container maxWidth="xl" sx={{ mt: 0, mb: 4, padding: 0 }}>
            {/* Conditionally render Dashboard Content or Profile */}
            {currentView === 'DASHBOARD' && renderDashboardContent()} 
            {currentView === 'PROFILE' && <LAW_MISUserProfile onGoBack={onNavigateBack} />}
            {currentView === 'CHANGE_PASSWORD' && <LAW_MISChangePassword onGoBack={onNavigateBack} />}

            {/* Map View - Commented out as component doesn't exist yet */}
            {/* {currentView === 'MAP' && <PoliceStationsMap />} */}
        </Container>
       </Box>
       
       {/* Logout Confirmation Dialog */}
       <Dialog
            open={confirmLogoutOpen}
            onClose={handleCloseConfirmDialog} // Close if clicking outside
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
    </Box>
  );
};

export default LawMisDashboard;

