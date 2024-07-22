<!--
  栏栅容器
-->
<template>
	<div></div>
</template>

<script setup lang="ts">
import { WqDragItemData } from '@/components/WqDrag/types/WqDrag';
import { DragItemData } from '@/type/dragdrop';
import { computed, ref } from 'vue';
import { useBoxGrid } from '@/components/dragdrop/drag';

const emits = defineEmits(['update:modelValue']);

type CallbackFun = (e: DragItemData | any, list: DragItemData[]) => Promise<boolean> | boolean;

type Props = {
	modelValue: WqDragItemData[];
	/**拖拽分组标识**/
	groupName?: string;
	/**容器需要分隔列数**/
	column?: number;
	/**容器需要分割行数**/
	row?: number;
	/** 容器格子间隔 **/
	gap?: number;
	/** 是否显示拖拽预占位置 **/
	mask?: boolean;
	/** 放置前的钩子 如果返回 false 则取消放置 */
	beforeDrop?: CallbackFun;
	/** 删除前的钩子 如果返回 false 则取消删除 */
	beforeRemove?: CallbackFun;
};
const props = withDefaults(defineProps<Props>(), {
	groupName: 'wq-drop',
	column: 0,
	row: 0,
	gap: 0,
	mask: true,
	beforeDrop: () => true,
	beforeRemove: () => true,
});

/**内容列表**/
const list = computed({
	get: () => props.modelValue,
	set: (val) => emits('update:modelValue', val),
});

const designerContentRef = ref<HTMLElement>();
const { columnCount, rowCount } = useBoxGrid(list, props.column, props.row);
</script>

<style lang="scss" scoped></style>
