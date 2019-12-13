import DirectoryPresenter from './DirectoryPresenter.js';
import { QDirectory } from './lib/file.js';
import FileViewData from './viewmodel/FileViewData.js';
import DirectoryEventHandler from './DirectoryEventHandler.js';

/**
 * 발생 이벤트가 해당 DOM Element 내에서 이루어졌는지 판단.
 * - Precondition: 좌표계가 같은지 여부는 caller에서 확인.
 * @param {Event} 
 * @returns {boolean} 
 */
Element.prototype.isEventInBounds = function (event) {
  const location = new DOMPoint(event.clientX, event.clientY);
  return this.getBoundingClientRect().containsPoint(location);
};

const presenterList = [];

export default class DesktopPresenter extends DirectoryPresenter {

  constructor(view) {
    super(null, view);
  }

  /**
   * 데스크탑에 디렉토리 창을 하나 띄움.
   * @param {QDirectory} dir 열 디렉토리.
   * @param {FileViewData[]} content 디렉토리 내의 파일들. `dir.content`에 대응.
   */
  displayDirectory(dir, content) {
    const view = createDirectoryWindow(dir);
    // TODO: onClose 연결은 어떻게?
    const presenter = new DirectoryPresenter(null, view);
    const handler = new DirectoryEventHandler(this.view, '.window');

    presenter.onClose = (p, e) => { this.onClose(p, e); };
    presenter.onOpenItem = (p, e, d) => { this.onOpenItem(p, e, d); };
    presenter.displayList(content);

    const titleBar = view.querySelector('.title-bar');
    view.addEventListener('mousedown', (e) => {
      if (!titleBar.isEventInBounds(e)) return;
      handler.onMouseDown(e);
    });
    view.addEventListener('mousemove', (e) => {
      if (!titleBar.isEventInBounds(e)) return;
      handler.onMouseMove(e);
    });
    view.addEventListener('mouseup', (e) => {
      if (!titleBar.isEventInBounds(e)) return;
      handler.onMouseUp(e);
    });

    presenterList.push(presenter);
    this.view.appendChild(view);
  }
}

/**
 * @param {QDirectory} dir 생성할 뷰의 디렉토리.
 */
function createDirectoryWindow(dir) {
  const origin = getNewWindowOrigin();
  const view = document.createElement('div');
  view.className = 'window';
  view.style.left = `${origin}px`;
  view.style.top = `${origin}px`;
  view.appendChild(createDirectoryTitleBar(dir.name));
  // TODO: 헤더 드래그 가능.
  return view;
}

function createDirectoryTitleBar(name) {
  const view = document.createElement('div');
  view.className = 'title-bar';
  view.appendChild(createNameLabel(name));
  view.appendChild(createWindowButtonSet());

  return view;
}

function createNameLabel(name) {
  const nameLabel = document.createElement('div');
  nameLabel.className = 'name';
  nameLabel.textContent = name;
  return nameLabel;
}

function createWindowButtonSet() {
  const closeButton = document.createElement('i');
  closeButton.className = 'material-icons control-button close';
  closeButton.textContent = 'close';

  const controls = document.createElement('div');
  controls.className = 'control'
  controls.appendChild(closeButton);

  return controls;
}

// TODO: 따로 창 관리 클래스로 리팩토링
/**
 * 새로 열리는 창이 이전에 열린 창 기준 좌상단에서 우하단으로 offset된 px 값.
 * 
 * 새로운 창을 추가할 때 `offset += OFFSET_DELTA`
 * TODO: 새로운 창의 우측 또는 하단이 view port의 범위를 벗어날 경우 리셋.
 */
let currentOffset = 0;

function getNewWindowOrigin() {
  const OFFSET_DELTA = 80;
  currentOffset += OFFSET_DELTA;
  return currentOffset;
}