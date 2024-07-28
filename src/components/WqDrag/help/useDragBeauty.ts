const useBeauty = () => {
	var cloneObj = null;
	var offsetX = 0;
	var offsetY = 0;
	var startX = 0;
	var startY = 0;
	let dragBox: any | Node = null;
	var lastDrop = null;
	var axis, _axis;

	const beautifyDragFeedback = (ev: DragEvent) => {
		const previewImage = new Image();
		previewImage.src =
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC';
		const styles = document.createElement('style');
		styles.textContent =
			'[dragging]{position:static!important;box-sizing:border-box!important;margin:0!important;}\
            .drag-obj{position:fixed;left:0;top:0;z-index:999;pointer-events:none;}';
		dragBox = ev.target;
		cloneObj = document.createElement('DIV');
		const fakeObj = dragBox?.cloneNode(true);
		fakeObj.style.width = dragbox.offsetWidth + 'px';
		fakeObj.style.height = dragbox.offsetHeight + 'px';
		fakeObj.style.transform = 'translate3d(0,0,0)';
		fakeObj.setAttribute('dragging', '');
		cloneObj.appendChild(fakeObj);
		cloneObj.className = 'drag-obj';
		dragBox.dragData = {};
	};
};

class DragBeauty {
	constructor() {}
}

const useDragBeauty = () => new DragBeauty();