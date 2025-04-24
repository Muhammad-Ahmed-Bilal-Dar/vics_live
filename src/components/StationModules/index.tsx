import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress, 
  IconButton, 
  styled,
  Grid as MuiGrid
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import EvStationIcon from '@mui/icons-material/EvStation';

// Create a Grid component that ensures 'item' prop works
const Grid = MuiGrid;

// Styled icon wrapper
const StationIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f4f8',
  borderRadius: '4px',
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  width: '48px',
  height: '48px',
}));

// Styled progress bar
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  backgroundColor: '#E0E0E0',
}));

interface StationModulesProps {
  visible: boolean;
  onModuleSelect: (module: string) => void;
}

const StationModules = ({ visible, onModuleSelect }: StationModulesProps) => {
  // Statistics cards data
  const statsCards = [
    { title: 'Total Chargers', value: '256', percentage: 100, color: '#1976d2', icon: <BatteryChargingFullIcon sx={{ color: '#4caf50' }} /> },
    { title: 'Available Chargers', value: '425', percentage: 75, color: '#1976d2', icon: <InfoIcon sx={{ color: '#888' }} /> },
    { title: 'In Use Chargers', value: '100', percentage: 45, color: '#ff9800', icon: <InfoIcon sx={{ color: '#888' }} /> },
    { title: 'Unavailable Charger', value: '18', percentage: 8, color: '#f44336', icon: <InfoIcon sx={{ color: '#888' }} /> },
  ];

  // Station cards data
  const stationCards = [
    { 
      distance: '2.5', 
      name: 'Tesla Station', 
      type: 'DC', 
      price: '$2.2kW', 
      slots: '2',
      icon: <EvStationIcon sx={{ color: '#1976d2' }} />
    },
    { 
      distance: '3.8', 
      name: 'Benz Station', 
      type: 'DC', 
      price: '$1.5kW', 
      slots: '5',
      icon: <EvStationIcon sx={{ color: '#1976d2' }} />
    },
    { 
      distance: '2.6', 
      name: 'Nissan Station', 
      type: 'DC', 
      price: '$1.2kW', 
      slots: '6',
      icon: <EvStationIcon sx={{ color: '#1976d2' }} />
    },
    { 
      distance: '1.6', 
      name: 'SUV Station', 
      type: 'DC', 
      price: '$0.9kW', 
      slots: '8',
      icon: <EvStationIcon sx={{ color: '#1976d2' }} />
    },
  ];

  if (!visible) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 3,
        width: '100%',
        animation: 'fadeIn 0.3s ease-in-out',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Statistics Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {statsCards.map((card) => (
          <Box key={card.title} sx={{ flexGrow: 1, flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' } }}>
            <Card sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              height: '100%',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {card.title}
                  </Typography>
                  {card.icon}
                </Box>
                
                <Typography variant="h3" component="div" sx={{ 
                  fontWeight: 'bold', 
                  mb: 0.5, 
                  fontSize: '2.5rem'
                }}>
                  {card.value}
                </Typography>
                
                <StyledLinearProgress 
                  variant="determinate" 
                  value={card.percentage} 
                  sx={{ 
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: card.color,
                    }
                  }}
                />
                
                <Typography variant="body2" color="text.secondary">
                  {card.percentage}%
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Station Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {stationCards.map((station) => (
          <Box key={station.name} sx={{ flexGrow: 1, flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' } }}>
            <Card sx={{ 
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              height: '100%',
              position: 'relative',
            }}>
              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    bgcolor: '#f0f7ff', 
                    width: 60, 
                    height: 60, 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    mr: 2
                  }}>
                    {station.icon}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3" component="div" sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '2rem',
                      lineHeight: 1
                    }}>
                      {station.distance}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      miles
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  {station.name}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '30%' }}>
                    <Typography variant="body2" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body1">
                      {station.type}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '30%' }}>
                    <Typography variant="body2" color="text.secondary">
                      Price
                    </Typography>
                    <Typography variant="body1">
                      {station.price}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '30%' }}>
                    <Typography variant="body2" color="text.secondary">
                      Slot
                    </Typography>
                    <Typography variant="body1">
                      {station.slots}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StationModules; 