<!--用于实现侧边栏抽屉-->
<template>
	<div :style="drawerStyle" class="wq_drawer_comp">
		<transition name="wq_drawer">
			<div v-if="visible" class="wq_drawer wq-page-shadow">
				<div
					:style="{
						height: title ? '50px' : '20px',
					}"
					class="drawer_top"
				>
					<div v-if="title" class="title">{{ title }}</div>
					<div class="close-icon" @click="closeHandle">
						<svg-icon icon-class="close" />
					</div>
				</div>
				<div class="drawer_content">
					<el-scrollbar height="100%">
						<slot></slot>
					</el-scrollbar>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

type Props = {
	visible: boolean; // 抽屉可见性
	drawerStyle?: StyleValue;
	title?: string;
};
const props = withDefaults(defineProps<Props>(), {
	visible(props) {
		return false;
	},
	drawerStyle(props) {
		return {
			zIndex: 10,
		};
	},
	title(props) {
		return '';
	},
});

const emits = defineEmits(['close']);
const closeHandle = () => {
	emits('close');
};
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
		min-width: 300px;
		height: 100vh;
		//background-color: #ffffff;
		transition: transform 0.3s;
		background-color: #ffffff;
		padding: 10px;
		border-radius: 4px;

		.drawer_top {
			//display: flex;
			position: relative;
			color: #1a1a1a;

			.title {
				//display: inline-block;
				position: absolute;
				top: 10px;
				left: 50%;
				font-size: 20px;
				transform: translateX(-50%);
			}

			.close-icon {
				position: absolute;
				top: 0;
				right: 0px;
				font-size: 20px;
				cursor: pointer;
			}
		}
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

	.drawer_content {
		height: calc(100% - 50px);
	}

	/**开关样式**/
	.wq_drawer_switch {
		cursor: pointer;
		display: inline-block;
		width: 50px;
		height: 50px;
		//background: #f9f1c7;
	}
	:deep(.el-scrollbar__view) {
		height: 100%;
	}
}
</style>
