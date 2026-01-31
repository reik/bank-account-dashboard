import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    base: '/bank-account-dashboard/',
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Creates a 'vendor' chunk for React and ReactDOM
                    vendor: ['react', 'react-dom'],
                    // Creates a 'ui' chunk for Material UI components
                    ui: ['@mui/material', '@mui/icons-material'],
                },
            },
        },
    },
});
