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
const drawerWidth = 240;
const closedDrawerWidth = 65; 

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

// --- Styled Drawer Component --- 
const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme, open }) => ({
    width: drawerWidth, 
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
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
    // State for collapsible list remains internal to the sidebar
    const [openListings, setOpenListings] = useState(true);

    const handleListingsClick = () => {
        setOpenListings(!openListings);
        // Note: Cannot auto-open drawer from here as 'open' state is controlled by parent
    };

    return (
        <StyledDrawer variant="permanent" open={open}>
            <DrawerHeader /> {/* Provides space for AppBar */}
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <List component="nav">
                 {/* Dashboard Link */}
                 <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton 
                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                        onClick={onNavigateBack} // Call the navigation handler
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            {/* TODO: Replace with appropriate Dashboard icon */}
                            <InboxIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="DASHBOARD" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                 {/* User Profile */}
                 <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="USER PROFILE" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                {/* Listings (Collapsible) */}
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton onClick={handleListingsClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="LISTINGS" sx={{ opacity: open ? 1 : 0 }} />
                        {open ? (openListings ? <ExpandLess /> : <ExpandMore />) : null} 
                    </ListItemButton>
                </ListItem>
                <Collapse in={openListings && open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: open ? 4 : 2.5, justifyContent: open ? 'initial' : 'center' }}> 
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sub Item 1" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: open ? 4 : 2.5, justifyContent: open ? 'initial' : 'center' }}> 
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sub Item 2" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </List>
                </Collapse>
                 {/* Workshop List */}
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                            <MailIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="WORKSHOP LIST" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{ flexGrow: 1 }} /> 
            {/* Logos at the bottom */}
            <Box sx={{ 
                p: open ? 2 : 1, 
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'center', 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                opacity: open ? 1 : 0, 
                transition: theme.transitions.create('opacity', {duration: theme.transitions.duration.leavingScreen}),
                overflow: 'hidden', 
                minHeight: 60, 
            }}>
                <Box 
                    component="img" 
                    src={PtaLogo} 
                    alt="PTA Logo" 
                    sx={{ height: 40, width: 'auto', objectFit: 'contain', display: open ? 'block' : 'none' }}
                />
                <Box 
                    component="img" 
                    src={PunjabLogo} 
                    alt="Punjab Logo" 
                    sx={{ height: 40, width: 'auto', objectFit: 'contain', display: open ? 'block' : 'none' }}
                />
                <Box 
                    component="img" 
                    src={TransportLogo} 
                    alt="Transport Logo" 
                    sx={{ height: 40, width: 'auto', objectFit: 'contain', display: open ? 'block' : 'none' }}
                />
            </Box>
        </StyledDrawer>
    );
};

export default LawMisSidebar; 