export type Tool = {
	// 配置名称
	name: string;
	// 图标
	icon: string;
	// 唯一标识
	id: string;
	// 是否打开抽屉
	isPage?: boolean;
	// 回掉方法
	callback?: () => void;
};
