//-Path: "react-choco-ui/lib/src/config/vite.ts"
import tailwindcss, {
    PluginOptions as TailwindPluginOptions,
} from '@tailwindcss/vite';
import type { PluginOption } from 'vite';

export type PluginOptions = TailwindPluginOptions;

export const viteConfigPlugins = (opts?: PluginOptions): PluginOption => {
    return [...tailwindcss(opts)];
};
