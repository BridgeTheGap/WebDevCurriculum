/**
 * 디렉토리 내의 파일 위치를 계산하는 class.
 */
// TODO: FileAlignment -> ItemAlignment로 이름 변경
export default class AbstractFileAlignment {
  /**
   * @param {number} width 아이콘의 넓이.
   * @param {number} height 아이콘의 높이.
   * @param {number} itemSpacing 정렬 방향 기준 같은 줄의 아이템 간격.
   * @param {number} lineSpacing 정렬 방향 기준 줄 간의 간격.
   */
  constructor(width, height, itemSpacing, lineSpacing) {
    this.width = width;
    this.height = height;
    this.itemSpacing = itemSpacing;
    this.lineSpacing = lineSpacing;
  }

  /**
   * @abstract
   * @param {number} index 전체 목록에서 아이템의 인덱스. [0, n]
   * @param {number} maxWidth 디스플레이 창의 넓이.
   * @returns {Rect} 아이콘을 보여줄 위치의 `Rect`값.
   */
  getRect(index, maxWidth) {
    console.error('subclass');
  }
}
