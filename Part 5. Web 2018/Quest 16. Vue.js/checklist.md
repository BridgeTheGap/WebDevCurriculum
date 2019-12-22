## Topics

- Virtual DOM
  - 실제 DOM이 아닌 DOM을 구성하는 node의 정보를 담은 virtual node로 구성된 DOM?

## Checklist

- Q: Vue.js는 어떤 특징을 가지고 있는 웹 프레임워크인가요?

  - View model을 view에서 옵저빙. View model 변화를 감지해서 binding. 단, view에서도 view model을 직접 업데이트 하는 것이 가능하다.
  - HTML에 static/declarative한 요소들, CSS는 style 요소들, JS에는 행동을 넣는다는 입장에서 보면 HTML에 행동을 섞는 행위로 보일 수 있음.
  - 한편 Vue directive는 view model과 view의 바인딩을 주로 담당하는 측면에서 presentation 요소들에 대한 imperative 요소들이기 때문에 아키텍쳐 요소들이 섞이지는 않는 것으로 보임.
  - Vue directive에서 view model에 접근해서 변경이 가능하다는 점은 디버깅을 어렵게 할 요소로 보임. 즉, 컴포넌트에서 받은 이벤트를 한 곳에서 관리를 하는 게 아니라 각자가 view model에 접근할 수 있기 때문에 같은 view model property를 공유하거나 프로그램에서 해당 property를 변경 가능할 경우 둘 중 어느 쪽에서 변화를 일으켰는지 감지하기 힘들다.
  - JSX와 같은 지향점을 반대의 방법으로? Declarative한 HTML에 imperative한 프로그래밍요소를 넣은 것 같다.
  - Element의 attribute에 대한 복제가 view model에 있게 되고 view model을 source of truth로 여김. (바람직하지 않음.)
  - View model property 중 정말 presentation logic에 국한된 값들과 session state/record state에 반영되어야 하는 값들에 대한 구분이 없다.

- Q: Vue.js에서의 컴포넌트란 무엇인가요?

  - 엘리먼트 생성 factory 함수? Builder?
    - Component : binding function
    - Prop : function parameters
    - Template: function body + listener
  - 추후 HTML에서 컴포넌트를 사용할 때 `v-bind:$prop="$value"` 로 바인딩. `$component($prop: $value)`의 함수 호출에 대응.
  - 실제로 만들어지는 DOM element가 뭔지는 알 수 없기 때문에 구현체를 봐야한다는 점은 바람직하지 않음.
  - 결과 HTML에 custom element 또는 customized built-in element가 생성되지 않고 일반 element가 생성된다는 점이 더더욱 `template`와 그 템플릿으로 생성된 element에 데이터 바인딩을 해주는 함수라는 느낌을 갖게 함.
  - `v-for`, `v-if`, prop validation 등도 함수라는 느낌을 줌.

- Q: 컴포넌트 간에 데이터를 주고받을 때 단방향 바인딩과 양방향 바인딩 방식이 어떻게 다르고, 어떤 장단점을 가지고 있나요?

## Question
- `Vue` instance는 결국 무슨 어떤 단위인가?