/**
 * n번째 줄에 해당하는 string을 리턴.
 * @param {number} index 콘솔에 출력할 줄의 index. [1, height]
 * @param {number} height 패턴의 전체 높이.
 * @returns `index`에 해당하는 string.
 */
function getLineN(index, height) {
  const full = 2 * height - 1;
  const pad = height - index;
  return `${' '.repeat(pad)}${'*'.repeat(full - pad * 2)}${' '.repeat(pad)}`;
}

/**
 * 사용자의 입력을 받아서 높이 n의 별을 콘솔에 출력.
 */
function draw() {
  const height = Number(prompt('패턴의 높이를 숫자로 입력하세요.'));

  if (isNaN(height)) {
    alert('숫자 모르심?');
    return;
  }

  for (let i = 1; i <= height; i++) {
    console.log(getLineN(i, height));
  }
}