import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import million from 'million/compiler'

export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.endsWith('countries.ts')) return 'data'
          if (id.includes('country-flags-svg')) return 'data'
          if (id.endsWith('.json')) return 'data'
          if (id.includes('chart.js')) return 'charts'
          if (id.includes('react-chartjs-2')) return 'charts'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
