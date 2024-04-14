<template>
	<div class="dev-tool">
		<div class="common-layout">
			<el-container style="height: 100%">
				<el-header height="60px">
					<div class="page-header">
						<h2>
							<span class="header-icon"><svg-icon icon-class="test"></svg-icon></span>微前端应用系统-测试点
						</h2>
					</div>
				</el-header>
				<el-container>
					<el-aside width="400px"><left-page></left-page></el-aside>
					<el-container class="container">
						<el-main><main-page /></el-main>

						<!--						<el-footer>Footer</el-footer>-->
					</el-container>
					<el-aside class="right-aside" width="400px"><right-page /></el-aside>
				</el-container>
			</el-container>
		</div>
	</div>
</template>

<script setup lang="ts">
import LeftPage from '@/views/dev-tool/comps/left-page.vue';
import MainPage from '@/views/dev-tool/comps/main-page.vue';
import RightPage from '@/views/dev-tool/comps/right-page.vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
</script>

<style scoped lang="scss">
@import '@/assets/style/mediaMixin.scss';

.dev-tool {
	height: 100vh;
	width: 100%;
	//display: flex;
	//justify-content: center;
}

.common-layout {
	//margin: 0 auto;
	height: 100%;
	width: 100%;
	background: #f2f3f5;

	.right-aside {
		height: 100vh -60;
	}
	.container {
		width: 100% - 800;
	}

	.page-header {
		height: 58px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #999797;
		background: #ffffff;
		border-radius: 4px;
		.header-icon {
			padding-right: 15px;
			color: #0097e6;
		}
	}
}
</style>
