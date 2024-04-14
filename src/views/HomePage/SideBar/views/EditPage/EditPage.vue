<template>
	<div class="edit-page">
		<el-card>
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
				<el-button>重置</el-button>
			</el-form-item>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import useCompEditStore from '@/store/modules/comp/compEdit';
import { computed, watch } from 'vue';
import { CompConfigMsg } from '@/type/cmpConfigMsg';

const ceStore = useCompEditStore();

const configData = computed<CompConfigMsg[]>(() => {
	// console.log('kakaxi', ceStore.compData.config);
	return ceStore.compData.config;
});

// 保存设置
const saveHandle = () => {
	ceStore.saveEdit(configData.value);
};

// 预览设置
const previewHandle = () => {
	ceStore.previewEdit(configData.value);
};

// 重置设置
const resetHandle = () => {
	ceStore.resetEdit();
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

<style scoped>
.edit-page {
	min-width: 500px;
}
</style>
