<template>
	<div ref="dropContentRef" class="t-drop-content">
		<el-scrollbar>
			<div
				class="t-drop-items-wrap"
				@dragenter="dragEnterHandle($event)"
				@dragover="dragOverHandle($event)"
				@dragleave="dragLeaveHandle($event)"
				@drop="dropHandle"
			>
				<slot>
					<t-drop-item></t-drop-item>
				</slot>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TDropItem from '@/views/test/dragdrop/t-drop-item.vue';
import { useElementSize } from '@vueuse/core'; // :TODO 记录位置

// 获取容器高度
const dropContentRef = ref<HTMLElement | null>(null);
const { width: containerW, height: containerH } = useElementSize(dropContentRef);

const dragEnterHandle = (e: Event) => {
	console.log(e);
};
const dragOverHandle = (e: Event) => {
	console.log(e);
};

const dragLeaveHandle = (e: Event) => {
	console.log(e);
};
const dropHandle = (e: Event) => {
	console.log(e);
};
</script>

<style lang="scss" scoped>
.t-drop-content {
	width: 100%;
	height: 100%;
	position: relative;
	background: #1a1a1a;
	.t-drop-items-wrap {
		min-width: v-bind(containerW + 'px');
		min-height: v-bind(containerH + 'px');
		position: relative;
	}
}
</style>
