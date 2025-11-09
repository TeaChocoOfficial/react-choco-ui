import tsconfig from './tsconfig.app.json';
import { type AliasOptions } from 'vite';

export function getAliasFromTsConfig(): AliasOptions {
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

    return alias;
}
