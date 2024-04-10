import { App } from 'vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
// import WujieVue from 'wujie-vue3';
//
import microApp from '@micro-zoe/micro-app';
// pinia持久化存储
import store from '@/store';
// 这个函数用于为vue实例添加功能的

export const appConfig = (app: App<Element>) => {
	app.component('SvgIcon', SvgIcon); // 全局注册SvgIcon
	app.use(store)
	microApp.start({
		'disable-memory-router': true, // 全局关闭虚拟路由系统，默认值false
		destroy: true, // 全局开启destroy模式，卸载时强制删除缓存资源，默认为false
		'keep-alive': false, // 全局开启保活模式，默认为false
	}); // 初始化micro-app
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
