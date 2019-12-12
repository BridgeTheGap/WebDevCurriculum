import FileViewData from './viewmodel/FileViewData.js';
import { QFile, QDirectory } from './lib/file.js';
import DataManager from './DataManager.js';

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
      new QFile('bar'),
      new QFile('baz'),
    ]
    this.dataManager.saveDirectory('/', JSON.stringify(fileList));
    this.dataManager.saveDirectory('/foo', '');
  }

  const viewData = fileList.map((file) => new FileViewData(file));
  this.scene.desktopPresenter.displayList(viewData);
}

function setUpDesktop() {
  this.scene.desktopPresenter.onOpenItem = (presenter, event, data) => {
    console.log('open new window here');
    // presenter.displayList(data.file.content);
  };
}