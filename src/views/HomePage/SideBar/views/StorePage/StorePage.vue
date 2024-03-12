<template>
	<div class="store_page">
		<div class="top"><wq-tab v-model:active="tabActive" :tabs="tabs"></wq-tab></div>
		<div v-loading="storeLoading.loading.value" class="content">
			<comp-store :list="demoList" group-name="drag-demo"></comp-store>
		</div>
	</div>
</template>

<script setup lang="ts">
import WqTab from '@/components/WqTab/WqTab.vue';
import tabs from '@/views/HomePage/SideBar/views/StorePage/tabsConfig';
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import CompStore from '@/views/HomePage/SideBar/views/StorePage/CompStore.vue';
import demoList from '@/views/test/schema';

const tabActive = ref('');
const storeLoading = useLoading(false);
</script>

<style lang="scss" scoped>
.store_page {
	.top {
		margin: 20px 0;
	}
	.content {
		min-width: 500px;
		min-height: 150px;
		background: #646cff;
	}
}
</style>
