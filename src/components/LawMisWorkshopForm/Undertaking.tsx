import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  IconButton,
  useMediaQuery
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Helper component for section headers
const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ 
      bgcolor: theme.palette.grey[100], 
      p: isMobile ? 1 : 1.5, 
      borderRadius: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
      mb: isMobile ? 2 : 3
    }}>
      <Typography variant={isMobile ? "body1" : "subtitle1"} sx={{ fontWeight: 'bold' }}>
        {title} 
        {subtitle && (
          <Typography 
            variant={isMobile ? "caption" : "body2"} 
            component="span" 
            sx={{ color: theme.palette.text.secondary, ml: 1 }}
          >
            ({subtitle})
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

// File upload component
const FileUploadBox = ({ 
  id, 
  label, 
  secondaryLabel, 
  fileSize = "4MB",
  onChange 
}: { 
  id: string; 
  label: string; 
  secondaryLabel?: string; 
  fileSize?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
      <Typography 
        variant={isMobile ? "caption" : "subtitle2"} 
        component="label" 
        sx={{ 
          fontWeight: 'medium', 
          display: 'block', 
          mb: 0.5,
          fontSize: isMobile ? '0.7rem' : 'inherit'
        }}
      >
        {label}
        {secondaryLabel && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.text.secondary, 
              fontSize: isMobile ? '0.65rem' : '0.7rem', 
              ml: 1 
            }} 
            component="span"
          >
            {secondaryLabel}
          </Typography>
        )}
      </Typography>
      <Typography 
        variant="caption" 
        sx={{ 
          color: theme.palette.text.secondary, 
          mb: 1, 
          display: 'block',
          fontSize: isMobile ? '0.65rem' : '0.75rem'
        }}
      >
        Max File size to be {fileSize}
      </Typography>
      
      <Box 
        sx={{ 
          border: '1px dashed rgba(0, 0, 0, 0.2)', 
          borderRadius: 1,
          p: isMobile ? 1.5 : 2,
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.03)'
          }
        }}
        onClick={() => document.getElementById(id)?.click()}
      >
        <input
          type="file"
          id={id}
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <Typography 
          variant={isMobile ? "caption" : "body2"} 
          sx={{ 
            fontWeight: 'medium', 
            mb: 0.5,
            fontSize: isMobile ? '0.7rem' : 'inherit'
          }}
        >
          CLICK TO SELECT FILES HERE
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary, 
            display: 'block',
            fontSize: isMobile ? '0.65rem' : '0.75rem'
          }}
        >
          یہاں فائلوں کو منتخب کرنے کے لیے کلک کریں
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
          <UploadFileIcon color="action" sx={{ mr: 1, opacity: 0.6, fontSize: isMobile ? '1rem' : '1.25rem' }} />
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontSize: isMobile ? '0.65rem' : '0.75rem'
            }}
          >
            SELECT FILES FROM YOUR SYSTEM OR SCAN THEM FOR UPLOAD
          </Typography>
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary, 
            display: 'block', 
            mt: 0.5, 
            fontStyle: 'italic',
            fontSize: isMobile ? '0.6rem' : '0.7rem'
          }}
        >
          اپنے سسٹم سے فائلیں منتخب کریں یا انہیں اپ لوڈ کرنے کے لیے اسکین کریں
        </Typography>
      </Box>
    </Box>
  );
};

// Declaration item component
interface DeclarationItemProps {
  englishText: string;
  urduText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}

const DeclarationItem: React.FC<DeclarationItemProps> = ({
  englishText,
  urduText,
  checked,
  onChange,
  required = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ mb: isMobile ? 1.5 : 2, display: 'flex', alignItems: 'flex-start' }}>
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        color="primary"
        required={required}
        sx={{ mt: -0.5, p: isMobile ? 0.5 : 1 }}
        size={isMobile ? "small" : "medium"}
      />
      <Box>
        <Typography 
          variant={isMobile ? "caption" : "body2"}
          sx={{ 
            fontWeight: 'medium', 
            color: theme.palette.text.primary,
            textTransform: 'uppercase',
            fontSize: isMobile ? '0.7rem' : 'inherit'
          }}
        >
          {englishText}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            color: theme.palette.text.secondary, 
            mt: 0.2,
            fontStyle: 'italic',
            fontSize: isMobile ? '0.65rem' : '0.75rem'
          }}
        >
          {urduText}
        </Typography>
      </Box>
    </Box>
  );
};

interface UndertakingState {
  companyBlacklisted: boolean;
  noVehicleRepair: boolean;
  noCompanyLitigation: boolean;
  noEmployeesLitigation: boolean;
  declaration: boolean;
  fullName: string;
  date: string;
  signatureFile: File | null;
}

const Undertaking: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for form fields
  const [formData, setFormData] = useState<UndertakingState>({
    companyBlacklisted: false,
    noVehicleRepair: false,
    noCompanyLitigation: false,
    noEmployeesLitigation: false,
    declaration: false,
    fullName: '',
    date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    signatureFile: null
  });

  // Handle checkbox changes
  const handleCheckboxChange = (field: keyof UndertakingState) => (checked: boolean) => {
    setFormData({
      ...formData,
      [field]: checked
    });
  };

  // Handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      fullName: e.target.value
    });
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      date: e.target.value
    });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        signatureFile: e.target.files[0]
      });
    }
  };
  
  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <SectionHeader 
        title="UNDERTAKING" 
        subtitle="عہد نامہ" 
      />
      
      {/* Declarations */}
      <Box sx={{ px: 1, mb: isMobile ? 2 : 3 }}>
        {/* Company Not Blacklisted */}
        <DeclarationItem
          englishText="MY / OUR COMPANY SETUP HAS NOT BEEN DECLARED BLACKLISTED AND / OR DEBARRED BY ANY GOVERNMENT / SEMI GOVERNMENT / AUTONOMOUS BODY ANYWHERE IS PAKISTAN"
          urduText="میری/ہماری کمپنی کا سیٹ اپ کسی بھی سرکاری/نیم سرکاری/خود مختار ادارے کی طرف سے کہیں بھی پاکستان میں بلیک لسٹڈ/نا اہل قرار نہیں دیا گیا۔"
          checked={formData.companyBlacklisted}
          onChange={handleCheckboxChange('companyBlacklisted')}
        />
        
        {/* No Vehicle Repair */}
        <DeclarationItem
          englishText="THERE ARE NO VEHICLE REPAIR, MAINTENANCE, OR MARKETING OF VEHICLE SPARE PARTS ACTIVITIES BEING CONDUCTED AT THE PREMISES FOR WHICH THE VEHICLE INSPECTION LICENCES IS BEING APPLIED"
          urduText="جس جگہ پر گاڑیوں کے معائنے کا لائسنس کے لیے درخواست دی جا رہی ہے وہاں گاڑیوں کی مرمت، دیکھ بھال یا گاڑیوں کے سپیئر پارٹس کی مارکیٹنگ کی سرگرمیاں نہیں ہو رہی ہیں۔"
          checked={formData.noVehicleRepair}
          onChange={handleCheckboxChange('noVehicleRepair')}
        />
        
        {/* No Company Litigation */}
        <DeclarationItem
          englishText="THERE ARE NO PENDING LITIGATIONS (CRIMINAL / NON CRIMINAL) AGAINST OUR COMPANY ANYWHERE IN PAKISTAN"
          urduText="پاکستان میں کہیں بھی ہماری کمپنی کے خلاف کوئی زیر التواء مقدمات (فوجداری/غیر فوجداری) نہیں ہیں۔"
          checked={formData.noCompanyLitigation}
          onChange={handleCheckboxChange('noCompanyLitigation')}
        />
        
        {/* No Employees Litigation */}
        <DeclarationItem
          englishText="THERE ARE NO PENDING LITIGATIONS (CRIMINAL / NON CRIMINAL) AGAINST OUR EMPLOYEES INCLUDING OWNER/DIRECTOR ANYWHERE IN PAKISTAN"
          urduText="پاکستان میں کہیں بھی ہمارے مالک/ڈائریکٹر سمیت ہمارے ملازمین کے خلاف کوئی زیر التواء مقدمات (فوجداری/غیر فوجداری) نہیں ہیں۔"
          checked={formData.noEmployeesLitigation}
          onChange={handleCheckboxChange('noEmployeesLitigation')}
        />
        
        {/* Declaration of Truth */}
        <DeclarationItem
          englishText="I / WE DECLARE THAT THE INFORMATION GIVEN IN THIS FORM IS TRUE COMPLETE AND ACCURATE."
          urduText="میں/ہم اعلان کرتے ہیں کہ اس فارم میں دی گئی معلومات سچ، مکمل اور درست ہیں۔"
          checked={formData.declaration}
          onChange={handleCheckboxChange('declaration')}
          required={true}
        />
      </Box>
      
      {/* Name and Date Fields */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ px: 1, mb: isMobile ? 2 : 3 }}>
        {/* Full Name */}
        <Grid size={6}>
          <Box sx={{ mb: 0.5 }}>
            <Typography 
              variant={isMobile ? "caption" : "subtitle2"} 
              component="label" 
              sx={{ 
                fontWeight: 'medium', 
                display: 'block',
                fontSize: isMobile ? '0.7rem' : 'inherit' 
              }}
            >
              FULL NAME*
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary, 
                fontSize: isMobile ? '0.65rem' : '0.7rem'
              }} 
              display="block"
            >
              مکمل نام
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="FULL NAME"
            value={formData.fullName}
            onChange={handleNameChange}
            size="small"
            required
            inputProps={{
              style: {
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                padding: isMobile ? '8px 10px' : '10px 14px'
              }
            }}
          />
        </Grid>
        
        {/* Date */}
        <Grid size={6}>
          <Box sx={{ mb: 0.5 }}>
            <Typography 
              variant={isMobile ? "caption" : "subtitle2"} 
              component="label" 
              sx={{ 
                fontWeight: 'medium', 
                display: 'block',
                fontSize: isMobile ? '0.7rem' : 'inherit'  
              }}
            >
              DATE
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary, 
                fontSize: isMobile ? '0.65rem' : '0.7rem'
              }} 
              display="block"
            >
              تاریخ
            </Typography>
          </Box>
          <TextField
            fullWidth
            type="date"
            value={formData.date}
            onChange={handleDateChange}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              style: {
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                padding: isMobile ? '8px 10px' : '10px 14px'
              }
            }}
          />
        </Grid>
      </Grid>
      
      {/* Signature Upload */}
      <Box sx={{ px: 1, mb: isMobile ? 1.5 : 2 }}>
        <FileUploadBox
          id="signature-upload"
          label="SIGNATURE"
          secondaryLabel="دستخط"
          fileSize="4MB"
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
};

export default Undertaking; 