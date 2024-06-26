import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path'; // npm install @types/node -D 下载这个东西防止报错
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import * as path from 'node:path'; // svg导入插件

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// vue
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => /^micro-app/.test(tag),
				},
			},
		}),
		//tsx
		vueJsx(),
		// 用于使用svg图标
		svgLoader(),
		// 代码校验
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		// svg引入插件
		createSvgIconsPlugin({
			// 指定图标文件夹，绝对路径（NODE代码）
			iconDirs: [resolve(process.cwd(), 'src/assets/svgs')],
			symbolId: 'icon-[name]', // symbol的id
			inject: 'body-last', // 插入位置
			customDomId: '__svg__icons__dom__', // svg的id
		}),
		// 自动引入设置
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],

	css: {
		// 全局引入样式
		preprocessorOptions: {
			additionalData: '@import "@/assets/scss/globalVar.scss";@import "@/assets/scss/globalMixin.scss";',
		},
	},
	resolve: {
		// 路径映射
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, 'src'), // 路径别名
			},
			{
				find: 'assets',
				replacement: resolve(__dirname, 'src/assets'),
			},
			{
				find: 'vue',
				replacement: 'vue/dist/vue.esm-bundler.js', // compile template
			},
		],
		extensions: ['.ts', '.js', '.cjs', '.tsx'],
	},
	define: {
		'process.env': {}, // 定义应用程序可以访问的全局常量
	},
	server: {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		port: 5173,
		proxy: {},
	},
});
