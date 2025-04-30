import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  styled,
  Collapse,
  Theme, 
  CSSObject
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SensorsIcon from '@mui/icons-material/Sensors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import EvStationIcon from '@mui/icons-material/EvStation';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Drawer transition mixins
const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.sidebar.drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRight: 'none',
  marginTop: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.mixins.toolbar.minHeight as number + 8,
  },
  height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  [theme.breakpoints.up('sm')]: {
    height: `calc(100% - ${(theme.mixins.toolbar.minHeight as number) + 8}px)`,
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `${theme.sidebar.closedDrawerWidth}px`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRight: 'none',
  marginTop: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.mixins.toolbar.minHeight as number + 8,
  },
  height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  [theme.breakpoints.up('sm')]: {
    height: `calc(100% - ${(theme.mixins.toolbar.minHeight as number) + 8}px)`,
  },
});

// Mobile drawer mixin
const mobileMixin = (theme: Theme): CSSObject => ({
  width: '100%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRight: 'none',
  marginTop: theme.mixins.toolbar.minHeight,
  height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
});

// Header for spacing inside Drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Styled component for the drawer
const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return {
      width: theme.sidebar.drawerWidth,
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

// Styled component for the toggle button
const DrawerToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  zIndex: theme.zIndex.drawer - 1,
  borderRadius: '0 4px 4px 0',
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  transition: theme.transitions.create(['left', 'background-color'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  onModuleSelect: (module: string) => void;
}

const Sidebar = ({ open, onToggle, onModuleSelect }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [managementOpen, setManagementOpen] = useState(false);
  
  // Handler to select a module and provide feedback that it was selected
  const handleModuleSelect = (moduleName: string) => {
    console.log(`Selected module: ${moduleName}`); // Provide feedback
    onModuleSelect(moduleName); // Call the parent handler
    
    // Close the drawer on mobile after selection
    if (isMobile) {
      onToggle();
    }
  };
  
  const handleManagementClick = () => {
    setManagementOpen(!managementOpen);
  };
  
  const modules = [
    { name: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
    { name: 'Station', icon: <SensorsIcon fontSize="small" /> },
    { name: 'Reports', icon: <AssessmentIcon fontSize="small" /> }, 
    { name: 'Analytics', icon: <BarChartIcon fontSize="small" /> },
    { name: 'Appointments', icon: <CalendarMonthIcon fontSize="small" /> },
  ];
  
  const managementSubmenus = [
    { name: 'User management', icon: <PersonIcon fontSize="small" />, fullPath: 'Management/User' },
    { name: 'Station management', icon: <EvStationIcon fontSize="small" />, fullPath: 'Management/Station' },
    { name: 'Area management', icon: <LocationOnIcon fontSize="small" />, fullPath: 'Management/Area' },
    { name: 'Appointment management', icon: <EventNoteIcon fontSize="small" />, fullPath: 'Management/Appointment' },
  ];

  return (
    <>
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={isMobile ? onToggle : undefined}
      >
        <DrawerHeader /> {/* Provides space for AppBar */}
        <Divider />
        <List component="nav" sx={{ p: 0 }}>
          {/* Regular Modules */}
          {modules.map((module) => (
            <ListItem 
              key={module.name} 
              disablePadding 
              sx={{ display: 'block' }}
              onClick={() => handleModuleSelect(module.name)}
            >
              <ListItemButton
                sx={{
                  minHeight: theme.sidebar.itemHeight,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? theme.sidebar.iconMargin : 'auto',
                    justifyContent: 'center',
                    color: 'inherit'
                  }}
                >
                  {module.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={module.name} 
                  sx={{ opacity: open ? 1 : 0 }} 
                  primaryTypographyProps={{ 
                    variant: 'sidebarMenuItem' 
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          
          {/* Management Module with Submenu */}
          <ListItem 
            disablePadding 
            sx={{ display: 'block' }}
          >
            <ListItemButton
              onClick={handleManagementClick}
              sx={{
                minHeight: theme.sidebar.itemHeight,
                justifyContent: open ? 'initial' : 'center',
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? theme.sidebar.iconMargin : 'auto',
                  justifyContent: 'center',
                  color: 'inherit'
                }}
              >
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Management" 
                sx={{ opacity: open ? 1 : 0 }} 
                primaryTypographyProps={{ 
                  variant: 'sidebarMenuItem' 
                }}
              />
              {open && (managementOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
            </ListItemButton>
            
            {/* Submenu Items - Only visible when sidebar is open */}
            {open && (
              <Collapse in={managementOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {managementSubmenus.map((submenu) => (
                    <ListItemButton 
                      key={submenu.name}
                      sx={{ 
                        pl: theme.sidebar.subItemPadding,
                        minHeight: theme.sidebar.subItemHeight,
                        justifyContent: open ? 'initial' : 'center',
                      }}
                      onClick={() => handleModuleSelect(submenu.fullPath)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? theme.sidebar.iconMargin : 'auto',
                          justifyContent: 'center',
                          color: 'inherit'
                        }}
                      >
                        {submenu.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={submenu.name} 
                        sx={{ opacity: open ? 1 : 0 }}
                        primaryTypographyProps={{ 
                          variant: 'sidebarSubMenuItem'
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
          
          {/* Settings Module */}
          <ListItem 
            disablePadding 
            sx={{ display: 'block' }}
            onClick={() => handleModuleSelect('Settings')}
          >
            <ListItemButton
              sx={{
                minHeight: theme.sidebar.itemHeight,
                justifyContent: open ? 'initial' : 'center',
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? theme.sidebar.iconMargin : 'auto',
                  justifyContent: 'center',
                  color: 'inherit'
                }}
              >
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Settings" 
                sx={{ opacity: open ? 1 : 0 }} 
                primaryTypographyProps={{ 
                  variant: 'sidebarMenuItem'
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </StyledDrawer>
    </>
  );
};

export default Sidebar; 