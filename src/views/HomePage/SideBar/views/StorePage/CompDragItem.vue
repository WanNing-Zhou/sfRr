<script setup lang="ts">
import { dragStore } from '@/components/dragdrop/drag';
import { CompApp } from '@/type/compApp';
import useStore from '@/store/useStore';

const props = withDefaults(
	defineProps<{
		data: CompApp;
		/** 拖拽分组标识 */
		groupName?: string;
	}>(),
	{
		groupName: 'DrapDrop',
	}
);

const store = useStore();
// eslint-disable-next-line no-undef
const onDragstart = (e: Event) => {
	store.pageVisible.setPrePanelVisible(true);
	dragStore.set(props.groupName, { x: 0, y: 0, ...props.data });
};
const onDragend = () => dragStore.remove(props.groupName);
</script>
<template>
	<div class="drag-item">
		<div
			:style="{
				background: `url(${data.preview_url})`,
				backgroundSize: 'cover',
			}"
			class="drag-item__el"
			draggable="true"
			@dragstart="onDragstart"
			@dragend="onDragend"
		>
			<slot></slot>
		</div>
		<div class="drag-item__title">
			{{ data.title }}
		</div>
	</div>
</template>
<style lang="scss" scoped>
.drag-item {
	width: 220px;
	height: 160px;
	display: flex;
	flex-direction: column;

	&__el {
		background-size: cover;
		width: 100%;
		height: 120px;
		border-radius: 4px;
		border: 1px solid #dddddd;
	}

	&__title {
		text-align: center;
		font-size: 14px;
		font-family:
			Source Han Sans CN,
			serif;
		font-weight: 400;
		color: #555555;
		line-height: 14px;
		margin-top: 14px;
	}
}
</style>
