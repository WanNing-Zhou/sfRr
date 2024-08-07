<template>
	<div class="comp-item" style="height: 100%; width: 100%">
		<!--		<WujieVue width="300px" height="300px" name="百度" attr="/kakx" :url="url"></WujieVue>-->
		<!--		<iframe :src="url"></iframe>-->
		<!-- name：应用名称, url：应用地址 -->
		<div v-if="preView" class="item-mask" @mouseenter="mouseEnterHandle" @mouseleave="mouseLeaveHandle">
			<ground-glass v-if="maskVisible" class="item-mask-content">
				<div class="item-mask-content-item" @click.stop="editHandle"><svg-icon icon-class="config" /></div>
				<div class="item-mask-content-item" @click.stop="delHandle"><svg-icon icon-class="delete" /></div>
			</ground-glass>
		</div>
		<micro-app
			v-if="microName && showData.url"
			:class="{ eventNone: preView }"
			style="width: 100%; height: 100%; overflow: hidden"
			:data="childInfo.data"
			:name="microName"
			:url="showData.url"
			iframe
			router-mode="pure"
			@mounted="childMounted"
			@datachange="handleDataChange"
		></micro-app>
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watchEffect } from 'vue';
import { CompApp } from '@/type/compApp';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import GroundGlass from '@/components/GroundGlass/GroundGlass.vue';
import pageVisibleStore from '@/store/modules/pageVisible';
import useCompEditStore from '@/store/modules/comp/compEdit';
import { deepCloneByJson } from '@/utils/deepClone';
import { MsgOption } from '@/enum/msgOption';
import { cloneFnJSON } from '@vueuse/core';
import microApp from '@micro-zoe/micro-app';

type Props = {
	data: CompApp;
	// 是否为预览模式, (预览模式将添加固定前缀, 保证micro name的唯一)
	preView?: boolean;
};
// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
	preView(props) {
		return false;
	},
});

const emits = defineEmits(['remove', 'update-config']);

const pvStore = pageVisibleStore();
const ceStore = useCompEditStore();
// pvStore.

const microName = computed(() => {
	return (props.preView ? 'pre__' : '') + props.data.id;
});

// 备份数据
const localData = ref({});

watchEffect(() => {
	localData.value = deepCloneByJson(props.data);
});

// 显示数据
const showData = computed<CompApp | any>(() => {
	if (props.preView) {
		return localData.value;
	}
	return props.data;
});

// 遮罩可见性
const maskVisible = ref(false);

// 鼠标移入
const mouseEnterHandle = () => {
	if (props.preView) {
		maskVisible.value = true;
	}
};
// 鼠标移出
const mouseLeaveHandle = () => {
	if (props.preView) {
		maskVisible.value = false;
	}
};

// 删除组件
const delHandle = () => {
	emits('remove');
	// console.log('删除组件');
};

// 子应用的信息
const childInfo = reactive({
	// 是否完成加载
	isMounted: false,
	data: {
		name: '',
	} as any,
});

let num = 0;
// 编辑组件
const editHandle = () => {
	// num++;
	// TODO 获取子组件传递的信息
	childInfo.data = { option: MsgOption.FETCH_EDIT_CONFIG, data: {} };

	// ceStore.compEditHandle(localData.value);

	// 获取默认数据
	pvStore.newSidDrawer({ page: 'edit_comp', name: props.data.title });
};

const previewEdit = (data: any) => {
	// console.log('previewEdit, 触发了');
	// 预览触发
	childInfo.data = { option: MsgOption.POST_EDIT_CONFIG, data: [...data] };
	// pvStore.newSidDrawer({ page: 'edit_comp', name: props.data.title });
};

// 保存设置
const saveEdit = (data: any) => {
	// console.log('saveEdit, 触发了');
	childInfo.data = { option: MsgOption.SAVE_CONFIG, data: [...data] };
	// 没有发送数据的情况下
	emits('update-config', props.data.id, ceStore.compData.config);
	pvStore.closeSideDrawer();
	nextTick(() => {
		ceStore.editCancelHandle();
	});
};

// 重置编辑信息
const resetEdit = () => {
	// console.log('resetEdit, 触发了');
	childInfo.data = { option: MsgOption.FETCH_EDIT_DEF_CONFIG, data: {} };
};

// 设置编辑信息
const setEditData = (configValue: any) => {
	// 设置编辑信息
	// console.log('setEditData触发', configValue);
	// console.log('设置编辑信息', configValue);
	ceStore.compEditHandle({
		compData: { ...localData.value, config: [...(configValue || [])] },
		saveCallBack: saveEdit,
		resetCallBack: resetEdit,
		previewCallBack: previewEdit,
	});
};

// 上传编辑信息
const subEditData = (configValue: any) => {
	childInfo.data = { message: MsgOption.POST_EDIT_CONFIG, data: [...configValue] };
};

const saveConfig = (data: any) => {
	if (data) {
		// 如果发送了数据
		emits('update-config', props.data.id, data);
		// props.data.config = [...data];
	}
};

// 父组件接受子组件数据
const handleDataChange = (e: any) => {
	const { option, data } = e.detail.data;
	// console.log(option, data);
	const copyData = cloneFnJSON(data);
	switch (option) {
		case MsgOption.POST_EDIT_CONFIG:
			// console.log('我踏马接受到自组件数据了, 兄弟们快看');
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

/**
 * @description 子应用mounted回调
 */

const childMounted = () => {
	// console.log('老子要尼玛发送数据');
	// childInfo.data = { name: '卡卡西' };
	// 判断组件config属性是否存在
	if (showData.value.config) {
		// 如果config蜀绣能够存在,将设置信息发送给子组件
		// console.log('发送配置信息');
		childInfo.data = { option: MsgOption.POST_CONFIG, data: [...showData.value.config] };
	}

	setTimeout(() => {
		if (showData.value?.url.includes('#')) {
			// console.log(microName.value)
			// microApp.router.push({name: microName.value, path: showData.value.url})
			microApp.router.replace({ name: microName.value, path: showData.value.url });
			// console.log('#url',showData.value.url)
			setTimeout(() => {
				if (showData.value.config) {
					// 如果config蜀绣能够存在,将设置信息发送给子组件
					// console.log('发送配置信息');
					childInfo.data = { option: MsgOption.POST_CONFIG, data: [...showData.value.config] };
				}
			}, 50);
		}
	}, 100);
};

// const url = 'http://127.0.0.1:8000/index.html';
</script>

<style lang="scss" scoped>
.comp-item {
	position: relative;

	&.eventNone {
		pointer-events: none;
	}

	.item-mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9;

		&:hover {
			background: rgba(26, 26, 26, 0.2);
		}
		.item-mask-content {
			//max-width: 300px;
			//max-height: 300px;
			font-size: 30px;
			//background: #646cff;
			display: flex;
			.item-mask-content-item {
				padding: 15px;
				color: #ffffff;
				cursor: pointer;
			}
		}
	}
}
</style>
