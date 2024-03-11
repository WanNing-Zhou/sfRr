<template>
	<div class="wq-tab">
		<div class="item" :class="{ ac: active == 1 }" @click="active = 1">item1</div>
		<div class="item" :class="{ ac: active == 2 }" @click="active = 2">item2</div>
		<div class="bg" :class="{ left1: active == 2 }"></div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const active = ref(1);
</script>
<style scoped lang="scss">
.wq-tab {
	width: 500rpx;
	height: 100rpx;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	.item {
		text-align: center;
		width: 250rpx;
		height: 100rpx;
		line-height: 100rpx;
		border: 1px solid #26a69a;
		position: relative;
		z-index: 2;
	}
	.ac {
		color: #fff;
	}
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		width: 250rpx;
		height: 100rpx;
		background: #26a69a;
		transition: all 0.5s;
	}
	.left1 {
		left: 250rpx;
	}
}
</style>
