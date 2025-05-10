import { Box, Typography, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AreaManagementProps {
  visible: boolean;
}

const AreaManagement: React.FC<AreaManagementProps> = ({ visible }) => {
  const theme = useTheme();
  
  if (!visible) {
    return null;
  }
  
  return (
    <Box sx={{ p: 3, animation: 'fadeIn 0.6s ease-in-out' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h5" component="h1">
          Area Management
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        This is the Area Management module content. It's currently under development.
      </Typography>
    </Box>
  );
};

export default AreaManagement; 