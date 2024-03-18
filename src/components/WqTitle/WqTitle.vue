<template>
	<div class="wq-title">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
type Props = {
	fontSize?: string;
	lineHeight?: string;
	marginBottom?: string;
};

const props = withDefaults(defineProps<Props>(), {
	fontSize(props) {
		return '18px';
	},
	lineHeight(props) {
		return '20px';
	},
	marginBottom(props) {
		return '20px';
	},
});
</script>

<style scoped>
.wq-title {
	text-align: center;
	width: 100%;
	align-items: center;
	font-size: v-bind(fontSize);
	line-height: v-bind(lineHeight);
	margin-bottom: v-bind(marginBottom);
}
</style>
