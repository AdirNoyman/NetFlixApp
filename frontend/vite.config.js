import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Through out the application, '/api' will be replaced by the base url: 'http://localhost:3000',
      '/api': { target: 'http://localhost:3000' },
    },
  },
});
