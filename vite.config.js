import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled'
          ],
          'charts': ['chart.js', 'react-chartjs-2'],
        },
        // Further optimize by splitting code into smaller chunks by module
        manualChunks(id) {
          // Create separate chunks for large components
          if (id.includes('node_modules')) {
            return;
          }
          
          if (id.includes('/components/Vendor/')) {
            return 'vendor-components';
          }
          
          if (id.includes('/components/Dashboard/')) {
            return 'dashboard-components';
          }
          
          if (id.includes('/components/Profile/')) {
            return 'profile-components';
          }
          
          if (id.includes('/components/')) {
            return 'other-components';
          }
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}); 