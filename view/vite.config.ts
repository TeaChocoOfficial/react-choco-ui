import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { getAliasFromTsConfig } from './vite.alias';
import { viteConfigPlugins } from './src/lib/config/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteConfigPlugins()],
    resolve: {
        alias: getAliasFromTsConfig(),
    },
});
