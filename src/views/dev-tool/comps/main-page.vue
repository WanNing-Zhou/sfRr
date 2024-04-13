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
				style="width: 100%; height: 100%; overflow: hidden"
				:data="childInfo.data"
				name="dev-comp"
				:url="devStore.url"
				iframe
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

const editCallback = () => {
	childInfo.data = { option: MsgOption.FETCH_EDIT_CONFIG, data: {} };
};

const editResetCallback = () => {
	childInfo.data = { option: MsgOption.FETCH_EDIT_DEF_CONFIG, data: {} };
};

const editPreviewCallback = (data: any) => {
	childInfo.data = { option: MsgOption.POST_EDIT_CONFIG, data: [...data] };
};

const editSaveCallback = (data: any) => {
	childInfo.data = { option: MsgOption.SAVE_CONFIG, data: [...data] };
};

// 消息处理
watch(
	childInfo,
	(nv) => {
		console.log('watch');
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
	}
};

const childError = () => {
	MessageError('组件加载错误, 请检查url是否正确');
};

const childMounted = () => {
	console.log('自组件mounted');
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
	max-height: calc(100vh - 190px);
}
</style>
