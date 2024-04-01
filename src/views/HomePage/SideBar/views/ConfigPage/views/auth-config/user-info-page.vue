<template>
	<div class="user-info-page">
		<el-card>
			<el-row>
				<el-col :span="8">
					<div><wq-upload width="80" height="80" v-model="avatarUrl"></wq-upload></div>
				</el-col>
				<el-col :span="16">
					<div class="info-line">用户名: {{ userStore.name }}</div>
					<div class="info-line">用户ID: {{ userStore.id }}</div>
				</el-col>
				<el-col :offset="8" :span="16">
					<div class="info-line">注册时间: {{ formatToDay(userStore.created_at) }}</div>
					<div class="info-line">
						<el-button type="text" style="outline: 0" @click="userStore.logout()">登出</el-button>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<div class="info-content">
			<div class="tab-box"><wq-tab v-model:active="tabActive" :tabs="tabs"></wq-tab></div>
			<base-info v-if="tabActive === 'baseInfo'" />
			<update-pwd v-if="tabActive === 'updatePwd'" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import WqUpload from '@/components/uploadComp/wqUpload.vue';
import { UserState } from '@/store/modules/user/types';
import useUserStore from '@/store/modules/user';
import WqTab from '@/components/WqTab/WqTab.vue';
import { Tab } from '@/components/WqTab/wqTabType';
import { formatToDay } from '../../../../../../../utils/day';
import BaseInfo from '@/views/HomePage/SideBar/views/ConfigPage/views/auth-config/base-info.vue';
import UpdatePwd from '@/views/HomePage/SideBar/views/ConfigPage/views/auth-config/update-pwd.vue';

const userStore = useUserStore();
const tabs: Tab[] = [
	{ key: 'baseInfo', value: '基础信息' },
	{ key: 'updatePwd', value: '修改密码' },
];
const tabActive = ref('baseInfo');

const userState = ref<UserState>({});

onMounted(() => {
	userStore.info;
});

const avatarUrl = ref(
	computed({
		get() {
			// console.log('userStore.avatar', userStore.avatar);
			return userStore.avatar || '';
		},
		set(value) {
			userStore.$patch({
				avatar: value,
			});
			// console.log(userStore.avatar);
			userStore.updateInfo(); // 更新用户信息
		},
	})
);

onMounted(() => {});
</script>

<style scoped>
.user-info-page {
	width: 100%;
	padding: 10px;

	.info-line {
		line-height: 40px;
	}
	.info-content {
		.tab-box {
			padding: 30px 0;
		}
	}
}
</style>
