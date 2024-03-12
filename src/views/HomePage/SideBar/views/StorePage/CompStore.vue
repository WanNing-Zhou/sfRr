<script setup lang="ts">
import { CompApp } from '@/type/compApp';
import { demoTestList } from '@/views/HomePage/SideBar/views/StorePage/testData';
import CompDragItem from '@/views/HomePage/SideBar/views/StorePage/CompDragItem.vue';

withDefaults(
	defineProps<{
		// list: DragSchema[];
		/** 拖拽分组标识 */
		// groupName?: string;
	}>(),
	{
		// groupName: 'DrapDrop',
	}
);
// 组件列表
const groupName = 'drag-demo';
const list: CompApp[] = demoTestList;

const onDragItemClick = (event: any, it: any) => {
	console.log(event);
	console.log(it);
};
</script>

<template>
	<div class="drag-sidebar">
		<!--		<div v-for="(item, index) in list" :key="index" class="drag-group">-->
		<!--			<div class="drag-group__title">-->
		<!--				{{ item.title }}-->
		<!--			</div>-->
		<div class="drag-group__content">
			<!--				<div v-for="it in item.list" :key="it.key" class="drag-group-item">-->
			<!--					<DragItem :data="it" :group-name="groupName" @click="onDragItemClick($event, it)" />-->
			<!--				</div>-->

			<!--			<div v-for="it in list" :key="it.key" class="drag-group-item">
				<DragItem :data="it.defaultDrop" :group-name="groupName" @click="onDragItemClick($event, it)" />
			</div>-->

			<div v-for="it in list" :key="it.key" class="drag-group-item">
				<CompDragItem :data="it" :group-name="groupName" @click="onDragItemClick($event, it)" />
			</div>
		</div>
		<!--		</div>-->
	</div>
</template>
<style scoped lang="scss">
.drag-sidebar {
	//overflow-y: auto;
	//height: 100%;
	width: 500px;

	.drag-group {
		margin: 0 18px 24px;

		&__title {
			font-size: 14px;
			font-family:
				Source Han Sans CN,
				serif;
			font-weight: 700;
			color: #555555;
			margin-bottom: 12px;
			display: flex;
			align-items: center;
		}
		/*		&__content {
			display: flex;
			flex-wrap: wrap;
			gap: 16px 20px;
		}*/
	}

	.drag-group__content {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 16px 20px;
	}
}
</style>
