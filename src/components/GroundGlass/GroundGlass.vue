<!--毛玻璃组件-->
<template>
	<div :style="groundGlassStyle" class="wq-ground-glass">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	groundGlassStyle: {
		type: Object,
		default: () => ({
      height: '200px',
    }),
	},
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
	backdrop-filter: blur(5px);
}
</style>
