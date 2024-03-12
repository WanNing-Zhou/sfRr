export type Tab = {
	key: string;
	//  非必需, 如果没有将使用key进行替换
	value?: string;
	// 是否为默认选项
    default?: boolean;
};
