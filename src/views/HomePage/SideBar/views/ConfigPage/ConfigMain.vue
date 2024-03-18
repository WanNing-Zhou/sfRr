<template>
	<el-scrollbar height="100%">
		<bg-config v-if="index === 'background'"></bg-config>
	</el-scrollbar>
</template>

<script setup lang="ts">
import configMenu from '@/views/HomePage/SideBar/views/ConfigPage/pageCofnig';
import BgConfig from '@/views/HomePage/SideBar/views/ConfigPage/views/BgConfig.vue';

type Props = {
	index: string;
};

const props = withDefaults(defineProps<Props>(), {
	index(props) {
		return configMenu[0].key;
	},
});
</script>

<style scoped></style>