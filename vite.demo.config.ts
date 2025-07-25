// vite.demo.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'demo'),
  base: '/alla-cart/', // gh pages repo
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'demo-dist'),
    emptyOutDir: true,
  }
});