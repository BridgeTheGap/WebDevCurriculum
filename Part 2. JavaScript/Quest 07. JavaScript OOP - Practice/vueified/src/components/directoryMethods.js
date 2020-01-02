import ItemAlignment from '../types/HorizontalItemAlignment.js';
import { QDirectory } from '../file.js';

const alignment = new ItemAlignment();

export const fileIcon = {
  getX(i) {
    return this.getRect(i).origin.x;
  },
  getY(i) {
    return this.getRect(i).origin.y;
  },
  getRect(i) {
    return alignment.getRect(i, 1000);
  },
  icon(file) {
    return file instanceof QDirectory ? 'folder' : 'note';
  }
};

export const drag = {
  onMouseDownItem({ fileName, $event }) {
    this.content.forEach(item => {
      this.selection[item.name] = item.name === fileName;
    });
    this.clickLoc = new DOMPoint($event.clientX, $event.clientY);
    this.focused = fileName;
    this.$forceUpdate();
  },
  onMouseMoveItem({ $event }) {
    if (!this.focused) return;
    // TODO: Assert this.focusedIndex === sender
    const item = this.origin[this.focused];
    item.x += $event.clientX - this.clickLoc.x;
    item.y += $event.clientY - this.clickLoc.y;
    this.clickLoc = new DOMPoint($event.clientX, $event.clientY);
    this.$forceUpdate();
  },
  onMouseUpItem() {
    this.clickLoc = null;
    this.focused = null;
  },
};