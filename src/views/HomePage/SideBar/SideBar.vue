<!--侧边栏-->
<template>
	<!--  这里是一个抽屉-->
	<side-drawer :visible="sideDrawerInfo.visible" :title="sideDrawerInfo.name" @close="drawerClose">
		<!--		<div>{{ sideDrawerInfo.page }}}</div>-->
		<store-page v-if="sideDrawerInfo.page === 'store'"></store-page>
		<config-page v-if="sideDrawerInfo.page === 'config'"></config-page>
		<edit-page v-if="sideDrawerInfo.page === 'edit_comp'"></edit-page>
	</side-drawer>
</template>

<script setup lang="ts">
import useStore from '@/store/useStore';
import { storeToRefs } from 'pinia';
import SideDrawer from '@/components/Drawer/SideDrawer.vue';
import StorePage from '@/views/HomePage/SideBar/views/StorePage/StorePage.vue';
import ConfigPage from '@/views/HomePage/SideBar/views/ConfigPage/ConfigPage.vue';
import EditPage from '@/views/HomePage/SideBar/views/EditPage/EditPage.vue';

const store = useStore();

const { SideDrawer: sideDrawerInfo } = storeToRefs(store.pageVisible);
const drawerClose = () => {
	store.pageVisible.closeSideDrawer();
};
</script>

<style lang="scss" scoped></style>
