<template>
	<div class="comp-item" style="height: 100%; width: 100%">
		<!--		<WujieVue width="300px" height="300px" name="百度" attr="/kakx" :url="url"></WujieVue>-->
		<!--		<iframe :src="url"></iframe>-->
		<!-- name：应用名称, url：应用地址 -->
		<div v-if="preView" class="item-mask" @mouseenter="mouseEnterHandle" @mouseleave="mouseLeaveHandle">
			<ground-glass v-if="maskVisible" class="item-mask-content">
				<div class="item-mask-content-item" @click.stop="editHandle"><svg-icon icon-class="config"></svg-icon></div>
				<div class="item-mask-content-item" @click.stop="delHandle"><svg-icon icon-class="delete" /></div>
			</ground-glass>
		</div>
		<micro-app
			:class="{ eventNone: preView }"
			style="width: 100%; height: 100%; overflow: hidden"
			@mounted="childMounted"
			@datachange="handleDataChange"
			:data="childInfo.data"
			:name="microName"
			:url="showData.url"
			iframe
		></micro-app>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue';
import { CompApp } from '@/type/compApp';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import GroundGlass from '@/components/GroundGlass/GroundGlass.vue';
import pageVisibleStore from '@/store/modules/pageVisible';
import useCompEditStore from '@/store/modules/comp/compEdit';
import { deepCloneByJson } from '@/utils/deepClone';
import { MsgOption } from '@/enum/msgOption';

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

const emits = defineEmits(['remove']);

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
	console.log('previewEdit, 触发了');
	// 预览触发
	childInfo.data = { option: MsgOption.POST_EDIT_CONFIG, data: [...data] };
	// pvStore.newSidDrawer({ page: 'edit_comp', name: props.data.title });
};

// 保存设置
const saveEdit = (data: any) => {
	childInfo.data = { option: MsgOption.SAVE_CONFIG, data: [...data] };
};

// 重置编辑信息
const resetEdit = () => {
	childInfo.data = { option: MsgOption.FETCH_EDIT_DEF_CONFIG, data: {} };
};

// 设置编辑信息
const setEditData = (configValue: any) => {
	// 设置编辑信息
	console.log('setEditData触发', configValue);
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

// 父组件接受子组件数据
const handleDataChange = (e: any) => {
	const { option, data } = e.detail.data;
	console.log(option, data);
	switch (option) {
		case MsgOption.POST_EDIT_CONFIG:
			console.log('我踏马接受到自组件数据了, 兄弟们快看');
			setEditData(data);
			break;
	}
};

/**
 * @description 子应用mounted回调
 */
const childMounted = () => {
	// console.log('老子要尼玛发送数据');
	childInfo.data = { name: '卡卡西' };
	// 判断组件config属性是否存在
	if (showData.value.config) {
		// 如果config蜀绣能够存在,将设置信息发送给子组件
		childInfo.data = { option: MsgOption.POST_CONFIG, data: { ...showData.value.config } };
	}
};

const url = 'http://127.0.0.1:8000/index.html';
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

		&:hover {
			background: rgba(26, 26, 26, 0.2);
		}
		.item-mask-content {
			max-width: 300px;
			max-height: 300px;
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
