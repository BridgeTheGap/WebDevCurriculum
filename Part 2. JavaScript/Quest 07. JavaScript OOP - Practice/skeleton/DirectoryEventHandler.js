import { deselectAll } from './lib/viewExt.js';

export default class DirectoryEventHandler {

  constructor(view) {
    this.view = view;
    this.mouseDownElement = null;
    // 아이콘의 좌상단에서 커서가 벗어난 만큼의 `DOMPoint` 값. 
    this.cursorOffset = null;
  }

  onMouseDown(event) {
    event.stopPropagation();

    const location = new DOMPoint(event.clientX, event.clientY);

    for (let item of this.view.querySelectorAll('.desktop-item')) {
      const frame = item.getBoundingClientRect();
      const isClickInIcon = frame.containsPoint(location);

      if (!isClickInIcon) continue;

      this.mouseDownElement = item;
      // FIXME: 뭔가 잘 안 맞고 있다.
      this.cursorOffset = new DOMPoint(location.x - frame.x, location.y - frame.y);

      break;
    }

    if (!this.mouseDownElement) { deselectAll.call(this, '.desktop-item'); };
  }

  onMouseUp(event) {
    event.stopPropagation();

    this.mouseDownElement = null;
    this.cursorOffset = null;
  }

  onMouseMove(event) {
    if (!this.mouseDownElement) return;

    const left = event.clientX - this.cursorOffset.x;
    const top = event.clientY - this.cursorOffset.y;
    this.mouseDownElement.style.left = `${left}px`;
    this.mouseDownElement.style.top = `${top}px`;
  }

}