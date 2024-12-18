components > agGrid > components > renderer > agButtonRenderer
==============================================================

  1) gridField 설정
  gridField.button ({
    headerName: 'Detail',
    field: 'detail'
    cellRendererParams: {
     name: 'Detail',
     isDisplayCheck: true,
     checkField: 'groupCodeId',
    },
    maxWidth: 100,
  })


2) libs > gridField.ts > button 설정
// _field: gridField 정보
const button = (_field:any) => {
 const default:any = {
  cellDataType: 'string',
  cellStyle: {textAlign: textAlign(_field, 'center'),
  headerClass: headerClass(_field?.required),
  editable: false,
  cellRenderer: AgButtonRenderer
 };
  return uils.marge(_defaulte);
} 
console.log(default);
// cellDataType: 'string',
// cellStyle: textAlign: 'center',
// headerClass: [],
// editable: false,
// cellRenderer: {~~~},
// cellRendererParams: 
//   checkFieldId: 'groupCodeId',
//   isDisplayCheck: true
//   name: Detail

3) AgButtonRenderer설정
const AgButtonRenderer = (props: CustomCellEditorProps) => {
  const {colDef, data} = props;

  // button 노출여부
  let isDisplayCheck = null;
  if(colDef.cellRendererParams.isDisplayCheck) {
    isDisplayCheck = typeOf colDef.cellRendererParams.isDisplayCheck ==='function' ?
      colDef.cellRendererParams.isDisplayCheck(data) : colDef.cellRendererParams.isDisplayCheck;
  }

  if(isDisplayCheck === true) {
    return (
      <div className='ag-cell-button-wrap'>
        <button className={'ag-cell-button'}>
          {utils.has(colDef.cellRendererParams, 'nameField') ? 
            data[colDef.cellRendererParams.nameField] : 
            colDef.cellRendererParams.name
          }
        </button>
      </div>
    );
  } else if(idDisplayCheck === false) {
    return ;
  } else {
    return (
      <div className='ag-cell-button-wrap'>
        <button className={'ag-cell-button}'}>
          {colDef.cellRendererParams ? colDef?.cellRendererParams?.name} : 'hi'}
        </button>
      </div>   
    )
}
