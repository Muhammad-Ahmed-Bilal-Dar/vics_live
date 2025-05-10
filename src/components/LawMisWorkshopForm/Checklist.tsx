import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme,
  Paper,
  useMediaQuery,
  Dialog,
  Button,
  DialogContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
      mb: 2
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

// Document item interface
interface DocumentItem {
  id: number;
  name: string;
  urduName: string;
  isAttached: string; // 'yes' or 'no'
}

const Checklist: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // List of required documents
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { 
      id: 1, 
      name: "AUTOMOBILE WORKSHOP / BUSINESS OWNER VALID NTN NUMBER", 
      urduName: "آٹوموبائل ورکشاپ / کاروباری مالک کا درست این ٹی این نمبر", 
      isAttached: "no" 
    },
    { 
      id: 2, 
      name: "VALID PUNJAB SALES TAX REGISTRATION NUMBER", 
      urduName: "درست پنجاب سیلز ٹیکس رجسٹریشن نمبر", 
      isAttached: "no" 
    },
    { 
      id: 3, 
      name: "COPY OF APPROVED BUILDING (AUTOMOBILE WORKSHOP / INSPECTION STATION) PLAN", 
      urduName: "منظور شدہ عمارت کی نقل", 
      isAttached: "no" 
    },
    { 
      id: 4, 
      name: "COPY OF CNIC OF APPLICANT", 
      urduName: "درخواست دہندہ کے شناختی کارڈ کی نقل", 
      isAttached: "no" 
    },
    { 
      id: 5, 
      name: "UNDERTAKING REGARDING NO VEHICLE REPAIR, MAINTENANCE, TRADING, OR MARKETING OF VEHICLE SPARE PARTS ACTIVITIES ARE BEING CONDUCTED AT THE PREMISES FOR WHICH THE VEHICLE INSPECTION LICENSE IS BEING APPLIED", 
      urduName: "عہد نامہ کہ جس جگہ پر گاڑیوں کی انسپکشن لائسنس کے لیے درخواست دی جا رہی ہے، وہاں گاڑیوں کی مرمت، دیکھ بھال، تجارت یا گاڑیوں کے سپیئر پارٹس کی مارکیٹنگ کی سرگرمیاں نہیں ہو رہی ہیں", 
      isAttached: "no" 
    },
    { 
      id: 6, 
      name: "UNDERTAKING THAT THERE IS NO PENDING LITIGATION (CRIMINAL / NON CRIMINAL) AGAINST WORKSHOP/COMPANY", 
      urduName: "عہد نامہ کہ ورکشاپ/کمپنی کے خلاف کوئی زیر التواء مقدمہ (فوجداری/غیر فوجداری) نہیں ہے", 
      isAttached: "no" 
    },
    { 
      id: 7, 
      name: "UNDERTAKING THAT THERE IS NO PENDING LITIGATION (CRIMINAL / NON CRIMINAL AGAINST ANY OF THE WORKSHOP / VEHICLE INSPECTION STATION / CENTER EMPLOYEES)", 
      urduName: "عہد نامہ کہ ورکشاپ/وہیکل انسپکشن اسٹیشن/سنٹر کے کسی بھی ملازم کے خلاف کوئی زیر التواء مقدمہ (فوجداری/غیر فوجداری) نہیں ہے", 
      isAttached: "no" 
    },
    { 
      id: 8, 
      name: "DECLARATION REGARDING ALL THE EQUIPMENT HAS BEEN INSTALLED AS PER APPROVED SPECIFICATIONS BY PTA FOR INSPECTION OF MOTOR CARS (ON RS 500/- STAMP PAPER)", 
      urduName: "اعلان کہ موٹر کاروں کی انسپکشن کے لیے پی ٹی اے کی طرف سے منظور شدہ خصوصیات کے مطابق تمام سامان نصب کیا گیا ہے (500 روپے کے اسٹامپ پیپر پر)", 
      isAttached: "no" 
    }
  ]);
  
  // Application completion state
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [applicationId] = useState(`${Math.floor(1000 + Math.random() * 9000)}`); // Random 4-digit number
  
  // Handle radio button changes
  const handleAttachmentChange = (id: number, value: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id ? { ...doc, isAttached: value } : doc
      )
    );
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setShowCompletionDialog(true);
  };
  
  // Handle dashboard navigation
  const handleDashboardClick = () => {
    // Navigate to dashboard (this would typically use a router)
    window.location.href = '/'; // Navigate to the root path which typically shows the dashboard
    setShowCompletionDialog(false);
  };
  
  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <SectionHeader 
        title="CHECKLIST" 
        subtitle="چیک لسٹ" 
      />
      
      {/* Instructions */}
      <Box sx={{ px: 1, mb: 2 }}>
        <Typography 
          variant={isMobile ? "body2" : "body1"} 
          sx={{ 
            fontWeight: 'medium', 
            color: theme.palette.primary.main,
            mb: 0.5,
            fontSize: isMobile ? '0.85rem' : 'inherit'
          }}
        >
          PLEASE MAKE SURE THAT THE FOLLOWING DOCUMENTS ARE ATTACHED WITH THIS APPLICATION
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary,
            display: 'block',
            fontStyle: 'italic',
            fontSize: isMobile ? '0.7rem' : '0.75rem'
          }}
        >
          براہ کرم یقینی بنائیں کہ درج ذیل دستاویزات اس درخواست کے ساتھ منسلک ہیں۔
        </Typography>
      </Box>
      
      {/* Documents Table */}
      <TableContainer component={Paper} elevation={0} sx={{ mx: 1, mb: 3 }}>
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell width="5%" sx={{ fontWeight: 'bold', py: isMobile ? 0.75 : 1.5, px: isMobile ? 1 : 2 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: isMobile ? 0.75 : 1.5, px: isMobile ? 1 : 2 }}>DOCUMENTS</TableCell>
              <TableCell width="25%" align="center" sx={{ fontWeight: 'bold', py: isMobile ? 0.75 : 1.5, px: isMobile ? 1 : 2 }}>ATTACHED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow 
                key={doc.id}
                sx={{
                  '&:nth-of-type(odd)': { bgcolor: theme.palette.grey[50] },
                  '&:hover': { bgcolor: theme.palette.action.hover }
                }}
              >
                <TableCell sx={{ 
                  py: isMobile ? 0.75 : 1.5, 
                  px: isMobile ? 1 : 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  fontSize: isMobile ? '0.75rem' : '0.875rem'
                }}>
                  {doc.id}
                </TableCell>
                <TableCell sx={{ 
                  py: isMobile ? 0.75 : 1.5, 
                  px: isMobile ? 1 : 2,
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                  <Typography 
                    variant={isMobile ? "caption" : "body2"} 
                    sx={{ 
                      fontWeight: 'medium',
                      fontSize: isMobile ? '0.7rem' : '0.875rem'
                    }}
                  >
                    {doc.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      display: 'block', 
                      fontStyle: 'italic',
                      fontSize: isMobile ? '0.65rem' : '0.75rem'
                    }}
                  >
                    {doc.urduName}
                  </Typography>
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    py: isMobile ? 0.75 : 1.5, 
                    px: 0,
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <RadioGroup
                    row
                    value={doc.isAttached}
                    onChange={(e) => handleAttachmentChange(doc.id, e.target.value)}
                    sx={{ 
                      justifyContent: 'center',
                      m: 0
                    }}
                  >
                    <FormControlLabel 
                      value="yes" 
                      control={<Radio size="small" color="primary" sx={{ p: 0.5 }} />} 
                      label={
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 'medium',
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            ml: -0.5
                          }}
                        >
                          YES
                        </Typography>
                      }
                      sx={{ mx: 0.5 }}
                    />
                    <FormControlLabel 
                      value="no" 
                      control={<Radio size="small" color="primary" sx={{ p: 0.5 }} />} 
                      label={
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 'medium',
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            ml: -0.5
                          }}
                        >
                          NO
                        </Typography>
                      }
                      sx={{ mx: 0.5 }}
                    />
                  </RadioGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ 
            px: isMobile ? 2 : 3,
            py: isMobile ? 0.5 : 1,
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }}
        >
          SUBMIT APPLICATION
        </Button>
      </Box>
      
      {/* Completion Dialog */}
      <Dialog 
        open={showCompletionDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 1, 
            bgcolor: 'background.paper',
            p: isMobile ? 2 : 3
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ bgcolor: 'background.paper', p: 0 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              color="primary"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 3 }}
            >
              APPLICATION FOR GRANT / RENEWAL OF LICENSE TO OPERATE VEHICLE INSPECTION STATION / CENTER FOR MOTOR CARS ONLY HAS BEEN SUBMITTED
            </Typography>
            
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="primary"
              align="center"
              sx={{ fontWeight: 'bold', mb: 4 }}
            >
              YOUR APPLICATION ID IS {applicationId}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={handleDashboardClick}
                sx={{ 
                  minWidth: 200,
                  py: isMobile ? 1 : 1.5
                }}
              >
                DASHBOARD<Typography component="span" sx={{ ml: 0.5, fontSize: '0.8em' }}>ڈیش بورڈ</Typography>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Checklist; 