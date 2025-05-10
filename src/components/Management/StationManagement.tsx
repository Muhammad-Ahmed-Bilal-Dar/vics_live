import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Stack,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EvStationIcon from '@mui/icons-material/EvStation';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getAvailabilityPercentage, formatDate } from '../../utils/helpers';

// Import the tab components
import StationList from './StationList';
import StationUserManagement from './StationUserManagement';
import StationForm from './StationForm';

// Types
interface Station {
  id: number;
  name: string;
  location: string;
  stationType: 'DC' | 'AC';
  powerOutput: string;
  totalChargers: number;
  availableChargers: number;
  status: 'operational' | 'maintenance' | 'offline';
  lastUpdated: string;
}

interface StationManagementProps {
  visible: boolean;
}

// Fixed station data
const stationData: Station[] = [
  {
    id: 1,
    name: 'Lahore EV Station',
    location: 'Gulberg III, Lahore',
    stationType: 'DC',
    powerOutput: '150 kW',
    totalChargers: 8,
    availableChargers: 5,
    status: 'operational',
    lastUpdated: '05/28/2024'
  },
  {
    id: 2,
    name: 'Faisalabad Charge Zone',
    location: 'D Ground, Faisalabad',
    stationType: 'DC',
    powerOutput: '100 kW',
    totalChargers: 6,
    availableChargers: 2,
    status: 'operational',
    lastUpdated: '05/27/2024'
  },
  {
    id: 3,
    name: 'Rawalpindi Volt Corner',
    location: 'Saddar, Rawalpindi',
    stationType: 'AC',
    powerOutput: '22 kW',
    totalChargers: 12,
    availableChargers: 8,
    status: 'operational',
    lastUpdated: '05/28/2024'
  },
  {
    id: 4,
    name: 'Multan EV Dock',
    location: 'Gulgasht Colony, Multan',
    stationType: 'DC',
    powerOutput: '50 kW',
    totalChargers: 4,
    availableChargers: 0,
    status: 'maintenance',
    lastUpdated: '05/26/2024'
  },
  {
    id: 5,
    name: 'Gujranwala SparkPoint',
    location: 'Model Town, Gujranwala',
    stationType: 'AC',
    powerOutput: '11 kW',
    totalChargers: 10,
    availableChargers: 7,
    status: 'operational',
    lastUpdated: '05/28/2024'
  },
  {
    id: 6,
    name: 'Bahawalpur EV Bay',
    location: 'Model Town B, Bahawalpur',
    stationType: 'DC',
    powerOutput: '75 kW',
    totalChargers: 6,
    availableChargers: 0,
    status: 'offline',
    lastUpdated: '05/25/2024'
  },
  {
    id: 7,
    name: 'Sialkot Spark Station',
    location: 'Paris Road, Sialkot',
    stationType: 'DC',
    powerOutput: '120 kW',
    totalChargers: 8,
    availableChargers: 3,
    status: 'operational',
    lastUpdated: '05/28/2024'
  },
  {
    id: 8,
    name: 'Rahim Yar Khan EV Station',
    location: 'Abbasia Town, Rahim Yar Khan',
    stationType: 'AC',
    powerOutput: '7 kW',
    totalChargers: 15,
    availableChargers: 13,
    status: 'operational',
    lastUpdated: '05/27/2024'
  },
  {
    id: 9,
    name: 'Kasur EV Point',
    location: 'Allama Iqbal Road, Kasur',
    stationType: 'AC',
    powerOutput: '22 kW',
    totalChargers: 8,
    availableChargers: 4,
    status: 'operational',
    lastUpdated: '05/28/2024'
  },
  {
    id: 10,
    name: 'Jhelum Charge Spot',
    location: 'GT Road, Jhelum',
    stationType: 'DC',
    powerOutput: '50 kW',
    totalChargers: 4,
    availableChargers: 0,
    status: 'maintenance',
    lastUpdated: '05/26/2024'
  },
  {
    id: 11,
    name: 'Okara Volt Dock',
    location: 'College Road, Okara',
    stationType: 'AC',
    powerOutput: '11 kW',
    totalChargers: 12,
    availableChargers: 10,
    status: 'operational',
    lastUpdated: '05/28/2024'
  },
  {
    id: 12,
    name: 'Sheikhupura Charge Zone',
    location: 'Main Boulevard, Sheikhupura',
    stationType: 'DC',
    powerOutput: '100 kW',
    totalChargers: 6,
    availableChargers: 3,
    status: 'operational',
    lastUpdated: '05/27/2024'
  }
];

// Helper component for Tab Panel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`station-management-tabpanel-${index}`}
      aria-labelledby={`station-management-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `station-management-tab-${index}`,
    'aria-controls': `station-management-tabpanel-${index}`,
  };
}

const StationManagement: React.FC<StationManagementProps> = ({ visible }) => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter stations based on search query
  const filteredStations = stationData.filter(station => 
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.stationType.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Color for status chip
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return theme.palette.status.operational;
      case 'maintenance':
        return theme.palette.status.maintenance;
      case 'offline':
        return theme.palette.status.offline;
      default:
        return '#9e9e9e'; // grey
    }
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  
  if (!visible) {
    return null;
  }
  
  return (
    <Box sx={{ p: 3, animation: 'fadeIn 0.3s ease-in-out' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EvStationIcon sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h5" component="h1">
            Station Management
          </Typography>
        </Box>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="Station Management Tabs">
          <Tab 
            label="Station List" 
            icon={<EvStationIcon />} 
            iconPosition="start" 
            {...a11yProps(0)} 
            sx={{ textTransform: 'none' }} 
          />
          <Tab 
            label="Station User Management" 
            icon={<GroupIcon />} 
            iconPosition="start" 
            {...a11yProps(1)} 
            sx={{ textTransform: 'none' }} 
          />
          <Tab 
            label="Add New Station" 
            icon={<AddCircleOutlineIcon />} 
            iconPosition="start" 
            {...a11yProps(2)} 
            sx={{ textTransform: 'none' }} 
          />
        </Tabs>
      </Box>

      {/* Tab Panels (Content) */}
      <TabPanel value={currentTab} index={0}>
        <StationList />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <StationUserManagement />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <StationForm />
      </TabPanel>

    </Box>
  );
};

export default StationManagement; 