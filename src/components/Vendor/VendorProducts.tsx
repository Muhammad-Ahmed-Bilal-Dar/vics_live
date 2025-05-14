import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Divider,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  Tabs,
  Tab,
  useTheme,
  Tooltip,
  CircularProgress,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  VerifiedUser as VerifiedUserIcon,
  WarningAmber as WarningAmberIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// Define interfaces for product types
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'pending_inspection' | 'inspection_approved';
  images: string[];
  inspected: boolean;
  featured: boolean;
  dateAdded: string;
}

interface CategoryType {
  id: string;
  name: string;
}

interface VendorProductsProps {
  onNavigateBack: () => void;
}

const VendorProducts: React.FC<VendorProductsProps> = ({ onNavigateBack }) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Make sure the image path is correct - using absolute path
  const defaultProductImage = '/images/th.png';
  
  // States
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'P001',
      name: 'Vehicle Emission Analyzer',
      category: 'Testing Equipment',
      description: 'Advanced emission analyzer compliant with Pakistan Environmental Protection Agency standards',
      price: 85000,
      stock: 5,
      status: 'active',
      images: [defaultProductImage],
      inspected: true,
      featured: true,
      dateAdded: '2024-05-10'
    },
    {
      id: 'P002',
      name: 'Petrol Quality Test Kit',
      category: 'Testing Equipment',
      description: 'Portable testing kit for analyzing fuel quality according to PSQCA standards',
      price: 32000,
      stock: 8,
      status: 'active',
      images: [defaultProductImage],
      inspected: true,
      featured: false,
      dateAdded: '2024-05-12'
    },
    {
      id: 'P003',
      name: 'Digital Smoke Meter',
      category: 'Testing Equipment',
      description: 'Digital meter for measuring smoke density in diesel vehicles as per Punjab Vehicle Inspection standards',
      price: 67500,
      stock: 3,
      status: 'pending_inspection',
      images: [defaultProductImage],
      inspected: false,
      featured: false,
      dateAdded: '2024-05-15'
    },
    {
      id: 'P004',
      name: 'CNG Cylinder Inspection Tools',
      category: 'Inspection Kit',
      description: 'Complete toolkit for CNG cylinder inspection as required by OGRA regulations',
      price: 45000,
      stock: 6,
      status: 'active',
      images: [defaultProductImage],
      inspected: true,
      featured: false,
      dateAdded: '2024-05-08'
    },
    // Adding two dummy products with "inspection_approved" status
    {
      id: 'P005',
      name: 'Diesel Particulate Filter Scanner',
      category: 'Testing Equipment',
      description: 'Advanced scanner for testing diesel particulate filters in compliance with Pakistan emission standards',
      price: 78500,
      stock: 4,
      status: 'inspection_approved',
      images: [defaultProductImage],
      inspected: true,
      featured: false,
      dateAdded: '2024-05-16'
    },
    {
      id: 'P006',
      name: 'Vehicle Safety Inspection System',
      category: 'Inspection Kit',
      description: 'Comprehensive system for vehicle safety inspections required by Punjab Transport Department',
      price: 125000,
      stock: 2,
      status: 'inspection_approved',
      images: [defaultProductImage],
      inspected: true,
      featured: true,
      dateAdded: '2024-05-17'
    }
  ]);
  
  const [categories] = useState<CategoryType[]>([
    { id: 'cat1', name: 'Testing Equipment' },
    { id: 'cat2', name: 'Inspection Kit' },
    { id: 'cat3', name: 'Calibration Tools' },
    { id: 'cat4', name: 'Spare Parts' },
    { id: 'cat5', name: 'Safety Equipment' }
  ]);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [isRequestInspectionOpen, setIsRequestInspectionOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // New product form state
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'dateAdded' | 'inspected' | 'featured'>>({
    name: '',
    category: '',
    description: '',
    price: 0,
    stock: 0,
    status: 'pending_inspection',
    images: []
  });
  
  // Handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  
  // Filter products based on current tab and search query
  const filteredProducts = products.filter((product) => {
    // First filter by tab
    if (currentTab === 1 && product.status !== 'active') return false;
    if (currentTab === 2 && product.status !== 'inactive') return false;
    if (currentTab === 3 && product.status !== 'pending_inspection') return false;
    if (currentTab === 4 && product.status !== 'inspection_approved') return false;
    
    // Then filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Handle opening the add product dialog
  const handleOpenAddProductDialog = () => {
    setNewProduct({
      name: '',
      category: '',
      description: '',
      price: 0,
      stock: 0,
      status: 'pending_inspection',
      images: []
    });
    setUploadedImages([]);
    setIsAddProductDialogOpen(true);
  };
  
  // Handle closing the add product dialog
  const handleCloseAddProductDialog = () => {
    setIsAddProductDialogOpen(false);
  };
  
  // Handle form input changes
  const handleProductInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name as string]: value
    }));
  };
  
  // Handle image upload click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle file change for image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsLoading(true);
    
    // For demo purposes, we'll use the default image
    // In a real application, we would upload the file to a server
    setTimeout(() => {
      // Always use the equipment control panel image for demo
      const newImages = Array.from(files).map(() => defaultProductImage);
      
      setUploadedImages((prev) => [...prev, ...newImages]);
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
      
      setIsLoading(false);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setSuccessMessage('Images uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  // Handle product submission
  const handleAddProduct = () => {
    // Simple validation
    if (!newProduct.name || !newProduct.category || !newProduct.description || newProduct.price <= 0) {
      setErrorMessage('Please fill all required fields');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    if (newProduct.images.length === 0) {
      setErrorMessage('Please upload at least one product image');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newProductId = `P${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      const productToAdd: Product = {
        ...newProduct,
        id: newProductId,
        dateAdded: new Date().toISOString().split('T')[0],
        inspected: false,
        featured: false
      };
      
      setProducts((prevProducts) => [...prevProducts, productToAdd]);
      setIsLoading(false);
      setIsAddProductDialogOpen(false);
      
      setSuccessMessage('Product added successfully! Awaiting inspection.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };
  
  // Handle opening delete confirmation dialog
  const handleOpenDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteConfirmOpen(true);
  };
  
  // Handle actual product deletion
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProducts((prevProducts) => 
        prevProducts.filter((p) => p.id !== selectedProduct.id)
      );
      
      setIsLoading(false);
      setIsDeleteConfirmOpen(false);
      setSelectedProduct(null);
      
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  // Handle opening inspection request dialog
  const handleOpenInspectionDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsRequestInspectionOpen(true);
  };
  
  // Handle submitting inspection request
  const handleRequestInspection = () => {
    if (!selectedProduct) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProducts((prevProducts) => 
        prevProducts.map((p) => 
          p.id === selectedProduct.id 
            ? { ...p, status: 'pending_inspection' as const } 
            : p
        )
      );
      
      setIsLoading(false);
      setIsRequestInspectionOpen(false);
      setSelectedProduct(null);
      
      setSuccessMessage('Inspection requested successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  // Handle toggling product status (active/inactive)
  const handleToggleStatus = (product: Product) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProducts((prevProducts) => 
        prevProducts.map((p) => 
          p.id === product.id 
            ? { 
                ...p, 
                status: p.status === 'active' ? 'inactive' as const : 'active' as const 
              } 
            : p
        )
      );
      
      setIsLoading(false);
      
      setSuccessMessage(`Product ${product.status === 'active' ? 'deactivated' : 'activated'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  // Add a new function to handle approving inspections
  const handleApproveInspection = (product: Product) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProducts((prevProducts) => 
        prevProducts.map((p) => 
          p.id === product.id 
            ? { ...p, status: 'inspection_approved' as const, inspected: true } 
            : p
        )
      );
      
      setIsLoading(false);
      
      setSuccessMessage('Inspection approved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  // Render product grid - updating to match the horizontal card design from the image
  const renderProductGrid = () => {
    if (filteredProducts.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <WarningAmberIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {searchQuery ? 'Try a different search term' : 'Add your first product to get started'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenAddProductDialog}
            sx={{ mt: 3 }}
          >
            Add New Product
          </Button>
        </Box>
      );
    }
    
    return (
      <Stack spacing={2}>
        {filteredProducts.map((product) => (
          <Paper 
            key={product.id} 
            elevation={1}
            sx={{ 
              p: 2, 
              borderRadius: 1,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3
              }
            }}
          >
            <Box sx={{ display: 'flex', width: '100%' }}>
              {/* Left side - Product image */}
              <Box sx={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                <img 
                  src={product.images[0] || defaultProductImage} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0' // Add background color to make empty image visible
                  }} 
                  onError={(e) => {
                    // If image fails to load, set a background color and display product name
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.fontSize = '14px';
                    target.style.padding = '10px';
                    target.style.textAlign = 'center';
                    target.style.backgroundColor = '#e0e0e0';
                    target.style.color = '#333';
                    target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16db95ce5b7%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16db95ce5b7%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20fill%3D%22%23f0f0f0%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2230%22%20y%3D%2265%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                  }}
                />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  bgcolor: 'rgba(0,0,0,0.6)', 
                  color: 'white',
                  px: 1,
                  borderRadius: '0 0 0 4px',
                  fontSize: '0.75rem'
                }}>
                  {product.inspected ? <CheckCircleIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />} {product.id}
                </Box>
              </Box>
              
              {/* Middle - Product info */}
              <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                      {product.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        {product.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                        •
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.status === 'active' ? 'Available' : 
                         product.status === 'pending_inspection' ? 'Pending Inspection' : 
                         product.status === 'inspection_approved' ? 'Inspection Approved' : 
                         'Not Available'}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', maxWidth: '80%' }}>
                      {product.description}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    PKR {product.price.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              
              {/* Right side - Actions */}
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {product.featured && (
                    <Chip 
                      label="Featured" 
                      size="small" 
                      color="primary"
                      sx={{ borderRadius: 1, height: 24, mr: 1 }}
                    />
                  )}
                  
                  <Chip 
                    label={`Stock: ${product.stock}`} 
                    size="small" 
                    color={product.stock > 0 ? "success" : "error"}
                    sx={{ borderRadius: 1, height: 24 }}
                  />
                </Box>
                
                {/* Removing Add to Cart and Buy Now buttons as requested */}
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                  <Tooltip title="Edit Product">
                    <IconButton 
                      size="small"
                      color="primary"
                      onClick={() => console.log('Edit', product.id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  
                  {/* Show different controls based on product status */}
                  {product.status === 'pending_inspection' && (
                    <Tooltip title="Approve Inspection">
                      <IconButton 
                        size="small"
                        color="success"
                        onClick={() => handleApproveInspection(product)}
                      >
                        <VerifiedUserIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  
                  {/* Hide activation/deactivation for pending inspection products */}
                  {product.status !== 'pending_inspection' && (
                    <Tooltip title={product.status === 'active' ? "Deactivate" : "Activate"}>
                      <IconButton 
                        size="small"
                        color={product.status === 'active' ? "error" : "success"}
                        onClick={() => handleToggleStatus(product)}
                      >
                        {product.status === 'active' ? <CancelIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  )}
                  
                  <Tooltip title="Delete Product">
                    <IconButton 
                      size="small"
                      color="error"
                      onClick={() => handleOpenDeleteDialog(product)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    );
  };
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
          <IconButton 
            onClick={onNavigateBack} 
            sx={{ mr: 1 }}
            color="inherit"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight="bold">
            Manage Products
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <TextField
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            }}
            sx={{ minWidth: 250 }}
          />
          
          <Button 
            variant="contained" 
            color="warning" 
            startIcon={<AddIcon />}
            onClick={handleOpenAddProductDialog}
          >
            Add Product
          </Button>
        </Box>
      </Box>
      
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
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All Products" />
          <Tab label="Active" />
          <Tab label="Inactive" />
          <Tab label="Pending Inspection" />
          <Tab label="Inspection Approved" />
        </Tabs>
      </Paper>
      
      {/* Loading Indicator */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {/* Product grid */}
      {!isLoading && renderProductGrid()}
      
      {/* Add Product Dialog */}
      <Dialog 
        open={isAddProductDialogOpen} 
        onClose={handleCloseAddProductDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Add New Product</Typography>
          <IconButton onClick={handleCloseAddProductDialog}>
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Left Column - Product Details */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  name="name"
                  label="Product Name *"
                  fullWidth
                  variant="outlined"
                  value={newProduct.name}
                  onChange={handleProductInputChange}
                  required
                />
                
                <FormControl fullWidth required>
                  <InputLabel>Category *</InputLabel>
                  <Select
                    name="category"
                    value={newProduct.category}
                    onChange={handleProductInputChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  name="description"
                  label="Description *"
                  fullWidth
                  variant="outlined"
                  value={newProduct.description}
                  onChange={handleProductInputChange}
                  multiline
                  rows={4}
                  required
                />
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    name="price"
                    label="Price (Rs.) *"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={newProduct.price}
                    onChange={handleProductInputChange}
                    InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                    required
                  />
                  
                  <TextField
                    name="stock"
                    label="Stock *"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={newProduct.stock}
                    onChange={handleProductInputChange}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                  />
                </Box>
                
                <Alert severity="info">
                  New products require inspection approval before they can be made active.
                </Alert>
              </Stack>
            </Grid>
            
            {/* Right Column - Image Upload */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Product Images *
              </Typography>
              
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 3,
                  mb: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={handleUploadClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                
                <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body1" gutterBottom>
                  Click to upload product images
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  JPG, PNG or GIF (max. 5 MB each)
                </Typography>
              </Box>
              
              {/* Preview uploaded images */}
              {uploadedImages.length > 0 ? (
                <Grid container spacing={1}>
                  {uploadedImages.map((image, index) => (
                    <Grid item xs={4} key={index}>
                      <Box
                        sx={{
                          width: '100%',
                          height: 100,
                          backgroundImage: `url(${image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          borderRadius: 1,
                          bgcolor: 'background.default',
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'error.light', color: 'white' },
                          }}
                          onClick={() => {
                            const newImages = [...uploadedImages];
                            newImages.splice(index, 1);
                            setUploadedImages(newImages);
                            setNewProduct(prev => ({
                              ...prev,
                              images: newImages
                            }));
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <ImageIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No images uploaded yet
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
          <Button onClick={handleCloseAddProductDialog} variant="outlined">
            Cancel
          </Button>
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="warning"
              startIcon={<VerifiedUserIcon />}
              onClick={handleAddProduct}
            >
              Request Inspection & Add
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the product "{selectedProduct?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteProduct} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Request Inspection Dialog */}
      <Dialog
        open={isRequestInspectionOpen}
        onClose={() => setIsRequestInspectionOpen(false)}
      >
        <DialogTitle>Request Product Inspection</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            You are about to request an inspection for "{selectedProduct?.name}".
          </Typography>
          <Typography>
            An inspector will visit to verify the product details and quality before it can be listed as active. Do you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRequestInspectionOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleRequestInspection} 
            color="warning" 
            variant="contained"
            startIcon={<VerifiedUserIcon />}
          >
            Request Inspection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VendorProducts; 