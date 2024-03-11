<!--用于实现侧边栏抽屉-->
<template>
	<div class="wq_drawer_comp">
		<transition name="wq_drawer">
			<div v-show="visible" class="wq_drawer">
				<slot name="content"></slot>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">

type Props = {
	visible: boolean; // 抽屉可见性
};
const props = withDefaults(defineProps<Props>(), {
	visible(props) {
		return false;
	},
});

</script>

<style lang="scss" scoped>
.wq_drawer_comp {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	//background-color: #646cff;
	//width: 400px;

	.wq_drawer {
		border: 1px solid #dcdfe6;
		display: inline-block;
		//position: fixed;
		//top: 0;
		//left: 0;
		width: 300px;
		height: 100vh;
		//background-color: #ffffff;
		transition: transform 0.3s ease-in-out;
		background-color: #1a1a1a;
	}
	.wq_drawer-enter-active,
	.wq_drawer-leave-active {
		//transition: transform 3s ease-in-out;
		transform: translateX(-100%);
	}
	.wq_drawer-enter-active {
		//transition-delay: 0.3s;
	}
	.wq_drawer-enter,
	.wq_drawer-leave-to {
		//transition: transform 2s ease-in-out;
		transform: translateX(-100%);
	}
	/**开关样式**/
	.wq_drawer_switch {
		cursor: pointer;
		display: inline-block;
		width: 50px;
		height: 50px;
		background: #f9f1c7;
	}
}
</style>
