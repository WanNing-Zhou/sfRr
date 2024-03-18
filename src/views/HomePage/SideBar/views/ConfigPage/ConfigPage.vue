<template>
	<el-container style="height: 100%; width: 600px">
		<!--没有使用el-aside, 因为这个不能自适应宽度-->
		<div class="page-aside">
			<el-menu ref="menu" :default-active="activeKey" :collapse="isCollapse" class="config-menu" :collapse-transition="false" @select="menuSelect">
				<template v-for="item in configMenu" :key="item.key">
					<el-menu-item :index="item.key">
						<el-icon>
							<!--						<setting />-->
							<svg-icon :icon-class="item.icon"></svg-icon>
						</el-icon>
						<template #title>{{ item.name || item.key }}</template>
					</el-menu-item>
				</template>
			</el-menu>
			<div class="aside-switch">
				<span class="side-switch-show" @click="asideClickHandle">
					<span class="aside-switch-icon" :class="!isCollapse ? 'aside-switch-on' : 'aside-switch-off'">
						<!--                <el-icon><ArrowLeftBold/></el-icon>-->
						<el-icon>
							<!--						<setting />-->
							<svg-icon icon-class="rightArrow2"></svg-icon>
						</el-icon>
					</span>
				</span>
			</div>
		</div>
		<el-main class="page-main">
			<ConfigMain :index="activeKey" />
		</el-main>
	</el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import ConfigMain from '@/views/HomePage/SideBar/views/ConfigPage/ConfigMain.vue';
import configMenu from '@/views/HomePage/SideBar/views/ConfigPage/pageCofnig';

const dialogVisible = ref(false);
// 用于控制菜单栏可见性
const isCollapse = ref(false);

// 点击折叠或展开菜单栏
const asideClickHandle = () => {
	if (isCollapse.value) {
		isCollapse.value = false;
	} else {
		isCollapse.value = true;
	}
};
const activeKey = ref(configMenu[0].key);
const menuSelect = (index: string) => {
	console.log(index);
	activeKey.value = index;
};
</script>

<style lang="scss" scoped>
.page-config {
	position: absolute;
	left: 20px;
	height: 30px !important;
	width: 30px !important;
	line-height: 30px;
	bottom: 20px;
	font-size: 24px;
	color: #ffffff;
	text-align: center;
	padding: 5px;
	cursor: pointer;

	&:hover {
		box-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
	}
}

.page-aside {
	position: relative;
	height: 100%;

	:deep(.el-aside) {
		display: inline-block;
		max-height: 500px;
	}

	.config-menu {
		height: 100%;
		overflow: auto;
	}

	.aside-switch {
		position: absolute;
		width: 30px;
		height: 60px;
		overflow: hidden;
		right: -30px;
		top: 50%;
		transform: translateY(-50%);

		.side-switch-show {
			position: absolute;
			text-align: right;
			left: -14px;
			top: 50%;
			transform: translateY(-50%);
			line-height: 60px;
			width: 30px;
			height: 60px;
			font-size: 16px;
			background-color: #a8abb2;
			border-radius: 70%;
			z-index: 0;
			cursor: pointer;
			// 开启3d视图
			transform-style: preserve-3d;

			.aside-switch-icon {
				display: inline-block;
				//transition: all 0.5s;
				//transform-origin: right;
				//transition: transform 0.3s ease-out;
			}

			.aside-switch-on {
			}

			.aside-switch-off {
				transform: rotate(180deg);
			}
		}
	}
}

.page-main {
	max-height: 600px;
	overflow: auto;
}
</style>
