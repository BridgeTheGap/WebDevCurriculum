import DirectoryPresenter from './DirectoryPresenter.js';

const presenterList = [];

export default class DesktopPresenter extends DirectoryPresenter {

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