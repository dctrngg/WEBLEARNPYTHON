import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'pyodideWorker.js'],
      manifest: {
        name: 'Chroma Python Web IDE',
        short_name: 'ChromaPy',
        description: 'Trình biên dịch & Học lập trình Python 3.12 WebAssembly cho học sinh THPT',
        theme_color: '#0f172a',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,
        runtimeCaching: [
          {
            // Cache Pyodide CDN assets (v0.26.4 full) for 1 year with Cache-Control: max-age=31536000, immutable
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/pyodide\/v0\.26\.4\/full\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pyodide-v0.26.4-wasm-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 31536000, // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'vendor-monaco': ['@monaco-editor/react'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});


