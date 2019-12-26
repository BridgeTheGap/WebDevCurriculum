import FileViewData from './viewmodel/FileViewData.js';
import { QFile, QDirectory } from './lib/file.js';
import DataManager from './DataManager.js';
import Scene from './Scene.js';
import DirectoryPresenter from './DirectoryPresenter.js';

export default class Reactor {
  /**
   * @param {Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.dataManager = new DataManager();
    window.onload = () => {
      loadRoot.call(this);
      setUpDesktop.call(this);
    };
  }

}

async function loadRoot() {
  console.log('loaded!');

  let fileList;

  try {
    fileList = await this.dataManager.loadDirectory('/');
  } catch (e) {
    console.error(e);

    fileList = [
      new QDirectory('foo'),
      new QDirectory('bar'),
      new QFile('baz'),
    ];
    this.dataManager.saveDirectory('/', JSON.stringify(fileList));
    this.dataManager.saveDirectory('/foo', '');
  }

  const viewData = fileList.map((file) => new FileViewData(file));
  this.scene.desktopPresenter.displayList(viewData);
}

function setUpDesktop() {
  this.scene.desktopPresenter.onOpenItem =
    (presenter, event, data) => handleOpen.call(this, presenter, event, data);
}

/**
 * 
 * @param {DirectoryPresenter} presenter 
 * @param {Event} event 더블클릭 이벤트.
 * @param {FileViewData} data 선택된 파일.
 */
function handleOpen(presenter, event, data) {
  if (data.file instanceof QDirectory) {
    // FIXME: QFile parent 구현 후 uncomment
    // data.file.content = await this.dataManager.loadDirectory()
    /* mock code */
    const content = [
      new QDirectory(`foo_in_${data.file.name}`),
      new QFile(`bar_in_${data.file.name}`),
      new QFile(`baz_in_${data.file.name}`),
    ].map(file => new FileViewData(file));
    /* mock code end */
    this.scene.desktopPresenter.displayDirectory(data.file, content);
  } else {
    console.log(`open file ${data.file}`);
  }
}

/**
 * @param {DOMPoint} point 
 * @returns {boolean}
 */
DOMRect.prototype.containsPoint = function (point) {
  return (point.x >= this.x && point.x <= this.x + this.width)
    && (point.y >= this.y && point.y <= this.y + this.height);
};
