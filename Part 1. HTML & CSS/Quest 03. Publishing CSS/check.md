### Check

- CSS 퍼블리싱을 할 때, class와 selector들은 어떤 식으로 정리하는 것이 좋을까요?

* 일단 화면의 상단부터 하단, 좌에서 우, 포함 범위가 큰 순서 -> 작은 순서를 적용.
* 엘리먼트처럼 specificity가 낮은 것부터 (일반적 적용) class처럼 개별 적용 순서.
* 적용 대상이 많은 것부터 적은 순서.

### Question

1. HTML이 이전에는 문서였지만 과연 웹앱을 문서라고 억지로 정의할 수 있을까?

   - HTML은 semantics, CSS는 presentation으로 분리하기엔 CSS가 너무 제한적인 것도 있고 HTML에 애초에 block vs. inline 구분이 있다. HTML에서 presentation을 분리한다기보다는 HTML에서 `class`로 적용되길 원하는 스타일을 일관되게 요구하고 (단, 스타일의 구현에 대해서는 신경쓰지 않음.) 각 스타일에 대한 구현을 하는 방향이 더 맞을 것 같다.

2. Specificity를 높이는 게 좋은 게 아닐 수 있는 것 같다.
   - 최대한 다른 요소에 영향을 미치지 않게 하기 위해 타겟팅을 해서 CSS rule을 짜다보니 specificity가 낮은 클래스를 억지로 specificity를 높여야 하는 상황이 발생하는 것 같다.
   - 그러면 rule of thumb이 어떻게 될까? 최대한 타겟팅을 해서 처음부터 다른 쪽에서 실수로 룰이 적용되는 것을 방지 vs. 최소한 필요한 것만 타겟팅하고 필요에 따라 specificity 높이기.
   - ex 1.
     ```css
     .dir-content .file-list > .item > a.path {
       /* something */
     }
     ```
     ```css
     .file-list a {
       /* something */
     }
     ```
