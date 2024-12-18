components > agGrid > components > renderer > agDatePicker
==============================================================

1) gridField 설정
gridField.date({
  headerName: 'Period From',
  field: 'periodFrom',
  width: 150,
  validationKey: true, // 유효성검사
  // 셀의 값이 변경될대 호출되는 함수
  valueSetter: (params: any) => {
    const periodFrom = new Date(params.newValue);
    const periodTo = new Date(params.data.periodTo); // 현재 데이터의 periodTo필드를 Date 객체로 변환
    if(periodFrom > periodTo) { // 시작일이 종료일보다 늦은 경우
      params.data._validationError = ['periodFrom','periodTo']; //  유효성 검사 실패시 데이터의 _validationError속성에 문제필드 배열저장
    } else {
      params.data._validationError = [];
    } // 유효성 검사 성공시 빈 배열로 저장
    params.data[params.colDef.field] = params.newValue; // 행 데이터에서 현재 열의값을 새로운 값의 업데이트
    return true;
  }
});


2) libs > gridField.ts > date설정 
const date = (_field : any) => {
  // 날짜필드와 관련된 기본속성 정의
  const default = {
    fieldType: 'date', // 필드의 유형
    cellDataType: 'date', // 셀의 데이터타입
    cellEditor: AgDatePicker, // 셀편집기로 AgDatePicker사용, 날짜 선택 ui
    cellEditorParams: {
      format: 'yyyy-MM-dd',
      type: 'date',
    }, // cellEditor에 매개변수를 전달
    cellEditorPopup : true, // 날짜편집기를 팝업으로 표시
    cellStyle: {textAll: textAlign(_field, 'center')}, // 텍스트 중앙정렬
    headerClass: headerClass(_field?.required), // _field?.required기반으로 headerClass함수 호출
    minWidth: 100,
    defaultValue : '',
    filter: 'agDateColumnFilter', // 날짜 필터링 
    filterParams : {
      debounceMs: 500, // 500ms지연후 필터링 실행
      supperssAndOrCondition: true, // And, Or 조건 비활성화
       // 필터값과 셀 값 간 비교 로직정의
      comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
        if(cellValue == null){
          return 0;
        }
        // 날짜 비교로직
        // cell 값이 null일 경우 0을 반환
        if(cellValue < utils.dayFormat(filterLocalDateAtMidnight)){
          return -1;
        // 필터로직보다 셀값이 작으면 -1
        } else if(cellValue > utils.dayFormat(filterLocalDateAtMidnight)){
          return 1;
        // 필터로직보다 셀값이 크면 1
        } else{
          return 0;
        }
        // 같으면 0
        return utils.merge(_data, _field);
        // 반환값을 병합
    };
    
    
  
03) agDatePicker설정
const AgDatePicker = (props: CustomCellEditorProps) => {
  const {value, onValueChange, stopEditing, colDef} = props;

  const onChangeHandler = (date: any) => {
    onValueChange (
      date === null ? null : utils.dayFormat(date, colDef.cellEditorParams.format.toUppercase())
    );
    stopEditing();
  }
  
  return (
    <DatePicker
      selected = {value ? new Date(value) : null}
      showIcon
      open
      isClearable
      closeOnScroll
      onChange = {onChangeHandler}
      dateFormat = {colDef.cellEditorParams.format}
    />
  )
}
  

    
























    
  }
}
