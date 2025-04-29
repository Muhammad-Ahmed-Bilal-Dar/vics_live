import React from 'react';
import { Box, Typography } from '@mui/material';

const Checklist: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Step 6: Checklist
      </Typography>
      <Typography>
        Form fields for Checklist will go here.
      </Typography>
      {/* Add form fields later */}
    </Box>
  );
};

export default Checklist; 