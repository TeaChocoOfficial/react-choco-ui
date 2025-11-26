//-Path: "react-choco-ui/view/vite.config.ts"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { getAliasFromTsConfig } from './vite.alias';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: getAliasFromTsConfig(),
    },
});
