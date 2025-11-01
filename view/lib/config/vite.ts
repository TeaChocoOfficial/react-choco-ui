//-Path: "react-choco-ui-test/src/config/vite.ts"
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";

export const viteConfigPlugins = (): PluginOption => {
    return [...tailwindcss()];
};
