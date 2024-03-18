<template>
	<div></div>
</template>

<script setup lang="ts">
import configMenu from '@/views/HomePage/SideBar/views/ConfigPage/pageCofnig';

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