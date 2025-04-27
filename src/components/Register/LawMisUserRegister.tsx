import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
  Toolbar,
  AppBar,
  InputAdornment,
  Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LawMisUserRegisterProps {
  onRegisterSuccess: () => void; // Callback on successful registration
  onGoBack: () => void; // Go back to LAW-MIS User Login
}

const LawMisUserRegister: React.FC<LawMisUserRegisterProps> = ({ 
  onRegisterSuccess, 
  onGoBack 
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('03'); // Initialize with 03
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error State
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Ensure it starts with 03 and only contains numbers
    if (value.startsWith('03') && /^[0-9]*$/.test(value.substring(2))) {
        // Limit length (e.g., 11 digits total for Pakistan mobile)
        if (value.length <= 11) {
             setMobile(value);
        }
    } else if (value === '0' || value === '03') {
        setMobile(value); // Allow starting input
    } else if (value === '') {
         setMobile(''); // Reset to 03 if cleared
    }
  };
  
  const handleCnicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric chars
    let formattedCnic = '';
    if (value.length > 0) {
      formattedCnic += value.substring(0, 5);
    }
    if (value.length > 5) {
      formattedCnic += '-' + value.substring(5, 12);
    }
    if (value.length > 12) {
      formattedCnic += '-' + value.substring(12, 13);
    }
    setCnic(formattedCnic.substring(0, 15)); // Max length 13 digits + 2 hyphens
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    // --- Basic Validations --- 
    if (!fullName || !fatherName || !cnic || !email || !mobile || !password || !confirmPassword) {
        setError('Please fill in all required fields.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) { // Example: Minimum password length
         setError('Password must be at least 6 characters long.');
        return;
    }
     // Very basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
     if (mobile.length !== 11) {
        setError('Mobile number must be 11 digits long.');
        return;
    }
     if (cnic.length !== 15) {
        setError('CNIC number must be 13 digits long.');
        return;
    }

    // --- Placeholder for Registration Logic --- 
    console.log('Registration Submitted:', { 
        fullName, fatherName, cnic, email, mobile, password 
    });
    alert('Registration successful! (Placeholder) Redirecting to login...'); 
    // In a real app, call API, then redirect on success
    onRegisterSuccess(); 
  };

  return (
     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       {/* Simple App Bar with Back Button */}
       <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={onGoBack} aria-label="back">
            <ArrowBackIcon sx={{ color: 'text.primary' }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.primary', ml: 1 }}>
            LAW-MIS User Registration
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Registration Form Area */}
      <Box 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          py: 4, // Add padding top/bottom
          px: 2
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            p: { xs: 2, sm: 4 }, // Responsive padding
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 700, // Wider form for registration
            width: '100%',
            borderRadius: 2
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Register New User
          </Typography>
          {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Owner's Full Name"
                  name="fullName"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="fatherName"
                  label="Owner's Father's Name"
                  name="fatherName"
                  autoComplete="off"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  size="small"
                />
              </Grid>
              
              {/* Row 2 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cnic"
                  label="Owner's CNIC Number (XXXXX-XXXXXXX-X)"
                  name="cnic"
                  autoComplete="off"
                  value={cnic}
                  onChange={handleCnicChange}
                  inputProps={{ maxLength: 15 }}
                  placeholder="_____-_______-_"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Owner's Mobile Number"
                  name="mobile"
                  type="tel" 
                  autoComplete="tel"
                  value={mobile}
                  onChange={handleMobileChange}
                  inputProps={{ maxLength: 11 }}
                  size="small"
                />
              </Grid>

              {/* Row 3 */}
               <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Owner's Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                 <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                 />
              </Grid>
              
              {/* Row 4 */} 
               <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="small"
                  error={password !== confirmPassword && confirmPassword !== ''}
                  helperText={password !== confirmPassword && confirmPassword !== '' ? "Passwords don't match" : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
               <Link 
                  component="button"
                  variant="body2"
                  onClick={onGoBack} 
                  sx={{ cursor: 'pointer' }}
               >
                  Already have an account? Sign in
               </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LawMisUserRegister; 