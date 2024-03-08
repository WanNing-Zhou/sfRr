<template>
	<div>
		<!--  背景图片组件  -->
		<back-img></back-img>
		<comp-panel />
    <main-tools/>
	</div>
</template>

<script setup lang="ts">
import BackImg from '@/views/HomePage/BackImg.vue';
import CompPanel from '@/views/HomePage/CompPanel.vue';
import MainTools from "@/views/HomePage/UtilsTools/MainTools.vue";
</script>

<style scoped></style>
