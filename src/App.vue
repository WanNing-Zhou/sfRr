<script setup lang="ts">
import TDropPage from '@/views/test/dragdrop/t-drop-page.vue';
</script>

<template>
	<!--  <div>-->
	<!--    <a href="https://vitejs.dev" target="_blank">-->
	<!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
	<!--    </a>-->
	<!--    <a href="https://vuejs.org/" target="_blank">-->
	<!--      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
	<!--    </a>-->
	<!--  </div>-->
	<!--  <base-desktop></base-desktop>-->
	<!--  <HelloWorld msg="Vite + Vue" />-->
	<!--	<test-index></test-index>-->
	<!--	<HomePage />-->
	<!--	<test-demo1 />-->
	<t-drop-page />
	<!--	<router-view></router-view>-->
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
