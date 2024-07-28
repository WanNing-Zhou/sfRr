import { computed, reactive, ref } from 'vue';
import { HandleType, Layout, LayoutItem, PropsData } from '../types';
import { avoidCollision, checkLayout, collisionAvoidanceForItems } from './dragerule';
import { calcBoundary, deepClone, findIndexById } from './utils';

const useDrag = (data: PropsData) => {
	/**
	 * 初始化数据
	 */
	const col = ref(Number(data.col));
	const rowH = ref(Number(data.rowH));
	const gutter = ref(Number(data.gutter));
	const isCollision = ref<boolean>(data.isCollision || true);
	const layoutData = ref<Layout>(deepClone(checkLayout(data.data, col.value)));
	const isDragging = ref(false); // 是否拖拽中
	const propsId = ref(''); // 当前操作的item的id
	const dragItem = reactive({ x: 0, y: 0, h: 0, w: 0 }); // 操作item的提示数据

	/**
	 * 操作item的数据
	 */
	const draggingData = computed(() => {
		const { index, data } = findIndexById(layoutData.value, propsId.value);
		return { index, data };
	});

	/**
	 * 开始拖拽，记录当前操作的item的初始数据
	 * @param id 当前操作的item的id
	 */
	const draggableStart = (id: string) => {
		propsId.value = id;
		const { x, y, h, w } = draggingData.value.data;
		dragItem.x = x;
		dragItem.y = y;
		dragItem.h = h;
		dragItem.w = w;
		isDragging.value = true;
	};

	/**
	 * 拖拽中，计算当前操作item的位置/大小，并更新提示数据
	 * @param shiftX 横向移动的距离
	 * @param shiftY 纵向移动的距离
	 * @param colWidth 列宽
	 * @param handleType 操作类型：drag-拖拽、resize-缩放
	 */
	const draggableHandle = (shiftX: number, shiftY: number, colWidth: number, handleType?: HandleType) => {
		const { x, y, h, w } = draggingData.value.data;
		const moveX = Math.round(shiftX / (colWidth + gutter.value));
		const moveY = Math.round(shiftY / (rowH.value + gutter.value));
		if (handleType === 'drag') {
			const newX = x + moveX;
			const newY = y + moveY;
			dragItem.x = calcBoundary(newX, w, col.value);
			dragItem.y = calcBoundary(newY, h);
		}
		if (handleType === 'resize') {
			dragItem.w = w + moveX <= 0 ? 1 : x + moveX > col.value ? col.value - x + w : w + moveX;
			dragItem.h = h + moveY <= 0 ? 1 : h + moveY;
		}
		let newItem = { ...dragItem, id: propsId.value };
		// 判断是否发生碰撞
		const {
			data,
			x: x1,
			y: y1,
		} = isCollision.value
			? collisionAvoidanceForItems(layoutData.value, newItem, col.value)
			: avoidCollision(
					layoutData.value.filter((item) => item.id !== propsId.value),
					newItem,
					col.value
			  );
		newItem = { ...newItem, x: x1, y: y1 };
		dragItem.x = x1;
		dragItem.y = y1;
		data.forEach((item) => {
			if (item.id !== propsId.value) {
				const { index } = findIndexById(layoutData.value, item.id);
				layoutData.value.splice(index, 1, item);
			}
		});
		return {
			newData: data,
			newItem,
		};
	};

	/**
	 * 拖拽结束，更新操作的item的数据到初始化数据中
	 */
	const draggableEnd = () => {
		const { x, y, h, w } = dragItem;
		const { index, data } = draggingData.value;
		const newData: LayoutItem = { ...data, x, y, h, w };
		layoutData.value.splice(index, 1, newData);
		isDragging.value = false;
	};

	/**
	 * 删除item，并更新数据
	 * @param id 当前操作的item的id
	 */
	const removes = (id: string) => {
		propsId.value = id;
		const { index } = draggingData.value;
		layoutData.value.splice(index, 1);
	};

	/**
	 * 当前操作的item的提示数据的样式和布局样式
	 */
	const draggingStyle = computed(() => {
		return {
			xStart: dragItem.x,
			yStart: dragItem.y,
			xEnd: dragItem.x + dragItem.w,
			yEnd: dragItem.y + dragItem.h,
		};
	});

	return {
		layoutData,
		col,
		rowH,
		gutter,
		draggableStart,
		draggableHandle,
		draggableEnd,
		dragItem,
		isDragging,
		draggingStyle,
		removes,
		propsId,
		draggingData,
		isCollision,
	};
};
export default useDrag;
