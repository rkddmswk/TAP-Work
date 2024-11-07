Axios 영역
1) await apiCommon
-  pathUrl을 따로 설정해주지 않으면 defaultUrl로 들어오고 따로 설정해서 보내주면 해당로직으로 작동한다.



gridSet 
1) validation 체크하기
- validationKey : true 설정
- validationParams : 
ex) cellEditorParams : {
    validationParams : {
      메세지 설정, 로직설정
    }
  }
- valueSetter 설정
ex) params.data[params.colDef.field] = params.newValu;
    return true 
=> 이 로직을 넣어줘야 valueSetter 할때 값을 입력할수있음

2) params
- api: 전체 그리드의 값
- colDef: 선택되어 있는 필드 속성
- column: 각 세로마다 정의되어 있는 , 열
- newValue: 수정된 후의 값
- oldValue: 수정하기 전의 값
  
