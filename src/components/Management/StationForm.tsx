import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface StationFormProps {
  // Props if needed, e.g., onSubmit callback
}

const StationForm: React.FC<StationFormProps> = () => {
  // State for the form fields
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [province, setProvince] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [area, setArea] = useState('');
  const [customAddress, setCustomAddress] = useState('');

  // Placeholder change handlers for dropdowns
  const handleProvinceChange = (event: SelectChangeEvent) => {
    setProvince(event.target.value);
    // Reset dependent dropdowns if needed
    setDivision('');
    setDistrict('');
    setTehsil('');
    setArea('');
  };
  const handleDivisionChange = (event: SelectChangeEvent) => setDivision(event.target.value);
  const handleDistrictChange = (event: SelectChangeEvent) => setDistrict(event.target.value);
  const handleTehsilChange = (event: SelectChangeEvent) => setTehsil(event.target.value);
  const handleAreaChange = (event: SelectChangeEvent) => setArea(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStationData = {
      name,
      license,
      province,
      division,
      district,
      tehsil,
      area,
      customAddress
    };
    console.log('Submitting new station data:', newStationData);
    // TODO: Implement submission logic (e.g., API call)
  };

  // Placeholder options for dropdowns
  const provinceOptions = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'GB', 'AJK'];
  // In a real app, these would depend on the selected province/division/etc.
  const divisionOptions = ['Lahore', 'Karachi', 'Peshawar', 'Quetta']; 
  const districtOptions = ['District A', 'District B', 'District C'];
  const tehsilOptions = ['Tehsil X', 'Tehsil Y', 'Tehsil Z'];
  const areaOptions = ['Area 1', 'Area 2', 'Area 3'];

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddCircleOutlineIcon /> Add New Charging Station
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="stationName"
                label="Station Name"
                name="stationName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth // Assuming license is not strictly required
                id="stationLicense"
                label="Station License"
                name="stationLicense"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                size="small"
                required
              />
            </Grid>
            
            {/* Row 2: Geographical Dropdowns */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel id="province-label">Province</InputLabel>
                <Select
                  labelId="province-label"
                  id="province" 
                  value={province}
                  label="Province"
                  onChange={handleProvinceChange}
                >
                  {provinceOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required disabled={!province}> 
                <InputLabel id="division-label">Division</InputLabel>
                <Select
                  labelId="division-label"
                  id="division"
                  value={division}
                  label="Division"
                  onChange={handleDivisionChange}
                >
                  {/* Populate based on province */} 
                  {divisionOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required disabled={!division}>
                <InputLabel id="district-label">District</InputLabel>
                <Select
                  labelId="district-label"
                  id="district"
                  value={district}
                  label="District"
                  onChange={handleDistrictChange}
                >
                   {/* Populate based on division */} 
                  {districtOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Row 3: Geographical Dropdowns */}
             <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required disabled={!district}>
                <InputLabel id="tehsil-label">Tehsil</InputLabel>
                <Select
                  labelId="tehsil-label"
                  id="tehsil"
                  value={tehsil}
                  label="Tehsil"
                  onChange={handleTehsilChange}
                >
                   {/* Populate based on district */} 
                  {tehsilOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required disabled={!tehsil}>
                <InputLabel id="area-label">Area</InputLabel>
                <Select
                  labelId="area-label"
                  id="area"
                  value={area}
                  label="Area"
                  onChange={handleAreaChange}
                >
                   {/* Populate based on tehsil */} 
                  {areaOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

             {/* Row 4: Custom Address */}
             <Grid item xs={12}>
              <TextField
                fullWidth
                id="customAddress"
                label="Custom Address (Street, Building, etc.)"
                name="customAddress"
                multiline
                rows={3}
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                size="small"
                required
              />
            </Grid>

          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
            >
              Add Station
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StationForm; 