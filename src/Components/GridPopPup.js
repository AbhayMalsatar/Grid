import React, { useMemo, useRef, useState } from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-charts-enterprise'
import MiniGrid from './MiniGrid';

function GridPopPup() {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '50vh', width: '100%' }), []);
    const GridReff = useRef(null);
    const [style, setStyle] = useState({});
    const [ShowPopup, setShowpopup] = useState([]);
    const [rowData, setRowData] = useState([{ type: 'mood', AccountID: "", AccountName: "" },{ type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }, { type: 'mood', AccountID: "", AccountName: "" }]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'type' },
        {
            field: 'AccountID',
            cellEditor: "agTextCellEditor",
            editable: true
        },
        {
            field: 'AccountName',
            editable: false

        },
        {
            field: 'AccountName',
            editable: false

        },
        {
            field: 'AccountName',
            editable: false

        },
        {
            field: 'AccountName',
            editable: false

        },
        {
            field: 'AccountName',
            editable: false

        },
        {
            field: 'AccountName',
            editable: false

        },
        {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },  {
            field: 'AccountName',
            editable: false

        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            cellDataType: false,
            editable: true,
        };
    }, []);
    return (
        <div style={containerStyle}>
            <div
                style={gridStyle}
                className={
                    "ag-theme-quartz-dark"
                }
            >
                <AgGridReact
                    rowData={rowData}
                    ref={GridReff}
                    onBodyScroll={(e)=>{
                        console.log(e)
                        setStyle({...style, top:style.top + e.top})
                    }}
                    onCellKeyDown={(e)=>{
                        console.log(e)
                        setStyle({top:e.node.rowTop + e.node.rowHeight + 48, left:e.column.left})
                        setShowpopup(!ShowPopup)
                    }}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    singleClickEdit
                />
            </div>
            {ShowPopup == true ?
                <div className='ag-theme-quartz ag-popupag-theme-quartz ag-popup'>
                    <div className='ag-popup-editor ag-ltr ag-popup-child' style={style}>
                        <div
                            tabIndex={1} // important - without this the key presses wont be caught
                        >
                            <input id='searchBar' type='text' />
                            <div
                            style={{ height: '20vh', width: '250px' }}
                            className={
                                "ag-theme-quartz-dark"
                            }
                        >
                            <AgGridReact
                                rowData={[
                                    { "AccountName": "Abhay", "AccountID": 1 },
                                    { "AccountName": "Brijesh", "AccountID": 2 },
                                    { "AccountName": "Pratik", "AccountID": 3 },
                                    { "AccountName": "Priyank", "AccountID": 4 },
                                    { "AccountName": "Rajan", "AccountID": 5 }
                                ]}
                                domLayout='autoHeight'
                                
                                columnDefs={[
                                    {
                                        field: 'AccountID',
                                        headerName: 'Account ID',
                                        editable: false,
                                        width: 100,
                                    },
                                    {
                                        field: 'AccountName',
                                        headerName: 'Account Name',
                                        editable: false,
                                        width: 150,
                                    }
                            
                                ]}
                            
                                singleClickEdit
                            />
                        </div>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}

export default GridPopPup
