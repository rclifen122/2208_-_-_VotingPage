import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/2208_-_-_VotingPage/',
  build: {
    outDir: 'dist',
  },
})
