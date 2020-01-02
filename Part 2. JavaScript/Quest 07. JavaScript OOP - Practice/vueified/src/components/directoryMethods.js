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
  icon(i) {
    return this.content[i] instanceof QDirectory ? 'folder' : 'note';
  }
};