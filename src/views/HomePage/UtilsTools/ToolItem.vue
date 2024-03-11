<template>
	<div class="tool-item">
		<el-tooltip :content="tool.name" placement="right">
			<SvgIcon style="outline: 0" :icon-class="tool.icon"></SvgIcon>
		</el-tooltip>
	</div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import { Tool } from '@/type/tools';

type Props = {
	tool: Tool;
};

const prop = defineProps<Props>();
</script>

<style lang="scss" scoped>
.tool-item {
	font-size: 24px;
	cursor: pointer;
	color: #ffffff;
}
</style>