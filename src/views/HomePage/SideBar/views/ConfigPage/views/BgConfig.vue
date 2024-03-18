<template>
	<div>
		<div class="en-form-box">
			<wq-upload v-model="url" width="400" height="250" class="icon-upload" />
			<div class="en-form">
				<div>
					<el-input v-model="url" placeholder="图片地址"></el-input>
				</div>
			</div>
		</div>
		<div class="btn-box">
			<el-button type="text" @click="submit">确认</el-button>
			<el-button type="text">取消</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import WqUpload from '@/components/uploadComp/wqUpload.vue';
import { ref } from 'vue';

const enEmpty = {
	name: '',
	imgUrl: '',
	searchUrl: '',
};

const enForm = ref({
	...enEmpty,
});

const submit = () => {
	console.log(enForm.value);
};

const url = ref('');
</script>

<style scoped></style>