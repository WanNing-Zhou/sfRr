<!--侧边栏-->
<template>
	<!--  这里是一个抽屉-->
	<side-drawer :visible="sideDrawerInfo.visible" :title="sideDrawerInfo.name" @close="drawerClose"> </side-drawer>
</template>

<script setup lang="ts">
import useStore from '@/store/useStore';
import { storeToRefs } from 'pinia';
import SideDrawer from '@/components/Drawer/SideDrawer.vue';

const store = useStore();

const { SideDrawer: sideDrawerInfo } = storeToRefs(store.pageVisible);
const drawerClose = () => {
	store.pageVisible.closeSideDrawer();
};
</script>

<style lang="scss" scoped></style>
