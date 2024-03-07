import { App } from 'vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
// import WujieVue from 'wujie-vue3';
//
import microApp from '@micro-zoe/micro-app';
import { createPinia } from 'pinia';
// pinia持久化存储
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// 这个函数用于为vue实例添加功能的

export const appConfig = (app: App<Element>) => {
	app.component('SvgIcon', SvgIcon); // 全局注册SvgIcon
	const pinia = createPinia()
	pinia.use(piniaPluginPersistedstate)
	app.use(pinia)
	microApp.start(); // 初始化micro-app
	// app.use(WujieVue);

	// const { setupApp, preloadApp, bus } = WujieVue;
	// setupApp({
	// 	name: '百度',
	// 	url: 'http://127.0.0.1:8000/test.html',
	// 	exec: true,
	// 	alive: true,
	// 	...lifecycles,
	// });
	
};
