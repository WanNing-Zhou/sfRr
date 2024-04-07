<template>
	<div class="page-manage">
		<new-page-card />
		<el-divider />
		<page-list-card />
	</div>
</template>

<script setup lang="ts">
import NewPageCard from '@/views/HomePage/SideBar/views/ConfigPage/views/page-manage/new-page-card.vue';
import PageListCard from '@/views/HomePage/SideBar/views/ConfigPage/views/page-manage/page-list-card.vue';
</script>

<style lang="scss" scoped>
.page-manage {
	//min-width: 800px;
}
</style>
