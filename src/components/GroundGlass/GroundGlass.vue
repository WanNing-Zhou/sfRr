<!--毛玻璃组件-->
<template>
	<div :style="glassStyle" class="wq-ground-glass">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
	blurSize?: number;
	glassStyle?: any;
};
const props = withDefaults(defineProps<Props>(), {
	blurSize(props) {
		return 20;
	},
	glassStyle() {
		return {};
	},
});
const filterBlur = computed(() => {
	return `blur(${props.blurSize}px)`;
});

const glassStyle = computed(() => {
	return {
		...props.glassStyle,
		backdropFilter: filterBlur.value,
		// zIndex: props.zIndex,
	};
});
</script>

<style lang="scss" scoped>
.wq-ground-glass {
	/*设置布局*/
	//position: relative;
	//box-sizing: border-box;
	padding: 10px;

	/*设置阴影*/
	box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
	/*设置圆角*/
	border-radius: 15px;
	/*设置上边界和左边界亮纹，使card有一种层次感*/
	border-top: 1px solid rgba(255, 255, 255, 0.5);
	border-left: 1px solid rgba(255, 255, 255, 0.5);

	/*设置背景样式*/
	background: rgba(255, 255, 255, 0.1);
	/*让透过card的底部元素模糊化,达到毛玻璃效果*/

	//z-index: 10;
}
</style>
