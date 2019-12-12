import ItemAlignment from './viewmodel/HorizontalItemAlignment.js';
import DirectoryEventHandler from './DirectoryEventHandler.js';
import { selectOne } from './lib/viewExt.js';

export default class DirectoryPresenter {
  /**
   * @param {AbstractItemAlignment} [alignment] 파일 정렬 방식. 기본값: `HorizontalItemAlignment`.
   * @param {HTMLElement} view 파일들을 보여줄 창.
   */
  constructor(alignment, view) {
    this.alignment = alignment || new ItemAlignment();
    this.view = view;
    this.handler = new DirectoryEventHandler(view);

    view.addEventListener('mousedown', (e) => this.handler.onMouseDown(e));
    view.addEventListener('mousemove', (e) => this.handler.onMouseMove(e));
    view.addEventListener('mouseup', (e) => this.handler.onMouseUp(e));
  }

  /**
   * @param {FileViewData[]} list 디렉토리 안의 파일 목록.
   */
  displayList(list) {
    list.forEach((file, i) => {
      // TODO: 추후 rect가 필요 없을 경우 getOrigin으로 바꾸기.
      const rect = this.alignment.getRect(i, this.view.style.width);
      const item = createItem(file, rect.origin);
      item.addEventListener('mousedown', () => selectOne.call(this, '.desktop-item', item));
      item.addEventListener('dblclick', (e) => { this.onOpenItem(this, e, file) });
      this.view.appendChild(item);
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

/**
 * @param {FileViewData} file 아이콘을 생성할 파일 데이터.
 */
function createIcon(file) {
  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.classList.add('icon');
  icon.textContent = file.icon;
  return icon
}

/**
 * @param {FileViewData} data 데스크탑 아이템을 생성할 파일 데이터.
 * @param {Point} origin 
 */
function createItem(data, origin) {
  const item = document.createElement('div');
  item.classList.add('desktop-item');
  item.style.left = `${origin.x}px`;
  item.style.top = `${origin.y}px`;
  item.appendChild(createIcon(data));
  item.appendChild(createLabel(data.file.name));
  return item;
}

function createLabel(name) {
  const label = document.createElement('div');
  label.classList.add('label');
  label.textContent = name;
  return label;
}