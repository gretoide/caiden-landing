import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3001,
    strictPort: true, // Opcional: si el 3001 está ocupado, dará error en vez de subir al 3002
  },
  resolve: {
    alias: {
      'react-map-gl': 'react-map-gl/dist/esm/index.js'
    }
  },
  optimizeDeps: {
    include: ['react-map-gl', 'mapbox-gl']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vite/Rollup runtime helpers are imported by the entry. Pin them to `vendor`, otherwise
          // Rollup may place them inside a heavy lazy chunk (it once landed in `mapbox`, which made
          // the whole Mapbox library a modulepreload of index.html).
          if (id.includes('vite/preload-helper') || id.includes('commonjsHelpers')) {
            return 'vendor';
          }
          if (id.includes('node_modules')) {
            // Only reachable from the lazy InteractiveMap module, so it loads when the map opens.
            if (/[\\/]node_modules[\\/](mapbox-gl|react-map-gl|@mapbox|@vis\.gl)[\\/]/.test(id)) {
              return 'mapbox';
            }
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
              return 'motion';
            }
            if (id.includes('gsap')) {
              return 'gsap';
            }
            if (id.includes('lucide')) {
              return 'icons';
            }
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
              return 'vendor';
            }
            return 'libs';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1500
  }
})