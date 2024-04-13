<template>
	<div class="circular-comp" :class="props.size">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
type Prop = {
	size?: 'small' | 'normal' | 'big';
	bgColor?: string;
	color?: string;
};

const props = withDefaults(defineProps<Prop>(), {
	size: 'normal',
	bgColor: '#3498db',
	color: '#ffffff',
});
</script>

<style scoped>
.circular-comp {
	border-radius: 50%;
	background: v-bind(bgColor);
  text-align: center;
  display: inline-block;
  color: v-bind(color);

	&.normal {
		font-size: 14px;
		line-height: 20px;
		width: 20px;
		height: 20px;
	}
}
</style>
