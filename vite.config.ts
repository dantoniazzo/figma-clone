import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      entities: '/src/entities',
      features: '/src/features',
      widgets: '/src/widgets',
      shared: '/src/shared',
    },
  },
});
