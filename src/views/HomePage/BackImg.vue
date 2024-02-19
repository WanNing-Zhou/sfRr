<template>
	<div
		class="back-img"
		:style="{
			backgroundImage: `url(${bgUrl})`,
		}"
	></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const defaultBg =
	'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/58ce5dd7510efce116a7b8bcd2b8a9da.jpg?x-oss-process=image%2fresize%2cm_lfit%2cw_1920%2ch_1080';

// :TODO get url in store
const bgUrl = ref(defaultBg);
</script>

<style scoped>
.back-img {
	width: 100vw;
	height: 100vh;
	background-size: cover;
	position: fixed;
	top: 0;
	left: 0;
}
</style>
