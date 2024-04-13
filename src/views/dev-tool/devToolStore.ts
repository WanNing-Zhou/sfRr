import { defineStore } from 'pinia';
import { OptionMsg } from '@/views/dev-tool/type/dev-types';

type StoreType = {
	url: string;
	isEdit: boolean;
	configData: any;
	editConfigData: any;
	editCallBack: ((...param: any[]) => void) | any; // 编辑调用回调
	previewCallBack: ((...param: any[]) => void) | any; // 预览调用回调
	saveCallBack: ((...param: any[]) => void) | any; // 保存调用回调
	resetCallBack: ((...param: any[]) => void) | any; // 重置调用回调
	msgList: OptionMsg[]; // 消息队列
};

const useDevToolStore = defineStore('devToolStore', {
	state() {
		return {
			url: '',
			isEdit: false,
			configData: null,
			editConfigData: null,
			editCallBack: null, // 编辑调用回调
			previewCallBack: null, // 预览调用回调
			saveCallBack: null, // 保存调用回调
			resetCallBack: null, // 重置调用回调
			msgList: [],
		} as StoreType;
	},
	actions: {
		setUrl(url: string) {
			this.url = url;
		},
		setConfigData(value: any) {
			this.configData = value;
		},
		setEditConfigData(value: any) {
			this.editConfigData = value;
		},

		// 设置回调函数
		setCallbacksHandle(value: { editCallBack: any; previewCallBack: any; saveCallBack: any; resetCallBack: any }) {
			this.editCallBack = value.editCallBack;
			this.previewCallBack = value.previewCallBack;
			this.saveCallBack = value.saveCallBack;
			this.resetCallBack = value.resetCallBack;
		},
		// 编辑
		editHandle(data: any) {
			this.isEdit = true;
			this.editCallBack && this.editCallBack(data);
		},
		// preview
		previewHandle(data: any) {
			this.previewCallBack && this.previewCallBack(data);
		},
		// 保存
		saveHandle(data: any) {
			this.saveCallBack && this.saveCallBack(data);
		},
		// 重置
		resetHandle() {
			this.resetCallBack && this.resetCallBack();
		},
		// 重置编辑信息
		resetStore() {
			this.isEdit = false;
			this.editConfigData = null;
			this.configData = null;
			this.msgList = [];
			this.url = '';
		},
		msgPush(msg: OptionMsg) {
			this.msgList.push(msg);
		},
	},
	getters: {},
});

export default useDevToolStore;
