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
  Stack,
  useTheme,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EvStationIcon from '@mui/icons-material/EvStation';
import BoltIcon from '@mui/icons-material/Bolt';
import { getAvailabilityPercentage, formatDate } from '../../utils/helpers';

// Re-using the Station interface, assuming it might be moved to a types file later
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

// Keeping fixed data here for now, could be passed as prop
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

interface StationListProps {
  // Potentially add props like `stations` if data comes from parent
}

const StationList: React.FC<StationListProps> = () => {
  const theme = useTheme();
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
  
  return (
    <Box sx={{ mt: 3 }}>
      {/* Search and Filter Bar */}
      <Paper sx={{ mb: 3, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="Search stations"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filter
          </Button>
        </Stack>
      </Paper>
      
      {/* Stations Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Station Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Power Output</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Chargers</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((station) => (
                  <TableRow key={station.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: '#e8f5e9', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <EvStationIcon color="primary" fontSize="small" />
                        </Box>
                        <Typography variant="body2">{station.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{station.location}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <BoltIcon fontSize="small" sx={{ 
                          color: station.stationType === 'DC' ? theme.palette.charger.dc : theme.palette.charger.ac,
                        }} />
                        <Typography variant="body2">{station.stationType}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{station.powerOutput}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {station.availableChargers} / {station.totalChargers} 
                        <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                          ({getAvailabilityPercentage(station.availableChargers, station.totalChargers)}%)
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={station.status} 
                        size="small" 
                        sx={{ 
                          bgcolor: `${getStatusColor(station.status)}15`,
                          color: getStatusColor(station.status),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{formatDate(station.lastUpdated)}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default StationList; 