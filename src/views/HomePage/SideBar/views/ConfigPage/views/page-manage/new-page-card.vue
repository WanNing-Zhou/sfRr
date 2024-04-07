<template>
	<div>
		<el-card title="新建网页">
			<el-form ref="formRef" :model="formData">
				<el-form-item prop="title">
					<el-input placeholder="请输入网站名称" v-model="formData.title"></el-input>
				</el-form-item>

				<el-form-item prop="title">
					<el-input v-model="formData.info" placeholder="请输入网站名称" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<el-form-item>
				<el-button type="primary" @click="submitHandel">保存</el-button>
				<el-button>重置</el-button>
			</el-form-item>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useConfigStore from '@/store/modules/appCofig';
import useCompStore from '@/store/modules/comp';
import { createPage, CreatePageForm } from '@/api/page';

const configStore = useConfigStore();
const compStore = useCompStore();

const formData = ref<CreatePageForm>({
	title: '',
	info: '',
});

const formRef = ref();

const submitHandel = async () => {
	try {
		formData.value.data = {
			config: configStore.Background || {},
			comps: compStore.CompPanel || {},
		};
		await createPage(formData.value);
	} catch (err) {
		// MessageError('创建失败');
	}
};
</script>

<style lang="scss" scoped></style>