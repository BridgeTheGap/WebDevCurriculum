/* eslint-disable no-console */
import {
  stoj as StringConverter,
  ltof as FileConverter
} from './plugins/database/converter.js';
import { QFile, QDirectory } from './file.js';
import Database from './service/database/LocalDatabaseService.js';

const db = new Database([StringConverter, FileConverter]);
db.init = async function () {
  if (db.hasFileAtPath('/')) {
    return await db.loadContentsAtPath('/');
  } else {
    const fileList = [
      new QDirectory('foo'),
      new QDirectory('bar'),
      new QFile('baz')
    ];
    db.writeContentToPath('/', JSON.stringify(fileList));
    return fileList;
  }
};

export default {
  debug: true,
  state: {
    isLoading: false,
    root: null
  },
  async initializeAction() {
    this.state.isLoading = true;
    this.state.root = new QDirectory('');
    this.state.root.setContent('/', await db.init());
    console.log(`${this.state.root}`);
    this.state.isLoading = false;
  },
  /**
   *
   * @param {string} path 파일 목록을 불러올 경로.
   */
  async loadDirectoryAction(path) {
    this.state.isLoading = true;
    this.state.root.setContent(path, await db.loadContentsAtPath(path));
    this.state.isLoading = false;
  },
  saveDirectoryAction(path, content) {
    db.writeContentToPath(path, content);
  },
  deleteDirectoryAction(path) {
    // TODO: Update state
    db.removeFileAtPath(path);
  },
  clearDirectoryAction(path) {
    // TODO: Update state
    db.writeContentToPath(path, null);
  }
};
