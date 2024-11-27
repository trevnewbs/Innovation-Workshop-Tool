import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Innovation-Workshop-Tool/', // Add this line - should match your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
