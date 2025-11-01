//-Path: "react-choco-ui/view/vite.config.ts"
import tsconfig from './tsconfig.app.json';
import react from '@vitejs/plugin-react-swc';
import { viteConfigPlugins } from './lib/config/vite';
import { defineConfig, type AliasOptions } from 'vite';

const paths = tsconfig.compilerOptions?.paths ?? {};
const alias: AliasOptions = {};
const keyPaths = Object.keys(paths) as string[];
keyPaths.forEach((keys) => {
    const path = paths[keys as keyof typeof paths] as string[];
    let key = keys.replace(/(\/\*|\*\/)/g, '');
    if (key === '') {
        key = '/';
    }
    if (Array.isArray(path)) {
        alias[key] = path
            .map((item) =>
                item.replace(/^\.\//, '/').replace(/(\/\*|\*\/)/g, ''),
            )
            .toString() as string;
    } else if (typeof path === 'string') {
        alias[key] = (path as string)
            .replace(/^\.\//, '')
            .replace(/(\/\*|\*\/)/g, '');
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteConfigPlugins()
    ],
    resolve: { alias },
});
