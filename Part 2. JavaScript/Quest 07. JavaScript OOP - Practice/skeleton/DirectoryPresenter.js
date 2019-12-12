import FileAlignment from './viewmodel/HorizontalFileAlignment.js';

export default class DirectoryPresenter {
  /**
   * @param {AbstractFileAlignment} [alignment] 파일 정렬 방식. 기본값: `HorizontalFileAlignment`.
   * @param {HTMLElement} view 파일들을 보여줄 창.
   */
  constructor(alignment, view) {
    this.alignment = alignment || new FileAlignment();
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