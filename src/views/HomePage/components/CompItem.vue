<template>
	<div class="comp-item" :class="{ eventNone: preView }" style="height: 100%; width: 100%">
		<!--		<WujieVue width="300px" height="300px" name="百度" attr="/kakx" :url="url"></WujieVue>-->
		<!--		<iframe :src="url"></iframe>-->
		<!-- name：应用名称, url：应用地址 -->
		<micro-app style="width: 100%; height: 100%" @mounted="childMounted" :data="childIndo.data" :name="microName" :url="data.url" iframe></micro-app>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { CompApp } from '@/type/compApp';

type Props = {
	data: CompApp;
	// 是否为预览模式, (预览模式将添加固定前缀, 保证micro name的唯一)
	preView?: boolean;
};
// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
	preView(props) {
		return false;
	},
});

const microName = computed(() => {
	return (props.preView ? 'pre__' : '') + props.data.id;
});
// 子应用的信息
const childIndo = reactive({
	// 是否完成加载
	isMounted: false,
	data: {
		name: '',
	},
});

/**
 * @description 子应用mounted回掉
 */
const childMounted = () => {
	console.log('老子要尼玛发送数据');
	childIndo.data = { name: '卡卡西' };
};

// import WujieVue from 'wujie-vue3';

// import microApp from '@micro-zoe/micro-app';
//
// microApp.start();
const url = 'http://127.0.0.1:8000/index.html';

// const url = 'https://blog.csdn.net/yi0322/article/details/135205436';

/*onMounted(() => {
	testCors()
		.then(() => {
			console.log('request success');
		})
		.catch(() => {
			console.log('request error');
		});
});*/
</script>

<style scoped>
.comp-item {
	&.eventNone {
		pointer-events: none;
	}
}
</style>
