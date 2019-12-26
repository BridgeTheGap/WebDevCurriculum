export class Point {
  /**
   * @param {number} x 아이콘의 좌상단 x.
   * @param {number} y 아이콘의 좌상단 y.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Size {
  /**
   * @param {number} width 넓이
   * @param {number} height 높이
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

export class Rect {
  /**
   * @param {Point} origin 좌상단 위치.
   * @param {Size} size 크기.
   */
  constructor(origin, size) {
    this.origin = origin;
    this.size = size;
  }
}
