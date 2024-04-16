<template>
	<div>
		<div class="en-form-box">
			<wq-title>背景设置</wq-title>
			<wq-upload v-model="bgInfo.url" width="460" height="250" class="icon-upload" />
			<br />
			<div class="en-form">
				<div>
					<el-input v-model="bgInfo.url" placeholder="图片地址"></el-input>
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
import { onMounted, ref, watchEffect } from 'vue';
import WqTitle from '@/components/WqTitle/WqTitle.vue';
import useStore from '@/store/useStore';
import { MessageSuccess } from '@/utils/message';

const { appConfig } = useStore();
const bgInfo = ref({
	type: '',
	url: '',
});

/*const diff = computed(() => {
	console.log('监听到数据了');
	for (let key in bgInfo.value) {
		if (bgInfo.value[key] !== appConfig.Background[key]) {
			return true;
		}
	}
	return false;
});*/

const diff = ref(false);
watchEffect(() => {
	const orgInfo = JSON.stringify(appConfig.Background);
	const curInfo = JSON.stringify(bgInfo.value);
	if (orgInfo !== curInfo) {
		diff.value = true;
	} else {
		diff.value = false;
	}
});

onMounted(() => {
	bgInfo.value = appConfig.Background;
});

const submit = () => {
	// console.log(enF);
	if (bgInfo.value.url) {
		appConfig.setBackgroundData(bgInfo.value);
		MessageSuccess('背景设置成功');
	}
};
</script>

<style scoped></style>
