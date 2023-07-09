import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite"

import { MagicDomVitePlugin, MagicDomLiteVitePlugin }  from "magic-dom/vite-plugin"

export default defineConfig({
    plugins:[
        MagicDomVitePlugin(),
    ],
    // base: '/super-canvas-example/', 
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    }
})