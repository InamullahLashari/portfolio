import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deploying on Vercel: Vercel serves the site from the domain root, so
// base stays '/'. (If you ever move back to GitHub Pages on a repo
// subpath, that's when this needs to become '/your-repo-name/'.)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
