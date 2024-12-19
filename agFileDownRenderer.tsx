components > agGrid > components > renderer > agFileDownRenderer
===============================================================

1) gridSet 설정
gridField.fileDown({
  headerName: 'Drawing',
  field: 'drawing',
  editable: false, // 값 수정불가능
  cellRendererParams: {
    buttons: [
      {
        type: 'download',
        title: 'PDF',
        uuidColumn: 'pdfFileld', // PDF 파일의 UUID(고유 식별자)를 참조할 필드 이름을 'pdfFileld'로 설정
        // 버튼을 표시할 조건을 정의
        isDisplayCheck(data: any) {
          return ['none', 'updated'].includes(data._rowState) && data.pdfFileId !== null;
        }, // 행 데이터의 _rowState가 none 또는 updated 중 하나일때와 pdf파일이 존재할때
      },
       {
        type: 'download',
        title: 'CAD',
        uuidColumn: 'cadFileld', 
        isDisplayCheck(data: any) {
          return ['none', 'updated'].includes(data._rowState) && data.cadFileId !== null;
        },
      },
    ]
  }
})

2) libs > gridField.ts > fileDown
const fileDown = (_field: any) => {
  const _default: any = {
    cellDataType: 'string',
    cellStyle: {textAlign: textAlign(_field, 'center')},
    headerClass: headerClass(_field?.required), // 필드가 필수인지 여부에 따라 동적으로 클래스 이름 반환
    editable: false,  // 사용자가 수정 불가능
    cellRenderer: AgFileDownRenderer,
    cellRendererParams: {
      buttons: [
        {
          type: 'download',
          title: 'File Download',
          uuidColumn: '',
          isDisplayCheck: true, // 버튼 표시 여부
        },
      ],
    },
  };
  return utils.merge(_detult, _field);
}

3) AgFileDownRenderer 설정
const AgFileDownRenderer = (props:customCellEditorProps) => {
  const {colDef, data} = props;

  const readFiles = (file: any) => {
    if(data[file.uuidColumn]){
      apiFileRead({
        method: 'get',
        search: {uuidGroupCode: data[file.uuidColumn]},
      }).then((res: any) => {
        res.data.forEach((file: any ) => {
          apiFileDownload({
            method: 'post',
            search: {
              mode: 'download',
              fileName: file.saveFileName,
            },
          });
        }),
      });
    }
  };

  if(colDef.cellRendererParams.buttons.length > 0) {
    return (
      <div className="file-download-textbutton-wrap">
        <div className="file-textbutton-container">
          {colDef.cellRendererParams.buttons.map((button: Button, idx: number) => {
            let isDisplayCheck = null;
            if(button.isDisplayCheck) {
              isDisplayCheck = typeof button.isDisplayCheck === 'function' ?
                button.isDisplayCheck(data) : button.isDisplayCheck;
            } else {
              isDisplayCheck = true;
            }

            if(isDisplayCheck){
              return (
                <button key={index} 
                  onClick={() => readFiles(button)}>{button.title}</button>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    )
  }  
} 
