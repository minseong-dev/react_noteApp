# 📝 Note App with Redux Toolkit & React

> 간단한 노트 작성 앱  
> React + Redux Toolkit 기반으로 전환한 프로젝트입니다.  
> 기존의 useReducer + Context 구조를 Redux로 리팩토링하였습니다.  
> https://note-app-minseong.vercel.app/

<br>

## 📂 프로젝트 구조

```bash
src/
├── components/         # 재사용 가능한 UI 컴포넌트 (Header, Button, NoteItem 등)
├── features/           # Redux slice, reducer, action 정의
├── pages/              # 라우팅되는 페이지 컴포넌트 (Home, Note)
├── App.jsx             # 메인 라우팅 설정, 초기화 로직
├── main.jsx            # ReactDOM 설정 및 Provider 연결
└── store.js            # Redux store 설정
```

<br>

## 🛠️ 사용 기술

-   **React** (with Vite)
-   **Redux Toolkit**
-   **React Router**
-   **Styled-components**
-   **LocalStorage** (데이터 유지용)

<br>

## ✅ 기능 소개

-   노트 작성, 수정, 삭제
-   검색 기능 (제목, 내용 포함)
-   최신순 / 오래된순 정렬
-   Redux를 통한 전역 상태 관리
-   LocalStorage에 자동 저장

<br>

## 🔄 주요 리팩토링 포인트

| 변경 전 (Context + useReducer)                | 변경 후 (Redux Toolkit)         |
| --------------------------------------------- | ------------------------------- |
| NoteStateContext / NoteDispatchContext로 분리 | Redux store를 통해 전역관리     |
| props로 콜백함수전달                          | dispatch 직접호출               |
| 상태변화 시 로컬스토리지 직접저장             | slice 내부에서 side effect 처리 |

<br>
<br>

---

<br>
<br>

## ❓ Redux Toolkit에서 immer 방식을 사용하지 않은 이유

Redux Toolkit은 내부에 Immer가 내장되어 있어,  
불변성을 직접 신경 쓰지 않고도 `state.push()`와 같은 코드를 사용할 수 있습니다.

하지만 이 프로젝트에서는 다음과 같은 이유로 Immer 스타일을 사용하지 않았습니다.

### 📌 1. 기존 코드 스타일과의 일관성

-   프로젝트 초기에는 `useReducer` + `Context API` 기반으로 상태를 관리했으며,  
    `spread 연산자`, `Array.map`, `Array.filter` 등을 활용해 명시적으로 불변성을 관리하던 방식이었습니다.
-   Redux 도입 이후에도 기존과 동일한 스타일을 유지하면 이해하기 쉽고, 유지보수도 간편합니다.

### 📌 2. 명확한 상태 변경 흐름

-   Immer는 Proxy를 활용한 내부 동작 덕분에 간단하게 사용할 수 있지만,  
    오히려 상태 변경이 암묵적으로 이루어지기 때문에 초보자 입장에서 헷갈릴 수 있습니다.
-   명시적인 불변성 관리는 동작의 흐름이 눈에 보이기 때문에 예측이 쉽고, 디버깅에도 유리합니다.

### 📌 3. 상태 구조가 단순함

-   이 프로젝트에서 상태는 `note 객체의 배열`로 구성되어 있고,
    상태 변경 로직도 간단합니다.
-   복잡한 중첩 객체를 다루지 않기 때문에 Immer의 강점을 크게 활용할 상황이 없었습니다.

### 🔍 비교 예시

| Immer 스타일 사용 예시                      | 명시적인 불변성 방식 예시                                           |
| ------------------------------------------- | ------------------------------------------------------------------- |
| `state.push(newNote)`                       | `return [newNote, ...state]`                                        |
| `const note = state.find(...)` 후 직접 수정 | `return state.map((note) => (note.id === id ? updatedNote : note))` |
| `state.splice(...)`                         | `return state.filter((note) => note.id !== id)`                     |

### ✅ 결론

> Immer는 강력한 기능이지만,  
> **코드의 명시성과 일관성, 디버깅의 편의성**을 위해  
> 이 프로젝트에서는 **명시적인 불변성 관리 방식**을 선택했습니다.

필요에 따라 언제든 Immer 스타일로 전환이 가능하며,  
상태 구조가 복잡해지면 유용하게 활용할 수 있습니다. 👍
