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
  Collapse
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

// Drawer width when open
const drawerWidth = 240;

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
    color: '#ffffff',
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
  
  const drawerVariant = isMobile ? 'temporary' : 'persistent';
  
  const handleManagementClick = () => {
    setManagementOpen(!managementOpen);
  };
  
  const modules = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Station', icon: <SensorsIcon /> },
    { name: 'Reports', icon: <AssessmentIcon /> }, 
    { name: 'Analytics', icon: <BarChartIcon /> },
    { name: 'Appointments', icon: <CalendarMonthIcon /> },
  ];
  
  const managementSubmenus = [
    { name: 'User Management', icon: <PersonIcon />, fullPath: 'Management/User' },
    { name: 'Station Management', icon: <EvStationIcon />, fullPath: 'Management/Station' },
    { name: 'Area Management', icon: <LocationOnIcon />, fullPath: 'Management/Area' },
    { name: 'Appointment Management', icon: <EventNoteIcon />, fullPath: 'Management/Appointment' },
  ];

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(open ? {
              width: drawerWidth,
            } : {
              width: theme.spacing(7),
              overflowX: 'hidden',
            }),
          },
        }}
        variant={drawerVariant}
        anchor="left"
        open={open}
        onClose={isMobile ? onToggle : undefined}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          p: 1 
        }}>
          <IconButton onClick={onToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {/* Regular Modules */}
          {modules.map((module) => (
            <ListItem 
              key={module.name} 
              disablePadding 
              sx={{ display: 'block' }}
              onClick={() => onModuleSelect(module.name)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {module.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={module.name} 
                  sx={{ opacity: open ? 1 : 0 }} 
                  primaryTypographyProps={{ variant: 'sidebarMenuItem' }}
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
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Management" 
                sx={{ opacity: open ? 1 : 0 }} 
                primaryTypographyProps={{ variant: 'sidebarMenuItem' }}
              />
              {open && (managementOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            
            {/* Submenu Items - Only visible when sidebar is open */}
            {open && (
              <Collapse in={managementOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {managementSubmenus.map((submenu) => (
                    <ListItemButton 
                      key={submenu.name}
                      sx={{ pl: 4 }}
                      onClick={() => onModuleSelect(submenu.fullPath)}
                    >
                      <ListItemIcon>
                        {submenu.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={submenu.name} 
                        primaryTypographyProps={{ variant: 'sidebarMenuItem' }}
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
            onClick={() => onModuleSelect('Settings')}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Settings" 
                sx={{ opacity: open ? 1 : 0 }} 
                primaryTypographyProps={{ variant: 'sidebarMenuItem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
      {!isMobile && (
        <DrawerToggleButton
          onClick={onToggle}
          sx={{
            left: open ? drawerWidth : 0,
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </DrawerToggleButton>
      )}
    </>
  );
};

export default Sidebar; 