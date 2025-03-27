import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true, // Para depuración en desarrollo
  },
  plugins: [react()],
  
})
