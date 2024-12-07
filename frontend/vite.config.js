import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/Fima/api":"http://localhost:5000"
    }
  },
  resolve: {
    alias: {
      // Use "@" to refer to the "src" directory
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
