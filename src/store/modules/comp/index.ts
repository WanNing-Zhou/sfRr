import { defineStore } from 'pinia';

// 用于保存组件信息
//:TODO 需要进行持久化存储
const pageVisibleStore = defineStore('visible', {
	state() {
		return {
			Background: {
				// TODO: 视频类型, 后期可能会加上视频背景
				typeL: '',
				// 视频地址
				url: '',
			},
		};
	},
});
