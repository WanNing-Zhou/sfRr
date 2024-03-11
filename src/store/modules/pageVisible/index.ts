import { defineStore } from 'pinia';
import wqHas from '@/utils/wqHas';

// 用于控制页面上组建显示
const pageVisibleStore = defineStore('visible', {
	state() {
		return {
			SideDrawer: {
				page: 'config',
				visible: false,
			},
		};
	},
	actions: {
		/**
		 * @description 用于关闭侧边栏
		 */
		closeSideDrawer() {
			this.SideDrawer.visible = false;
		},
		/**
		 * @description 用于打开侧边栏
		 * @param utilId
		 */
		openSideDrawer(utilId: string) {
			this.SideDrawer.page = wqHas.haseUtilId(utilId) ? utilId : '';
			this.SideDrawer.visible = true;
		},
	},
});
