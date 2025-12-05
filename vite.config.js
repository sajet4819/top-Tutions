import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()   , tailwindcss(),
  ],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",  // ← ADD THIS LINE
      "Cross-Origin-Embedder-Policy": "unsafe-none"             // ← AND THIS (optional)
    }
  },
     base: process.env.NODE_ENV === 'production' ? '/top-Tutions/' : '/'  // Replace with your repo name

})
