import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

const BASE = '/Anti_Youtube_Premium/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    VitePWA({
      base: BASE, // place le SW sous /REPO_NAME/sw.js
      manifest: {
        name: 'Ma PWA Vue',
        short_name: 'PWA Vue',
        start_url: `${BASE}?src=a2hs`,   // PWA démarre au bon chemin
        scope: BASE,                      // scope limité au repo
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      registerType: 'autoUpdate',
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'] },
      devOptions: { enabled: false }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
