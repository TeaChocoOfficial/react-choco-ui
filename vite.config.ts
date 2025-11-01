//-Path: "react-choco-ui-test/vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteConfigPlugins } from "./src/config/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        viteConfigPlugins(),
    ],
});
