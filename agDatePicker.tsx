components > agGrid > components > renderer > agDatePicker
==============================================================

1) gridField 설정
gridField.date({
  headerName: 'Period From',
  field: 'periodFrom',
  width: 150,
  validationKey: true,
  vallu
})


2) libs > gridField.ts > date설정 
const date = (_field : any) => {
  const default = {
    fieldType: 'date', 
    cellDataType: 'date',
    cellEditor: AgDatePicker,
    cellEditorParams: {
      format: 'yyyy-MM-dd',
      type: 'date',
    },
    cellEditorPopup : true,
    cellStyle: {textAll: textAlign(_field, 'center')},
    headerClass: headerClass(_field?.required),
    minWidth: 100,
    defaultVlaue : '',
    filter: 'agDateColumnFilter',
    filterParams : {
      debounceMs: 500,
      supperssAndOrCondition: true,
      comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
        if(cellVlaue == null){
          return 0;
        }
        if(cellValue < utils.dayFormat(filterLocalDateAtMidnight)){
          return -1;
        } else if(cellValue < utils.dayFormat(filterLocalDateAtMidnight)){
          return 1;
        } else{
          return 0;
        }
        return utils.merge(_deta, _filed);
    };
    
    
  


    
























    
  }
}
