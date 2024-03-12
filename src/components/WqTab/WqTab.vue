<template>
	<div ref="wqTabs" class="wq-tab">
		<template v-for="tab in tabs" :key="tab">
			<div class="tab-item" :class="{ ac: tabActive === tab.key }" @click="tabActive = tab.key">{{ tab.value || tab.key }}</div>
		</template>
		<!--		<div class="item" :class="{ ac: active == 2 }" @click="active = 2">item2</div>-->
		<div
			class="bg"
			:style="{
				width: bgWidth + 'px',
				left: bgLeft + 'px',
			}"
		></div>
	</div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { Tab } from '@/components/WqTab/wqTabType';

type Props = {
	tabs: Tab[];
	active: string;
};

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['update:active']);

const tabActive = computed<string>({
	get() {
		return props.active;
	},
	set(newValue) {
		// 改变值
		emit('update:active', newValue);
	},
});
// wqTabs 元素
const wqTabs = ref();
// bg宽度
const bgWidth = ref<number>(0);
// bg 位置
const bgLeft = ref<number>(0);
watch(
	tabActive,
	(newValue, oldValue) => {
		// 改变背景
		nextTick(() => {
			const tabIndex = props.tabs.findIndex((item) => item.key === newValue);

			if (tabIndex >= 0) {
				/**
				 * 当找到值时
				 * 1. 找到相应的元素
				 * 2. 获取元素的当前位置以及大小
				 * 3, 将bg大小进行调整 并移动到相应的位置
				 */
				nextTick(() => {
					const tabs: Element[] | any = wqTabs.value.querySelectorAll('.tab-item');
					if (!tabs || !tabs.length) {
						// 若没有找到tab
						console.error('tab dom find error');
						return;
					}
					const tab = tabs[tabIndex];
					bgLeft.value = tab.offsetLeft as number;
					bgWidth.value = tab.clientWidth;
					// console.log('value', bgLeft.value, bgWidth.value);
				});
			} else {
				// 没有找到值的时候找default
				const defaultTab = props.tabs.find((item) => item.default);
				tabActive.value = defaultTab?.key || props.tabs[0].key;
			}
		});
	},
	{ immediate: true }
);
</script>
<style scoped lang="scss">
.wq-tab {
	//width: 500px;
	//height: 50px;
	//width: 100%;
	margin: auto;
	display: flex;
	align-items: center;
	//justify-content: center;
	position: relative;
	border-radius: 25px;
	border: 1px solid #dfe4ea;
	overflow: hidden;

	.tab-item {
		flex: 1;
		text-align: center;
		//width: 100px;
		//padding: 0 30px;
		//max-width: 100px;
		height: 40px;
		line-height: 40px;

		position: relative;
		z-index: 2;
		//overflow: hidden;
		cursor: pointer;
		user-select: none;
	}

	.ac {
		color: #fff;
	}
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		//width: 150px;
		height: 50px;
		background: #b2bec3;
		transition: all 0.5s;
	}
}
</style>
