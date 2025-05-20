## 작업 내용

> 이번 PR에서 작업한 내용을 간략히 설명해주세요 (이미지 첨부 가능)

- 위치 추가 모달(AddLocationModal) 상태 관리를 컴포넌트 내부 → zustand 전역 상태로 변경
- locationStore에 `isModalOpen`, `openModal`, `closeModal` 추가
- Sidebar에서 "추가하기" 클릭 시 `openModal()` 호출
- App.tsx에서는 `AddLocationModal` 항상 렌더되며 내부에서 열림 여부 판단

## 리뷰 요구사항

> 리뷰어가 특별히 봐주었으면 하는 부분이 있다면 작성해주세요

## 레퍼런스 (선택)
