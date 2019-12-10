# Checklist

- Q: 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?

  - ECMAScript 5: 어쨋든 좀 쓸만해짐.
  - ES6: Block-scoped variable, Class, Promise, Symbol, Generator 등
  - ES2016: 마이너 업데이트
  - ES2017: async/await, SharedArrayBuffer

- Q: `let`를 이용하여 변수를 선언하는 것과 `const`를 이용하여 변수를 선언하는 것은 어떻게 다를까요?

  - `var`는 function scope.
  - `let`과 `const`는 block scope. TDZ 존재. 재선언 불가능. Global object에 멤버 변수 생성하지 않음.

- Q: 자바스크립트의 익명 함수는 무엇인가요?
  - 변수에 assign 가능한 function expression 중 내부적으로 사용할 수 있는 이름이 없는 함수.
  - Q: Arrow function
    - Lexical binding: `this`, `super`, `arguments`, `new.target`
