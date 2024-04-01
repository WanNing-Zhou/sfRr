<template>
	<el-card>
		<el-form :rules="rules" ref="form" label-width="auto" :model="formData">
			<el-form-item label="原密码" prop="oldPassword">
				<el-input v-model="formData.oldPassword" placeholder="原密码" />
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input v-model="formData.newPassword" type="password" placeholder="请输入新密码" />
			</el-form-item>
			<el-form-item label="新密码" prop="rePassword">
				<!--			<el-text></el-text>-->
				<el-input v-model="formData.rePassword" type="password" placeholder="再输入新密码" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(form)"> 更新 </el-button>
				<el-button @click="resetForm(form)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import type { FormInstance, FormRules } from 'element-plus';
import { MessageSuccess, MessageWarning } from '@/utils/message';
// const labelPosition = ref<FormProps['labelPosition']>('right');
const userStore = useUserStore();
const form = ref();

interface RuleForm {
	oldPassword: string;
	newPassword: string;
	rePassword: string;
	// introduction: string;
}

const formData = reactive<RuleForm>({
	oldPassword: '',
	newPassword: '',
	rePassword: '',
});

const rules = reactive<FormRules<RuleForm>>({
	oldPassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
	newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
	rePassword: [{ required: true, message: '新密码不能为为空', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
	if (formData.newPassword === formData.rePassword) {
		MessageWarning('两次密码不一致');
		return;
	}
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			try {
				await userStore.resetPassword({ newPassword: formData.newPassword, oldPassword: formData.oldPassword });
				MessageSuccess('修改成功');
			} catch (err) {
				console.log(err);
			}
		} else {
			MessageWarning('表单验证失败，请检查表单');
			// console.log('error submit!', fields);
		}
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style lang="scss" scoped></style>
