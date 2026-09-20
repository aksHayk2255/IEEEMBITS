import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// If you deploy to GitHub Pages under a repo subpath, set:
// base: '/ieee-cs-mbits-webnova/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
});
