import DirectoryPresenter from './DirectoryPresenter.js';
import { QDirectory } from './lib/file.js';
import FileViewData from './viewmodel/FileViewData.js';

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
    const view = createDirectoryItem(dir);

    const presenter = new DirectoryPresenter(null, view);
    presenter.onClose = (p, e) => { this.onClose(p, e); };
    presenter.onOpenItem = (p, e, d) => { this.onOpenItem(p, e, d); };
    presenter.displayList(content);

    // FIXME: 디렉토리 창에서의 선택과 데스크탑에서 선택 로직 수정.
    // 1. 바탕화면 탭이 디렉토리 내의 파일도 선택 해제 중.
    // 2. 디렉토리 내의 드래그 좌표가 데스크탑 기준.

    presenterList.push(presenter);
    this.view.appendChild(view);
  }
}

/**
 * @param {QDirectory} dir 생성할 뷰의 디렉토리.
 */
function createDirectoryItem(dir) {
  const origin = getNewWindowOrigin();
  const view = document.createElement('div');
  view.className = 'window';
  view.style.left = `${origin}px`;
  view.style.top = `${origin}px`;
  // TODO: 헤더 넣기 - dir 이름, 닫기 버튼도 넣고 좀 꾸며보자.
  // TODO: 헤더 드래그 가능.
  return view;
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