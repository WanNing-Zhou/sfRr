import { defineStore } from 'pinia';

type CompEditStoreData = {
	isEdit: boolean; //是否为编辑状态
	compData: any; // 组件数据
};

// 用于保存组件信息
//:TODO 需要进行持久化存储
const useCompEditStore = defineStore('compEdit', {
	state(): CompEditStoreData {
		return {
			isEdit: false,
			compData: {},
		};
	},
	actions: {
		compEditHandle(compData: any) {
			this.compData = compData;
			this.isEdit = true;
		},
		editCancelHandle() {
			this.isEdit = false;
		},
	},
	getters: {},
});

export default useCompEditStore;
