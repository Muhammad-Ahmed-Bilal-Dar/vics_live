import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress, 
  IconButton, 
  styled,
  Grid as MuiGrid,
  Divider
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EvStationIcon from '@mui/icons-material/EvStation';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { useLanguage } from '../../utils/i18n/LanguageContext';

// Create a Grid component that ensures 'item' prop works
const Grid = styled(MuiGrid)``;

// Styled Components
const Container = styled(Box)`
  padding: 20px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  height: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin: 8px 0;
`;

// New styled component for the IconSquare
const IconSquare = styled(Box)<{ color: string }>`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${props => props.color}10;
  color: ${props => props.color};
`;

// Station Icon component with background
const StationIcon = styled(Box)<{ bgcolor: string }>`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${props => props.bgcolor};
  color: white;
`;

interface StationModulesProps {
  visible: boolean;
  onModuleSelect?: (module: string) => void;
}

const StationModules: React.FC<StationModulesProps> = ({ visible, onModuleSelect }) => {
  const { t } = useLanguage();
  
  const statisticsData = [
    {
      icon: <BoltOutlinedIcon />,
      title: t('chargers'),
      value: 34,
      color: '#7367F0',
      progress: 100,
    },
    {
      icon: <DeviceThermostatOutlinedIcon />,
      title: t('active'),
      value: 15,
      color: '#28C76F',
      progress: 44,
    },
    {
      icon: <LocalGasStationOutlinedIcon />,
      title: t('operational'),
      value: 12,
      color: '#EA5455',
      progress: 35,
    },
    {
      icon: <BoltOutlinedIcon />,
      title: t('maintenance'),
      value: 7,
      color: '#FF9F43',
      progress: 20,
    },
  ];

  const stationData = [
    {
      icon: <ElectricCarIcon fontSize="large" />,
      iconBg: '#3366FF',
      distance: 3.7,
      name: 'Tesla Station',
      rating: 5,
      type: "AC Type 2",
      price: '$13.1',
      availableSlot: 8,
    },
    {
      icon: <DirectionsCarIcon fontSize="large" />,
      iconBg: '#E91E63',
      distance: 5.9,
      name: 'Benz Station',
      rating: 4.5,
      type: "AC Type 2",
      price: '$9.5',
      availableSlot: 3,
    },
    {
      icon: <AirportShuttleIcon fontSize="large" />,
      iconBg: '#4CAF50',
      distance: 9.3,
      name: 'Nissan Station',
      rating: 4,
      type: "AC Type 2",
      price: '$7.3',
      availableSlot: 6,
    },
    {
      icon: <TwoWheelerIcon fontSize="large" />,
      iconBg: '#FF9800',
      distance: 12.5,
      name: 'SUV Station',
      rating: 3.5,
      type: "DC CCS",
      price: '$6.8',
      availableSlot: 2,
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
        {statisticsData.map((item, index) => (
          <Box key={index} sx={{ flexGrow: 1, flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' } }}>
            <Card sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              height: '100%',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconSquare color={item.color}>{item.icon}</IconSquare>
                  <Box sx={{ ml: 1.5 }}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>{item.title}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.value}</Typography>
                  </Box>
                </Box>
                
                <StyledLinearProgress 
                  variant="determinate" 
                  value={item.progress} 
                  sx={{ 
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.color,
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Station Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {stationData.map((station, index) => (
          <Box key={index} sx={{ flexGrow: 1, flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' } }}>
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
                  <StationIcon bgcolor={station.iconBg}>
                    {station.icon}
                  </StationIcon>
                  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
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
                      {station.availableSlot}
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