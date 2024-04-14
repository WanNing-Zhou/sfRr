// 拖拽布局类
export interface DropLayout {
	// 组件id
	id?: string | number;
	// 组件key
	key?: string | number;
	// 占行数
	column: number;
	// 占列数
	row: number;
	// 标题 (目前没啥卵用)
	title?: string;
}

// 位置
export interface DropPosition extends DropLayout {
	// x位置
	x: number;
	// y位置
	y: number;
}
