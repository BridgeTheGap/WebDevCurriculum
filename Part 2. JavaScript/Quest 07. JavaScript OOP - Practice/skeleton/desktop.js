const FileType = {
  FILE: 'file',
  DIRECTORY: 'directory',
};

class QFile {
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

class QDirectory extends QFile {
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

class Point {
  /**
   * @param {number} x 아이콘의 좌상단 x.
   * @param {number} y 아이콘의 좌상단 y.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Size {
  /**
   * @param {number} width 넓이
   * @param {number} height 높이
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Rect {
  /**
   * @param {Point} origin 좌상단 위치.
   * @param {Size} size 크기.
   */
  constructor(origin, size) {
    this.origin = origin;
    this.size = size;
  }
}

class FileViewData {

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

/**
 * 디렉토리 내의 파일 위치를 계산하는 class.
 */
class AbstractFileAlignment {
  /**
   * @param {number} itemSize 아이콘의 크기.
   * @param {number} itemSpacing 정렬 방향 기준 같은 줄의 아이템 간격.
   * @param {number} lineSpacing 정렬 방향 기준 줄 간의 간격.
   */
  constructor(itemSize, itemSpacing, lineSpacing) {
    this.itemSize = itemSize;
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

/**
 * 좌상단부터 좌->우로 파일을 정렬.
 */
class HorizontalFileAlignment extends AbstractFileAlignment {
  constructor(itemSize = 60, itemSpacing = 10, lineSpacing = 20) {
    super(itemSize, itemSpacing, lineSpacing);
  }
  itemsPerLine(width) {
    // FIXME: 나중에 제대로 고치기 
    return 10;
  }
  getRect(index, maxWidth) {
    const lineIndex = Math.floor(index / this.itemsPerLine(maxWidth));

    const left = index * this.itemSize
      + index * this.itemSpacing;
    const top = lineIndex * this.itemSize
      + lineIndex * this.lineSpacing;

    return new Rect(new Point(left, top), new Size(this.itemSize, this.itemSize));
  }
}

class DirectoryPresenter {
  /**
   * @param {AbstractFileAlignment} [alignment] 파일 정렬 방식. 기본값: `HorizontalFileAlignment`.
   * @param {HTMLElement} view 파일들을 보여줄 창.
   */
  constructor(alignment, view) {
    this.alignment = alignment || new HorizontalFileAlignment();
    this.view = view;
  }

  /**
   * @param {FileViewData[]} list 디렉토리 안의 파일 목록.
   */
  displayList(list) {
    console.log(`display ${list}`);
    list.forEach((x, i) => {
      const rect = this.alignment.getRect(i, this.view.style.width);
      console.log(rect);
      const icon = document.createElement('i');
      icon.classList.add('material-icons');
      icon.classList.add('icon');
      icon.style.left = `${rect.origin.x}px`;
      icon.style.top = `${rect.origin.y}px`;
      icon.textContent = x.icon;
      this.view.appendChild(icon);
    })
  }

}

/**
 * 해당 창 닫기 버튼 클릭 이벤트 listener.
 * @param {DirectoryPresenter} presenter 이벤트를 받은 Presenter.
 * @param {Event} event 클릭 이벤트.
 */
DirectoryPresenter.prototype.onClose = (presenter, event) => { };

/**
 * 파일 더블클릭 이벤트 listener.
 * @param {DirectoryPresenter} 이벤트를 받은 Presenter.
 * @param {Event} 클릭 이벤트.
 * @param {FileViewData} 선택된 파일.
 */
DirectoryPresenter.prototype.onOpenItem = (presenter, event, data) => { };

const presenterList = [];

class DesktopPresenter extends DirectoryPresenter {

  constructor(view) {
    super(null, view);
  }

  /**
   * @param {FileViewData} viewData 새로 띄울 창의 데이터. 
   * assert `viewData.file instanceof QDirectory`
   * @param {HTMLElement} view 새로 띄울 창.
   */
  displayDirectory(viewData, view) {
    const presenter = new DirectoryPresenter(null, view);
    presenter.onClose = (p, e) => { this.onClose(p, e); };
    presenter.onOpenItem = (p, e, d) => { this.onOpenItem(p, e, d); };
    presenter.displayList(viewData.file.content);

    presenterList.push(presenter);
    this.view.appendChild(view);
  }
}

class Scene {
  /**
   * @param {Document} document 기본 도큐먼트.
   */
  constructor(document) {
    this.document = document;
    this.reactor = new Reactor(this);
    this.desktopPresenter = new DesktopPresenter(document.querySelector('.desktop'));
  }
}

class Reactor {
  /**
   * @param {Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.dataManager = new DataManager();
    window.onload = () => { this.loadRoot() };
  }

  async loadRoot() {
    console.log('loaded!');

    let fileList;

    try {
      fileList = await this.dataManager.loadDirectory('/');
    } catch (e) {
      console.error(e);

      fileList = [
        new QDirectory('foo'),
        new QFile('bar'),
        new QFile('baz'),
      ]
      this.dataManager.saveDirectory('/', JSON.stringify(fileList));
    }

    const viewData = fileList.map((file) => new FileViewData(file));
    this.scene.desktopPresenter.displayList(viewData);
  }
}

class DataManager {

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

// DATABASE

class DatabaseService {
  /**
   * 디렉토리 상의 파일 목록을 불러옴. 
   * @param {string} path 경로 string. `/path/to/directory` 형식.
   * @returns {Promise<Object>} `converterList`의 플러그인이 전부 적용된 데이터가 반환.
   * @throws `INVALID_ARGUMENT` 경로에 파일이 없을 경우.
   */
  loadContentsAtPath(path) { throw 'subclass'; }

  /**
   * `String` 형식으로 변환한 데이터를 저장.
   * @param {string} path 경로 string. `/path/to/directory' 형식
   * @param {string} content string 형식으로 변환한 데이터. 형식에 제한이 없으며 converting은 caller의 책임.
   */
  writeContentToPath(path, content) { throw 'subclass'; }

  /**
   * 경로의 파일 또는 디렉토리를 삭제.
   * @param {string} path 삭제할 경로.
   */
  removeFileAtPath(path) { throw 'subclass'; }
}

class LocalDatabaseService extends DatabaseService {
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
}
