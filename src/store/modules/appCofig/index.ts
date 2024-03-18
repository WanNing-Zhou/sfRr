import { defineStore } from 'pinia';

// 用于保存组件信息
//:TODO 需要进行持久化存储
const useConfigStore = defineStore('appConfig', {
	state() {
		return {
			Background: {
				// TODO: 视频类型, 后期可能会加上视频背景
				type: '',
				// 视频地址
				url: '',
			},
		};
	},
	actions: {
		setBackgroundData(value: any) {
			this.Background = value
		}
	},
	getters: {},
	persist: true,
});

export default useConfigStore;