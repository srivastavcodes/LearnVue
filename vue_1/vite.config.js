import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vueDevTools(),
        vue(),
        tailwindcss(),
    ],
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
