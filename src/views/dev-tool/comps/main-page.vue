<template>
	<el-row style="width: 100%">
		<el-col :span="18"><el-input v-model="url" placeholder="这里输入测试组件地址" @keydown.enter.stop="confirmUrlHandle"></el-input></el-col>
		<el-col :span="6"><el-button @click="confirmUrlHandle">确认</el-button></el-col>
	</el-row>
	<el-divider />
	<el-scrollbar class="main-page">
		<div>
			<micro-app
				v-if="devStore.url"
				:data="childInfo.data"
				name="dev-comp"
				:url="devStore.url"
				iframe
				router-mode="pure"
				@mounted="childMounted"
				@datachange="handleDataChange"
				@error="childError"
			></micro-app>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import useDevToolStore from '@/views/dev-tool/devToolStore';
import { MsgOption } from '@/enum/msgOption';
import { deepCloneByJson } from '@/utils/deepClone';
import { MessageError } from '@/utils/message';
import { cloneFnJSON } from '@vueuse/core';
import { getCurrentUrl, isCompUrl, parseQuery } from '@/utils/url';
import { ElMessage } from 'element-plus';

const url = ref('');

const childInfo = reactive({
	data: {
		option: '',
		data: null as any,
	},
});

const devStore = useDevToolStore();

const confirmUrlHandle = () => {
	if (isCompUrl(url.value)) {
		devStore.resetStore();
		devStore.setUrl(url.value);
	} else {
		MessageError(`请输入'http://....' 或 'https://....格式的url'`);
	}
};

// 编辑回调
const editCallback = () => {
	childInfo.data = { option: MsgOption.FETCH_EDIT_CONFIG, data: {} };
};

// 重置编辑回调
const editResetCallback = () => {
	childInfo.data = { option: MsgOption.FETCH_EDIT_DEF_CONFIG, data: {} };
};

// 预览回调
const editPreviewCallback = (data: any) => {
	childInfo.data = { option: MsgOption.POST_EDIT_CONFIG, data: [...data] };
};

// 编辑保存回调
const editSaveCallback = (data: any) => {
	childInfo.data = { option: MsgOption.SAVE_CONFIG, data: [...data] };
};

// 消息处理
watch(
	childInfo,
	(nv) => {
		// console.log('watch');
		// const {};
		devStore.msgPush({ option: nv.data.option as any, data: deepCloneByJson(nv.data.data), type: 0 });
	},
	{ deep: true }
);

// 设置关键回掉
devStore.setCallbacksHandle({
	previewCallBack: editPreviewCallback,
	resetCallBack: editResetCallback,
	saveCallBack: editSaveCallback,
	editCallBack: editCallback,
});

// 设置编辑数据
const setEditData = (data: any) => {
	devStore.setEditConfigData([...data]);
};

// 保存配置
const saveConfig = (data: any) => {
	devStore.setConfigData(data);
};

// 消息处理
const messageHandle = (data: any) => {
	ElMessage(data);
};

// 父组件接受子组件数据
const handleDataChange = (e: any) => {
	const { option, data } = e.detail.data;
	const copyData = cloneFnJSON(data);
	devStore.msgPush({ option, data: deepCloneByJson(data), type: 1 });
	// console.log(option, copyData);
	// console.log('我踏马接受到自组件数据了, 兄弟们快看');
	switch (option) {
		case MsgOption.POST_EDIT_CONFIG:
			setEditData(copyData);
			break;
		case MsgOption.POST_EDIT_DEF_CONFIG:
			setEditData(copyData);
			break;
		case MsgOption.POST_CONFIG:
			saveConfig(copyData);
			break;
		case MsgOption.POST_MESSAGE:
			messageHandle(data);
			break;
	}
};

// 子应用加载异常
const childError = () => {
	MessageError('组件加载错误, 请检查url是否正确');
};

// 子组件加载成功回调
const childMounted = () => {
	// console.log('自组件mounted');
};

onMounted(() => {
	const q = parseQuery(getCurrentUrl());
	if (q.url) {
		url.value = q.url;
		devStore.setUrl(q.url);
	}
});
</script>

<style scoped>
.main-page {
	max-width: calc(100vw - 800px);
	max-height: calc(100vh - 190px);
}
</style>
