import DatabaseService from './DatabaseService.js';

export default class LocalDatabaseService extends DatabaseService {
  /**
   * @param {[(previousResult: Object) => Object]} converterList 데이터를 변환하는 플러그인.
   */
  constructor(converterList) {
    super();
    this.storage = window.localStorage;
    this.converterList = converterList;
  }

  loadContentsAtPath(path) {
    const result = this.converterList.reduce(
      (val, f) => f(val),
      this.storage.getItem(path));

    return Promise.resolve(result);
  }

  writeContentToPath(path, content) {
    this.storage.setItem(path, content);
  }

  removeFileAtPath(path) {
    this.storage.removeItem(path);
  }

  hasFileAtPath(path) {
    return this.storage.getItem(path) !== null;
  }
}
