import { deselectAll } from './lib/viewExt.js';

// TODO: 좀더 일반화 할 것.
export default class DirectoryEventHandler {

  // FIXME: default value 없애기. (현재는 동작 깨지지 않도록 기본값 제공)
  constructor(view, selector) {
    this.view = view;
    this.selector = selector;
    this.mouseDownElement = null;
    // 아이콘의 좌상단에서 커서가 벗어난 만큼의 `DOMPoint` 값. 
    this.cursorOffset = null;
  }

  onMouseDown(event) {
    event.stopPropagation();

    const location = new DOMPoint(event.clientX, event.clientY);

    for (let item of this.view.querySelectorAll(this.selector)) {
      const frame = item.getBoundingClientRect();
      const isClickInBounds = frame.containsPoint(location);

      if (!isClickInBounds) continue;

      this.mouseDownElement = item;
      this.cursorOffset = new DOMPoint(location.x - frame.x, location.y - frame.y);

      break;
    }

    if (!this.mouseDownElement) { deselectAll.call(this, this.selector); };
  }

  onMouseUp(event) {
    event.stopPropagation();

    this.mouseDownElement = null;
    this.cursorOffset = null;
  }

  onMouseMove(event) {
    if (!this.mouseDownElement) return;

    event.stopPropagation();

    const viewFrame = this.view.getBoundingClientRect();
    const left = event.clientX - this.cursorOffset.x - viewFrame.x;
    const top = event.clientY - this.cursorOffset.y - viewFrame.y;
    this.mouseDownElement.style.left = `${left}px`;
    this.mouseDownElement.style.top = `${top}px`;
  }

}