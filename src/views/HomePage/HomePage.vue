<template>
	<div>
		<!--  背景图片组件  -->
		<back-img></back-img>
		<comp-panel />
		<main-tools v-if="!isPage" />
		<side-bar />
	</div>
</template>

<script setup lang="ts">
import BackImg from '@/views/HomePage/BackImg.vue';
import CompPanel from '@/views/HomePage/CompPanel.vue';
import MainTools from '@/views/HomePage/UtilsTools/MainTools.vue';
import SideBar from '@/views/HomePage/SideBar/SideBar.vue';
import usePage from '@/hooks/usePage';
import { toRef } from 'vue';

const page = usePage();

const isPage = toRef(page.isPage);
</script>

<style scoped></style>
