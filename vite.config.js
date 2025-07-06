import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: "./client",
  build: {
    rollupOptions: {
      input: {
        app: "./client/index.html"
      }
    }
  },
  server: {
    open: "./client/index.html"
  },
  plugins: [react()],
})
