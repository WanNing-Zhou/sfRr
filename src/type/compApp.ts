import { DropLayout, DropPosition } from '@/type/dropLayout';
import { DragItem } from '@/type/dragdrop';

export interface CompApp extends DragItem {
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
	preview_url?: string;
	// 设置信息
	config?: any;
};