<template>
	<div class="store_page">
		<el-row>
			<el-col>
				<div class="top"><wq-tab v-model:active="tabActive" :tabs="tabs"></wq-tab></div>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-input v-model="paginate.name" @keyup.enter="handleSearch" size="large" placeholder="请输入要查找的组件名称">
					<template #suffix>
						<span @click="handleSearch" class="search-btn">
							<svg-icon icon-class="search"></svg-icon>
						</span>
					</template>
				</el-input>
			</el-col>
		</el-row>
		<div ref="listContainRef" class="content-row" @scroll="handleScroll">
			<comp-store :list="compList" group-name="drag-demo"></comp-store>
			<div v-loading="storeLoading.loading.value" class="content-bottom">
				<div v-if="loadOver">已经到底了</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="tsx">
import WqTab from '@/components/WqTab/WqTab.vue';
import tabs from '@/views/HomePage/SideBar/views/StorePage/tabsConfig';
import { computed, onMounted, reactive, ref } from 'vue';
import useLoading from '@/hooks/loading';
import CompStore from '@/views/HomePage/SideBar/views/StorePage/CompStore.vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import { getCompList } from '@/api/comp';
import { MessageWarning } from '@/utils/message';

const tabActive = ref('');
const storeLoading = useLoading(false);
// 搜索的值
const compList = ref<any[]>([]);
const paginate = reactive({
	page: 1,
	pageSize: 20,
	total: 100,
	name: '',
});

// 是否加载完成
const loadOver = computed(() => {
	const { page, pageSize, total } = paginate;
	const current = page * page;
	if (current > total) {
		return true;
	}
	return false;
});
const getList = async () => {
	storeLoading.setLoading(true);
	try {
		const res = await getCompList(paginate);
		const resData = res.data;
		const list = resData.list || [];
		list.forEach((item: any) => {
			item.key = item.id;
			delete item.id;
		});
		paginate.total = resData.total || 0;
		// console.log(res);
		compList.value = [...compList.value, ...list];
		paginate.page += 1;
	} catch (err) {
		MessageWarning(err);
	} finally {
		storeLoading.setLoading(false);
	}
};
const handleSearch = () => {
	paginate.page = 0;
	// searchStr.value = inputValue.value;
	// console.log(searchStr.value);
	getList();
	compList.value = [];
};

const listContainRef = ref();
const handleScroll = () => {
	const scrollContainer = listContainRef.value;
	if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
		if (!loadOver.value) {
			getList();
		}
	}
};
onMounted(() => {
	getList();
});
</script>

<style lang="scss" scoped>
.store_page {
	margin-right: 30px;
	display: flex;
	flex-direction: column;
	height: 100%;

	.el-row {
		margin-bottom: 20px;
	}
	.el-row:last-child {
		margin-bottom: 0;
	}
	.el-col {
		border-radius: 4px;
	}
	.search-btn {
		cursor: pointer;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.content-row {
		min-width: 500px;
		min-height: 150px;
		//background: #646cff;
		flex-grow: 1;
		overflow-y: auto;

		.content-bottom {
			width: 100%;
			text-align: center;
			height: 30px;
		}
	}
}
</style>
