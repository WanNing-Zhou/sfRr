<template>
	<div class="page-manage">
		<new-page-card @create-ok="getListFlag = true" />
		<el-divider />
		<page-list-card :get-list-flag="getListFlag" />
	</div>
</template>

<script setup lang="ts">
import NewPageCard from '@/views/HomePage/SideBar/views/ConfigPage/views/page-manage/new-page-card.vue';
import PageListCard from '@/views/HomePage/SideBar/views/ConfigPage/views/page-manage/page-list-card.vue';
import { ref } from 'vue';

const getListFlag = ref(false);
</script>

<style lang="scss" scoped>
.page-manage {
	//min-width: 800px;
}
</style>
