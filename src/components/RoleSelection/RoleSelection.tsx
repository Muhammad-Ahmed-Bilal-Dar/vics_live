import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid,
  Avatar
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GavelIcon from '@mui/icons-material/Gavel'; // Icon for Law/Justice

interface RoleSelectionProps {
  onRoleSelect: (role: 'VICS_ADMIN' | 'LAW_MIS') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default', // Use theme background
        p: 3
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Select Your Portal
      </Typography>
      <Grid container spacing={4} justifyContent="center" maxWidth="md">
        {/* VICS Admin Button/Card */}
        <Grid item xs={12} sm={6} md={5}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onRoleSelect('VICS_ADMIN')}
            sx={{
              p: 3,
              flexDirection: 'column',
              height: '100%',
              textAlign: 'center',
              borderColor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.lighter',
              }
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
              <AdminPanelSettingsIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'medium' }}>
              VICS Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access the Vehicle Information & Control System administration panel.
            </Typography>
          </Button>
        </Grid>

        {/* LAW-MIS Button/Card */}
        <Grid item xs={12} sm={6} md={5}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onRoleSelect('LAW_MIS')}
            sx={{
              p: 3,
              flexDirection: 'column',
              height: '100%',
              textAlign: 'center',
              borderColor: 'secondary.main',
               '&:hover': {
                bgcolor: 'secondary.lighter',
              }
            }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56, mb: 2 }}>
              <GavelIcon fontSize="large" />
            </Avatar>
             <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'medium' }}>
              LAW-MIS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access the Law Management Information System.
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoleSelection; 