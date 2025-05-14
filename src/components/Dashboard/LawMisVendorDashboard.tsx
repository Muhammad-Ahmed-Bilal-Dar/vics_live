import React, { useState } from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    Button, 
    IconButton, 
    useTheme, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Container,
    Chip,
    Card,
    CardContent,
    Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LawMisLogo from '../../assets/LAW-MIS-logo.svg';
import LAW_MISUserProfile from '../Profile/LAW-MISUserProfile';
import LAW_MISChangePassword from '../Profile/LAW-MISChangePassword';
import BecomeVendorForm from '../Vendor/BecomeVendorForm';
import VendorProducts from '../Vendor/VendorProducts';
import VendorOrders from '../Vendor/VendorOrders';

// Import shared dashboard components
import { DashboardContainer } from '../Shared';
import { generateVendorSidebarItems, lawMisFooterLogos } from '../Shared/sidebarConfigs';

// Mock these components temporarily until we create them
const mockComponent = ({ onNavigateBack }: { onNavigateBack: () => void }) => (
  <Box>
    <Button onClick={onNavigateBack}>Go Back</Button>
    <Typography>Component Not Implemented Yet</Typography>
  </Box>
);

// --- Card Styles --- 
const cardStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: 2,
  borderRadius: 2,
  color: (theme: any) => theme.palette.primary.contrastText, 
  height: '100%', 
};

// --- Component Props --- Define types for props
type CurrentVendorView = 'DASHBOARD' | 'PROFILE' | 'CHANGE_PASSWORD' | 'BECOME_VENDOR' | 'MANAGE_PRODUCTS' | 'VIEW_ORDERS';

interface LawMisVendorDashboardProps {
    onLogout: () => void; 
    currentView: CurrentVendorView; 
    onNavigateBack: () => void; 
    onNavigateToChangePassword: () => void; 
    onNavigateToUserProfile: () => void;
    onNavigateToBecomeVendor: () => void;
    onNavigateToManageProducts: () => void;
    onNavigateToViewOrders: () => void;
}

// Product interface
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive';
}

// Order interface
interface Order {
    id: string;
    customer: string;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
    amount: number;
    items: number;
}

// --- Dashboard Component --- 
const LawMisVendorDashboard: React.FC<LawMisVendorDashboardProps> = ({ 
    onLogout, 
    currentView, 
    onNavigateBack, 
    onNavigateToChangePassword, 
    onNavigateToUserProfile,
    onNavigateToBecomeVendor,
    onNavigateToManageProducts,
    onNavigateToViewOrders
}) => { 
  console.log(`LawMisVendorDashboard rendering view: ${currentView}`); 
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false); 
  
  // Handlers
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLogoutClick = () => {
    setConfirmLogoutOpen(true);
  };
  
  const handleCloseConfirmDialog = () => {
    setConfirmLogoutOpen(false);
  };
  
  const handleConfirmLogout = () => {
    console.log("Logout confirmed");
    onLogout(); 
    handleCloseConfirmDialog();
  };

  // Placeholder data for dashboard - updated for Pakistan
  const summaryData = [
    { title: 'TOTAL PRODUCTS', count: 12, icon: <InventoryIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.warning.main }, 
    { title: 'PENDING ORDERS', count: 5, icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.info.main }, 
    { title: 'DELIVERED', count: 18, icon: <LocalShippingIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.success.main },
    { title: 'REVENUE', count: 'Rs. 578,450', icon: <ReceiptIcon sx={{ fontSize: 40 }} />, bgColor: theme.palette.primary.main }, 
  ];

  // Sample products data - updated for Pakistan
  const products: Product[] = [
    {
        id: 'P001',
        name: 'Vehicle Emission Analyzer',
        category: 'Testing Equipment',
        price: 85000,
        stock: 5,
        status: 'active'
    },
    {
        id: 'P002',
        name: 'Petrol Quality Test Kit',
        category: 'Testing Equipment',
        price: 32000,
        stock: 8,
        status: 'active'
    },
    {
        id: 'P003',
        name: 'Digital Smoke Meter',
        category: 'Analyzer',
        price: 67500,
        stock: 3,
        status: 'active'
    },
    {
        id: 'P004',
        name: 'CNG Cylinder Inspection Tools',
        category: 'Inspection Kit',
        price: 45000,
        stock: 6,
        status: 'active'
    }
  ];

  // Sample orders data - updated for Pakistan
  const orders: Order[] = [
    {
        id: 'ORD-001',
        customer: 'Punjab Transport Department',
        date: '2024-05-15',
        status: 'pending',
        amount: 152500,
        items: 2
    },
    {
        id: 'ORD-002',
        customer: 'Karachi Motor Vehicle Testing',
        date: '2024-05-12',
        status: 'completed',
        amount: 198000,
        items: 3
    },
    {
        id: 'ORD-003',
        customer: 'Islamabad Traffic Police',
        date: '2024-05-10',
        status: 'completed',
        amount: 85000,
        items: 1
    }
  ];

  // Generate sidebar items for Vendor Dashboard
  const sidebarItems = generateVendorSidebarItems(
    currentView,
    onNavigateBack,
    (view) => {
      if (view === 'PROFILE') {
        onNavigateToUserProfile();
      } else if (view === 'CHANGE_PASSWORD') {
        onNavigateToChangePassword();
      } else if (view === 'BECOME_VENDOR') {
        onNavigateToBecomeVendor();
      } else if (view === 'MANAGE_PRODUCTS') {
        onNavigateToManageProducts();
      } else if (view === 'VIEW_ORDERS') {
        onNavigateToViewOrders();
      }
    }
  );

  // --- Dashboard-specific content --- 
  const renderDashboardContent = () => (
    <>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          VENDOR DASHBOARD
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<AssignmentIcon />}
            sx={{ fontWeight: 'bold', borderRadius: 2 }}
            onClick={onNavigateToBecomeVendor}
          >
            Complete Vendor Profile
          </Button>
          <Button
            variant="contained"
            color="warning" 
            startIcon={<AddIcon />}
            onClick={onNavigateToManageProducts}
            sx={{ fontWeight: 'bold', borderRadius: 2 }}
          >
            Add New Product
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', mt: 1, py: 1 }}>
        {summaryData.map((item, index) => (
          <Box key={index} sx={{ minWidth: 200, flex: 1 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                ...cardStyles, 
                backgroundColor: item.bgColor
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ color: 'inherit', fontWeight: 'bold' }}>{item.title}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{item.count}</Typography>
              </Box>
              <IconButton sx={{ color: 'inherit', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%' }}>
                {React.cloneElement(item.icon, { sx: { fontSize: 32 } })}
              </IconButton>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Recent Products and Orders */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 3 }}>
        {/* Recent Products */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Products</Typography>
            <Button 
              variant="text" 
              color="warning" 
              onClick={onNavigateToManageProducts}
              sx={{ fontWeight: 'medium' }}
            >
              View All
            </Button>
          </Box>
          
          <Stack spacing={2}>
            {products.map(product => (
              <Card key={product.id} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{product.category}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Rs. {product.price.toLocaleString()}</Typography>
                      <Chip 
                        label={`${product.stock} in stock`}
                        size="small"
                        color={product.stock > 5 ? "success" : "warning"}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* Recent Orders */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Orders</Typography>
            <Button 
              variant="text" 
              color="warning" 
              onClick={onNavigateToViewOrders}
              sx={{ fontWeight: 'medium' }}
            >
              View All
            </Button>
          </Box>
          
          <Stack spacing={2}>
            {orders.map(order => (
              <Card key={order.id} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{order.id}</Typography>
                      <Typography variant="body2" color="text.secondary">{order.customer}</Typography>
                      <Typography variant="body2" color="text.secondary">{order.date}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Rs. {order.amount.toLocaleString()}</Typography>
                      <Chip 
                        label={order.status.toUpperCase()}
                        size="small"
                        color={
                          order.status === 'completed' ? "success" : 
                          order.status === 'pending' ? "warning" : 
                          "error"
                        }
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>
      </Box>
    </>
  );

  // Determine which content to render based on currentView
  const renderContent = () => {
    switch(currentView) {
      case 'DASHBOARD':
        return renderDashboardContent();
      case 'PROFILE':
        return <LAW_MISUserProfile onGoBack={onNavigateBack} />;
      case 'CHANGE_PASSWORD':
        return <LAW_MISChangePassword onGoBack={onNavigateBack} />;
      case 'BECOME_VENDOR':
        return <BecomeVendorForm onNavigateBack={onNavigateBack} />;
      case 'MANAGE_PRODUCTS':
        return <VendorProducts onNavigateBack={onNavigateBack} />;
      case 'VIEW_ORDERS':
        return <VendorOrders onNavigateBack={onNavigateBack} />;
      default:
        return <Typography>Unknown view</Typography>;
    }
  };

  return (
    <DashboardContainer
      sidebarOpen={drawerOpen}
      onSidebarToggle={handleDrawerToggle}
      sidebarItems={sidebarItems}
      sidebarFooterLogos={lawMisFooterLogos}
      logoSrc={LawMisLogo}
      logoAlt="LAW-MIS Logo"
      userInfo={{
        name: "Vendor Account",
        email: "vendor@example.com",
        role: "Equipment Vendor"
      }}
      onLogout={handleLogoutClick}
      onNavigateToProfile={onNavigateToUserProfile}
      onNavigateToChangePassword={onNavigateToChangePassword}
    >
      <Container maxWidth="xl" sx={{ p: 0 }}>
        {renderContent()}
      </Container>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={confirmLogoutOpen}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default LawMisVendorDashboard; 