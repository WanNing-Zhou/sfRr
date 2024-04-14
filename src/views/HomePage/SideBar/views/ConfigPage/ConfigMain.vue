<template>
	<el-scrollbar height="100%" class="config-main">
		<bg-config v-if="index === 'background'"></bg-config>
		<auth-config v-if="index === 'user'"></auth-config>
		<page-manage v-if="index === 'page'"></page-manage>
	</el-scrollbar>
</template>

<script setup lang="ts">
import configMenu from '@/views/HomePage/SideBar/views/ConfigPage/pageCofnig';
import BgConfig from '@/views/HomePage/SideBar/views/ConfigPage/views/BgConfig.vue';
import AuthConfig from '@/views/HomePage/SideBar/views/ConfigPage/views/auth-config/AuthConfig.vue';
import PageManage from '@/views/HomePage/SideBar/views/ConfigPage/views/page-manage/page-manage.vue';

type Props = {
	index: string;
};

const props = withDefaults(defineProps<Props>(), {
	index(props) {
		return configMenu[0].key;
	},
});
</script>

<style lang="scss" scoped></style>
