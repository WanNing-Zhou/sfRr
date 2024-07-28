import { LayoutItem } from '../types';

class DragStore<T extends LayoutItem & { offsetX: number; offsetY: number; clientX: number; clientY: number }> {
	moveItem = new Map<string, T>();

	set(key: string, data: T) {
		this.moveItem.set(key, data);
	}
	get(key: string): T | undefined {
		return this.moveItem.get(key);
	}
	remove(key: string) {
		this.moveItem.delete(key);
	}
}

export const useDragStore = new DragStore();

/**
 * 判断两个布局项是否重叠
 * @param item1 布局项1的坐标、宽高信息
 * @param item2 布局项2的坐标、宽高信息
 * @returns 如果重叠则返回true，否则返回false
 */
export const isOverlap = ({ x: x1, y: y1, w: w1, h: h1 }: LayoutItem, { x: x2, y: y2, w: w2, h: h2 }: LayoutItem) => {
	return x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2;
};
