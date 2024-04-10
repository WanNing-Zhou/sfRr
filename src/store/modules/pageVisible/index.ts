import { defineStore } from 'pinia';
import wqFind from '@/utils/wqFind';

// 用于控制页面上组建显示
const pageVisibleStore = defineStore('visible', {
	state() {
		return {
			SideDrawer: {
				page: 'config',
				visible: false,
				name: '',
				data: {} as any,
			},
			PreviewPanel: {
				// 面板可见性
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
			// this.SideDrawer.page = wqHas.haseUtilId(utilId) ? utilId : '';
			const tool = wqFind.tools.findToolById(utilId);
			// console.log('当前tool', utilId)
			if (tool) {
				this.SideDrawer.visible = true;
				// console.log(tool)
				this.SideDrawer.page = tool.id;
				this.SideDrawer.name = tool.name;
			}
		},
		setPrePanelVisible(visible: boolean) {
			this.PreviewPanel.visible = visible;
		},
		/**
		 * @description 新建抽屉
		 * @param v
		 */
		newSidDrawer(v: { page: string; name: string; }) {
			this.SideDrawer.visible = true;
			this.SideDrawer.page = v.page;
			this.SideDrawer.name = v.name;
			// this.SideDrawer.data = v.data;
		},
	},
});

export default pageVisibleStore;
