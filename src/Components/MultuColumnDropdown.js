import React, { useLayoutEffect, useRef, useState } from 'react'
import '../App.css'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { employees } from './Data';
import arrow from '../Assets/down.svg'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-charts-enterprise'

export default function MultuColumnDropdown() {
    const [displayGrid, setDisplayGrid] = useState("none");
    const [column, setColumn] = useState([]);
    const [gridApi, setGridApi] = useState();
    const defcoldef = {
        flex : 1,
        width: '150px',
    }
    const gridRef = useRef(null);

    useLayoutEffect(() => {
      document.getElementById('gridID').style.display = "none";
    }, [])

    const GridDisplay = () => {
        if (document.getElementById('gridID').style.display === "block") {
            document.getElementById('gridID').style.display = "none";
        } else {
            document.getElementById('gridID').style.display = "block";
        }
    }    

    function gridReady(params) {
        if (params !== undefined) {
            setGridApi(params)
        } 
        let tempColumnList = []
        Object.keys(employees[0]).map((val)=>{
            tempColumnList.push({
                "field":val,
                'headername' : val
            })
        })
        setColumn(tempColumnList)
    }
  return (
    <div className='App'>
      <InputGroup className="mb-0" style={{ width: "500px" }}>
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" onClick={GridDisplay}><img className='dropdownicon' src={arrow}/></InputGroup.Text>
      </InputGroup>
      <div className='ag-theme-quartz' id='gridID'  style={{height:'300px', width:'900px'}}>
      <AgGridReact
        rowSelection='multiple'
        rowMultiSelectWithClick={true}
        onGridReady={gridReady}
        ref={gridRef}
        defaultColDef={defcoldef}
        rowData={employees}
        columnDefs={column}
        onCellKeyDown={(e)=>{
          console.log(e, "onGridddddd")
        }}
      />

</div>
    </div>
  )
}
