<template>
	<el-scrollbar height="100%" class="left-page">
		<el-card>
			<el-button @click="editHandle">编辑</el-button>
		</el-card>
		<el-divider></el-divider>
		<el-card v-if="isEdit && compUrl">
			<el-form>
				<template v-for="(item, index) in configData" :key="index">
					<el-form-item :label="item.label">
						<el-input v-if="item.type === 'text'" v-model="item.value" :placeholder="item.placeholder || ''"></el-input>
						<el-input v-if="item.type === 'textarea'" v-model="item.value" :placeholder="item.placeholder || ''"></el-input>
						<el-input-number v-if="item.type === 'number'" v-model="item.value" :placeholder="item.placeholder || ''"></el-input-number>
						<el-color-picker v-if="item.type === 'color'" v-model="item.value" show-alpha />
						<el-switch v-if="item.type === 'switch'" v-model="item.value" :placeholder="item.placeholder || ''"></el-switch>
						<el-select v-if="item.type === 'select'" v-model="item.value" ::placeholder="item.placeholder || ''">
							<el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
						</el-select>
					</el-form-item>
				</template>
			</el-form>
			<el-form-item>
				<!--				<el-button type="primary" @click="previewHandle">预览</el-button>-->
				<el-button type="primary" @click="saveHandle">保存</el-button>
				<el-button @click="resetHandle">重置</el-button>
			</el-form-item>
		</el-card>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { CompConfigMsg } from '@/type/cmpConfigMsg';
import useDevToolStore from '@/views/dev-tool/devToolStore';
import { MessageError } from '@/utils/message';

const devStore = useDevToolStore();

const isEdit = computed(() => {
	return devStore.isEdit;
});

const compUrl = computed(() => {
	return devStore.url;
});

const configData = computed<CompConfigMsg[]>(() => {
	console.log('kakaxi', devStore.editConfigData);
	return devStore.editConfigData;
});

const editHandle = () => {
	if (compUrl.value) {
		devStore.editHandle();
	} else {
		MessageError('请输入组件地址');
	}
};

// 保存设置
const saveHandle = () => {
	devStore.saveHandle(configData.value);
};

// 预览设置
const previewHandle = () => {
	devStore.previewHandle(configData.value);
};

// 重置设置
const resetHandle = () => {
	devStore.resetHandle();
};

watch(
	configData,
	() => {
		previewHandle();
		// console.log('configData', configData.value);
	},
	{ deep: true }
);
</script>

<style lang="scss" scoped>
.left-page {
	//border: 1px solid black;
	//box-shadow: ;
	padding: 10px;
	height: 100%;
	margin-left: 20px;
	background: #ffffff;
	border-radius: 4px;
	//background: #535bf2;
	//min-width: 400px;
	//box-shadow: 10px 12px 10px rgba(0, 0, 0, 0.2);
	border-right: 1px solid #999797;
	max-height: calc(100vh - 60px);
}
</style>
