import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ghar-25gb.onrender.com', // Replace with your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Adjust based on backend API route
      },
    },
  },
})
