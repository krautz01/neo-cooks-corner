import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': '/src/api',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@interfaces': '/src/interfaces',
      '@pages': '/src/pages',
      '@redux': '/src/redux',
      '@scss': '/src/scss',
      '@ui': '/src/ui',
      '@utils': '/src/utils',
    },
  },
});
