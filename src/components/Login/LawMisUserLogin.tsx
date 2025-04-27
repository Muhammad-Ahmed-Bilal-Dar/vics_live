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
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LawMisUserLoginProps {
  onLoginSuccess: () => void; // Placeholder for successful login
  onGoBack: () => void; // Go back to LAW-MIS selection
  onRegisterClick: () => void; // Placeholder for register action
}

const LawMisUserLogin: React.FC<LawMisUserLoginProps> = ({ 
  onLoginSuccess, 
  onGoBack, 
  onRegisterClick 
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); 

    // Placeholder login logic - replace with actual API call
    console.log('LAW-MIS User Login attempt:', { username, password });
    // Example: Check credentials (replace with real check)
    if (username === 'user' && password === 'password') {
      onLoginSuccess(); 
    } else {
      setError('Invalid Username or Password');
    }
  };

  return (
     <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
       {/* Simple App Bar with Back Button */}
       <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={onGoBack} aria-label="back">
            <ArrowBackIcon sx={{ color: 'text.primary' }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.primary', ml: 1 }}>
            LAW-MIS User Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Login Form Area */}
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
          <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            User Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
               <Link 
                  component="button"
                  variant="body2"
                  onClick={onRegisterClick} 
                  sx={{ cursor: 'pointer' }}
               >
                  Don't have an account? Register
               </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LawMisUserLogin; 