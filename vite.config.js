import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { resolve } from 'path'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@': resolve(__dirname, 'src'),
      // '@components': resolve(__dirname, 'src/components'),
      // '@pages': resolve(__dirname, 'src/pages'),
      // '@store': resolve(__dirname, 'src/store'),
      // '@services': resolve(__dirname, 'src/services'),
      // '@hooks': resolve(__dirname, 'src/hooks'),
      // '@utils': resolve(__dirname, 'src/utils'),
      // '@styles': resolve(__dirname, 'src/styles')
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router-dom']
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.js']
  }
})