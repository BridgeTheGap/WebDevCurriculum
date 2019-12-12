import FileAlignment from './FileAlignment.js';
import { Point, Size, Rect } from '../lib/dimen.js';

/**
 * 좌상단부터 좌->우로 파일을 정렬.
 */
export default class HorizontalFileAlignment extends FileAlignment {
  constructor(itemSize = 60, itemSpacing = 10, lineSpacing = 20) {
    super(itemSize, itemSpacing, lineSpacing);
  }
  itemsPerLine(width) {
    // FIXME: 나중에 제대로 고치기 
    return 10;
  }
  getRect(index, maxWidth) {
    const lineIndex = Math.floor(index / this.itemsPerLine(maxWidth));

    const left = index * this.itemSize
      + index * this.itemSpacing;
    const top = lineIndex * this.itemSize
      + lineIndex * this.lineSpacing;

    return new Rect(new Point(left, top), new Size(this.itemSize, this.itemSize));
  }
}
