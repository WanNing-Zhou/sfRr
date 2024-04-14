<template>
	<div class="box">
		<button type="primary" @click="display = true">打开抽屉</button>
		<drawer title="我是一个抽屉组件" v-model:display="display" :inner="true" :width="drawerWidth" :mask="false">
			1. Hello, world! 2. Do you like it?
		</drawer>
	</div>
</template>

<script>
import drawer from '@/components/Drawer/SideDrawer.vue';

export default {
	components: { drawer },
	data() {
		return {
			display: false,
			drawerWidth: '500px',
		};
	},
};
</script>
