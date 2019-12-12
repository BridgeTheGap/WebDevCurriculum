/**
 * `this.view` 안에 있는 HTML class 속성을 변경할 경우 사용할 수 있는 익스텐션.
 */
export function selectOne(selector, item) {
  this.view.querySelectorAll(selector).forEach((element) => {
    if (element === item) {
      element.classList.add('selected');
    } else {
      element.classList.remove('selected');
    }
  });
}

export function deselectAll(selector) {
  this.view.querySelectorAll(selector)
    .forEach((element) => element.classList.remove('selected'));
}
