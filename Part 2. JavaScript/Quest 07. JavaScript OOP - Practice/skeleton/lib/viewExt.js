/**
 * `this.view` 안에 `.icon` HTML class 속성을 가진 경우 사용할 수 있는 익스텐션.
 */
export function selectOne(event) {
  this.view.querySelectorAll('.icon').forEach((element) => {
    if (element === event.target) {
      element.classList.add('selected');
    } else {
      element.classList.remove('selected');
    }
  });
}

export function deselectAll() {
  this.view.querySelectorAll('.icon')
    .forEach((element) => element.classList.remove('selected'));
}
