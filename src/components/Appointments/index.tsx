import { Box, Card, CardContent, Typography, Paper, Button, IconButton, Avatar, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

interface AppointmentsProps {
  visible: boolean;
}

const Appointments = ({ visible }: AppointmentsProps) => {
  // Sample upcoming appointments data
  const upcomingAppointments = [
    {
      id: 1,
      title: 'Tesla Model 3 Charging',
      date: 'Today, May 15',
      time: '09:30 AM - 11:00 AM',
      customer: 'Michael Johnson',
      avatar: 'M',
      avatarColor: '#1976d2',
      status: 'Scheduled',
      statusColor: '#4caf50',
    },
    {
      id: 2,
      title: 'Nissan Leaf Battery Check',
      date: 'Tomorrow, May 16',
      time: '02:00 PM - 03:30 PM',
      customer: 'Sarah Williams',
      avatar: 'S',
      avatarColor: '#ff9800',
      status: 'Confirmed',
      statusColor: '#2196f3',
    },
    {
      id: 3,
      title: 'BMW i3 Charging Maintenance',
      date: 'May 17, 2025',
      time: '10:45 AM - 12:15 PM',
      customer: 'David Chen',
      avatar: 'D',
      avatarColor: '#9c27b0',
      status: 'Pending',
      statusColor: '#ff9800',
    },
    {
      id: 4,
      title: 'Audi e-tron Inspection',
      date: 'May 19, 2025',
      time: '01:15 PM - 02:45 PM',
      customer: 'Jennifer Lopez',
      avatar: 'J',
      avatarColor: '#f44336',
      status: 'Confirmed',
      statusColor: '#2196f3',
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
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <CalendarMonthIcon color="primary" />
        <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
          Appointments
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            startIcon={<SearchIcon />}
            sx={{ borderRadius: '8px' }}
          >
            Search
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
            sx={{ borderRadius: '8px' }}
          >
            Filter
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ borderRadius: '8px' }}
          >
            New Appointment
          </Button>
        </Box>
      </Paper>

      {/* Today's Summary */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: 'calc(33.333% - 16px)' } }}>
          <Card sx={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Appointments
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ mr: 1, fontWeight: 'bold' }}>
                  8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  2 completed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: 'calc(33.333% - 16px)' } }}>
          <Card sx={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming This Week
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ mr: 1, fontWeight: 'bold' }}>
                  23
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  5 pending confirmation
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: 'calc(33.333% - 16px)' } }}>
          <Card sx={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total This Month
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ mr: 1, fontWeight: 'bold' }}>
                  125
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +18% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Upcoming Appointments */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Upcoming Appointments
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {upcomingAppointments.map((appointment) => (
          <Card key={appointment.id} sx={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ bgcolor: appointment.avatarColor, width: 50, height: 50 }}>
                    {appointment.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{appointment.title}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TodayIcon fontSize="small" color="action" />
                        <Typography variant="body2">{appointment.date}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2">{appointment.time}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonOutlineIcon fontSize="small" color="action" />
                        <Typography variant="body2">{appointment.customer}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={appointment.status} 
                    size="small" 
                    sx={{ 
                      bgcolor: `${appointment.statusColor}10`, 
                      color: appointment.statusColor,
                      fontWeight: 'bold'
                    }} 
                  />
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Appointments; 