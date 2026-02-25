# 🍽️ URISIK 
### 알레르기 가족 모두가 안전하게, 
### 한 식탁에서 즐겁게 먹을 수 있도록 돕는 맞춤형 식단 관리 서비스 
<img width="1886" height="1128" alt="1" src="https://github.com/user-attachments/assets/4d1c60af-e55a-4979-9121-08a7d64b6aca" /> 


## 🥕 프로젝트 팀원

| <img src="https://github.com/shooukie.png" width="120" /> | <img src="https://github.com/tablemin03.png" width="120" /> | <img src="https://github.com/jangmk05.png" width="120" /> |
|:---:|:---:|:---:|
| [강민서](https://github.com/shooukie) | [이상민](https://github.com/tablemin03) | [장문경](https://github.com/jangmk05) |

## 🥕 개발 환경 세팅 가이드

```bash
git clone https://github.com/URISIK/FRONTEND.git 
pnpm install
pnpm run dev
```

## 🥕 커밋 컨벤션

각 태그를 이용하여 어떤 내용이 변경되었는지를 나타내는 규칙입니다.

- `[FEAT]` : 새로운 기능 추가  
- `[DESIGN]` : 디자인 수정  
- `[REFACTOR]` : 리팩토링 
- `[BUGFIX]` : 버그 에러 수정
- `[MODIFY]` : 코드 수정 
- `[STYLE]` : 코드 포맷 
- `[CHORE]` : 빌드 수정, 패키지 매니저 설정  
- `[RENAME]` : 파일 혹은 폴더명 수정
- `[REMOVE]` : 파일 혹은 폴더 삭제
- `[MERGE]` : Pull 과정 중 현재 commit과 병합이 일어난 경우
- `[BUILD]` : 새로운 라이브러리 혹은 패키지 추가
- `[DOCS]` : 문서 작성 


## 🥕 브랜치명 정의

브랜치 이름을 지정할 때의 규칙입니다.

- 영어로 통일, 케밥 케이스로 작성
- 작성 형식 : 브랜치 유형/브랜치명/#이슈번호
- 작성 예시
  - feature/login-page/#12
  - docs/README.md/#25


## 🥕 코드 컨벤션

코드에서 이름을 지정할 때의 케이스 규칙입니다.

- `PascalCase` : 컴포넌트 함수, 클래스, 타입, 인터페이스, 컴포넌트 파일  
- `camelCase` : 변수, 일반함수 
- `UPPER_CASE` : 상수
- `kebab-case` : 파일,폴더 (컴포넌트 파일만 예외로  PascalCase로 설정)

### 🥕 api 관련 네이밍 규칙
- api 폴더 내 interface:
    
    응답-타입명+Response / 매개변수: 타입명+Params
    
- 함수: HTTP 메서드 종류+함수명
  
### 🥕 Import/order 규칙

- react가 포함된 import가 가장 최상단에 위치하게 합니다.
- 알파벳을 기준으로 오름차순으로 정렬됩니다.
- 그룹사이에 최소 한 줄 이상의 줄 바꿈을 강제합니다.

### 🥕 Export 규칙

**컴포넌트**: 하단에 `default export`

```tsx
const ProductList = () => {
  return <div>상품 리스트</div>;
};

export default ProductList;
```

**유틸 함수**: 각 함수를 `named export`

```ts
export const fetchItems = () => {
  /* ... */
};

export const updateUser = () => {
  /* ... */
};
```

## 🥕 기술 스택
###  Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />



###  Styling
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />  <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white" />  <img src="https://img.shields.io/badge/React_Spinners-000000?style=for-the-badge" />  <img src="https://img.shields.io/badge/React_Hot_Toast-FF5A5F?style=for-the-badge" />



###  State & Data
<img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge" />  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />  <img src="https://img.shields.io/badge/Immer-000000?style=for-the-badge" />  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge" />



### Date & Utility
<img src="https://img.shields.io/badge/Day.js-FF6C37?style=for-the-badge" />  <img src="https://img.shields.io/badge/React_Day_Picker-3C3C3C?style=for-the-badge" />  <img src="https://img.shields.io/badge/Intersection_Observer-000000?style=for-the-badge" />



### DevTools
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />  <img src="https://img.shields.io/badge/TypeScript_ESLint-3178C6?style=for-the-badge" />  <img src="https://img.shields.io/badge/Vite_SVGR-FFB13B?style=for-the-badge" />



### Package Manager
<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />


## 🥕 기술 / 스택 선정 이유

### React Router
- SPA 환경에서 효율적인 클라이언트 사이드 라우팅 구현
- Protected Route 등을 활용한 인증 기반 접근 제어 가능

### Framer Motion
- 선언형 애니메이션 라이브러리
- 부드러운 인터랙션 및 페이지 전환 효과 구현
- UX 향상을 위한 자연스러운 모션 처리

### Swiper
- 터치 기반 슬라이드 UI 구현에 최적화
- 모바일 친화적인 인터랙션 지원
- 온보딩 / 홈페이지 등에 사용

### React Spinners
- 로딩 상태를 직관적으로 표현하기 위한 경량 로딩 컴포넌트

### React Hot Toast
- 사용자 액션에 대한 즉각적인 피드백 제공
- 전역 에러 처리 및 성공/실패 알림 구현에 적합


### Zustand
- 전역 상태 관리 라이브러리

### TanStack Query
- 서버 상태(Server State) 관리에 특화
- 캐싱, 재요청, 무한 스크롤, 로딩/에러 상태 자동 관리
- API 통신 로직과 UI 로직 분리 가능

### Axios
- HTTP 요청/응답 인터셉터를 통한 토큰 처리 및 전역 에러 핸들링 가능
- REST API 통신에 적합

### Immer
- 불변성을 유지하면서 직관적인 상태 업데이트 가능
- 복잡한 객체 상태 관리 시 가독성 향상

### Zod
- API 요청/응답 데이터의 런타임 유효성 검증
- 타입 안정성과 실제 데이터 검증을 동시에 보장

### Day.js
- 가볍고 직관적인 날짜 라이브러리
- 날짜 포맷팅 및 연산 처리에 사용

### React Day Picker
- 캘린더 UI 구현에 최적화
- 범위 선택(range) 기능 지원

### Intersection Observer
- 무한 스크롤 구현
- 성능을 고려한 Lazy Loading 처리 가능

### Vite SVGR
- SVG 파일을 React 컴포넌트처럼 사용 가능
- 아이콘 재사용성 및 스타일링 편의성 향상



