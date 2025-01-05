import ReactDOM from 'react-dom';
import React from 'react';
import { TextCellEditor } from 'ag-grid-community';
import { Grid } from 'ag-grid-community';
import PopupComp from './PopupComp';

class CustomWithGridPopupCellEditor extends TextCellEditor {
  constructor() {
    super();
    this.isPopupOpen = false;
    this.popupData = [
      { make: 'Toyota', model: 'Corolla', price: 15000 },
      { make: 'Ford', model: 'Focus', price: 18000 },
      { make: 'Honda', model: 'Civic', price: 20000 },
      { make: 'Chevrolet', model: 'Malibu', price: 22000 },
      { make: 'Tesla', model: 'Model S', price: 75000 },
      { make: 'BMW', model: '320i', price: 35000 },
    ];
    this.popupDiv = null;
    this.gridApi = null;
    this.gridColumnApi = null;
  }

  afterGuiAttached() {
    super.afterGuiAttached();
    const inputElement = this.getGui().querySelector('input');

    if (!inputElement) {
      console.error('Input element not found!');
      return;
    }
    this.eInput = inputElement;
    this.eInput.addEventListener('keydown', this.handleKeyDown);
    this.eInput.classList.add('cellClass');
    this.eInput.select();
  }

  handleKeyDown = (event) => {
    const key = event.key;
    if (key === 'Enter' || event.keyCode == 113) {
      event.preventDefault();
      this.togglePopup(true);
    }
  };

  togglePopup = (isOpen) => {
    this.isPopupOpen = isOpen;
    if (isOpen) {
      this.createPopup();
    } else {
      this.removePopup();
    }
  };

  createPopup() {
    const parent = this.eInput.closest('.ag-root-wrapper');

    if (!parent) {
      console.error('Parent container not found.');
      return;
    }  

    this.popupDiv = document.createElement('div');
    this.popupDiv.className = 'popup-container';

    parent.appendChild(this.popupDiv);

    ReactDOM.render(<PopupComp />, this.popupDiv);
    this.popupDiv.style.top = `${this.eInput.getBoundingClientRect().bottom}px`;
    this.popupDiv.style.left = `${this.eInput.getBoundingClientRect().left}px`;

    const searchInput = this.popupDiv.querySelector('#SearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearchInputChange);
      searchInput.addEventListener('keydown', this.handleSearchInputKeyCode);
      searchInput.focus();
    }

    const gridDiv = this.popupDiv.querySelector('#popupGrid');
    if (gridDiv) {
      this.popupRef = new Grid(gridDiv, {
        columnDefs: [
          { headerName: 'Make', field: 'make', sortable: true, filter: true },
          { headerName: 'Model', field: 'model', sortable: true, filter: true },
          { headerName: 'Price', field: 'price', sortable: true, filter: true },
        ],
        rowData: this.popupData,
        onGridReady: this.onGridReady,
        onRowClicked: this.onRowClicked,
        onCellKeyDown: this.onCellKeyDown,
      });
    }
  }

  handleSearchInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    if (this.gridApi) {
      this.gridApi.setQuickFilter(value);
    }
  };

  handleSearchInputKeyCode = (event) => {
    if (event.key === 'Enter' || event.keyCode == 38 || event.keyCode == 40) {
      event.preventDefault();
      this.popupRef.gridOptions.api.setFocusedCell(0, 'make');
    }
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onRowClicked = (event) => {
    const selectedRowData = event.data;
    const parentRowIndex = this.params.rowIndex;
    const parentColId = this.params.column.getColId();

    this.params.stopEditing(true);
    this.params.api.getRowNode(parentRowIndex).updateData(selectedRowData);
    this.params.api.startEditingCell({
      rowIndex: parentRowIndex,
      colKey: parentColId,
    });
    this.togglePopup(false);
  };

  onCellKeyDown = (event) => {
    if (event.event.keyCode == 13) {
      this.onRowClicked(event);
    }
  };

  removePopup() {
      try {
        const parent = this.popupDiv.parentNode;
        if (parent) {
          parent.removeChild(this.popupDiv);
        } else {
          console.error('Popup container is not attached to the DOM!');
        }
      } catch (error) {
        console.error('Error while removing popup div:', error);
      }
        this.popupRoot = null;
      this.popupDiv = null;
  }
  
  
  render() {
    return super.render();
  }
}

export default CustomWithGridPopupCellEditor;
