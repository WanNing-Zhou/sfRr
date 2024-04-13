<template>
	<div class="page-list-card">
		<el-card>
			<el-table :data="tableData">
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column label="地址" width="300">
					<template #default="scope">
						<el-link :href="addQueryToUrl(currentUrl, { page: scope.row.id })" target="_blank">{{
							addQueryToUrl(currentUrl, { id: scope.row.id })
						}}</el-link>
					</template>
				</el-table-column>
				<!--				<el-table-column prop="create_at" label="创建时间">-->
				<!--					<template #default="scope">-->
				<!--						{{ formatToDay(scope.row.create_at) }}-->
				<!--					</template>-->
				<!--				</el-table-column>-->
			</el-table>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import { getPageList } from '@/api/page';
import { addQueryToUrl, getCurrentUrl } from '@/utils/url';

type Props = {
	getListFlag: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	getListFlag(props) {
		return false;
	},
});
const tableData = ref([]);

const currentUrl = getCurrentUrl();
const getData = async () => {
	try {
		const res = await getPageList();
		tableData.value = res.data.list;
	} catch (err) {
		console.log(err);
	}
};

const { getListFlag } = toRefs(props);
watch(getListFlag, () => {
	if (getListFlag.value) {
		getData();
	}
});

onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped>
.page-list-card {
}
</style>