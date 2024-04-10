<template>
	<div class="comp-panel">
		<DropContent v-if="prePanelInfo.visible" ref="dropContentRef" v-model="data" group-name="drag-demo" :row="12" :column="24" :gap="6">
			<template #preview-item="{ data }">
				<div style="height: 100%; background: #646cff; border-radius: 6px">
					<CompItem pre-view :data="data" @remove="onRemovePreviewItem(data)" @update-config="onPreviewItemSaveConfig"></CompItem>
				</div>
			</template>
			<template #move-mask="{ isPutDown }">
				<div
					:style="{
						width: '100%',
						height: '100%',
						border: '2px solid #2867f979',
						backgroundColor: isPutDown ? '#2867f91c' : '#ff000055',
						borderColor: isPutDown ? '#2c68f3' : '#ff000079',
						'border-radius': '6px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontWeight: '600',
					}"
				>
					<!--					{{ isPutDown ? '可以放置' : '不可放置' }}-->
				</div>
			</template>
		</DropContent>
		<div v-show="!prePanelInfo.visible" style="width: 100%; height: 100%">
			<comp-preview-layout :data="localData" :row="12" :column="24" :gap="6" :skipEmpty="false" />
		</div>
		<div v-if="prePanelInfo.visible" class="comp-panel__bottom">
			<ground-glass :glass-style="{ padding: 0, overflow: 'hidden' }" :blur-size="20">
				<div class="tools">
					<div class="tools_btn" @click="submitPanelData">确认</div>
					<div class="tools_btn" @click="resetPanelData">重置</div>
				</div>
			</ground-glass>
		</div>
	</div>
</template>

<script setup lang="ts">
import DropContent from '@/components/dragdrop/DropContent.vue';
import { computed, nextTick, onMounted, ref } from 'vue';
import CompItem from '@/views/HomePage/components/CompItem.vue';
import CompPreviewLayout from '@/views/HomePage/components/CompPreviewLayout.vue';
import useStore from '@/store/useStore';
import { storeToRefs } from 'pinia';
import GroundGlass from '@/components/GroundGlass/GroundGlass.vue';
import { deepCloneByJson } from '@/utils/deepClone';
import { isPage } from '@/utils/url';
import usePage from '@/hooks/usePage';
import { useRoute } from 'vue-router';
import { getPageInfo } from '@/api/page';
import { getUUName } from '@/utils/nanoid';

const store = useStore();
const route = useRoute();
const { PreviewPanel: prePanelInfo } = storeToRefs(store.pageVisible);
const { compData, pageVisible } = useStore();

const data = ref<any[]>([]);
// 删除组件
const onRemovePreviewItem = (el: any) => {
	data.value = data.value.filter((item) => item !== el);
};

const onPreviewItemSaveConfig = (id: any, config: any) => {
	data.value.forEach((item) => {
		if (item.id === id) {
			item.config = config;
			item.id = getUUName(6);
		}
	});
	// el.config = config;
};

// 页面标识
const page = usePage();
const pageData = ref([]);
const pageID = computed(() => {
	return route.query['page'];
});

const localData = computed(() => {
	const pageFlag = isPage();
	if (page.isPage.value) {
		console.log('page为true', pageData.value);
		return pageData.value;
	}
	return compData.CompPanel.data;
});

// 预览面板数据
const getPageData = async () => {
	const id = page.pageID.value;
	const res = await getPageInfo(id);
	pageData.value = res.data;
	const d = JSON.parse(JSON.parse(res.data.data));
	page.setPageData(d);
	console.log(typeof d);
	console.log(d['comps']);
	pageData.value = d['comps'].data;
};

onMounted(() => {
	nextTick(() => {
		console.log(window.location.href);
		// 判断是否是页面
		const id = isPage();
		if (id) {
			// const id = route.quer;
			page.setPageID(id);
			page.setIsPage(true);
			getPageData();
		}
	});

	data.value = deepCloneByJson(localData.value);
});
const submitPanelData = () => {
	// console.log(compData.setCompPanelData);
	compData.setCompPanelData(deepCloneByJson(data.value));
	pageVisible.setPrePanelVisible(false);
};
const resetPanelData = () => {
	data.value = [...localData.value];
};
</script>

<style lang="scss" scoped>
.comp-panel {
	//position: fixed;
	width: calc(100vw - 20px);
	height: calc(100vh - 20px);
	min-width: 600px;
	min-height: 300px;
	padding: 10px;
	position: relative;
	//padding: 10px;
	.comp-panel__bottom {
		position: absolute;
		left: 50%;
		bottom: 20px;
		transform: translateX(-50%);
		.tools {
			font-family: 'Arial', 'Microsoft YaHei', serif;
			user-select: none;
			display: flex;
			color: white;
			flex: 1;
			.tools_btn {
				padding: 10px 20px;
				min-width: 60px;
				//margin: 0 10px;
				cursor: pointer;
				//border-radius: 4px;
				font-size: 16px;
				line-height: 30px;
				overflow: hidden;
				&:hover {
					background: rgba(223, 228, 234, 0.2);
				}
			}
		}
	}
}
</style>
