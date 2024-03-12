<template>
	<div style="height: 100%; width: 100%; background: #535bf2">
		<!--		<WujieVue width="300px" height="300px" name="百度" attr="/kakx" :url="url"></WujieVue>-->
		<!--		<iframe :src="url"></iframe>-->
		<!-- name：应用名称, url：应用地址 -->
		<micro-app :name="'kkk' + data.id" :url="data.url" iframe></micro-app>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { testCors } from '@/api/test';
import { CompApp } from '@/type/compApp';

type Props = {
	data: CompApp;
};
const props = defineProps<Props>();
// import WujieVue from 'wujie-vue3';

// import microApp from '@micro-zoe/micro-app';
//
// microApp.start();
const url = 'http://127.0.0.1:8000/index.html';

// const url = 'https://blog.csdn.net/yi0322/article/details/135205436';

onMounted(() => {
	testCors()
		.then(() => {
			console.log('request success');
		})
		.catch(() => {
			console.log('request error');
		});
});
</script>

<style scoped></style>