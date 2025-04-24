import { Box, Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface DashboardProps {
  visible: boolean;
}

const Dashboard = ({ visible }: DashboardProps) => {
  if (!visible) {
    return null;
  }

  return (
    <Box sx={{ 
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
    }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <DashboardIcon color="primary" />
        <Typography variant="h5" component="h2">
          Dashboard
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Stations
              </Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Alerts
              </Typography>
              <Typography variant="h4">7</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Data Points
              </Typography>
              <Typography variant="h4">2.4M</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                System Health
              </Typography>
              <Typography variant="h4">98%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Station Activity Chart - Placeholder
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Recent Alerts - Placeholder
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                System Status - Placeholder
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 