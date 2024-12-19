import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    envDir: "./",
    envPrefix: "PAYPAL",
    root: "./",
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false
            },
        },
    },
})