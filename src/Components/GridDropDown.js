import React, { useEffect, useLayoutEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { employees } from './Data';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-charts-enterprise'

export default function GridDropDown() {

    function handleOnClickShow() {
        if (document.getElementById('showTableDiv') !== null) {
            if (document.getElementById('showTableDiv').style.display === 'none') {
                document.getElementById('showTableDiv').style.display = 'block'
            } else {
                document.getElementById('showTableDiv').style.display = 'none'
            }

        }
    }

    return (
        <div>
            <InputGroup className="mb-0" style={{ width: "500px" }}>
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2" onClick={handleOnClickShow}><i class="fa-solid fa-caret-down"></i></InputGroup.Text>
            </InputGroup>
            <div
                className="ag-theme-quartz"
                style={{
                    height: '500px',
                    width: '600px'
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        </div>
    )
}
