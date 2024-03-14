import { Tool } from '@/type/tools';
import useStore from '@/store/useStore';

const tools: Tool[] = [
	{
		name: '商店',
		id: 'store',
		icon: 'utils_shop',
		isPage: true,
	},
	{
		name: '设置',
		id: 'config',
		icon: 'config',
		isPage: true,
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
