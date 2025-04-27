import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  IconButton,
  Toolbar,
  AppBar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LawMisSelectionProps {
  onSelectDashboard: (dashboardType: 'USER' | 'ADMIN') => void;
  onGoBack: () => void; // Function to go back to the main role selection
}

const LawMisSelection: React.FC<LawMisSelectionProps> = ({ onSelectDashboard, onGoBack }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
       {/* Simple App Bar with Back Button */}
       <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={onGoBack} aria-label="back">
            <ArrowBackIcon sx={{ color: 'text.primary' }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.primary', ml: 1 }}>
            LAW-MIS Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Select Dashboard Access
        </Typography>
        <Grid container spacing={4} justifyContent="center" maxWidth="sm">
          {/* User Dashboard Button/Card */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onSelectDashboard('USER')}
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
                <PersonIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'medium' }}>
                User Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Login for standard user access.
              </Typography>
            </Button>
          </Grid>

          {/* Admin Dashboard Button/Card */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => onSelectDashboard('ADMIN')}
              sx={{
                p: 3,
                flexDirection: 'column',
                height: '100%',
                textAlign: 'center',
                borderColor: 'success.main',
                 '&:hover': {
                  bgcolor: 'success.lighter',
                 }
              }}
            >
              <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mb: 2 }}>
                <SupervisorAccountIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'medium' }}>
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Login for administrative access.
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LawMisSelection; 