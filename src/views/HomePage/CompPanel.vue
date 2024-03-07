<template>
	<div class="comp-panel">
		<DropContent v-model="data" ref="dropContentRef" group-name="drag-demo" :row="6" :column="12" :gap="6">
			<template #preview-item="{ data }">
				<div style="height: 100%; background: #f9f1c7; border-radius: 6px">{{ data }}</div>
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
					{{ isPutDown ? '可以放置' : '不可放置' }}
				</div>
			</template>
		</DropContent>
	</div>
</template>

<script setup lang="ts">
import DropContent from '@/components/dragdrop/DropContent.vue';
import { ref } from 'vue';

const data = ref([]);
</script>

<style lang="scss" scoped>
.comp-panel {
	//position: fixed;
	width: calc(100vw - 20px);
	height: calc(100vh - 20px);
	min-width: 600px;
	min-height: 300px;
	padding: 10px;
	//padding: 10px;
}
</style>