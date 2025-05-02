import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  Divider,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Helper component for section headers (like in AutomobileWorkshopDetails)
const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100], p: 1.5, mb: 2, borderRadius: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {title} 
        {subtitle && <Typography variant="body2" component="span" sx={{ color: theme.palette.text.secondary, ml: 1 }}>({subtitle})</Typography>}
      </Typography>
    </Box>
  );
};

// Helper component for labels with primary/secondary text (Urdu translations)
const FieldLabel = ({ primary, secondary }: { primary: string; secondary?: string }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 0.5 }}>
      <Typography variant="subtitle2" component="label" sx={{ fontWeight: 'medium', display: 'block' }}>
        {primary}
      </Typography>
      {secondary && (
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }} display="block">
          {secondary}
        </Typography>
      )}
    </Box>
  );
};

interface Employee {
  id: number;
  fullName: string;
  fatherName: string;
  cnicNumber: string;
  mobileNumber: string;
  emailAddress: string;
  designation: string;
  qualification: string;
  experienceYears: string;
  experienceMonths: string;
}

const HumanResourceDetails: React.FC = () => {
  const theme = useTheme();
  
  // State for managing employees
  const [employees, setEmployees] = useState<Employee[]>([
    // Sample employee for demo (you can remove this in production)
    {
      id: 1,
      fullName: "ABC",
      fatherName: "ABC",
      cnicNumber: "35201-3843459-1",
      mobileNumber: "0333-4852044",
      emailAddress: "MAHMEDDAR@GMAIL.COM",
      designation: "INSPECTION STATION MANAGER",
      qualification: "NONE",
      experienceYears: "7",
      experienceMonths: "1"
    }
  ]);
  
  // State for managing the add/edit employee modal
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>({
    id: 0,
    fullName: "",
    fatherName: "",
    cnicNumber: "",
    mobileNumber: "03",
    emailAddress: "",
    designation: "",
    qualification: "",
    experienceYears: "0",
    experienceMonths: "0"
  });
  
  // Open modal for adding a new employee
  const handleAddEmployee = () => {
    setIsEditing(false);
    setCurrentEmployee({
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
      fullName: "",
      fatherName: "",
      cnicNumber: "",
      mobileNumber: "03",
      emailAddress: "",
      designation: "",
      qualification: "",
      experienceYears: "0",
      experienceMonths: "0"
    });
    setOpenModal(true);
  };
  
  // Open modal for editing an existing employee
  const handleEditEmployee = (employee: Employee) => {
    setIsEditing(true);
    setCurrentEmployee({ ...employee });
    setOpenModal(true);
  };
  
  // Handle saving a new or edited employee
  const handleSaveEmployee = () => {
    if (isEditing) {
      // Update existing employee
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? currentEmployee : emp));
    } else {
      // Add new employee
      setEmployees([...employees, currentEmployee]);
    }
    setOpenModal(false);
  };
  
  // Handle deleting an employee
  const handleDeleteEmployee = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  // Handle mobile number change
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith('03') && /^[0-9]*$/.test(value)) {
      setCurrentEmployee({ ...currentEmployee, mobileNumber: value });
    } else if (value === '0' || value === '3') {
      setCurrentEmployee({ ...currentEmployee, mobileNumber: value });
    } else if (value === '') {
      setCurrentEmployee({ ...currentEmployee, mobileNumber: '03' });
    }
  };

  // Handle CNIC number formatting
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9-]/g, '');
    
    // Don't allow more than 15 characters (including dashes)
    if (value.length <= 15) {
      setCurrentEmployee({ ...currentEmployee, cnicNumber: value });
    }
  };

  // Format experience for display in the table
  const formatExperience = (years: string, months: string) => {
    return `${years} YEARS ${months} MONTHS`;
  };
  
  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <SectionHeader 
        title="HUMAN RESOURCE DETAILS" 
        subtitle="افرادی قوت کی تفصیلات" 
      />
      
      {/* Add Employee Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          sx={{ 
            bgcolor: theme.palette.warning.main,
            '&:hover': { 
              bgcolor: theme.palette.warning.dark 
            }
          }}
        >
          ADD NEW EMPLOYEE
        </Button>
      </Box>
      
      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid rgba(0, 0, 0, 0.12)', overflowX: 'visible' }}>
        <Table size="small" sx={{ tableLayout: 'fixed', minWidth: '100%' }}>
          <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell width="30px" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>#</TableCell>
              <TableCell width="12%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>FULL NAME</TableCell>
              <TableCell width="12%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>FATHER'S NAME</TableCell>
              <TableCell width="13%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>CNIC NUMBER</TableCell>
              <TableCell width="11%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>MOBILE NUMBER</TableCell>
              <TableCell width="13%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>EMAIL ADDRESS</TableCell>
              <TableCell width="15%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>DESIGNATION</TableCell>
              <TableCell width="10%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>QUALIFICATION</TableCell>
              <TableCell width="9%" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>EXPERIENCE</TableCell>
              <TableCell width="60px" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, p: 1, fontSize: '0.75rem' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee.id} sx={{ '&:nth-of-type(odd)': { bgcolor: theme.palette.action.hover } }}>
                <TableCell sx={{ p: 1, fontSize: '0.75rem' }}>{index + 1}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.fullName}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.fatherName}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem' }}>{employee.cnicNumber}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem' }}>{employee.mobileNumber}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.emailAddress}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{employee.designation}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem' }}>{employee.qualification}</TableCell>
                <TableCell sx={{ p: 1, fontSize: '0.75rem' }}>{formatExperience(employee.experienceYears, employee.experienceMonths)}</TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton 
                      size="small" 
                      color="primary" 
                      onClick={() => handleEditEmployee(employee)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No employees added yet. Use the "Add New Employee" button to add employees.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Add/Edit Employee Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </DialogTitle>
        <DialogContent sx={{ pb: 4 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            {/* EMPLOYMENT ROLE / DESIGNATION */}
            <Grid size={6}>
              <FieldLabel 
                primary="EMPLOYMENT ROLE / DESIGNATION" 
                secondary="عہدہ" 
              />
              <FormControl fullWidth size="small">
                <Select
                  value={currentEmployee.designation}
                  onChange={(e: SelectChangeEvent) => 
                    setCurrentEmployee({ ...currentEmployee, designation: e.target.value })}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <Typography sx={{ color: 'text.secondary' }}>SELECT Employee Type</Typography>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="INSPECTION STATION MANAGER">INSPECTION STATION MANAGER</MenuItem>
                  <MenuItem value="STATION SUPERVISOR">STATION SUPERVISOR</MenuItem>
                  <MenuItem value="VEHICLE INSPECTOR">VEHICLE INSPECTOR</MenuItem>
                  <MenuItem value="CUSTOMER SERVICE REPRESENTATIVE">CUSTOMER SERVICE REPRESENTATIVE</MenuItem>
                  <MenuItem value="IT STAFF">IT STAFF</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* EMPLOYEE'S FULL NAME */}
            <Grid size={6}>
              <FieldLabel 
                primary="EMPLOYEE'S FULL NAME" 
                secondary="مکمل نام" 
              />
              <TextField
                fullWidth
                placeholder="FULL NAME"
                value={currentEmployee.fullName}
                onChange={(e) => setCurrentEmployee({ ...currentEmployee, fullName: e.target.value })}
                size="small"
                required
              />
            </Grid>

            {/* FATHER'S NAME */}
            <Grid size={6}>
              <FieldLabel 
                primary="FATHER'S NAME" 
                secondary="والد کا نام" 
              />
              <TextField
                fullWidth
                placeholder="FATHERS'S NAME"
                value={currentEmployee.fatherName}
                onChange={(e) => setCurrentEmployee({ ...currentEmployee, fatherName: e.target.value })}
                size="small"
                required
              />
            </Grid>

            {/* CNIC NUMBER */}
            <Grid size={6}>
              <FieldLabel 
                primary="CNIC NUMBER" 
                secondary="قومی شناختی کارڈ نمبر" 
              />
              <TextField
                fullWidth
                placeholder="_ _ _ _ _ - _ _ _ _ _ _ _ - _"
                value={currentEmployee.cnicNumber}
                onChange={handleCnicChange}
                size="small"
                required
              />
            </Grid>

            {/* MOBILE NUMBER */}
            <Grid size={6}>
              <FieldLabel 
                primary="MOBILE NUMBER" 
                secondary="موبائل نمبر" 
              />
              <TextField
                fullWidth
                placeholder="03XXXXXXXXX"
                value={currentEmployee.mobileNumber}
                onChange={handleMobileChange}
                size="small"
                inputProps={{ maxLength: 11 }}
                required
              />
            </Grid>

            {/* EMAIL ADDRESS */}
            <Grid size={6}>
              <FieldLabel 
                primary="EMAIL ADDRESS" 
                secondary="ای میل ایڈریس" 
              />
              <TextField
                fullWidth
                placeholder="email"
                type="email"
                value={currentEmployee.emailAddress}
                onChange={(e) => setCurrentEmployee({ ...currentEmployee, emailAddress: e.target.value })}
                size="small"
                required
              />
            </Grid>

            {/* EXPERIENCE */}
            <Grid size={6}>
              <FieldLabel 
                primary="EXPERIENCE" 
                secondary="تجربہ" 
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  sx={{ width: '100px', mr: 2 }}
                  placeholder="0"
                  value={currentEmployee.experienceYears}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, experienceYears: e.target.value.replace(/[^0-9]/g, '') })}
                  size="small"
                  inputProps={{ maxLength: 2 }}
                  required
                />
                <Typography sx={{ mr: 3, fontWeight: 'medium' }}>YEARS</Typography>
                
                <TextField
                  sx={{ width: '100px', mr: 2 }}
                  placeholder="1"
                  value={currentEmployee.experienceMonths}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (parseInt(value) <= 12 || value === '') {
                      setCurrentEmployee({ ...currentEmployee, experienceMonths: value });
                    }
                  }}
                  size="small"
                  inputProps={{ maxLength: 2 }}
                  required
                />
                <Typography sx={{ fontWeight: 'medium' }}>MONTHS</Typography>
              </Box>
            </Grid>

            {/* QUALIFICATION DETAILS */}
            <Grid size={6}>
              <FieldLabel 
                primary="QUALIFICATION DETAILS" 
                secondary="تعلیمی قابلیت" 
              />
              <FormControl fullWidth size="small">
                <Select
                  value={currentEmployee.qualification}
                  onChange={(e: SelectChangeEvent) => 
                    setCurrentEmployee({ ...currentEmployee, qualification: e.target.value })}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <Typography sx={{ color: 'text.secondary' }}>SELECT Qualification</Typography>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="NONE">NONE</MenuItem>
                  <MenuItem value="MATRIC">MATRIC</MenuItem>
                  <MenuItem value="INTERMEDIATE">INTERMEDIATE</MenuItem>
                  <MenuItem value="BACHELORS">BACHELORS</MenuItem>
                  <MenuItem value="MASTERS">MASTERS</MenuItem>
                  <MenuItem value="PHD">PHD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSaveEmployee} 
            variant="contained" 
            color="primary"
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HumanResourceDetails; 