//-Path: "react-choco-style/rollup.config.mjs"
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const plugins = [
    json(),
    resolve(),
    commonjs(),
    peerDepsExternal(),
    typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
    postcss({
        minimize: true,
        extract: 'style.css',
    }),
    copy({
        targets: [
            {
                src: ['src/**/*.json', 'src/**/*.scss'],
                dest: 'dist',
                flatten: true,
                rename: (_name, extension, fullPath) =>
                    fullPath.replace('src/', '') +
                    (extension ? '.' + extension : ''),
            },
        ],
    }),
];

export default [{ input: 'index', output: 'index' }].map((config) => ({
    plugins,
    input: `src/${config.input}.ts`,
    output: [
        {
            file: `dist/${config.output}.js`,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: `dist/${config.output}.esm.js`,
            format: 'esm',
            sourcemap: true,
        },
    ],
}));
