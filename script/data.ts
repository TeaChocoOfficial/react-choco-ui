//-Path: "react-choco-ui/script/data.ts"

export type SourceDir = {
    lib: string;
    name: string;
    libs?: string[];
};

// กำหนด path ต้นทางและปลายทาง

export const devlog = false;

export const sourceDirs: SourceDir[] = [
    // {
    //     lib: 'ui',
    //     name: 'react-choco-ui',
    // },
    {
        lib: 'base',
        libs: ['ui', 'dev', 'custom'],
        name: 'react-choco-base',
    },
    {
        lib: 'custom',
        libs: ['ui', 'dev'],
        name: 'react-choco-custom',
    },
    {
        lib: 'dev',
        libs: ['ui'],
        name: 'react-choco-dev',
    },
];
