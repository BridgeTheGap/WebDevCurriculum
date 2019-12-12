import { QFile, QDirectory } from '../lib/file.js';
import { Point } from '../lib/dimen.js';

export default class FileViewData {

  /**
   * 
   * @param {QFile} file 파일 또는 디렉토리.
   * @param {Point} [location] 아이콘의 초기 위치.
   */
  constructor(file, location) {
    this.file = file;
    this.location = location;
  }

  /**
   * @returns 아이콘 url.
   */
  get icon() {
    return (this.file instanceof QDirectory)
      ? 'folder'
      : 'note';
  }

  toString() {
    return `FileViewData { file: ${this.file}, location: ${this.location} }`;
  }
}