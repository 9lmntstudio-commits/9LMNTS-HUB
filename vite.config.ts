import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Targets 'esnext' for modern JavaScript features (ideal for Trinity V2)
    target: 'esnext',
    // The critical fix: ensuring build output goes to 'dist' for Netlify compatibility
    outDir: 'dist',
    // Improves build performance and source mapping
    sourcemap: true,
    // Ensures assets are handled correctly in the glass-morphism UI
    assetsDir: 'assets',
    // Optimizes the bundle size
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
  },
  // If you are using environment variables for Stripe/Netlify Functions
  define: {
    'process.env': {}
  }
});
