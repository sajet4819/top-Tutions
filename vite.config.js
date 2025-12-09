import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  // REMOVED THE "server" BLOCK because it does not work in production on Vercel.
  // If you need headers, they must go in vercel.json.
  
  // FIXED BASE PATH: Vercel always needs '/'
  base: '/' 
})