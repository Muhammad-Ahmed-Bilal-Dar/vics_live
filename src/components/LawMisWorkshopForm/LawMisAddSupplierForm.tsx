import React, { useState } from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    Button, 
    TextField, 
    Grid as MuiGrid,
    Container, 
    Breadcrumbs,
    Link,
    Stepper,
    Step,
    StepLabel,
    Divider,
    FormControlLabel,
    Checkbox,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// --- Props interface --- 
interface LawMisAddSupplierFormProps {
    onNavigateBack: () => void;
}

// Steps for the stepper
const steps = ['Supplier Verification', 'Equipment Verification', 'Confirmation'];

// --- Component --- 
const LawMisAddSupplierForm: React.FC<LawMisAddSupplierFormProps> = ({ onNavigateBack }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        // Supplier Information
        supplierName: '',
        contactPerson: '',
        phoneNumber: '',
        emailAddress: '',
        address: '',
        products: '',
        
        // Equipment Information
        equipmentType: '',
        manufacturer: '',
        model: '',
        quantity: '',
        certificationStatus: false,
        warrantyInformation: '',
        
        // Confirmation
        termsAccepted: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Supplier Form submitted', formData);
        // Add actual form submission logic here
        handleNext(); // Move to confirmation step
    };

    // Render supplier verification form (step 0)
    const renderSupplierVerificationForm = () => (
        <MuiGrid container spacing={3}>
            {/* Supplier Name */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Supplier Name"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Contact Person */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Contact Person"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Phone Number */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Email Address */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Email Address"
                    name="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Address */}
            <MuiGrid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Products/Services */}
            <MuiGrid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Products/Services Offered"
                    name="products"
                    value={formData.products}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                    variant="outlined"
                />
            </MuiGrid>
        </MuiGrid>
    );

    // Render equipment verification form (step 1)
    const renderEquipmentVerificationForm = () => (
        <MuiGrid container spacing={3}>
            {/* Equipment Type */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Equipment Type"
                    name="equipmentType"
                    value={formData.equipmentType}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Manufacturer */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Model */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Quantity */}
            <MuiGrid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Warranty Information */}
            <MuiGrid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Warranty Information"
                    name="warrantyInformation"
                    value={formData.warrantyInformation}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                    variant="outlined"
                />
            </MuiGrid>

            {/* Certification Status */}
            <MuiGrid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={formData.certificationStatus}
                            onChange={handleInputChange}
                            name="certificationStatus"
                            color="primary"
                        />
                    }
                    label="Equipment is certified and meets all required standards"
                />
            </MuiGrid>
        </MuiGrid>
    );

    // Render confirmation step (step 2)
    const renderConfirmation = () => (
        <MuiGrid container spacing={3}>
            <MuiGrid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Review Your Information
                </Typography>

                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Supplier Information
                    </Typography>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={12} md={6}>
                            <Typography variant="body2" component="div">
                                <strong>Supplier Name:</strong> {formData.supplierName}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Contact Person:</strong> {formData.contactPerson}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Phone Number:</strong> {formData.phoneNumber}
                            </Typography>
                        </MuiGrid>
                        <MuiGrid item xs={12} md={6}>
                            <Typography variant="body2" component="div">
                                <strong>Email Address:</strong> {formData.emailAddress}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Address:</strong> {formData.address}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Products/Services:</strong> {formData.products}
                            </Typography>
                        </MuiGrid>
                    </MuiGrid>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Equipment Information
                    </Typography>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={12} md={6}>
                            <Typography variant="body2" component="div">
                                <strong>Equipment Type:</strong> {formData.equipmentType}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Manufacturer:</strong> {formData.manufacturer}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Model:</strong> {formData.model}
                            </Typography>
                        </MuiGrid>
                        <MuiGrid item xs={12} md={6}>
                            <Typography variant="body2" component="div">
                                <strong>Quantity:</strong> {formData.quantity}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Warranty Information:</strong> {formData.warrantyInformation}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <strong>Certification Status:</strong> {formData.certificationStatus ? 'Certified' : 'Not Certified'}
                            </Typography>
                        </MuiGrid>
                    </MuiGrid>
                </Paper>

                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                            name="termsAccepted"
                            color="primary"
                        />
                    }
                    label="I confirm that all information provided is accurate and complete"
                    sx={{ mt: 2 }}
                />
            </MuiGrid>
        </MuiGrid>
    );

    // Render success message (step 3)
    const renderSuccess = () => (
        <Box textAlign="center" py={4}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
                Supplier Added Successfully!
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                The supplier has been verified and added to the system.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={onNavigateBack}
                sx={{ mt: 2 }}
            >
                Return to Dashboard
            </Button>
        </Box>
    );

    // Get current step content
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return renderSupplierVerificationForm();
            case 1:
                return renderEquipmentVerificationForm();
            case 2:
                return renderConfirmation();
            case 3:
                return renderSuccess();
            default:
                return 'Unknown step';
        }
    };

    // Check if current step form is valid
    const isStepValid = () => {
        if (activeStep === 0) {
            return formData.supplierName && 
                   formData.contactPerson && 
                   formData.phoneNumber && 
                   formData.emailAddress && 
                   formData.address &&
                   formData.products;
        } else if (activeStep === 1) {
            return formData.equipmentType && 
                   formData.manufacturer && 
                   formData.model && 
                   formData.quantity && 
                   formData.warrantyInformation;
        } else if (activeStep === 2) {
            return formData.termsAccepted;
        }
        return true;
    };

    return (
        <Container maxWidth="md">
            {/* Breadcrumb Navigation */}
            <Box sx={{ mb: 2, mt: 1 }}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link 
                        color="inherit" 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateBack();
                        }}
                    >
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Add New Supplier</Typography>
                </Breadcrumbs>
            </Box>

            {/* Page Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button 
                    variant="text" 
                    startIcon={<ArrowBackIcon />} 
                    onClick={onNavigateBack}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h5" component="h1" fontWeight="bold">
                    Add New Supplier
                </Typography>
            </Box>

            {/* Stepper */}
            <Box sx={{ mb: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Form Container */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                {activeStep === 3 ? (
                    renderSuccess()
                ) : (
                    <Box component="form" onSubmit={handleSubmit}>
                        {/* Step Title */}
                        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                            {steps[activeStep]}
                        </Typography>
                        
                        <Divider sx={{ mb: 3 }} />
                        
                        {/* Step Content */}
                        {getStepContent(activeStep)}
                        
                        <Divider sx={{ mt: 3, mb: 3 }} />
                        
                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === 2 ? handleSubmit : handleNext}
                                disabled={!isStepValid()}
                            >
                                {activeStep === 2 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default LawMisAddSupplierForm; 