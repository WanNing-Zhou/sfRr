

export interface WqDragItem {
    key: string,
    column: number;
    row: number;
}

export interface WqDragItemData {
	// 组件的唯一标识
	id: number;
	// x轴坐标
	x: number;
	// y轴坐标
	y: number;
	// 组件的宽
	offsetX?: number;
	// 组件的高
	offsetY?: number;
}