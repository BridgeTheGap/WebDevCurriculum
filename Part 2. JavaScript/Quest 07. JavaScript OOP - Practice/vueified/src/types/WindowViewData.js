// import FileViewData from './FileViewData.js';
// import { QDirectory } from '../file.js';

class WindowViewData {
  /**
   * 
   * @param {QDirectory} directory 창을 생성할 폴더.
   */
  constructor(directory) {
    this.frame = new DOMRect(0, 0);
    this.directory = directory;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this.directory.name;
  }

  /**
   * @returns {QFile[]}
   */
  get fileList() {
    return this.directory.content;
  }

}

/**
 * @param { number } x 
 * @param { number } y
 * @param { number } width
 * @param { number } height
 * @returns {WindowViewData}
 */
WindowViewData.withFrame = function (x, y, width, height) {
  const obj = new WindowViewData();
  obj.frame = new DOMRect(x, y, width, height);
  return obj;
}

export default WindowViewData;