<template>
	<div
		class="back-img"
		:style="{
			backgroundImage: `url(${bgUrl})`,
		}"
	></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useStore from '@/store/useStore';
import usePage from '@/hooks/usePage';

const defaultBg = 'https://pic4.zhimg.com/v2-5290caf1f5c8c270e6da56b0361c9e1b_r.jpg';

// :TODO get url in useStore
const { appConfig } = useStore();
const page = usePage();
const bgUrl = computed(() => {
	if (page.isPage.value) {
		// console.log('page.pageData.value.config.url', page.pageData.value.config.url);
		return page.pageData.value.config.url || defaultBg;
	}
	return appConfig.Background.url || defaultBg;
});
</script>

<style scoped>
.back-img {
	width: 100vw;
	height: 100vh;
	background-size: cover;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -100;
}
</style>
