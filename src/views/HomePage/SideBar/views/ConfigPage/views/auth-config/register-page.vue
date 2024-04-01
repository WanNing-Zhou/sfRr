<template>
	<div class="register-page">
		<wq-title>注册</wq-title>
		<el-form :model="form" label-width="auto" style="max-width: 600px">
			<el-form-item required label="用户">
				<el-input v-model="form.name" placeholder="请输入用户名" clearable></el-input>
			</el-form-item>
			<el-form-item required label="邮箱">
				<el-input v-model="form.email" placeholder="请输入用户邮箱" clearable></el-input>
			</el-form-item>
			<el-form-item required label="密码">
				<el-input v-model="form.password" placeholder="请输入用户密码" clearable type="password"></el-input>
			</el-form-item>
			<el-form-item required label="密码">
				<el-input v-model="rePassword" placeholder="请输入用户密码" clearable type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<div>
					<div class="wq-flex-ac">
						<el-button type="primary" @click="submitHandle">注册</el-button>
						<el-button @click="emits('ok')">返回登陆</el-button>
					</div>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import WqTitle from '@/components/WqTitle/WqTitle.vue';
import { reactive, ref } from 'vue';
import { register } from '@/api/user';
import { MessageSuccess, MessageWarning } from '@/utils/message';

const rePassword = ref('');

const form = reactive({
	name: '', // 用户名
	email: '', // 邮箱
	password: '', // 密码
});

const emits = defineEmits(['ok']);

const submitHandle = async () => {
	// var  = form;
	if (form.password !== rePassword.value) {
		MessageWarning('两次密码不一致');
		return;
	}
	try {
		const res = await register(form);
		MessageSuccess('注册成功');
		emits('ok');
	} catch (err) {
		MessageWarning(err);
	}
};
</script>

<style lang="scss" scoped>
.register-page {
}
</style>
