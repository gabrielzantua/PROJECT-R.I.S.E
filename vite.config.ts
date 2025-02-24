import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PROJECT-R.I.S.E",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
