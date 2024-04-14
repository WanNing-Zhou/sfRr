export type ConfigMenuItem = {
	// 显示名称(可选项, 无则使用key)
	name?: string;
	// 唯一标识
	key: string;
	// 图标
	icon?: string;
};

const configMenu: ConfigMenuItem[] = [
	{
		name: '背景',
		key: 'background',
		icon: 'conMenu_bg',
	},
	{
		name: '账户',
		key: 'user',
		icon: 'conMenu_user',
	},
	{
		name: '网页管理',
		key: 'page',
		icon: 'conMenu_page',
	},
];

export default configMenu;
