import React from 'react'

export default function PopupComp() {
    return (
            <div>
            <div style={{display:'flex'}}>
                <input
                    type='text'
                    placeholder='Search...'
                    id='SearchInput'
                    style={{width:'150px'}}
                />
                <button className="Addnew">Add New</button>
            </div>
            <div className='ag-theme-alpine' style={{height:'300px', width:"50vh"}} id='popupGrid'>

            </div>
            </div>

    )
}
