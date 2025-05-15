import React, { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Loading component to show while chunks are loading
const LoadingComponent = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

// Helper function to lazy load components
export const lazyLoadComponent = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={<LoadingComponent />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Export default loading component for reuse
export default LoadingComponent; 