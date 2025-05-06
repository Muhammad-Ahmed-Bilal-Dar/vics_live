import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  FormControl,
  SelectChangeEvent,
  Paper,
  useMediaQuery
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

// Equipment item component
interface EquipmentItemProps {
  name: string;
  urduName: string;
  quantity: string;
  onChange: (quantity: string) => void;
}

const EquipmentItem: React.FC<EquipmentItemProps> = ({ 
  name, 
  urduName, 
  quantity, 
  onChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      py: isMobile ? 1 : 1.5,
      borderBottom: `1px solid ${theme.palette.divider}`
    }}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
        <Typography 
          variant={isMobile ? "caption" : "body1"} 
          sx={{ 
            fontWeight: 'medium',
            fontSize: isMobile ? '0.75rem' : 'inherit'
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.secondary, 
            ml: isMobile ? 0 : 1.5,
            mt: isMobile ? 0.2 : 0,
            fontStyle: 'italic',
            fontSize: isMobile ? '0.65rem' : '0.875rem'
          }}
        >
          {urduName}
        </Typography>
      </Box>
      <FormControl size="small" sx={{ minWidth: isMobile ? 60 : 80 }}>
        <Select
          value={quantity}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownIcon}
          sx={{ 
            '& .MuiSelect-select': { 
              px: isMobile ? 1 : 2,
              py: isMobile ? 0.5 : 'auto',
              fontSize: isMobile ? '0.75rem' : 'inherit',
              textAlign: 'center' 
            },
            '& .MuiSvgIcon-root': {
              fontSize: isMobile ? '1rem' : '1.25rem'
            }
          }}
        >
          {[...Array(10)].map((_, i) => (
            <MenuItem key={i} value={i.toString()}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

// Interface for equipment items
interface Equipment {
  id: string;
  name: string;
  urduName: string;
  quantity: string;
}

const InspectionEquipments: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Initial equipment list
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    { id: 'brakeTest', name: 'BREAK TESTER', urduName: 'بریک ٹیسٹر', quantity: '1' },
    { id: 'alignmentTest', name: 'ALIGNMENT TESTER', urduName: 'الائنمنٹ ٹیسٹر', quantity: '4' },
    { id: 'suspensionTest', name: 'SUSPENSION TESTER', urduName: 'سسپینشن ٹیسٹر', quantity: '4' },
    { id: 'headlightTest', name: 'HEADLIGHT TESTER', urduName: 'ہیڈلائٹ ٹیسٹر', quantity: '2' },
    { id: 'emissionTest', name: 'EMISSION TESTER (PETROL VEHICLE)', urduName: 'امیشن ٹیسٹر', quantity: '6' },
    { id: 'opacityTest', name: 'OPACITY TESTER (DIESEL VEHICLE)', urduName: 'اوپیسٹی ٹیسٹر', quantity: '5' },
    { id: 'noiseTest', name: 'NOISE TESTER', urduName: 'نوائز ٹیسٹر', quantity: '6' },
    { id: 'axlePlay', name: 'AXLE PLAY DETECTOR', urduName: 'ایکسل پلے ڈیٹیکٹر', quantity: '2' },
    { id: 'tyreTest', name: 'TYRE TREAD DEPTH TESTER', urduName: 'ٹائر ٹریڈ ڈیپتھ ٹیسٹر', quantity: '7' },
    { id: 'pit', name: 'PIT (FOR UNDER CARRIAGE TESTS)', urduName: 'پٹ (کیریج)', quantity: '5' },
    { id: 'computers', name: 'COMPUTERS', urduName: 'کمپیوٹر', quantity: '3' },
    { id: 'printer', name: 'PRINTER (COLOR OR BLACK & WHITE)', urduName: 'پرنٹر', quantity: '2' },
    { id: 'internet', name: 'HIGH SPEED INTERNET CONNECTION (SPEED MIN 10MBS)', urduName: 'انٹرنیٹ', quantity: '3' },
    { id: 'generator', name: 'GENERATOR (KVA)', urduName: 'جنریٹر', quantity: '4' },
    { id: 'fireExt', name: 'FIRE EXTINGUISHERS', urduName: 'آگ کے خاتمے کے آلات', quantity: '2' },
  ]);
  
  // Declaration checkbox state
  const [isAgreed, setIsAgreed] = useState(false);
  
  // Handle equipment quantity change
  const handleQuantityChange = (id: string) => (quantity: string) => {
    setEquipmentList(prevList => 
      prevList.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <SectionHeader 
        title="INSPECTION EQUIPMENTS" 
        subtitle="جانچ کے آلات" 
      />
      
      {/* Equipment List */}
      <Box sx={{ px: 1, mb: isMobile ? 3 : 4 }}>
        {equipmentList.map(equipment => (
          <EquipmentItem 
            key={equipment.id}
            name={equipment.name}
            urduName={equipment.urduName}
            quantity={equipment.quantity}
            onChange={handleQuantityChange(equipment.id)}
          />
        ))}
      </Box>
      
      {/* Declaration Checkbox */}
      <Box sx={{ px: 1, mb: isMobile ? 1.5 : 2 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: isMobile ? 1.5 : 2, 
            bgcolor: theme.palette.grey[50],
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <FormControlLabel
            control={
              <Checkbox 
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                color="primary"
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  p: isMobile ? 0.5 : 1, 
                  mt: -0.5 
                }}
              />
            }
            label={
              <Box>
                <Typography 
                  variant={isMobile ? "caption" : "body2"} 
                  sx={{ 
                    fontWeight: 'medium',
                    fontSize: isMobile ? '0.7rem' : 'inherit'
                  }}
                >
                  "I / WE DECLARE THAT FOLLOWING INSPECTION EQUIPMENT AS PER NOTIFIED SPECIFICATIONS BY THE PUNJAB PROVINCIAL TRANSPORT AUTHORITY (PTA) HAS BEEN INSTALLED AT THE PRESCRIBED AUTOMOBILE WORKSHOP / VEHICLE INSPECTION STATION / CENTER FOR INSPECTION AND CERTIFICATION OF MOTOR CARS"
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    display: 'block', 
                    mt: 0.5,
                    fontSize: isMobile ? '0.65rem' : '0.75rem'
                  }}
                >
                  میں/ہم اعلان کرتے ہیں کہ پنجاب پروونشل ٹرانسپورٹ اتھارٹی کی طرف سے نوٹیفائیڈ سپیسیفیکیشنز کے مطابق درج ذیل انسپکشن اکوئپمنٹ پریسکرائبڈ آٹوموبائل ورکشاپ/وہیکل انسپکشن اسٹیشن/سنٹر فار انسپکشن اینڈ سرٹیفیکیشن آف موٹر کارز پر انسٹال کر دیا گیا ہے۔
                </Typography>
              </Box>
            }
            sx={{ 
              alignItems: 'flex-start',
              ml: 0
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default InspectionEquipments; 


