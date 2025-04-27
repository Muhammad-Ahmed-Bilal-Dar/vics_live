import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Link,
  IconButton,
  Toolbar,
  AppBar,
  Avatar
} from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LawMisAdminLoginProps {
  onLoginSuccess: () => void;
  onGoBack: () => void;
}

const LawMisAdminLogin: React.FC<LawMisAdminLoginProps> = ({ 
  onLoginSuccess, 
  onGoBack 
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); 

    console.log('LAW-MIS Admin Login attempt:', { username, password });
    if (username === 'lawadmin' && password === 'adminpass') {
      onLoginSuccess(); 
    } else {
      setError('Invalid Admin Username or Password');
    }
  };

  return (
     <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
       <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={onGoBack} aria-label="back">
            <ArrowBackIcon sx={{ color: 'text.primary' }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.primary', ml: 1 }}>
            LAW-MIS Admin Portal
          </Typography>
        </Toolbar>
      </AppBar>

      <Box 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100' 
        }}
      >
        <Paper 
          elevation={6} 
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
            width: '100%',
            borderRadius: 2
          }}
        >
          <Avatar sx={{ bgcolor: 'success.main', mb: 2 }}>
            <SupervisorAccountIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Admin Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Admin Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
            />
            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LawMisAdminLogin; 