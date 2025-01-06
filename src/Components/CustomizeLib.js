import React from 'react';
import { NumberCellEditor } from 'ag-grid-community';
import '../Assets/CSS/style.css';

class CustomNumberCellEditor extends NumberCellEditor {
    constructor() {
        super();
        this.precision = 2; // Example precision setting
        this.warningMessageDiv = null; // Initialize the warning message container
        this.crossIcon = null; // Reference to the cross icon
    }

    afterGuiAttached() {
        super.afterGuiAttached();

        // Ensure `this.eInput` is correctly referenced
        this.precision = 2; // Example precision setting
        const inputElement = this.getGui().querySelector('input');
        if (!inputElement) {
            console.error('Input element not found!');
            return;
        }

        this.eInput = inputElement;

        // Add the cross icon on the left side of the input
        this.addCrossIcon();

        // Add event listeners for input and keydown events
        this.eInput.addEventListener('keydown', this.handleKeyDown);
        this.eInput.addEventListener('input', this.handleInputChange);

        // Add custom class for styling
        this.eInput.classList.add('cellClass');

        // Automatically focus and select the input text
        this.eInput.select();

        // Optionally set a cell class dynamically
        if (this.params && this.params.colDef) {
            this.params.colDef.cellClass = 'cellClass';
        }

        // Create a warning message container dynamically
        this.createWarningMessageContainer();
    }

    // Add cross icon on the left side of the input
    addCrossIcon() {
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('cross-icon-container');

        // Create the cross icon (Font Awesome)
        this.crossIcon = document.createElement('i');
        this.crossIcon.classList.add('fas', 'fa-times-circle');
        this.crossIcon.style.color = 'red';
        this.crossIcon.style.position = 'absolute';
        this.crossIcon.style.left = '10px';
        this.crossIcon.style.top = '50%';
        this.crossIcon.style.transform = 'translateY(-50%)'; // Vertically center
        this.crossIcon.style.fontSize = '18px';
        
        // Append the cross icon to the container
        iconContainer.appendChild(this.crossIcon);

        // Insert the icon container before the input field
        const inputParent = this.eInput.parentElement;
        if (inputParent) {
            inputParent.style.position = 'relative'; // Ensure parent has relative position
            inputParent.insertBefore(iconContainer, inputParent.firstChild);
        }

        // Initially hide the icon if the input is not empty
        this.toggleCrossIcon();
    }

    destroy() {
        // Clean up the event listeners when the component is destroyed
        if (this.eInput) {
            this.eInput.removeEventListener('keydown', this.handleKeyDown);
            this.eInput.removeEventListener('input', this.handleInputChange);
        }

        // Remove the warning message container
        this.removeWarningMessageContainer();

        // Call the parent destroy method
        super.destroy();
    }

    // Custom keydown logic to prevent cell navigation if input is empty
    handleKeyDown = (event) => {
        const gridApi = this.params.api; // Get the grid API
        const column = this.params.column; // Get the current column
        const rowIndex = this.params.rowIndex; // Get the current row index
        const key = event.key;

        // If the input is empty, prevent moving to the next or previous cell
        if (this.eInput.value.trim() === '') {
            if (key === 'Enter' || key === 'ArrowDown' || key === 'ArrowUp') {
                event.preventDefault(); // Prevent default behavior (moving to next cell)
                this.showWarningMessage('This field is required!');
            }
        } else {
            // Allow normal cell navigation for non-empty input
            if (key === 'ArrowUp') {
                const previousRowIndex = rowIndex - 1;
                if (previousRowIndex >= 0) {
                    gridApi.startEditingCell({
                        rowIndex: previousRowIndex,
                        colKey: column.getColId(),
                    });
                }
                event.preventDefault(); // Prevent default arrow key behavior
            } else if (key === 'ArrowDown') {
                const nextRowIndex = rowIndex + 1;
                if (nextRowIndex < gridApi.getDisplayedRowCount()) {
                    gridApi.startEditingCell({
                        rowIndex: nextRowIndex,
                        colKey: column.getColId(),
                    });
                }
                event.preventDefault(); // Prevent default arrow key behavior
            }
        }
    };

    // Monitor changes to the input value
    handleInputChange = (event) => {
        const value = event.target.value;

        // Toggle cross icon visibility based on input value
        this.toggleCrossIcon(value);
        
        // If the value is blank, display a warning message
        if (value.trim() === '') {
            this.showWarningMessage('This field is required!');
        } else {
            this.hideWarningMessage();
        }
    };

    // Toggle the visibility of the cross icon
    toggleCrossIcon(value = this.eInput.value) {
        if (this.crossIcon) {
            if (value.trim() === '') {
                this.crossIcon.style.display = 'block'; // Show the cross icon
            } else {
                this.crossIcon.style.display = 'none'; // Hide the cross icon
            }
        }
    }

    // Create the warning message container dynamically
   // Create the warning message container dynamically
// Create the warning message container dynamically
// Create the warning message container dynamically
createWarningMessageContainer() {
    this.warningMessageDiv = document.createElement('div');
    this.warningMessageDiv.id = 'warningMessage';
    this.warningMessageDiv.style.color = 'red';
    this.warningMessageDiv.style.position = 'fixed'; // Position relative to the cell
    this.warningMessageDiv.style.marginTop = '5px'; // Slight margin for spacing
    this.warningMessageDiv.style.left = '0'; // Align it with the left side of the cell
    this.warningMessageDiv.style.zIndex = '999999'; // Ensure it appears above other elements
    this.warningMessageDiv.style.backgroundColor = '#f8d7da'; // Light red background
    this.warningMessageDiv.style.border = '1px solid #f5c6cb'; // Border to match the message
    this.warningMessageDiv.style.padding = '5px';
    this.warningMessageDiv.style.borderRadius = '4px';
    this.warningMessageDiv.style.display = 'none'; // Initially hidden
    this.warningMessageDiv.style.top = `${this.eInput.getBoundingClientRect().bottom + 10}px`;
    this.warningMessageDiv.style.left = `${this.eInput.getBoundingClientRect().left - 10}px`;

    // Get the cell's parent container
    const parent = this.eInput.closest('.ag-root-wrapper'); // Find the cell's closest parent (the entire cell)
    
    if (parent) {
        // Ensure the parent is relatively positioned
        parent.style.position = 'relative';

        // Make sure the parent allows for the warning message to be shown
        parent.style.overflow = 'visible';  // Prevent clipping of the warning message

        // Append the warning message under the cell
        parent.appendChild(this.warningMessageDiv);
    } else {
        console.error('Warning message container could not be appended.');
    }
}




    // Remove the warning message container
    removeWarningMessageContainer() {
        if (this.warningMessageDiv && this.warningMessageDiv.parentElement) {
            this.warningMessageDiv.parentElement.removeChild(this.warningMessageDiv);
        }
    }

    // Show a warning message
    showWarningMessage(message) {
        if (this.warningMessageDiv) {
            this.warningMessageDiv.textContent = message;
            this.warningMessageDiv.style.display = 'block'; // Show the message
        }
    }

    // Hide the warning message
    hideWarningMessage() {
        if (this.warningMessageDiv) {
            this.warningMessageDiv.style.display = 'none'; // Hide the message
        }
    }

    render() {
        return super.render();
    }
}

export default CustomNumberCellEditor;
