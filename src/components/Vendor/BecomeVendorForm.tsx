import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider,
  Alert,
  IconButton,
  Avatar,
  LinearProgress,
  Card,
  CardContent,
  useTheme,
  Stack
} from '@mui/material';
import {
  Business as BusinessIcon,
  Engineering as EngineeringIcon,
  AccountBalance as AccountBalanceIcon,
  Verified as VerifiedIcon,
  Assignment as AssignmentIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from '@mui/icons-material';

// Form type definitions
type BusinessType = 'manufacturer' | 'distributor' | 'service_provider' | '';
type SupportType = {
  onSite: boolean;
  workshop: boolean;
  calibration: boolean;
};
type DocumentChecklist = {
  companyProfile: boolean;
  productCatalog: boolean;
  clientReferences: boolean;
  pastProjects: boolean;
  complianceCerts: boolean;
  financialDocs: boolean;
  ntnCopy: boolean;
  bankCertificate: boolean;
};

// Form state interface
interface VendorFormState {
  companyName: string;
  ownerName: string;
  businessType: BusinessType;
  yearEstablished: string;
  officeAddress: string;
  cityCountry: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  website: string;
  
  experienceYears: string;
  brandsPreviouslySupplied: string;
  calibrationGases: boolean;
  probes: boolean;
  filters: boolean;
  supportServices: SupportType;
  responseTime: string;
  
  ntnGstNumber: string;
  bankNameBranch: string;
  accountNumber: string;
  financialsAttached: boolean;
  
  documents: DocumentChecklist;
  
  declarationName: string;
  designation: string;
  date: string;
}

interface BecomeVendorFormProps {
  onNavigateBack: () => void;
}

// Define steps
const steps = [
  "Company Details",
  "Technical Capacity",
  "Financial Details",
  "Eligibility & Documents",
  "Declaration"
];

// Step icons
const stepIcons = [
  <BusinessIcon key="business" />,
  <EngineeringIcon key="engineering" />,
  <AccountBalanceIcon key="accounting" />,
  <VerifiedIcon key="verified" />,
  <AssignmentIcon key="assignment" />
];

const BecomeVendorForm: React.FC<BecomeVendorFormProps> = ({ onNavigateBack }) => {
  const theme = useTheme();
  
  // Initialize form state
  const [formState, setFormState] = useState<VendorFormState>({
    companyName: '',
    ownerName: '',
    businessType: '',
    yearEstablished: '',
    officeAddress: '',
    cityCountry: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    website: '',
    
    experienceYears: '',
    brandsPreviouslySupplied: '',
    calibrationGases: false,
    probes: false,
    filters: false,
    supportServices: {
      onSite: false,
      workshop: false,
      calibration: false,
    },
    responseTime: '',
    
    ntnGstNumber: '',
    bankNameBranch: '',
    accountNumber: '',
    financialsAttached: false,
    
    documents: {
      companyProfile: false,
      productCatalog: false,
      clientReferences: false,
      pastProjects: false,
      complianceCerts: false,
      financialDocs: false,
      ntnCopy: false,
      bankCertificate: false,
    },
    
    declarationName: '',
    designation: '',
    date: '',
  });

  // Step management
  const [activeStep, setActiveStep] = useState(0);
  
  // Update form field
  const updateFormField = (field: keyof VendorFormState, value: any) => {
    setFormState(prevState => ({ ...prevState, [field]: value }));
  };
  
  // Update nested support services
  const updateSupportService = (service: keyof SupportType, value: boolean) => {
    setFormState(prevState => ({
      ...prevState,
      supportServices: {
        ...prevState.supportServices,
        [service]: value,
      },
    }));
  };
  
  // Update nested document checklist
  const updateDocument = (document: keyof DocumentChecklist, value: boolean) => {
    setFormState(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        [document]: value,
      },
    }));
  };

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Navigate to specific step
  const navigateToStep = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!formState.companyName || !formState.email || !formState.phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }
    
    console.log('Form submitted:', formState);
    
    // Show success message and go back
    alert('Thank you for your interest. Your vendor registration application has been received. We will review your details and contact you soon.');
    onNavigateBack();
  };

  // Render different form sections based on active step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0: // Company Details
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Section A: Company Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                label="Company Name"
                value={formState.companyName}
                onChange={(e) => updateFormField('companyName', e.target.value)}
                variant="outlined"
              />
              
              <TextField
                fullWidth
                required
                label="Owner/Director Name"
                value={formState.ownerName}
                onChange={(e) => updateFormField('ownerName', e.target.value)}
                variant="outlined"
              />
              
              <FormControl component="fieldset">
                <FormLabel component="legend">Business Type *</FormLabel>
                <RadioGroup
                  value={formState.businessType}
                  onChange={(e) => updateFormField('businessType', e.target.value)}
                  row
                >
                  <FormControlLabel value="manufacturer" control={<Radio color="warning" />} label="Manufacturer" />
                  <FormControlLabel value="distributor" control={<Radio color="warning" />} label="Distributor" />
                  <FormControlLabel value="service_provider" control={<Radio color="warning" />} label="Service Provider" />
                </RadioGroup>
              </FormControl>
              
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  required
                  label="Year Established"
                  value={formState.yearEstablished}
                  onChange={(e) => updateFormField('yearEstablished', e.target.value)}
                  type="number"
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  required
                  label="City & Country"
                  value={formState.cityCountry}
                  onChange={(e) => updateFormField('cityCountry', e.target.value)}
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </Box>
        );
        
      case 1: // Technical Capacity
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Section B: Technical Capacity
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                label="Experience in Years"
                value={formState.experienceYears}
                onChange={(e) => updateFormField('experienceYears', e.target.value)}
                type="number"
                variant="outlined"
              />
              
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Brands/Models Previously Supplied"
                value={formState.brandsPreviouslySupplied}
                onChange={(e) => updateFormField('brandsPreviouslySupplied', e.target.value)}
                variant="outlined"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.calibrationGases}
                    onChange={(e) => updateFormField('calibrationGases', e.target.checked)}
                    color="warning"
                  />
                }
                label="Supply Calibration Gases"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.probes}
                    onChange={(e) => updateFormField('probes', e.target.checked)}
                    color="warning"
                  />
                }
                label="Supply Probes"
              />
            </Stack>
          </Box>
        );
        
      case 2: // Financial Details
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Section C: Financial Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                label="NTN/GST Number"
                value={formState.ntnGstNumber}
                onChange={(e) => updateFormField('ntnGstNumber', e.target.value)}
                variant="outlined"
              />
              
              <TextField
                fullWidth
                required
                label="Bank Account Number"
                value={formState.accountNumber}
                onChange={(e) => updateFormField('accountNumber', e.target.value)}
                variant="outlined"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.financialsAttached}
                    onChange={(e) => updateFormField('financialsAttached', e.target.checked)}
                    color="warning"
                  />
                }
                label="Attach Financial Documents"
              />
            </Stack>
          </Box>
        );
        
      case 3: // Eligibility & Documents
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Section D: Eligibility & Documents
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Required Documents:
                </Typography>
                
                <Stack spacing={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formState.documents.companyProfile}
                        onChange={(e) => updateDocument('companyProfile', e.target.checked)}
                        color="warning"
                      />
                    }
                    label="Company Profile"
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formState.documents.productCatalog}
                        onChange={(e) => updateDocument('productCatalog', e.target.checked)}
                        color="warning"
                      />
                    }
                    label="Product Catalogs"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Box>
        );
        
      case 4: // Declaration
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Declaration
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Alert severity="info" sx={{ mb: 3 }}>
              I declare that the above information is true and complete.
            </Alert>
            
            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                label="Name"
                value={formState.declarationName}
                onChange={(e) => updateFormField('declarationName', e.target.value)}
                variant="outlined"
              />
              
              <TextField
                fullWidth
                required
                label="Designation"
                value={formState.designation}
                onChange={(e) => updateFormField('designation', e.target.value)}
                variant="outlined"
              />
              
              <TextField
                fullWidth
                required
                label="Date"
                value={formState.date}
                onChange={(e) => updateFormField('date', e.target.value)}
                placeholder="DD/MM/YYYY"
                variant="outlined"
              />
            </Stack>
          </Box>
        );
        
      default:
        return <Box>Unknown step</Box>;
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={onNavigateBack} edge="start" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Vendor Registration Form
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            For Supply & Maintenance of Emission Testing Equipment
          </Typography>
        </Box>
      </Box>
      
      {/* Progress indicator */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Step {activeStep + 1} of {steps.length}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(activeStep + 1) * 100 / steps.length} 
          sx={{ height: 8, borderRadius: 4 }}
          color="warning"
        />
      </Box>
      
      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={() => (
                  <Avatar
                    sx={{
                      bgcolor: activeStep >= index ? 'warning.main' : 'grey.300',
                      width: 40,
                      height: 40,
                      cursor: 'pointer'
                    }}
                    onClick={() => navigateToStep(index)}
                  >
                    {stepIcons[index]}
                  </Avatar>
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Form Content */}
        <Box sx={{ minHeight: 300, p: 2 }}>
          {getStepContent(activeStep)}
        </Box>
      </Paper>
      
      {/* Navigation buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          color="warning"
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button 
            variant="contained" 
            color="warning" 
            onClick={handleSubmit}
            endIcon={<CheckIcon />}
          >
            Submit Application
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="warning" 
            onClick={handleNext}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Continue
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BecomeVendorForm; 