import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Switch,
  Divider,
  Grid,
  Slider,
  Button,
  useTheme,
  SelectChangeEvent,
  Snackbar,
  IconButton
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface SettingsProps {
  visible: boolean;
  onThemeChange?: (mode: 'light' | 'dark') => void;
  onFontSizeChange?: (size: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ visible, onThemeChange, onFontSizeChange }) => {
  const theme = useTheme();
  const [mode, setMode] = useState<'light' | 'dark'>(theme.palette.mode || 'light');
  const [language, setLanguage] = useState<string>('en');
  const [fontSize, setFontSize] = useState<number>(14);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  
  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.value as 'light' | 'dark';
    setMode(newMode);
    if (onThemeChange) {
      onThemeChange(newMode);
    }
  };
  
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };
  
  const handleFontSizeChange = (event: Event, newValue: number | number[]) => {
    const newSize = newValue as number;
    setFontSize(newSize);
    if (onFontSizeChange) {
      onFontSizeChange(newSize);
    }
  };
  
  const handleSave = () => {
    // In a real app, these settings would be saved to localStorage or backend
    setSnackbarOpen(true);
  };
  
  const handleReset = () => {
    setMode('light');
    setLanguage('en');
    setFontSize(14);
    if (onThemeChange) {
      onThemeChange('light');
    }
    if (onFontSizeChange) {
      onFontSizeChange(14);
    }
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  const getFontSizeText = (value: number) => {
    if (value <= 12) return 'Small';
    if (value <= 14) return 'Default';
    if (value <= 16) return 'Large';
    return 'Extra Large';
  };
  
  if (!visible) {
    return null;
  }
  
  return (
    <Box sx={{ p: 3, animation: 'fadeIn 0.6s ease-in-out' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <SettingsIcon sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h5" component="h1">
          Settings
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Appearance Settings Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DarkModeIcon /> Theme
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend">Display Mode</FormLabel>
                <RadioGroup
                  row
                  value={mode}
                  onChange={handleModeChange}
                >
                  <FormControlLabel 
                    value="light" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LightModeIcon fontSize="small" />
                        <span>Light</span>
                      </Box>
                    } 
                  />
                  <FormControlLabel 
                    value="dark" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DarkModeIcon fontSize="small" />
                        <span>Dark</span>
                      </Box>
                    } 
                  />
                </RadioGroup>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FormatSizeIcon fontSize="small" />
                    <span>Text Size</span>
                  </Box>
                </FormLabel>
                <Box sx={{ px: 1 }}>
                  <Slider
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    step={1}
                    marks
                    min={12}
                    max={18}
                    valueLabelDisplay="auto"
                    valueLabelFormat={getFontSizeText}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption">Small</Typography>
                    <Typography variant="caption">Extra Large</Typography>
                  </Box>
                </Box>
              </FormControl>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2">
                  Current Text Size: {getFontSizeText(fontSize)} ({fontSize}px)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Other Settings Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon /> Language & Region
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ mb: 1 }}>Language</FormLabel>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  size="small"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ur">Urdu</MenuItem>
                  <MenuItem value="ar">Arabic</MenuItem>
                  <MenuItem value="zh">Chinese</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend">Notification Settings</FormLabel>
                <Box sx={{ mt: 1 }}>
                  <FormControlLabel 
                    control={<Switch defaultChecked />} 
                    label="Email Notifications" 
                  />
                </Box>
                <Box>
                  <FormControlLabel 
                    control={<Switch defaultChecked />} 
                    label="Push Notifications" 
                  />
                </Box>
              </FormControl>
              
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormLabel component="legend">Date & Time Format</FormLabel>
                <RadioGroup
                  defaultValue="12"
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel value="12" control={<Radio />} label="12-hour (1:30 PM)" />
                  <FormControlLabel value="24" control={<Radio />} label="24-hour (13:30)" />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button 
          variant="outlined" 
          color="error" 
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
        >
          Reset to Default
        </Button>
        <Button 
          variant="contained" 
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>
      
      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message="Settings updated successfully"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Settings; 