<template>
	<div class="store_page">
		<div class="top"><wq-tab v-model:active="tabActive" :tabs="tabs"></wq-tab></div>
		<div class="content" v-loading=""></div>
	</div>
</template>

<script setup lang="ts">
import WqTab from '@/components/WqTab/WqTab.vue';
import tabs from '@/views/HomePage/SideBar/views/StorePage/tabsConfig';
import { ref } from 'vue';
import useLoading from '@/hooks/loading';

const tabActive = ref('');
const loading = useLoading(true);
</script>

<style lang="scss" scoped>
.store_page {
	.content {
		min-height: 80px;
	}
}
</style>
