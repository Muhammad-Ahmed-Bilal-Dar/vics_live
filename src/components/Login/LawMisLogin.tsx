import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  IconButton,
  Toolbar,
  AppBar,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LawMisLoginProps {
  onLoginSuccess: () => void;
  onGoBack: () => void;
  onRegisterClick: () => void;
  dashboardType: 'USER' | 'ADMIN' | null;
  setLoginType: (type: 'USER' | 'ADMIN') => void;
}

const LawMisLogin: React.FC<LawMisLoginProps> = ({
  onLoginSuccess,
  onGoBack,
  onRegisterClick,
  dashboardType,
  setLoginType
}) => {
  // State for form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginAs, setLoginAs] = useState<'USER' | 'ADMIN'>(dashboardType || 'USER');

  // Handle login type change
  const handleLoginTypeChange = (event: SelectChangeEvent) => {
    setLoginAs(event.target.value as 'USER' | 'ADMIN');
    setLoginType(event.target.value as 'USER' | 'ADMIN');
    // Reset form when changing login type
    setUsername('');
    setPassword('');
    setError('');
  };

  // Handle login form submission
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (loginAs === 'USER') {
      // Handle user login with the specified credentials
      if (username === 'user' && password === 'user') {
        console.log('LAW-MIS User login successful');
        onLoginSuccess();
      } else {
        setError('Invalid Username or Password');
      }
    } else {
      // Handle admin login with the specified credentials
      if (username === 'adm' && password === 'adm') {
        console.log('LAW-MIS Admin login successful');
        onLoginSuccess();
      } else {
        setError('Invalid Admin Username or Password');
      }
    }
  };

  // Determine UI elements based on login type
  const getLoginTypeColor = () => {
    return loginAs === 'ADMIN' ? 'success' : 'primary';
  };

  const getLoginIcon = () => {
    return loginAs === 'ADMIN' ? (
      <SupervisorAccountIcon />
    ) : (
      <PersonIcon />
    );
  };

  const getHeaderText = () => {
    return loginAs === 'ADMIN' ? 'LAW-MIS Admin Portal' : 'LAW-MIS User Portal';
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App Bar with Back Button */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={onGoBack} aria-label="back">
            <ArrowBackIcon sx={{ color: 'text.primary' }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.primary', ml: 1 }}>
            {getHeaderText()}
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
          <Avatar sx={{ bgcolor: `${getLoginTypeColor()}.main`, mb: 2 }}>
            {getLoginIcon()}
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            {loginAs === 'ADMIN' ? 'Admin Sign in' : 'User Sign in'}
          </Typography>

          {/* Login Type Selector */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="login-type-label">Login As</InputLabel>
            <Select
              labelId="login-type-label"
              id="login-type-select"
              value={loginAs}
              label="Login As"
              onChange={handleLoginTypeChange}
            >
              <MenuItem value="USER">Workshop User</MenuItem>
              <MenuItem value="ADMIN">Administrator</MenuItem>
            </Select>
          </FormControl>

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={loginAs === 'ADMIN' ? "Admin Username" : "Username"}
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
              color={getLoginTypeColor()}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            {/* Only show register link for user login */}
            {loginAs === 'USER' && (
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
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LawMisLogin; 