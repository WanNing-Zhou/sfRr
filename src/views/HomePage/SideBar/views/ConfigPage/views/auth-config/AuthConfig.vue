<template>
	<div class="auth-config">
		<login-page v-if="!isLogin"></login-page>
		<user-info-page v-else></user-info-page>
	</div>
</template>

<script setup lang="ts">
import LoginPage from '@/views/HomePage/SideBar/views/ConfigPage/views/auth-config/login-page.vue';
import useUserStore from '@/store/modules/user';
import { computed, onMounted } from 'vue';
import UserInfoPage from '@/views/HomePage/SideBar/views/ConfigPage/views/auth-config/user-info-page.vue';
import { getToken } from '@/utils/auth';

const userStore = useUserStore();
onMounted(() => {
	// 获取token判断以前是否登陆过
	const token = getToken();
	if (token) {
		// 登陆过获取用户信息
		userStore.info();
	}
});

const isLogin = computed(() => {
	return userStore.id;
});
</script>

<style lang="scss" scoped>
.auth-config {
}
</style>
