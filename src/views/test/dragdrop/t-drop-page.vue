<template>
	<div class="layout-box">
		<grid-layout
			v-model:data="layout"
			@draggable-start="draggableStart"
			@draggable-handle="draggableHandle"
			@draggable-end="draggableEnd"
			@remove="remove"
		>
			<grid-item v-for="item in layout" :id="item.id" :key="item.id"></grid-item>
			<!--			<grid-item id="12">-->
			<!--				&lt;!&ndash;				<grid-layout v-model:data="layout2">&ndash;&gt;-->
			<!--				&lt;!&ndash;					<grid-item id="1"></grid-item>&ndash;&gt;-->
			<!--				&lt;!&ndash;				</grid-layout>&ndash;&gt;-->
			<!--			</grid-item>-->
		</grid-layout>
		<el-divider />
		<!--		<grid-layout-->
		<!--			v-model:data="layout2"-->
		<!--			@draggable-start="draggableStart"-->
		<!--			@draggable-handle="draggableHandle"-->
		<!--			@draggable-end="draggableEnd"-->
		<!--			@remove="remove"-->
		<!--		>-->
		<!--			<grid-item v-for="item in layout" :id="item.id" :key="item.id">-->
		<!--				{{ item.id }}-->
		<!--			</grid-item>-->
		<!--		</grid-layout>-->
		<grid-drop-content
			v-model:data="layout2"
			@draggable-start="draggableStart"
			@draggable-handle="draggableHandle"
			@draggable-end="draggableEnd"
			@remove="remove"
		>
			<template #preview-item="{ data }">
				{{ data }}
			</template>
		</grid-drop-content>
	</div>
</template>

<script setup lang="ts">
import { GridItem, GridLayout, type Layout, type LayoutItem } from 'vue3-draggable-grid';
import 'vue3-draggable-grid/dist/style.css';
import { ref, watch } from 'vue';
import GridDropContent from '@/components/WqDrag/GridDropContent.vue';

const layout = ref<Layout>([
	{ id: '1', x: 1, y: 1, h: 1, w: 1 },
	{ id: '2', x: 2, y: 1, h: 1, w: 1 },
	{ id: '3', x: 3, y: 1, h: 1, w: 1 },
	{ id: '4', x: 4, y: 1, h: 1, w: 1 },
	{ id: '5', x: 1, y: 2, h: 1, w: 1 },
	{ id: '6', x: 1, y: 3, h: 1, w: 1 },
	{ id: '7', x: 1, y: 4, h: 1, w: 1 },
	{ id: '8', x: 1, y: 5, h: 4, w: 1 },
	{ id: '9', x: 2, y: 2, h: 1, w: 1 },
	{ id: '10', x: 2, y: 3, h: 1, w: 1 },
	{ id: '11', x: 2, y: 4, h: 1, w: 1 },
	{ id: '12', x: 5, y: 5, h: 10, w: 8 },
]);

const layout2 = ref<Layout>([
	{ id: '1', x: 1, y: 1, h: 1, w: 1 },
	{ id: '2', x: 2, y: 1, h: 1, w: 1 },
	{ id: '3', x: 3, y: 1, h: 1, w: 1 },
	{ id: '4', x: 4, y: 1, h: 1, w: 1 },
	{ id: '5', x: 1, y: 2, h: 1, w: 1 },
	{ id: '6', x: 1, y: 3, h: 1, w: 1 },
	{ id: '7', x: 1, y: 4, h: 1, w: 1 },
	{ id: '8', x: 1, y: 5, h: 4, w: 1 },
	{ id: '9', x: 2, y: 2, h: 1, w: 1 },
	{ id: '10', x: 2, y: 3, h: 1, w: 1 },
	{ id: '11', x: 2, y: 4, h: 1, w: 1 },
	{ id: '12', x: 5, y: 5, h: 1, w: 2 },
]);

// 验证更新数据是否正确
watch(
	layout,
	() => {
		console.log('数据更新', layout.value);
	},
	{ deep: true }
);

const draggableStart = (id: string) => {
	console.log('拖拽开始', id);
};

const draggableHandle = (id: string, data: LayoutItem) => {
	console.log('拖拽中', id, data);
};

const draggableEnd = (data: Layout) => {
	console.log('拖拽结束', data);
};

const remove = (id: string) => {
	console.log('删除', id);
};
</script>
<style>
.layout-box {
	background: #ffffff;
	width: 1000px;
}
</style>
