import { QFile, QDirectory, FileType } from '../../file.js';

/**
 * @param {string} raw JSON string 데이터
 * @returns {string[]} JSON string 데이터 list.
 */
export const stoj = raw => {
  return JSON.parse(raw);
};

/**
 * @param {string[]} list JSON string 데이터 list.
 * @returns {QFile[]}
 */
export const ltof = list => {
  if (!list || !Array.isArray(list)) {
    throw 'INVALID_ARGUMENT';
  }

  return list.map(JSON.parse).map(item => {
    switch (item.type) {
      case FileType.FILE:
        return QFile.fromJSON(item);
      case FileType.DIRECTORY:
        return QDirectory.fromJSON(item);
      default:
        throw 'INVALID_ARGUMENT';
    }
  });
};