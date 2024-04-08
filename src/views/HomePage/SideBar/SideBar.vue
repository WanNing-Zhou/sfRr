<!--侧边栏-->
<template>
	<!--  这里是一个抽屉-->
	<side-drawer :visible="sideDrawerInfo.visible" :title="sideDrawerInfo.name" @close="drawerClose">
		<store-page v-if="sideDrawerInfo.page === 'store'"></store-page>
		<config-page v-if="sideDrawerInfo.page === 'config'"></config-page>
		<config-page v-if="sideDrawerInfo.page === 'edit_comp'"></config-page>
	</side-drawer>
</template>

<script setup lang="ts">
import useStore from '@/store/useStore';
import { storeToRefs } from 'pinia';
import SideDrawer from '@/components/Drawer/SideDrawer.vue';
import StorePage from '@/views/HomePage/SideBar/views/StorePage/StorePage.vue';
import ConfigPage from '@/views/HomePage/SideBar/views/ConfigPage/ConfigPage.vue';

const store = useStore();

const { SideDrawer: sideDrawerInfo } = storeToRefs(store.pageVisible);
const drawerClose = () => {
	store.pageVisible.closeSideDrawer();
};
</script>

<style lang="scss" scoped></style>
