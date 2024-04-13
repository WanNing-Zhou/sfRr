<template>
	<el-scrollbar height="100%" class="right-page">
		<div class="info-line">
			<div class="info-item"><circul-comp />系统发送</div>
			<div class="info-item"><circul-comp bg-color="#4e6548" /> 组件发送</div>
		</div>
		<el-divider />
		<el-collapse v-model="activeArr">
			<template v-for="(item, index) in msgList" :key="index">
				<el-collapse-item title="Consistency" :name="index">
					<template #title>
						<div class="title-line">
							<circul-comp v-if="!item.type">{{ index + 1 }}</circul-comp>
							<circul-comp v-else bg-color="#4e6548">{{ index + 1 }}</circul-comp>
							<span class="mg-option"
								>option: <span class="option">{{ item.option }}</span>
							</span>
						</div>
					</template>
					<div class="data-box">
						<span>data:</span>
						<div class="data-outline">
							<pre>{{ objToFormatJson(item.data) }}</pre>
						</div>
					</div>
				</el-collapse-item>
			</template>
		</el-collapse>
	</el-scrollbar>
</template>

<script setup lang="ts">
import useDevToolStore from '@/views/dev-tool/devToolStore';
import { computed, ref } from 'vue';
import CirculComp from '@/components/CirculComp/CirculComp.vue';
import { objToFormatJson } from '@/utils/stringfy';

const devStore = useDevToolStore();

const activeArr = ref([]);

const msgList = computed(() => {
	return devStore.msgList || [];
});
</script>

<style lang="scss" scoped>
.right-page {
	border-left: 1px solid #999797;
	max-height: calc(100vh - 60px);
	//overflow-y: auto;

	.info-line {
		display: flex;
		align-items: center;
		.info-item {
			display: flex;
			align-items: center;
			padding: 0 10px;
		}
	}

	.title-line {
		padding-left: 10px;
		display: flex;
		justify-content: center;
		align-items: center;

		.mg-option {
			padding-left: 10px;
			.option {
				background: #dd6b4f;

				padding: 10px;
				border-radius: 4px;
			}
		}
	}
	.data-box {
		display: flex;
		padding: 10px;
		//align-items: center;

		.data-outline {
			flex-grow: 1;
			overflow-x: auto;
			margin-left: 10px;
			padding: 10px;
			border: 1px solid #7d929f;
		}
	}
}
</style>
