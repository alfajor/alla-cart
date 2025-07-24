import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), dts()],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'AllaCart',
        fileName: (format) => `alla-cart.${format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    // serve the demo on vite dev
    ...(command === 'serve' && {
      root: path.resolve(__dirname, 'demo'),
    }),
  };
});
