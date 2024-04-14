<template>
	<el-card>
		<el-form :rules="rules" ref="form" label-width="auto" :model="formData">
			<el-form-item label="用户名" prop="name">
				<el-input v-model="formData.name" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item label="电话">
				<el-input v-model="formData.mobile" placeholder="请输入电话号码" />
			</el-form-item>
			<el-form-item label="个人简介">
				<!--			<el-text></el-text>-->
				<el-input v-model="formData.introduction" type="textarea" />
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
	name: string;
	mobile: string;
	introduction: string;
}

const formData = reactive<RuleForm>({
	name: userStore.name as string,
	mobile: userStore.mobile as string,
	introduction: userStore.introduction as string,
});

const rules = reactive<FormRules<RuleForm>>({
	name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			userStore.$patch({ ...formData });
			try {
				await userStore.updateInfo();
				MessageSuccess('用户信息更新成功');
			} catch (err) {
				// console.log(err);
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
