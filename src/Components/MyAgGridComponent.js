import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomNumberCellEditor from './CustomizeLib';
import PopupCellEditor from './PopupCellEditor';
import Modal from 'react-bootstrap/Modal';


const MyAgGridComponent = () => {
  const [show, setShow] = useState(false)
  const [rowData] = useState([
    { make: 'Toyota', model: 'Corolla', price: 35000 },
    { make: 'Honda', model: 'Civic', price: 42000 },
    { make: 'Ford', model: 'Focus', price: 30000 }
  ]);

  const [columnDefs, setColDefs] = useState([
    {
      headerName: "Price",
      field: "price",
      editable: true,
      cellEditor: PopupCellEditor, // Use custom number cell editor
      // cellEditor: CustomNumberCellEditor, // Use custom number cell editor
    },
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    {
      headerName: "Sr No.", field: "srNo", editable: true,
      cellEditor: CustomNumberCellEditor,
    },
  ]);

  return (
    <>
      <button onClick={() => setShow(true)}>Open Grid</button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editable Grid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              popupParent={document.body} // Ensure popups are not clipped by modal
            // onCellValueChanged={handleCellValueChanged}
            />
          </div>
        </Modal.Body>
      </Modal>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          popupParent={document.body} // Ensure popups are not clipped by modal
        // onCellValueChanged={handleCellValueChanged}
        />
      </div>
    </>
  );
};

export default MyAgGridComponent;
