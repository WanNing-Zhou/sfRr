<template>
	<svg :class="className" class="svg-icon" :style="iconStyle" aria-hidden="true">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	// 类名
	className: {
		type: String,
		default: '',
	},
	iconStyle: {
		type: Object,
		default: () => ({}),
	},
	name: {
		//应用的图标名称
		type: String,
		default: '',
	},
});

const iconName = computed(() => {
	return `#icon-${props.name}`;
});
</script>

<style lang="scss" scoped>
svg {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	//fill:black;
	overflow: hidden;
}
</style>
