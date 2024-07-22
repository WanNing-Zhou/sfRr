import NProgress from 'nprogress'; //导入
import 'nprogress/nprogress.css';
import {createRouter, createWebHistory} from 'vue-router'; // 页面头部进度条

//全局进度条的配置
NProgress.configure({
	easing: 'ease', // 动画方式
	speed: 1000, // 递增进度条的速度
	showSpinner: false, // 是否显示加载ico
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3, // 更改启动时使用的最小百分比
	parent: 'body', //指定进度条的父容器
});

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomePage/HomePage.vue'),
			// component: ,
			// children: [],
		},
		// {
		// 	path: '/login',
		// 	name: 'login',
		// 	component: () => import('@/views/login/login.vue'), // 这里引入组件
		// },
		{
			path: '/test',
			name: 'test',
			component: () => import('@/views/test/TestPage.vue')
		},
		{
			// 开发者调试工具
			path: '/dev-tool',
			name: 'dev-tool',
			component: () => import('@/views/dev-tool/dev-tool.vue'),
		},
		// ...appRoutes,
		/*    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,*/
	],
	scrollBehavior() {
		const ms = document.querySelector('#mainScrollbar');
		if (ms) {
			ms.scrollTop = 0;
		}
		return { left: 0, top: 0 };
		// return { top: 0 };
	},
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});
