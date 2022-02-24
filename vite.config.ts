import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
    slidev: {
        styleImport: {
            libs: [{
                libraryName: 'ant-design-vue',
                esModule: true,
                resolveStyle: (name) => {
                    return `ant-design-vue/es/${name}/style/index`;
                },
            }],
        }
    },
    root: './',
    base: './',
});