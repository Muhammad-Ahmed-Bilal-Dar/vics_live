import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Divider,
    Grid,
    Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

interface LAW_MISChangePasswordProps {
    onGoBack?: () => void; // Optional callback to go back
}

const LAW_MISChangePassword: React.FC<LAW_MISChangePasswordProps> = ({ onGoBack }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // Basic Validations
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all password fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirmation password do not match.');
            return;
        }
        if (newPassword.length < 6) { // Example minimum length
            setError('New password must be at least 6 characters long.');
            return;
        }
        // TODO: Add check for current password validity via API call

        // Placeholder for success
        console.log('Password change submitted:', { currentPassword: '***', newPassword: '***' });
        alert('Password changed successfully! (Placeholder)'); 
        setSuccess('Password changed successfully! (Placeholder)');
        // Reset fields after successful change
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // Potentially navigate back or show success message longer
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Optional Back Button */} 
            {onGoBack && (
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={onGoBack} 
                    sx={{ mb: 2 }}
                >
                    Back to Dashboard
                </Button>
            )}

            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Change Password
            </Typography>

            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <Divider sx={{ mb: 3 }} />
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                    )}
                     {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
                    )}
                    <Grid container spacing={3} alignItems="flex-end">
                        <Grid item xs={12} sm={4}>
                             <TextField
                                required
                                fullWidth
                                name="currentPassword"
                                label="Current Password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                id="currentPassword"
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle current password visibility"
                                        onClick={handleClickShowCurrentPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                />
                        </Grid>
                         <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                type={showNewPassword ? 'text' : 'password'}
                                id="newPassword"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle new password visibility"
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                />
                         </Grid>
                         <Grid item xs={12} sm={4}>
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
                                error={newPassword !== confirmPassword && confirmPassword !== ''}
                                helperText={newPassword !== confirmPassword && confirmPassword !== '' ? "Passwords don't match" : ""}
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
                     <Box sx={{ mt: 3 }}>
                         <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                         >
                            Update
                         </Button>
                     </Box>
                 </Box>
            </Paper>
        </Container>
    );
};

export default LAW_MISChangePassword; 