import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  images: {
    domains: ['lh3.googleusercontent.com', "github.com"],
}
})
