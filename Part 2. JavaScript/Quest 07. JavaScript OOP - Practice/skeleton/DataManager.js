import { QFile, QDirectory, FileType } from './lib/file.js';
import LocalDatabaseService from './service/database/LocalDatabaseService.js';

export default class DataManager {

  constructor() {
    this.root = window.localStorage.getItem('/');
    this.database = new LocalDatabaseService([stoj, jtof]);
    // this.clearDirectory('/');
  }

  /**
   * 
   * @param {string} path 파일 목록을 불러올 경로.
   */
  async loadDirectory(path) {
    return await this.database.loadContentsAtPath(path);
  }

  saveDirectory(path, content) {
    this.database.writeContentToPath(path, content);
  }

  deleteDirectory(path) {
    this.database.removeFileAtPath(path);
  }

  clearDirectory(path) {
    this.database.writeContentToPath(path, null);
  }

}

const stoj = (raw) => {
  return JSON.parse(raw);
};

const jtof = (json) => {
  if (!json || !Array.isArray(json)) { throw 'INVALID_ARGUMENT' };

  return json.map(JSON.parse).map((item) => {
    switch (item.type) {
      case FileType.FILE:
        return QFile.fromJSON(item);
      case FileType.DIRECTORY:
        return QDirectory.fromJSON(item);
      default:
        throw 'INVALID_ARGUMENT';
    }
  })
};