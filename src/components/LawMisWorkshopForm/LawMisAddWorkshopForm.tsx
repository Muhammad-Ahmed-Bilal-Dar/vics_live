import React, { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Container,
    Paper,
    StepConnector,
    stepConnectorClasses,
    useTheme, // Import useTheme
    Icon, // Generic Icon component
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
// --- Import relevant icons ---
import StorefrontIcon from '@mui/icons-material/Storefront'; // For Workshop
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // For Human Resource
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // For Tax
import ConstructionIcon from '@mui/icons-material/Construction'; // For Equipments
import DescriptionIcon from '@mui/icons-material/Description'; // For Undertaking
import ChecklistIcon from '@mui/icons-material/Checklist'; // For Checklist
import SettingsIcon from '@mui/icons-material/Settings'; // Fallback icon

// Import the step components
import AutomobileWorkshopDetails from './AutomobileWorkshopDetails';
import HumanResourceDetails from './HumanResourceDetails';
import TaxDetails from './TaxDetails';
import InspectionEquipments from './InspectionEquipments';
import Undertaking from './Undertaking';
import Checklist from './Checklist';

const steps = [
    'AUTOMOBILE WORKSHOP DETAILS',
    'HUMAN RESOURCE DETAILS',
    'TAX DETAILS',
    'INSPECTION EQUIPMENTS',
    'UNDERTAKING',
    'CHECKLIST'
];

// Map step index to icons
const stepIcons: { [key: number]: React.ReactElement } = {
    1: <StorefrontIcon />,
    2: <PeopleAltIcon />,
    3: <AccountBalanceWalletIcon />,
    4: <ConstructionIcon />,
    5: <DescriptionIcon />,
    6: <ChecklistIcon />,
};

// --- Custom Connector Styling --- (Keep the previous QontoConnector or simplify)
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22, // Adjust based on icon size
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 2,
        borderRadius: 1,
    },
}));

// --- New Custom Step Icon Component ---
const CustomStepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean } }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    ...(ownerState.active && {
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: theme.palette.primary.main,
    }),
}));

function CustomStepIcon(props: any) {
    const { active, completed, className, icon } = props; // icon is 1-based index from StepLabel
    const theme = useTheme(); // Get theme for potential use

    return (
        <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
            {/* Access icons using the 1-based index directly */}
            {stepIcons[icon] || <SettingsIcon />} {/* Fallback icon */}
        </CustomStepIconRoot>
    );
}


// --- Main Form Component ---
interface LawMisAddWorkshopFormProps {
    onNavigateBack: () => void; // Function to go back to dashboard (will be used by sidebar later)
}

const LawMisAddWorkshopForm: React.FC<LawMisAddWorkshopFormProps> = ({ onNavigateBack }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <AutomobileWorkshopDetails />;
            case 1:
                return <HumanResourceDetails />;
            case 2:
                return <TaxDetails />;
            case 3:
                return <InspectionEquipments />;
            case 4:
                return <Undertaking />;
            case 5:
                return <Checklist />;
            default:
                return <Typography>Unknown step</Typography>;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Back Button Removed */}
            
            {/* Stepper in its own Paper, outside the main form Paper */}
            <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, mb: 3, borderRadius: 1 }}>
                 <Stepper alternativeLabel activeStep={activeStep} connector={<CustomConnector />}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            {/* Main Form Content Paper */}
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
                {/* Title removed from here, maybe place above stepper? */}
                {/* <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
                    Add New Workshop
                </Typography> */}

                {/* Content for the active step */}
                <Box sx={{ mb: 2 }}>
                    {getStepContent(activeStep)}
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep === steps.length - 1 ? (
                        <Button onClick={handleReset}>Finish</Button> // TODO: Implement actual finish/submit logic
                    ) : (
                        <Button onClick={handleNext}>Next</Button>
                    )}
                </Box>
             </Paper>
        </Container>
    );
};

export default LawMisAddWorkshopForm; 