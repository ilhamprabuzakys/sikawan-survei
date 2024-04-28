import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        port: 8080,
    },
    plugins: [
        vue(),
        //mkcert(),
        // VitePWA({
        //     registerType: "autoUpdate",
        //     manifest: {
        //         name: "SIKAWAN PENGISIAN SURVEI",
        //         short_name: "MyApp",
        //         description: "SIKAWAN PENGISIAN SURVEI description",
        //         theme_color: "#ffffff",
        //         icons: [
        //             {
        //                 src: "/pwa-192x192.png",
        //                 sizes: "192x192",
        //                 type: "image/png",
        //                 purpose: "any",
        //             },
        //             {
        //                 src: "/pwa-512x512.png",
        //                 sizes: "512x512",
        //                 type: "image/png",
        //                 purpose: "any",
        //             },
        //             {
        //                 src: "/pwa-maskable-192x192.png",
        //                 sizes: "192x192",
        //                 type: "image/png",
        //                 purpose: "maskable",
        //             },
        //             {
        //                 src: "/pwa-maskable-512x512.png",
        //                 sizes: "512x512",
        //                 type: "image/png",
        //                 purpose: "maskable",
        //             },
        //         ],
        //     },
        //     devOptions: {
        //         enabled: true,
        //     },
        // }),
    ],
});
