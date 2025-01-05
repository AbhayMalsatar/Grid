import React, { memo, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-charts-enterprise';


export default function MiniGrid(props, value, setValue, ref) {
    console.log(props);

    const [HelpSearch, setHelpSearch] = useState(props.value);
    const GridRef = useRef(null);
    const [HelpData, setHelpData] = useState([
        { "AccountName": "Abhay", "AccountID": 1 },
        { "AccountName": "Brijesh", "AccountID": 2 },
        { "AccountName": "Pratik", "AccountID": 3 },
        { "AccountName": "Priyank", "AccountID": 4 },
        { "AccountName": "Rajan", "AccountID": 5 }
    ]);
    const columnDefs = [
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

    ]

    useEffect(() => {
        document.getElementById('searchBar').focus()
    }, [])

    function handleOnKeyDownSearch(e) {
        if (e.key == "Enter" || e.keyCode == 40) {
            e.preventDefault()
            FocusOnGrid()
        }
    }



    function FocusOnGrid() {
        console.log("Callleld At")
        GridRef.current.api.setFocusedCell(0,'AccountID')
    }

    return (
        <div
            tabIndex={1} // important - without this the key presses wont be caught
        >
            <input id='searchBar' type='text' value={HelpSearch} onChange={(e) => { setHelpSearch(e.target.value) }} onKeyDown={handleOnKeyDownSearch} />
            <div
                style={{ height: '20vh', width: '250px' }}
                className={
                    "ag-theme-quartz-dark"
                }
            >
                <AgGridReact
                    rowData={HelpData}
                    domLayout='autoHeight'
                    ref={GridRef}
                    onCellKeyDown={(e)=>{
                        console.log(e)
                        if (e.event.keyCode == 13) {
                            console.log("Row KeyDown")
                            setValue((prev) => {
                                return prev.map((val, index) => {
                                    if (index == props.rowIndex) {
                                        return { ...val, ...e.data }
                                    } else {
                                        return val
                                    }
                                })
                            })
                            props.stopEditing()
                            props.api.tabToNextCell()
                        }
                        
                    }}
                    onRowClicked={(e) => {
                        setValue((prev) => {
                            return prev.map((val, index) => {
                                if (index == props.rowIndex) {
                                    return { ...val, ...e.data }
                                } else {
                                    return val
                                }
                            })
                        })
                        props.api.tabToNextCell()


                    }}
                    columnDefs={columnDefs}
                    singleClickEdit
                />
            </div>
        </div>
    );
};
