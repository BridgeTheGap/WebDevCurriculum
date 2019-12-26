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
  /**
   * `path`에 있는 directory에 `content`를 넣음.
   * 기존 `path`에 파일들이 있을 경우 덮어씀.
   * @throws {'INVALID_ARGUMENT'} 경로가 directory로 이어지지 않을 경우. 중간 경로에 디렉토리가 없거나 최종 경로가 디렉토리가 아닐 경우.
   * @param {string} path 경로 string. format: `/path/to/set`
   * @param {QFile[]} newContent 경로의 directory에 넣을 파일들.
   */
  setContent(path, newContent) {
    _setContent(path.split('/'), newContent);
    let pathList;
    if (path === '/' || (pathList = path.split('/')).length <= 1) {
      this.content = newContent;
    } else {
      const index = this.content.indexOf((file) => {
        if (!file instanceof QDirectory) return false;
        if (file.name === pathList[0]) return true;
        return false;
      });

      if (index === -1) throw 'INVALID_ARGUMENT';

      const nextPath = pathList.slice(1).join('/');
      this.content[index].setContent(nextPath, newContent);
    }
  }
}

// TODO: Factory 펑션 하나로 합치는 게 나을 거 같은..
QDirectory.fromJSON = function (json) {
  const { name, type } = json;

  if (!name || typeof name !== 'string') throw 'INVALID_ARGUMENT';
  if (!type || type !== FileType.DIRECTORY) throw 'INVALID_ARGUMENT';

  return new QDirectory(String(name));
}
