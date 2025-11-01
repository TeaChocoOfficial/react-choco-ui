//-Path: "react-choco-style/rollup.config.mjs"
import postcss from 'rollup-plugin-postcss'; 
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        {   
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
        postcss({
            extract: 'style.css',  // extract เป็นไฟล์ dist/index.css (ถ้าไม่ extract จะ inject เข้า JS)
            minimize: true,  // minify CSS เพื่อไฟล์เล็ก
            use: ['sass'],  // ถ้าใช้ SCSS เพิ่มตรงนี้ ถ้า CSS ธรรมดา ลบได้
        }),  // เพิ่ม plugin นี้
    ],
};
