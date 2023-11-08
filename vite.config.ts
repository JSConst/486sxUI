import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        VitePWA({
            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
            },
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            manifest: {
                background_color: "#ffffff",
                description:
                    "Online emulation of a computer system based on Intel 80487SX",
                dir: "ltr",
                display: "standalone",
                name: "486SX online emulator",
                orientation: "any",
                scope: "/486sxUI/",
                short_name: "486.sx",
                start_url: "/486sxUI/?pwa",
                theme_color: "#ffffff",
                categories: ["entertainment", "games", "utilities"],
                icons: [
                    {
                        src: "/486sxUI/assets/192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/486sxUI/assets/512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
