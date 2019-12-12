import DesktopPresenter from './DesktopPresenter.js';
import Reactor from './Reactor.js';

export default class Scene {
  /**
   * @param {Document} document 기본 도큐먼트.
   */
  constructor(document) {
    this.document = document;
    this.reactor = new Reactor(this);
    this.desktopPresenter = new DesktopPresenter(document.querySelector('.desktop'));
  }
}
