import { defineStore } from 'pinia';

type CompEditStoreData = {
	isEdit: boolean; //是否为编辑状态
	compData: any; // 组件数据设置
	previewCallBack: ((data: any) => void) | any; // 预览回调
	saveCallBack: ((data: any) => void) | any; // 保存回掉
	resetCallBack: any; // 重置回掉函数
	// configData: any; // 数据
};

// 用于保存组件信息
//:TODO 需要进行持久化存储
const useCompEditStore = defineStore('compEdit', {
	state(): CompEditStoreData {
		return {
			isEdit: false,
			compData: {},
			previewCallBack: null,
			saveCallBack: null,
			resetCallBack: null,
		};
	},
	actions: {
		compEditHandle(data: { compData: any; previewCallBack: any; saveCallBack: any; resetCallBack: any }) {
			this.compData = data.compData;
			this.previewCallBack = data.previewCallBack;
			this.resetCallBack = data.resetCallBack;
			this.saveCallBack = data.saveCallBack;
			this.isEdit = true;
		},
		editCancelHandle() {
			this.isEdit = false;
		},
		// 预览设置
		previewEdit(data: any) {
			// this.compData.config = data;
			// console.log('触发了')
			this.previewCallBack(data);
		},
		// 保存设置
		saveEdit(data: any) {
			this.saveCallBack(data);
		},
		// 重置设置
		resetEdit() {
			this.resetCallBack();
		},
	},
	getters: {},
});

export default useCompEditStore;
