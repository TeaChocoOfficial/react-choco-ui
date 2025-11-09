//-Path: "react-choco-ui/view/.storybook/main.ts"
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {},
    async viteFinal(config) {
        return mergeConfig(config, {
            plugins: [tsconfigPaths()],
        });
    },
};
export default config;
