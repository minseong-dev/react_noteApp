# 📝 Note App with Redux Toolkit & React

> 간단한 노트 작성 앱 https://note-app-minseong.vercel.app/  
> React + Redux Toolkit 기반으로 전환한 프로젝트입니다.  
> 기존의 useReducer + Context 구조를 Redux로 리팩토링하였습니다.

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

## 🛠️ 사용 기술

-   **React** (with Vite)
-   **Redux Toolkit**
-   **React Router**
-   **Styled-components**
-   **LocalStorage** (데이터 유지용)

## ✅ 기능 소개

-   노트 작성, 수정, 삭제
-   검색 기능 (제목, 내용 포함)
-   최신순 / 오래된순 정렬
-   Redux를 통한 전역 상태 관리
-   LocalStorage에 자동 저장

## 🔄 주요 리팩토링 포인트

| 변경 전 (Context + useReducer)                | 변경 후 (Redux Toolkit)         |
| --------------------------------------------- | ------------------------------- |
| NoteStateContext / NoteDispatchContext로 분리 | Redux store를 통해 전역관리     |
| props로 콜백함수전달                          | dispatch 직접호출               |
| 상태변화 시 로컬스토리지 직접저장             | slice 내부에서 side effect 처리 |
