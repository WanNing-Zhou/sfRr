<template>
	<div class="drag-item" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd">
		<div class="drag-item_el">
			<slot>z这是一个组件</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDropStore from '@/views/test/dragdrop/t-drop-store';

type Prop = {
	groupName?: string;
};

const props = withDefaults(defineProps<Prop>(), { groupName: 'default' });

const dragStore = useDropStore();

const onDragStart = (e: DragEvent) => {
	dragStore.set(props.groupName, e.target as HTMLElement);
};

const onDragEnd = () => dragStore.remove(props.groupName);
</script>

<style scoped>
.drag-item {
	position: relative;
	left: 0;
	right: 0;
	transform: translateY(0px) translateX(0px);
	width: 100px;
	height: 100px;
	resize: both;
	background-color: #ccc;
}
</style>
