<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		xStart: number;
		yStart: number;
		xEnd: number;
		yEnd: number;
	}>(),
	{
		xStart: 0,
		yStart: 0,
		xEnd: 0,
		yEnd: 0,
	}
);
</script>
<template>
	<div class="move-mask">
		<slot>
			<div class="move-mask__default"></div>
		</slot>
	</div>
</template>
<style scoped lang="scss">
.move-mask {
	width: 100%;
	height: 100%;
	grid-area: v-bind(yStart) / v-bind(xStart) / v-bind(yEnd) / v-bind(xEnd);
	z-index: 1;

	&__default {
		height: 100%;
		//border-radius: 6px;
		box-sizing: border-box;
		background-color: #2c7ec2;
		border: 2px solid #2867f979;
		//border-color: #f56f6f;
	}
}
</style>
