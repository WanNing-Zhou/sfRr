<template>
	<div ref="gripContainerRef" class="wq-grip-container">
		<el-scrollbar>
			<div
				class="wq-grip-container__content"
				@dragenter="onDragenter($event)"
				@dragover="onDragover($event)"
				@dragleave="onDragleave($event)"
				@drop="onDrop($event)"
			>
				<template v-for="x in rowCount">
					<div v-for="y in columnCount" :key="`${x}-${y}`" class="bg-column"></div>
				</template>
			</div>
			<div class="drop-content__preview">
				<PreviewItem
					v-for="item in list"
					:key="item.id"
					:data="item"
					:group-name="groupName"
					:style="{
						pointerEvents: current.show && item.id !== current.id ? 'none' : 'all',
					}"
					@close="onRemovePreviewItem(item)"
					@resize-start="onResizeStart"
					@resizeing="onResizeing"
					@resize-end="onResizeEnd"
				>
					<slot name="preview-item" :data="item" :moving="current.show && item.id !== current.id"></slot>
				</PreviewItem>
				<MoveMask
					v-if="mask"
					v-show="current.show"
					v-bind="current"
					:width="boxSize.width"
					:height="boxSize.height"
					:gap="gap"
					:is-put-down="isPutDown"
				>
					<slot name="move-mask" v-bind="current" :is-put-down="isPutDown"></slot>
				</MoveMask>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { DragItemData, DragItemPosition } from '@/type/dragdrop';
import { computed, reactive, ref } from 'vue';
import _ from 'lodash';
import { booleanIntersects, booleanWithin, dragStore, useBoxGrid, useBoxSize } from '@/components/dragdrop/drag';
import { getUUName } from '@/utils/nanoid';
import PreviewItem from '@/components/dragdrop/PreviewItem.vue';
import MoveMask from '@/components/dragdrop/MoveMask.vue';

type CallbackFun = (el: DragItemData | any, list: DragItemData[]) => Promise<boolean> | boolean;
type Prop = {
	modelValue: DragItemData[];
	// 拖拽分组标识
	groupName?: string;
	/** 容器需要分隔列数 */
	column?: number;
	/** 容器需要分隔行数 */
	row?: number;
	/** 容器格子间隔 */
	gap?: number;
	/** 是否显示拖拽预占位层 */
	mask?: boolean;
	/** 放置前的钩子 如果返回 false 则取消放置 */
	beforeDrop?: CallbackFun;
	/** 删除前的钩子 如果返回 false 则取消删除 */
	beforeRemove?: CallbackFun;
};

const props = withDefaults(defineProps<Prop>(), {
	groupName: 'DragDrop',
	column: 0,
	row: 0,
	gap: 0,
	mask: true,
	beforeDrop: () => true,
	beforeRemove: () => true,
});

const emits = defineEmits(['update:moduleValue']);

const list = computed({
	get: () => props.modelValue,
	set: (val) => emits('update:moduleValue', val),
});
const gripContainerRef = ref<HTMLElement>();
// 计算行列数
const { columnCount, rowCount } = useBoxGrid(list, props.column, props.row);

// grid 各自
const boxSize = useBoxSize(gripContainerRef, props.column, props.row, props.gap);

// 拖拽中的元素
const current = reactive({
	show: <boolean>false,
	id: <undefined | number>undefined,
	column: <number>0, // 宽
	row: <number>0, // 高
	x: <number>0, // 列
	y: <number>0, // 行
});

// 是否可以放置
const isPutDown = computed(() => {
	const currentXy = [current.x, current.y, current.x + current.column, current.y + current.row] as DragItemPosition;
	return (
		booleanWithin([0, 0, columnCount.value, rowCount.value], currentXy) &&
		list.value.every((item) => item.id === current.id || !booleanIntersects([item.x, item.y, item.x + item.column, item.y + item.row], currentXy))
	);
});

// 删除行
const isDelRow = computed(() => {
	const rows = Math.max(props.row, rowCount.value - 1);
	return list.value.every((item) => item.y + item.row <= rows);
});

// 计算 x 坐标
const getX = (num: any) => num / (boxSize.value.width + props.gap);
// 计算 y 坐标
const getY = (num: any) => num / (boxSize.value.height + props.gap);
// 计算列数
const getColumn = (num: any) => _.ceil(num / (boxSize.value.width + props.gap));
// 计算行数
const getRow = (num: any) => _.ceil(num / (boxSize.value.height + props.gap));

// 进入放置目标
const onDragenter = (e: any) => {
	e.preventDefault();
	const dragData = dragStore.get(props.groupName);
	if (dragData) {
		current.column = dragData.column;
		current.row = dragData.row;
		current.x = getX(e.offsetX) - getX(dragData?.offsetX ?? 0);
		current.y = getY(e.offsetY) - getY(dragData?.offsetY ?? 0);
		current.id = dragData.id;
		current.show = true;
	}
};

// 在目标中移动
const onDragover = (e: any) => {
	e.preventDefault();
	const dragData = dragStore.get(props.groupName);
	if (dragData) {
		current.x = getX(e.offsetX) - getX(dragData?.offsetX ?? 0);
		current.y = getY(e.offsetY) - getY(dragData?.offsetY ?? 0);
	}
};

// 离开目标
const onDragleave = (e: any) => {
	e.preventDefault();
	current.show = false;
	current.id = undefined;
};

// 放置在目标上
const onDrop = async (e: Event) => {
	e.preventDefault();
	current.show = false;
	// console.log('onDrop 中 groupName', props.groupName);
	const dragData = dragStore.get(props.groupName); // JSON.parse(e.dataTransfer.getData('application/json'))
	// console.log(dragData);
	if (
		isPutDown.value &&
		(await props.beforeDrop(
			{
				...dragData,
				x: current.x,
				y: current.y,
			},
			list.value
		))
	) {
		if (dragData && dragData.id) {
			dragData.x = current.x;
			dragData.y = current.y;
		} else {
			list.value.push({
				...dragData,
				x: current.x,
				y: current.y,
				// id: new Date().getTime(),
				id: getUUName(6),
			});
		}
	}
};

// 删除元素
const onRemovePreviewItem = (el: any) => {
	if (props.beforeRemove(el, list.value)) {
		list.value = list.value.filter((item) => item !== el);
	}
};

// 调整大小开始
const onResizeStart = () => {
	const dragData = dragStore.get(props.groupName);
	if (dragData) {
		current.column = dragData.column;
		current.row = dragData.row;
		current.x = dragData.x;
		current.y = dragData.y;
		current.id = dragData.id;
		current.show = true;
	}
};

// 调正大小时
const onResizeing = (e) => {
	const dragData = dragStore.get(props.groupName);
	current.column = getColumn(e.width);
	current.row = getRow(e.height);
};

// 调整大小结束
const onResizeEnd = async () => {
	current.show = false;
	const dragData = dragStore.get(props.groupName);
	if (
		dragData &&
		isPutDown.value &&
		(await props.beforeDrop(
			{
				...dragData,
				column: current.column,
				row: current.row,
			},
			list.value
		))
	) {
		dragData.column = current.column;
		dragData.row = current.row;
	}
};

defineExpose({
	// 添加行
	addRow: () => (rowCount.value = rowCount.value + 1),
	// 删除行
	deleteRow: () => isDelRow.value && (rowCount.value = Math.max(props.row, rowCount.value - 1)),
});
</script>

<style lang="scss" scoped>
.wq-grip-container {
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 6px;
	overflow: hidden;
	//overflow-y: auto;
	&__content {
		display: grid;
		row-gap: v-bind("gap+'px'");
		column-gap: v-bind("gap+'px'");
		grid-template-columns: repeat(v-bind('columnCount'), v-bind("boxSize.width+'px'"));
		grid-template-rows: repeat(v-bind('rowCount'), v-bind("boxSize.height+'px'"));
		.bg-column {
			background-color: rgba(255, 255, 255, 0.2);
			border-radius: 6px;
			pointer-events: none;
		}
	}
}
</style>
