import { DropLayout, DropPosition } from '@/type/dropLayout';

export interface CompApp {
	// 名称
	title: string;
	// 默认位置
	defaultDrop: DropLayout;
	// 当前位置
	curDrop?: DropPosition;
	// 组件地址
	url: string;
	// 组件id
	id?: string;
	// 组件key
	key: string;
	// 预览图地址
	previewUrl?: string;
};