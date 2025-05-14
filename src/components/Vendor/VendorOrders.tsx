import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  Tabs,
  Tab,
  Divider,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  LocalShipping as LocalShippingIcon,
  Cancel as CancelIcon,
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarTodayIcon,
  Business as BusinessIcon,
  Inventory as InventoryIcon,
  WarningAmber as WarningAmberIcon
} from '@mui/icons-material';

// Order interface
interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  amount: number;
  items: OrderItem[];
}

interface QuotationRequest {
  id: string;
  clientName: string;
  clientOrganization: string;
  clientEmail: string;
  clientPhone: string;
  status: 'pending' | 'responded' | 'expired';
  dateRequested: string;
  expiryDate: string;
  message: string;
  items: OrderItem[];
}

interface VendorOrdersProps {
  onNavigateBack: () => void;
}

const VendorOrders: React.FC<VendorOrdersProps> = ({ onNavigateBack }) => {
  // Sample orders data
  const initialOrders: Order[] = [
    {
      id: 'ORD-001',
      customer: 'AutoCare Workshop',
      email: 'orders@autocare.com',
      phone: '0300-1234567',
      date: '2024-05-15',
      status: 'pending',
      amount: 1650,
      items: [
        { id: 'ITEM-001', productName: 'Gas Analyzer Type A', quantity: 1, price: 1200 },
        { id: 'ITEM-002', productName: 'Filter Set', quantity: 3, price: 150 }
      ]
    },
    {
      id: 'ORD-002',
      customer: 'City Motors',
      email: 'purchasing@citymotors.com',
      phone: '0300-7654321',
      date: '2024-05-12',
      status: 'processing',
      amount: 2200,
      items: [
        { id: 'ITEM-003', productName: 'Calibration Kit', quantity: 2, price: 900 },
        { id: 'ITEM-004', productName: 'Diesel Opacimeter', quantity: 1, price: 1300 }
      ]
    },
    {
      id: 'ORD-003',
      customer: 'Express Mechanics',
      email: 'contact@expressmech.com',
      phone: '0300-9876543',
      date: '2024-05-10',
      status: 'delivered',
      amount: 800,
      items: [
        { id: 'ITEM-005', productName: 'Filter Set', quantity: 5, price: 600 },
        { id: 'ITEM-006', productName: 'Calibration Gases', quantity: 1, price: 200 }
      ]
    },
    {
      id: 'ORD-004',
      customer: 'Performance Auto',
      email: 'info@perfauto.com',
      phone: '0301-1234567',
      date: '2024-05-08',
      status: 'cancelled',
      amount: 3500,
      items: [
        { id: 'ITEM-007', productName: 'Gas Analyzer Type B', quantity: 1, price: 3500 }
      ]
    }
  ];

  // State
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationRequest | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState<boolean>(false);
  const [quoteAmount, setQuoteAmount] = useState<string>('');
  const [quoteMessage, setQuoteMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Tabs
  const tabs = ['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const statusFilters = ['', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Filtered orders based on search and tab
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = tabValue === 0 || order.status === statusFilters[tabValue];
    
    return matchesSearch && matchesTab;
  });

  // Mock data for quotation requests - Pakistan-specific
  const [quotationRequests, setQuotationRequests] = useState<QuotationRequest[]>([
    {
      id: 'QR-001',
      clientName: 'Muhammad Farooq',
      clientOrganization: 'Punjab Transport Authority',
      clientEmail: 'mfarooq@pta.gov.pk',
      clientPhone: '+92-308-5551234',
      status: 'pending',
      dateRequested: '2024-05-16',
      expiryDate: '2024-05-26',
      message: 'We require precise equipment for our new vehicle inspection center in Lahore. Please provide your best quotation for the items listed below.',
      items: [
        { 
          id: 'ITEM-001', 
          name: 'Vehicle Emission Analyzer', 
          quantity: 2,
          specifications: 'Must comply with Punjab EPA standards for vehicle emissions testing'
        },
        { 
          id: 'ITEM-002', 
          name: 'Digital Smoke Meter', 
          quantity: 3,
          specifications: 'Should be capable of measuring PM2.5 and PM10 particles'
        }
      ]
    },
    {
      id: 'QR-002',
      clientName: 'Ayesha Khan',
      clientOrganization: 'Sindh Environmental Protection Agency',
      clientEmail: 'akhan@sepa.gov.pk',
      clientPhone: '+92-317-7778901',
      status: 'pending',
      dateRequested: '2024-05-15',
      expiryDate: '2024-05-25',
      message: 'Requesting quotation for equipment to be installed at our Karachi facility for vehicle emissions monitoring.',
      items: [
        { 
          id: 'ITEM-003', 
          name: 'Petrol Quality Test Kit', 
          quantity: 5,
          specifications: 'Portable kits with ability to detect adulterants in fuel'
        },
        { 
          id: 'ITEM-004', 
          name: 'CNG Cylinder Inspection Tools', 
          quantity: 2,
          specifications: 'Complete set for comprehensive CNG cylinder safety inspection'
        }
      ]
    },
    {
      id: 'QR-003',
      clientName: 'Ibrahim Ahmed',
      clientOrganization: 'Islamabad Traffic Police',
      clientEmail: 'iahmed@itp.gov.pk',
      clientPhone: '+92-333-1234567',
      status: 'responded',
      dateRequested: '2024-05-10',
      expiryDate: '2024-05-20',
      message: 'We are establishing a new vehicle inspection facility in Islamabad. Please provide quotation for the listed items.',
      items: [
        { 
          id: 'ITEM-005', 
          name: 'Vehicle Safety Inspection System', 
          quantity: 1,
          specifications: 'Comprehensive system with brake testers, suspension analyzers, and headlight testers'
        }
      ]
    },
    {
      id: 'QR-004',
      clientName: 'Zainab Malik',
      clientOrganization: 'KPK Environmental Protection Department',
      clientEmail: 'zmalik@kpk-epd.gov.pk',
      clientPhone: '+92-321-9876543',
      status: 'expired',
      dateRequested: '2024-04-15',
      expiryDate: '2024-04-25',
      message: 'Requesting quotation for our new Peshawar facility focused on vehicle emission control.',
      items: [
        { 
          id: 'ITEM-006', 
          name: 'Diesel Particulate Filter Scanner', 
          quantity: 2,
          specifications: 'Must be compliant with Euro 4 emission standards'
        },
        { 
          id: 'ITEM-007', 
          name: 'Vehicle Emission Analyzer', 
          quantity: 1,
          specifications: 'All-in-one unit for both petrol and diesel vehicle testing'
        }
      ]
    }
  ]);

  // Handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsDialogOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Get color for status chip
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  // Filter quotation requests based on current tab and search query
  const filteredQuotations = quotationRequests.filter((quotation) => {
    // First filter by tab
    if (currentTab === 1 && quotation.status !== 'pending') return false;
    if (currentTab === 2 && quotation.status !== 'responded') return false;
    if (currentTab === 3 && quotation.status !== 'expired') return false;
    
    // Then filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        quotation.clientName.toLowerCase().includes(query) ||
        quotation.clientOrganization.toLowerCase().includes(query) ||
        quotation.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Handle opening quote dialog
  const handleOpenQuoteDialog = (quotation: QuotationRequest) => {
    setSelectedQuotation(quotation);
    setQuoteAmount('');
    setQuoteMessage('');
    setIsQuoteDialogOpen(true);
  };
  
  // Handle closing quote dialog
  const handleCloseQuoteDialog = () => {
    setIsQuoteDialogOpen(false);
    setSelectedQuotation(null);
  };
  
  // Handle submitting a quotation
  const handleSubmitQuotation = () => {
    if (!selectedQuotation) return;
    
    // Validate inputs
    if (!quoteAmount || isNaN(parseFloat(quoteAmount))) {
      setErrorMessage('Please enter a valid amount');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the status of the selected quotation to 'responded'
      setQuotationRequests((prevQuotations) => 
        prevQuotations.map((q) => 
          q.id === selectedQuotation.id 
            ? { ...q, status: 'responded' as const } 
            : q
        )
      );
      
      setIsLoading(false);
      setIsQuoteDialogOpen(false);
      setSelectedQuotation(null);
      
      setSuccessMessage('Quotation submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  return (
    <Box>
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={onNavigateBack} edge="start" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Orders
        </Typography>
      </Box>

      {/* Search and filter section */}
      <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '60%' }}>
          <TextField
            placeholder="Search orders by ID or customer..."
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Box>
      </Paper>

      {/* Tabs for filtering */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{order.customer}</Typography>
                    <Typography variant="caption" color="text.secondary">{order.email}</Typography>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status.toUpperCase()}
                      size="small"
                      color={getStatusColor(order.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        color="info" 
                        size="small" 
                        onClick={() => handleViewOrderDetails(order)}
                        title="View Order Details"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      
                      {order.status === 'pending' && (
                        <IconButton 
                          color="primary" 
                          size="small" 
                          onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                          title="Process Order"
                        >
                          <LocalShippingIcon fontSize="small" />
                        </IconButton>
                      )}
                      
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <IconButton 
                          color="error" 
                          size="small" 
                          onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                          title="Cancel Order"
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No orders found matching your criteria.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog 
        open={detailsDialogOpen} 
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Order Details: {selectedOrder.id}</Typography>
                <Chip 
                  label={selectedOrder.status.toUpperCase()}
                  color={getStatusColor(selectedOrder.status)}
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={3}>
                {/* Customer Information */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Customer Information
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body1">{selectedOrder.customer}</Typography>
                    <Typography variant="body2">{selectedOrder.email}</Typography>
                    <Typography variant="body2">{selectedOrder.phone}</Typography>
                  </Box>
                </Box>
                
                <Divider />
                
                {/* Order Items */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Order Items
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Unit Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">${item.price}</TableCell>
                            <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                            Total Amount:
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                            ${selectedOrder.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                
                <Divider />
                
                {/* Order Actions */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Update Order Status
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    {selectedOrder.status === 'pending' && (
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'processing')}
                      >
                        Process Order
                      </Button>
                    )}
                    
                    {selectedOrder.status === 'processing' && (
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'shipped')}
                      >
                        Mark as Shipped
                      </Button>
                    )}
                    
                    {selectedOrder.status === 'shipped' && (
                      <Button 
                        variant="contained" 
                        color="success"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'delivered')}
                      >
                        Mark as Delivered
                      </Button>
                    )}
                    
                    {(selectedOrder.status === 'pending' || selectedOrder.status === 'processing') && (
                      <Button 
                        variant="outlined" 
                        color="error"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </Box>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Status messages */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={(event, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All Requests" />
          <Tab label="Pending" />
          <Tab label="Responded" />
          <Tab label="Expired" />
        </Tabs>
      </Paper>
      
      {/* Loading Indicator */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {/* Quotation Requests List */}
      {!isLoading && (
        filteredQuotations.length > 0 ? (
          <Stack spacing={2}>
            {filteredQuotations.map((quotation) => (
              <Paper 
                key={quotation.id} 
                elevation={1}
                sx={{ 
                  p: 3, 
                  borderRadius: 1,
                  borderLeft: '5px solid',
                  borderColor: theme => 
                    quotation.status === 'pending' ? theme.palette.warning.main :
                    quotation.status === 'responded' ? theme.palette.success.main :
                    theme.palette.error.main,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" fontWeight="medium" color="primary.main">
                        {quotation.id}
                      </Typography>
                      <Chip 
                        label={quotation.status.toUpperCase()}
                        size="small"
                        color={getStatusColor(quotation.status)}
                        sx={{ ml: 2 }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <BusinessIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {quotation.clientOrganization}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <CalendarTodayIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Requested: {quotation.dateRequested} | Expires: {quotation.expiryDate}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                    {quotation.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ReplyIcon />}
                        onClick={() => handleOpenQuoteDialog(quotation)}
                      >
                        Send Quotation
                      </Button>
                    )}
                    
                    {quotation.status === 'responded' && (
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        disabled
                      >
                        Quotation Sent
                      </Button>
                    )}
                    
                    {quotation.status === 'expired' && (
                      <Button
                        variant="outlined"
                        color="error"
                        disabled
                      >
                        Expired
                      </Button>
                    )}
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Message from Client
                  </Typography>
                  <Typography variant="body2">
                    {quotation.message}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Requested Items
                  </Typography>
                  
                  <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                          <TableCell width="15%">Item ID</TableCell>
                          <TableCell width="30%">Item Name</TableCell>
                          <TableCell width="15%">Quantity</TableCell>
                          <TableCell width="40%">Specifications</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {quotation.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.specifications || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="text"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete Request
                  </Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <WarningAmberIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No quotation requests found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchQuery ? 'Try a different search term' : 'New requests will appear here'}
            </Typography>
          </Box>
        )
      )}
      
      {/* Quotation Response Dialog */}
      <Dialog 
        open={isQuoteDialogOpen} 
        onClose={handleCloseQuoteDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Send Quotation Response
        </DialogTitle>
        
        <DialogContent dividers>
          {selectedQuotation && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Quotation Request Details
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ minWidth: 200 }}>
                    <Typography variant="body2" color="text.secondary">
                      Request ID
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedQuotation.id}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ minWidth: 200 }}>
                    <Typography variant="body2" color="text.secondary">
                      Client
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedQuotation.clientName}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ minWidth: 200 }}>
                    <Typography variant="body2" color="text.secondary">
                      Organization
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedQuotation.clientOrganization}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Items Requested
                </Typography>
                
                <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell>Item Name</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell>Specifications</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedQuotation.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="center">{item.quantity}</TableCell>
                          <TableCell>{item.specifications || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Your Quotation
                </Typography>
                
                <TextField
                  label="Total Amount (PKR)"
                  fullWidth
                  variant="outlined"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  label="Message to Client"
                  fullWidth
                  variant="outlined"
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Provide details about your quotation, delivery timeline, etc."
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseQuoteDialog}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSubmitQuotation}
          >
            Submit Quotation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VendorOrders; 