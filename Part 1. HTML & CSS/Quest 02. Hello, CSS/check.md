## Checklist

1. CSS를 HTML에 적용하는 세 가지 방법의 장단점은 무엇인가요?
   - External Stylesheet
     - 장점
       - 여러 문서에 동일한 스타일을 적용할 경우 용이함. 재사용성.
       - 의미를 담은 HTML 문서와 표현 방식을 담은 CSS의 물리적인 분리.
     - 단점
       - 재사용을 하는 만큼 디자인이 분기가 될 경우 영향을 받는 페이지를 모두 고려해야함.
       - 빠르게 CSS 적용 방식을 확인하고 싶을 경우 과할 수 있음.
   - Internal stylesheet
     - 장점
       - Ext. stylesheet의 단점이 없음.
     - 단점
       - Ext. stylesheet의 장점이 없음.
   - Inline
     - 장점
       - ??
     - 단점
       - 의미와 표현이 섞임.
       - 문서의 여러 element에 일관되게 스타일을 적용할 수 없음.
       - 암튼 여러모로 별로임.

2. 여러 개의 CSS 규칙이 한 개의 대상에 적용될 때, 어떤 규칙이 우선순위를 가지게 되나요?
   - `!important` > Specificity (`style` attribute > ID > class > element) > 문서 상의 순서
3. 어떤 박스가 `position: absolute;`인 속성을 갖는다면, 그 위치의 기준점은 어디가 되나요?
   - 해당 박스의 부모 중 어느 것도 `position` property를 변경시키지 않으면 viewport.
   - 해당 박스의 부모 중 `position` property를 변경시킨 부모가 있다면 그 부모를 기준으로 속함.
4. 가로나 세로로 여러 개의 박스가 공간을 채우되, 그 중 한 개의 박스만 가변적인 크기를 가지고 나머지 박스는 고정된 크기를 갖게 하려면 어떻게 해야 할까요?
   ```css
   .parent { 
     display: flex;
   }

   .parent .child { 
     (width|height): $(fixed_value);
   }

   .parent .fixed { 
     flex: 1;
   }
   ```
5. `float` 속성은 왜 좋지 않을까요?
   - `clear` 를 안 해주면 레이아웃이 와장창.
   - 다소 예상 밖의 행동을 하는 경우가 있다. (특히 IE6)
6. Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?
   - 

## Question
1. `width|height` 대신 `(inline|block)-size` 또는 `left|right` 대신 `(inline|block)-(start|end)` 를 많이 쓰는가?
