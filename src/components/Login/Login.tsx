import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import loginBackground from '../../assets/images/VICS_login.jpg'; // Import the background image

interface LoginProps {
  onLoginSuccess: () => void;
  onGoBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onGoBack }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    // Check credentials
    if (userId === 'admin' && password === 'admin') {
      onLoginSuccess(); // Callback to parent component
    } else {
      setError('Invalid User ID or Password');
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        // Apply background image styles
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Don't repeat the image
        // bgcolor: 'grey.100' // Remove or comment out the plain background color
      }}
    >
      <Paper 
        elevation={6} 
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400, // Limit form width
          width: '100%',
          borderRadius: 2 // Slightly rounded corners
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          VICS Admin Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userId"
            label="User ID"
            name="userId"
            autoComplete="username" // Helps with browser autofill
            autoFocus
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
          <Box sx={{ textAlign: 'center', mt: 2 }}>
             <Link 
                component="button"
                variant="body2"
                onClick={onGoBack}
                sx={{ cursor: 'pointer' }}
             >
                Back to Role Selection
             </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 