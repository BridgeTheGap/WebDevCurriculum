export const FileType = {
  FILE: 'file',
  DIRECTORY: 'directory',
};
// TODO: LL 형태로 parent: QDirectory를 넣자.
export class QFile {
  /**
   * @param {string} name 파일의 이름.
   */
  constructor(name) {
    this.name = name;
  }
  toJSON() {
    return JSON.stringify({
      name: this.name,
      type: FileType.FILE,
    });
  }
  toString() {
    return `QFile: { name: ${this.name} }`;
  }
}

/**
 * @param {Object} json 
 * @returns {QFile}
 * @throws {'INVALID_ARGUMENT'} 
 */
QFile.fromJSON = function (json) {
  const { name, type } = json;
  if (!name || typeof name !== 'string') throw 'INVALID_ARGUMENT';
  if (!type || type !== FileType.FILE) throw 'INVALID_ARGUMENT';

  return new QFile(String(name));
};

export class QDirectory extends QFile {
  constructor(name) {
    super(name);
    this.content = [];
  }
  toJSON() {
    return JSON.stringify({
      name: this.name,
      type: FileType.DIRECTORY
    });
  }
  toString() {
    return `QDirectory: { name: ${this.name} }`;
  }
}

// TODO: Factory 펑션 하나로 합치는 게 나을 거 같은..
QDirectory.fromJSON = function (json) {
  const { name, type } = json;

  if (!name || typeof name !== 'string') throw 'INVALID_ARGUMENT';
  if (!type || type !== FileType.DIRECTORY) throw 'INVALID_ARGUMENT';

  return new QDirectory(String(name));
}
