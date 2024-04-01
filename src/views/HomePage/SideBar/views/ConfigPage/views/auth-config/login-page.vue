<template>
	<el-card class="login-page">
		<div v-if="pageShow === 'login'">
			<wq-title>登陆</wq-title>
			<el-form :model="form" label-width="auto" style="max-width: 600px">
				<el-form-item label="邮箱">
					<el-input v-model="form.email" placeholder="请输入用户邮箱" clearable></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password" placeholder="请输入用户密码" clearable type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<div>
						<div>
							<el-checkbox :checked="rememberPassword" @change="rpChangeHandle"> 记住密码? </el-checkbox>
						</div>
						<div class="wq-flex-ac">
							<el-button type="primary" @click="submitHandle">登陆</el-button>
							<el-button @click="pageShow = 'register'">注册</el-button>
						</div>
					</div>
				</el-form-item>
			</el-form>
		</div>
		<register-page v-if="pageShow == 'register'" @ok="registerCb"></register-page>
	</el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import WqTitle from '@/components/WqTitle/WqTitle.vue';
import RegisterPage from '@/views/HomePage/SideBar/views/ConfigPage/views/auth-config/register-page.vue';
import { login } from '@/api/user';
import { MessageSuccess, MessageWarning } from '@/utils/message';
import useUserStore from '@/store/modules/user';

const loginConfig = useStorage('csm-login-config', {
	rememberPassword: true,
	email: '', // 演示默认值
	password: 'admin', // demo default value
});

const rememberPassword = ref(false);

const form = reactive({
	email: loginConfig.value.email,
	password: loginConfig.value.password,
});

// form.email =

const emits = defineEmits(['ok']);

const pageShow = ref('login');

const registerCb = () => {
	pageShow.value = 'login';
};

const userStore = useUserStore();

const submitHandle = async () => {
	try {
		const res = await userStore.login(form);
		const { email, password } = form;

		loginConfig.rememberPassword = rememberPassword.value;
		loginConfig.value.email = rememberPassword.value ? email : '';
		loginConfig.value.password = rememberPassword.value ? password : '';
		MessageSuccess('欢迎使用');
		emits('ok');
	} catch (err) {
		MessageWarning('请求失败呦');
	}
};

const rpChangeHandle = (val: boolean) => {
	console.log(val);
	rememberPassword.value = val;
};
</script>

<style lang="scss" scoped>
.login-page {
	padding: 10px;
	//border-radius: 10px;
	//background: #dfe4ea;
}
</style>
