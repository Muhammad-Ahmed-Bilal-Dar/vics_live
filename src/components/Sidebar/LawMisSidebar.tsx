import React, { useState } from 'react';
import { 
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    IconButton, 
    Divider, 
    Box,
    useTheme,
    Theme,
    CSSObject,
    useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ListIcon from '@mui/icons-material/List'; 
import MailIcon from '@mui/icons-material/Mail'; 
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox'; 
// Import logos (adjust path if needed, assuming this file is one level deeper)
import PtaLogo from '../../assets/images/PTA-logo.png';
import PunjabLogo from '../../assets/images/punjab-logo.png';
import TransportLogo from '../../assets/images/transport-loho.png';

// --- Drawer Dimensions --- 
const drawerWidth = 200;
const closedDrawerWidth = 50; 

// --- Drawer Transition Mixins --- 
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.primary.main, 
  color: theme.palette.getContrastText(theme.palette.primary.main), 
  borderRight: 'none', 
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  width: `${closedDrawerWidth}px`,
  borderRight: 'none', 
});

// --- Mobile Drawer Mixin ---
const mobileMixin = (theme: Theme): CSSObject => ({
  width: '100%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.primary.main, 
  color: theme.palette.getContrastText(theme.palette.primary.main), 
  borderRight: 'none', 
});

// --- Styled Drawer Component --- 
const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme, open }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return {
    width: drawerWidth, 
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
      ...(open && !isMobile && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
      ...(!open && !isMobile && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
      ...(isMobile && open && {
        ...mobileMixin(theme),
        '& .MuiDrawer-paper': mobileMixin(theme),
  }),
    };
  }
);

// --- Header for spacing inside Drawer --- 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar, 
}));

// --- Component Props ---
interface LawMisSidebarProps {
    open: boolean;
    onNavigateBack: () => void; // Add prop for navigating back to dashboard
}

// --- Sidebar Component --- 
const LawMisSidebar: React.FC<LawMisSidebarProps> = ({ open, onNavigateBack }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // State for collapsible list remains internal to the sidebar
    const [openListings, setOpenListings] = useState(true);

    const handleListingsClick = () => {
        setOpenListings(!openListings);
        // Note: Cannot auto-open drawer from here as 'open' state is controlled by parent
    };

    return (
        <StyledDrawer 
            variant={isMobile ? "temporary" : "permanent"} 
            open={open}
            onClose={isMobile ? onNavigateBack : undefined} // Allow closing on mobile with backdrop click
        >
            <DrawerHeader /> {/* Provides space for AppBar */}
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <List component="nav">
                 {/* Dashboard Link */}
                 <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton 
                        sx={{ minHeight: 40, justifyContent: open ? 'initial' : 'center', px: 2 }}
                        onClick={onNavigateBack} // Call the navigation handler
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            {/* TODO: Replace with appropriate Dashboard icon */}
                            <InboxIcon fontSize="small" /> 
                        </ListItemIcon>
                        <ListItemText primary="DASHBOARD" sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: '0.8rem' }} />
                    </ListItemButton>
                </ListItem>
                 {/* User Profile */}
                 <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 40, justifyContent: open ? 'initial' : 'center', px: 2 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="USER PROFILE" sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: '0.8rem' }} />
                    </ListItemButton>
                </ListItem>
                {/* Listings (Collapsible) */}
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton onClick={handleListingsClick} sx={{ minHeight: 40, justifyContent: open ? 'initial' : 'center', px: 2 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            <ListIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="LISTINGS" sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: '0.8rem' }} />
                        {open ? (openListings ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />) : null} 
                    </ListItemButton>
                </ListItem>
                <Collapse in={openListings && open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: open ? 3 : 2, justifyContent: open ? 'initial' : 'center', minHeight: 36 }}> 
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Sub Item 1" sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: '0.75rem' }} />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: open ? 3 : 2, justifyContent: open ? 'initial' : 'center', minHeight: 36 }}> 
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Sub Item 2" sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: '0.75rem' }} />
                        </ListItemButton>
                    </List>
                </Collapse>
                 {/* Workshop List */}
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 40, justifyContent: open ? 'initial' : 'center', px: 2 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            <MailIcon fontSize="small" /> 
                        </ListItemIcon>
                        <ListItemText primary="WORKSHOP LIST" sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: '0.8rem' }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{ flexGrow: 1 }} /> 
            {/* Logos at the bottom */}
            <Box sx={{ 
                p: open ? 1.5 : 0.5, 
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'center', 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                opacity: open ? 1 : 0, 
                transition: theme.transitions.create('opacity', {duration: theme.transitions.duration.leavingScreen}),
                overflow: 'hidden', 
                minHeight: 50, 
            }}>
                <Box 
                    component="img" 
                    src={PtaLogo} 
                    alt="PTA Logo" 
                    sx={{ height: 30, width: 'auto', objectFit: 'contain', display: open ? 'block' : 'none' }}
                />
                <Box 
                    component="img" 
                    src={PunjabLogo} 
                    alt="Punjab Logo" 
                    sx={{ height: 30, width: 'auto', objectFit: 'contain', display: open ? 'block' : 'none' }}
                />
                <Box 
                    component="img" 
                    src={TransportLogo} 
                    alt="Transport Logo" 
                    sx={{ height: 30, width: 'auto', objectFit: 'contain', display: open ? 'block' : 'none' }}
                />
            </Box>
        </StyledDrawer>
    );
};

export default LawMisSidebar; 