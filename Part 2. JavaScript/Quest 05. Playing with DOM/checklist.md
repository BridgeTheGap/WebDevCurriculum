## Checklist

- Q: 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
  - `Element.classList`를 통해 얻은 `DOMTokenList` 메소드 호출.
  - Q: IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?
    - `Element.className`의 스트링 조작.
- Q: 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?

  - Q: `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?

  - `var`
    - Function scope.
    - Top-level에서 선언시 global variable 생성.
    - 해당 function의 시작 부분으로 hoisting됨.
  - `let`
    - Block scope.
    - Assignment 전에 사용될 경우 reference error 발생. (TDZ)
