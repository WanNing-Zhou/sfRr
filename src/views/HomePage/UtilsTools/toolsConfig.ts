import { Tool } from '@/type/tools';
import useStore from '@/store/useStore';

const tools: Tool[] = [
	{
		name: '商店',
		id: 'store',
		icon: 'utils_shop',
	},
	{
		name: '设置',
		id: 'config',
		icon: 'config',
	},
	{
		name: '编辑',
		id: 'edit',
		icon: 'utils_edit',
		isPage: false,
		callback() {
			const { pageVisible } = useStore();
			pageVisible.setPrePanelVisible(true);
		},
	},
];

export default tools;
