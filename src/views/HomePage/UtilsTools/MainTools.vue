<template>
	<div class="main-tools">
		<ground-glass>
			<div class="tools">
				<!--
          让这里根据配置文件进行渲染
        -->
				<template v-for="toolItem in tools" :key="toolItem.id">
					<tool-item :tool="toolItem" @click="toolClickHandle(toolItem)"></tool-item>
				</template>
			</div>
		</ground-glass>
	</div>
</template>

<script setup lang="ts">
import GroundGlass from '@/components/GroundGlass/GroundGlass.vue';
import tools from '@/views/HomePage/UtilsTools/toolsConfig';
import ToolItem from '@/views/HomePage/UtilsTools/ToolItem.vue';
import useStore from '@/store/useStore';
import { Tool } from '@/type/tools';

const store = useStore();
const toolClickHandle = (tool: Tool) => {
	if (tool.callback) {
		tool.callback();
	}
	// console.log('被点击了');
	if (!tool.isPage) {
		return;
	} else {
		// 打开页面
		store.pageVisible.openSideDrawer(tool.id);
	}
};
</script>

<style scoped lang="scss">
.main-tools {
	position: fixed;
	bottom: 200px;
	left: 10px;
	//width: 100px;
	height: 100px;
	//background-color: #646cff;
	z-index: 1;
	.tools {
	}
}
</style>
