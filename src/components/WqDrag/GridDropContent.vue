<template>
	<div class="wq-grid-content" @dragenter="dragenterHandle" @dragover="dragoverHandle" @dragleave="dragleaveHandle" @drop="dropHandle">
		<div ref="gridLayoutRef" class="wq-grid-layout">
			<canvas v-show="isDrawGridLines" ref="canvas" class="canvas"></canvas>
			<!--			<slot />-->

			<grid-drop-item v-for="item in data" :id="item.id" :key="item.id" :data="item" :group="group">
				<slot name="preview-item" :data="item" :moving="isDragging">
					{{ item.id }}
				</slot>
			</grid-drop-item>

			<MoveMask v-if="mask" v-show="isDragging" v-bind="draggingStyle" :width="colWidth" :height="layoutHeight" :gap="gutter">
				<slot name="move-mask" v-bind="draggingStyle"></slot>
			</MoveMask>
			<!--<div v-show="isDragging" class="dragingItem"></div>-->
		</div>
	</div>
</template>

<script lang="ts" setup>
import { DraggableEnd, DraggableHandle, DraggableStart, HandleType, Layout, LayoutItem, PropsData, Removes } from './types';
import { key } from './help/key';
import useDrag from './help/useDrag';
import useLayout from './help/useLayout';
import { calcColWidth, calcHeight, deepClone, drawGridLines } from './help/utils';
import { computed, onMounted, provide, ref, watch, watchEffect } from 'vue';
import { checkLayout } from './help/dragerule';
import MoveMask from './MoveMask.vue';
import GridDropItem from '@/components/WqDrag/GridDropItem.vue';
import { useDragStore } from '@/components/WqDrag/help/dragStore';

const props = withDefaults(defineProps<PropsData>(), {
	data: () => [] as Layout,
	col: 12,
	rowH: 50,
	drag: true,
	resize: true,
	remove: true,
	gutter: 10,
	isDrawGridLines: true,
	isCollision: true,
	mask: true,
	group: 'DragDrop',
});

/**
 * 初始化数据
 */
const canvas = ref<HTMLCanvasElement>();
const drag = computed((): boolean => props.drag);
const resize = computed((): boolean => props.resize);
const removeItem = computed((): boolean => props.remove);
const isDrawGridLines = computed((): boolean => props.isDrawGridLines);

/**
 * 引用hook，分离拖拽、缩放、删除的逻辑代码
 */
const { draggableStart, draggableHandle, draggableEnd, isDragging, isCollision, removes, propsId, draggingStyle, layoutData, col, rowH, gutter } =
	useDrag(props);
const { layoutHeight, colWidth, layoutStyle, updateStyle } = useLayout();

watch(isDragging, () => {
	console.log('dragging', isDragging, props.mask);
});

/**
 * 计算每个item的宽度高度
 */
const gridLayoutRef = ref<HTMLDivElement | null>(null);
const calcWidth = () => {
	if (gridLayoutRef.value) {
		colWidth.value = calcColWidth(col.value, gutter.value, gridLayoutRef.value.clientWidth);
	}
};

// 绘制网格线
const drawGrid = () => {
	if (canvas.value && gridLayoutRef.value && props.isDrawGridLines) {
		drawGridLines(canvas.value, layoutHeight.value, gridLayoutRef.value.clientWidth, colWidth.value, rowH.value, gutter.value);
	}
};

// 计算总高度
const calcLayoutHeight = () => {
	if (gridLayoutRef.value) {
		layoutHeight.value = calcHeight(rowH.value, gutter.value, layoutData.value);
	}
};

// 监听变化动态计算高度和绘制网格线
watch([col, rowH, gutter, layoutData], () => {
	calcWidth();
	if (!isDragging.value) calcLayoutHeight(); // 拖拽中不使用layoutdata计算高度
	drawGrid();
});
onMounted(() => {
	calcWidth();
	calcLayoutHeight();
	drawGrid();
	window.onresize = () => {
		calcWidth();
		drawGrid();
	};
});

/**
 * 保证hook中的数据是最新数据
 */
watchEffect(() => {
	// 拖拽中的数据不实时更新到外部，等拖拽结束在更新 ps: 会导致bug
	if (!isDragging.value) {
		layoutData.value = deepClone(checkLayout(props.data, Number(props.col)));
		// 判断数据经过初始化后是否发生变化，如果发生变化能返回给父组件
		if (JSON.stringify(layoutData.value) !== JSON.stringify(props.data)) {
			updateData();
		}
	}
	rowH.value = Number(props.rowH);
	col.value = Number(props.col);
	gutter.value = Number(props.gutter);
	isCollision.value = props.isCollision;
	updateStyle(col.value, rowH.value, gutter.value);
});
/**
 * 抛出emit事件
 */
const emit = defineEmits<{
	'update:data': [data: Layout];
	draggableStart: [id: string];
	draggableHandle: [id: string, newItem: LayoutItem];
	draggableEnd: [data: Layout];
	remove: [id: string];
}>();
const updateData = () => {
	emit('update:data', layoutData.value);
};
const dragStart: DraggableStart = (id: string) => {
	draggableStart(id);
	emit('draggableStart', id);
};
const dragHandle: DraggableHandle = (shiftX: number, shiftY: number, handleType?: HandleType) => {
	const { newData, newItem } = draggableHandle(shiftX, shiftY, colWidth.value, handleType);
	layoutHeight.value = calcHeight(rowH.value, gutter.value, newData);
	// drawGrid()
	emit('draggableHandle', propsId.value, newItem);
};
const dragEnd: DraggableEnd = () => {
	draggableEnd();
	updateData();
	emit('draggableEnd', layoutData.value);
};
const remove: Removes = (id: string) => {
	removes(id);
	updateData();
	emit('remove', id);
};

const dragStore = useDragStore;
/**
 * 拖拽进入
 * @param e
 */
const dragenterHandle = (e: DragEvent) => {
	// 阻止事件向父组件传播
	e.preventDefault();
	const dragData = dragStore.get(props.group);
	if (dragData && dragData.id) draggableStart(dragData.id);
};

// 计算 x 坐标
const getX = (num: any) => parseInt(String(num / (colWidth.value + gutter.value)));
// 计算 y 坐标
const getY = (num: any) => parseInt(String(num / (colWidth.value + gutter.value)));

// // 计算列数
// const getColumn = (num: any) => ceil(num / (boxSize.value.width + props.gap));
// // 计算行数
// const getRow = (num: any) => ceil(num / (boxSize.value.height + props.gap));

/**
 * 拖拽中
 * @param e
 */
const dragoverHandle = (e: DragEvent) => {
	e.preventDefault();
	const dragData = dragStore.get(props.group);

	if (dragData && dragData.id) {
		const { newData, newItem } = draggableHandle(e.clientX - dragData.clientX, e.clientY - dragData.clientY, colWidth.value, 'drag');

		// console.log('newData', newData);
		console.log('newItem', newItem);
		layoutHeight.value = calcHeight(rowH.value, gutter.value, newData);
		// drawGrid()
		emit('draggableHandle', propsId.value, newItem);
	}
	// console.log(e);
};
/**
 * 拖拽离开
 * @param e
 */
const dragleaveHandle = (e: DragEvent) => {
	console.log('拖拽移出', e);
};

/**
 * 拖拽结束
 * @param e
 */
const dropHandle = (e: DragEvent) => {
	draggableEnd();
	updateData();
	emit('draggableEnd', layoutData.value);
	emit('draggableEnd', layoutData.value);
	console.log('拖拽结束', e);
};

/**
 * 注入参数，方便子组件调用
 */
provide(key, {
	layoutData, // 布局数据
	rowH, // item高度
	col, // 列数
	gutter, // 间距
	colWidth, // item宽度
	drag, // 是否可拖拽
	resize, // 是否可缩放
	remove: removeItem, // 删除item
	draggableStart: dragStart, // 拖拽开始
	draggableHandle: dragHandle, // 拖拽中
	draggableEnd: dragEnd, // 拖拽结束
	removes: remove, // 删除元素方法
});
</script>

<style lang="scss" scoped>
.wq-grid-content {
	position: relative;
	width: 100%;
	.canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}
	.wq-grid-layout {
		width: 100%;
		display: grid;
		//place-items: center center;
		grid-template-columns: v-bind('layoutStyle.gridTemplateColumns');
		grid-auto-rows: v-bind('layoutStyle.gridAutoRows');
		gap: v-bind('layoutStyle.gap');
		height: v-bind('layoutStyle.height');
		overflow-x: hidden;
		//touch-action: none;
		transition:
			width 0.2s ease,
			height 0.2s ease;
	}
}
</style>
