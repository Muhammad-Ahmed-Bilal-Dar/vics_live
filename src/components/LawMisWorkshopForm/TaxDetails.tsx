import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  useTheme,
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

// Helper component for labels
const FieldLabel = ({ primary, secondary }: { primary: string; secondary?: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
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
        {primary}
      </Typography>
      {secondary && (
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary, 
            fontSize: isMobile ? '0.65rem' : '0.7rem' 
          }} 
          display="block"
        >
          {secondary}
        </Typography>
      )}
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
      <FieldLabel primary={label} secondary={secondaryLabel} />
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

interface TaxDetailsState {
  ownerNtnNumber: string;
  businessNtnNumber: string;
  businessPstnNumber: string;
  ownerNtnProof: File | null;
  businessNtnProof: File | null;
  businessStampProof: File | null;
}

const TaxDetails: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for form fields
  const [formData, setFormData] = useState<TaxDetailsState>({
    ownerNtnNumber: '',
    businessNtnNumber: '',
    businessPstnNumber: '',
    ownerNtnProof: null,
    businessNtnProof: null,
    businessStampProof: null
  });

  // Handle text field changes
  const handleInputChange = (field: keyof TaxDetailsState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  // Handle file changes
  const handleFileChange = (field: 'ownerNtnProof' | 'businessNtnProof' | 'businessStampProof') => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        [field]: e.target.files[0]
      });
    }
  };
  
  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <SectionHeader 
        title="TAX DETAILS" 
        subtitle="ٹیکس کی تفصیلات" 
      />
      
      {/* Tax Requirements */}
      <Box sx={{ mb: isMobile ? 2 : 3, px: 1 }}>
        <Typography 
          variant={isMobile ? "body2" : "subtitle1"} 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            fontSize: isMobile ? '0.8rem' : 'inherit'
          }}
        >
          THE OWNER / DIRECTOR OF THE COMPANY MUST BE ACTIVE TAXPAYER
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            color: theme.palette.text.secondary,
            fontSize: isMobile ? '0.65rem' : '0.75rem'
          }}
        >
          کمپنی کے مالک / ڈائریکٹر کو ایکٹو ٹیکس پیئر ہونا ضروری ہے
        </Typography>
      </Box>
      
      {/* Input Fields */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ px: 1, mb: isMobile ? 3 : 4 }}>
        {/* Owner NTN Number */}
        <Grid size={6}>
          <FieldLabel 
            primary="OWNER NTN NUMBER" 
            secondary="مالک کا این ٹی این نمبر" 
          />
          <TextField
            fullWidth
            placeholder="OWNER NTN NUMBER"
            value={formData.ownerNtnNumber}
            onChange={handleInputChange('ownerNtnNumber')}
            size="small"
            inputProps={{
              style: {
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                padding: isMobile ? '8px 10px' : '10px 14px'
              }
            }}
          />
        </Grid>
        
        {/* Business NTN Number */}
        <Grid size={6}>
          <FieldLabel 
            primary="BUSINESS NTN NUMBER" 
            secondary="کاروبار کا این ٹی این نمبر" 
          />
          <TextField
            fullWidth
            placeholder="BUSINESS NTN NUMBER"
            value={formData.businessNtnNumber}
            onChange={handleInputChange('businessNtnNumber')}
            size="small"
            inputProps={{
              style: {
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                padding: isMobile ? '8px 10px' : '10px 14px'
              }
            }}
          />
        </Grid>
        
        {/* Business PSTN Number */}
        <Grid size={6}>
          <FieldLabel 
            primary="BUSINESS PSTN NUMBER" 
            secondary="کاروبار کا پی ایس ٹی این نمبر" 
          />
          <TextField
            fullWidth
            placeholder="BUSINESS PSTN NUMBER"
            value={formData.businessPstnNumber}
            onChange={handleInputChange('businessPstnNumber')}
            size="small"
            inputProps={{
              style: {
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                padding: isMobile ? '8px 10px' : '10px 14px'
              }
            }}
          />
        </Grid>
      </Grid>
      
      {/* File Upload Sections */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ px: 1 }}>
        {/* Owner's NTN Proof */}
        <Grid size={4}>
          <FileUploadBox
            id="owner-ntn-proof"
            label="OWNER'S NTN NUMBER PROOF"
            secondaryLabel="مالک کے این ٹی این نمبر کا ثبوت"
            onChange={handleFileChange('ownerNtnProof')}
          />
        </Grid>
        
        {/* Business NTN Proof */}
        <Grid size={4}>
          <FileUploadBox
            id="business-ntn-proof"
            label="BUSINESS NTN NUMBER PROOF"
            secondaryLabel="کاروبار کے این ٹی این نمبر کا ثبوت"
            onChange={handleFileChange('businessNtnProof')}
          />
        </Grid>
        
        {/* Business Stamp Proof */}
        <Grid size={4}>
          <FileUploadBox
            id="business-stamp-proof"
            label="BUSINESS NTN NUMBER PROOF" 
            secondaryLabel="کاروبار کے این ٹی این نمبر کا ثبوت"
            onChange={handleFileChange('businessStampProof')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaxDetails; 

