import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';
import Markdown from 'vite-plugin-md';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown(),
        dts({
            include: ['src/**/*.ts', 'src/**/*.vue'],
            outDir: 'dist',
            staticImport: true,
            insertTypesEntry: true,
            rollupTypes: true
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ZxuiCn',
            fileName: (format) => `zxui-cn.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'style.css';
                    }
                    return assetInfo.name ?? '[name][extname]';
                }
            }
        },
        cssCodeSplit: false,
        // 确保生成 sourcemap
        sourcemap: true,
        // 确保生成类型文件
        emptyOutDir: true
    },
    server: {
        fs: {
            strict: true
        }
    }
});
