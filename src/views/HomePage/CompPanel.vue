<template>
	<div class="comp-panel">
		<DropContent v-if="prePanelInfo.visible" v-model="data" ref="dropContentRef" group-name="drag-demo" :row="12" :column="24" :gap="6">
			<template #preview-item="{ data }">
				<div style="height: 100%; background: #646cff; border-radius: 6px">
					<CompItem pre-view :data="data"></CompItem>
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
			<comp-preview-layout :data="data" :row="12" :column="24" :gap="6" :skipEmpty="false" />
		</div>
		<div class="comp-panel__bottom">
			<ground-glass :glass-style="{ padding: 0, overflow: 'hidden' }" :blur-size="20">
				<div class="tools">
					<div class="tools_btn">确认</div>
					<div class="tools_btn">重置</div>
				</div>
			</ground-glass>
		</div>
	</div>
</template>

<script setup lang="ts">
import DropContent from '@/components/dragdrop/DropContent.vue';
import { ref } from 'vue';
import { CompApp } from '@/type/compApp';
import CompItem from '@/views/HomePage/components/CompItem.vue';
import CompPreviewLayout from '@/views/HomePage/components/CompPreviewLayout.vue';
import useStore from '@/store/useStore';
import { storeToRefs } from 'pinia';
import GroundGlass from '@/components/GroundGlass/GroundGlass.vue';

const store = useStore();
const { PreviewPanel: prePanelInfo } = storeToRefs(store.pageVisible);

const data = ref<CompApp[]>([
	{
		id: 'kkk1111',
		key: 'demo-component',
		title: '组件标题',
		column: 1,
		row: 1,
		x: 1,
		y: 1,
	},
	{
		id: 'kkk2222',
		key: 'demo-component',
		title: '组件标题',
		column: 1,
		row: 1,
		x: 2,
		y: 3,
	},
]);
const submitPanelData = () => {};
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