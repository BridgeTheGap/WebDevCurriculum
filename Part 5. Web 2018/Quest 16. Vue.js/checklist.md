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

  - 단방향 바인딩 vs. 양방향 바인딩에 대한 구분이 의미가 있는가?

    [이 용어에 대한 논의](https://stackoverflow.com/questions/34519889/)가 몇있지만 조금만 상황을 다르게 하면 단방향/양방향 바인딩에 대한 구분이 굉장히 희미해진다.

  1. API에 따른 구분 및 정의는 피상적임
     만약 겉으로 드러나는 syntax로 one-way vs. two-way를 구분한다면 이는 실제적인 방법론이 아니라 인터페이스에 관한 얘기가 되기 때문에 용어 자체를 잘못 사용하는 느낌이다. 즉, `property++` 등의 syntax가 가능하다고 two-way고, UI 키 입력 이벤트 발생시 `onKeyEvent($event)`의 syntax를 사용한다고 one-way binding이라고 하는 것은 API의 차이일 뿐 흔히 말하는 one-way binding의 장점을 주장하기엔 역부족으로 보인다.

     이와 연관지어 과연 two-way binding이라고 하지만 event handler가 없는 경우도 있는가 생각해보면 확실히 API 구분은 더욱 무의미해보인다.
     예를 들어 Vue.js 튜토리얼에

     > `You can use the v-model directive to create two-way data bindings on form input, textarea, and select elements.`

     이런 문구가 있지만 이는 `binder`와 `event handler`을 따로 구현한 것과 같으며, 심지어 커스텀 컴포넌트에서 `v-model` directive를 사용하기 위해서는 template 단계에서 이를 수동으로 구현해줘야 한다고 말하고 있다. 이게 흔히 말하는 "two-way data binding"이 되기 위해서는 해당 컴포넌트가 emit하는 event value를 여과없이 `Vue.data.$property`에 바인딩을 시켜줘야한다. 만약 이 부분을 `console.log($event)`등으로 구현한다든지, 해당 부분에서 `property = sanitize($event)` 등으로 필터링을 해준다면 `<input>` 의 `content`가 session state에 반영이 안 되거나 다소 차이가 생기게 된다. 이런 경우 API는 여전히 `v-model="property"`의 형식을 띄는데 이는 그렇다면 one-way일까 two-way일까?

  2. Business logic의 유무에 따른 판단
     반대로 "데이터가 UI에 반영이 되고 UI에서의 편집이 데이터에 바로 반영이 된다"는 것을 two-way data binding의 정의라고 하면 구조적인 구분은 무의미하다. Redux의 action-reduce를 써도 screen state가 여과없이 session state에 반영되도록 동작하도록 할 수 있는데, 그럼 redux는 경우에 따라 two-way가 되는 것인가?

  - Distributed vs. centralized logic control

    일단 one-way vs. two-way data binding을 explicit한 event handling이 있는지, 즉, API 단계에서 이벤트를 consume하는 함수/아키텍쳐 요소의 유무로 판단을 하는 것으로 가정을 해보고 장단점을 논의하자면 흔히 말하는 one-way data binding의 장점은 방향의 문제보다는 event handler/action-dispatcher 등을 사용하면서 event에 대한 처리가 한 곳에서 이루어져서 로직을 이해하기 쉬운 것으로 보인다.

    Two-way data binding의 경우 cascading update를 tracking하기 어려워서 디버깅이 어렵다고 하지만 state의 변화가 여러 computed property에 영향을 준다든지 기획상 어떤 state의 변화가 다른 state요소와의 조합에 따라 영향을 받는 화면이 많다면 one-way data binding을 사용한다고 획기적으로 state를 업데이트 하지 않아도 된다거나 갑자기 기획이 단순해지지는 않는다. 단, one-way data binding을 사용하면 event handler/reduce/store 등 이벤트를 처리하는 곳이 한 곳이고 이후 state 변화를 view에게 알리거나 view가 감지하는 과정 또한 쉽게 파악할 수 있다는 점이 디버깅을 쉽게 하는 것으로 보인다.

    [AngularJS](https://docs.angularjs.org/guide/databinding)에서는 UI와 state를 sync하기 위해 코드 작성을 계속 해줘야 한다는 것을 one-way data binding의 단점으로 들고 있다.
