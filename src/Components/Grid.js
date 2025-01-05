import React, { useEffect, useLayoutEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { employees } from './Data';

export default function Grid() {
  const TableHeader = Object.keys(employees[0]);
  const [columnChooser, setColumnChooser] = useState([])
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState([]);
  useEffect(() => {
    console.log("Calledd")
    let tempchooser = []
    for (let i = 0; i < TableHeader.length; i++) {
      tempchooser.push({ label: TableHeader[i], show: true });
    }
    setColumnChooser(tempchooser);
  }, [])

  useLayoutEffect(() => {
    document.getElementById('showTableDiv').style.display = 'none'
    document.getElementById('columnChooser').style.display = 'none'
  }, [])

  function handleOnClickShow() {
    if (document.getElementById('showTableDiv') !== null) {
      if (document.getElementById('showTableDiv').style.display === 'none') {
        document.getElementById('showTableDiv').style.display = 'block'
      } else {
        document.getElementById('showTableDiv').style.display = 'none'
        document.getElementById('columnChooser').style.display = 'none'
      }

    }
  }

  function handleCheckBox(e, value) {
    if (e.target.checked === true) {
      setOutput([...output, ...[value]])
      console.log([...output, ...[value]])
      let tempinput = inputValue + ',' + value.name;
      console.log(inputValue, "input")
      setInputValue(tempinput);
    } else {
      setOutput((prevData) => {
        return prevData.filter((item) => {
          return item !== value
        })
      })
      let tempinput = inputValue.replace(',' + value.name, '');
      setInputValue(tempinput);
    }
  }

  function handleOnHeaderClick() {
    if (document.getElementById('columnChooser') !== null) {
      if (document.getElementById('columnChooser').style.display === 'none') {
        document.getElementById('columnChooser').style.display = 'block'
      } else {
        document.getElementById('columnChooser').style.display = 'none'
      }

    }
  }

  function handleColumnCheckBox(e, value) {
    if (value !== 'name') {
      setColumnChooser((prevData) => {
        return prevData.map((val, index) => {
          if (val.label === value) {
            return { 'label': val.label, 'show': e.target.checked }
          } else {
            return val
          }
        })
      })
    }
  }

  function handleSearching() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value
    table = document.getElementById("showTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (let j = 0; j < td.length; j++) {
        console.log(td, "sdf")
        if (td[j]) {
          txtValue = td[j].textContent || td[j].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            console.log(txtValue,"values")
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }

  return (
    <div>
      <InputGroup className="mb-0" style={{ width: "500px" }}>
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          value={inputValue.slice(1, inputValue.length)}
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" onClick={handleOnClickShow}><i class="fa-solid fa-caret-down"></i></InputGroup.Text>
      </InputGroup>
      <>
        <div className='column' id='columnChooser'>
          {
            columnChooser.map((value, index) => {
              console.log(columnChooser, "calledmap")
              return (
                <div key={index}>
                  <input type='checkbox' checked={value['show']} className='checkboxColumn' id={index} onChange={(e) => { handleColumnCheckBox(e, value['label']) }} /><label for={index}>{value['label']}</label>
                </div>
              )
            })
          }

        </div>
        <div id='showTableDiv' style={{ width: "500px" }}>
          <input type='text' id='search' placeholder='Searching...' onKeyUp={handleSearching} />
          <Table id='showTable' striped bordered hover >
            <thead onClick={handleOnHeaderClick} style={{ cursor: 'pointer' }}>
              <tr>
                <th></th>
                {
                  columnChooser.map((item, index) => {
                    if (item['show'] === true) {
                      return (
                        <th key={index}>{item['label']}</th>
                      )
                    }
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                employees.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input type='checkbox' id={'checkdata' + index.toString()} onChange={(e) => { handleCheckBox(e, item) }} />
                      </td>
                      {
                        columnChooser.map((value, index1) => {
                          if (value['show'] === true) {
                            return (
                              <td style={{ display: value['show'] }} key={index1} ><label style={{ height: '100%', width: '100%' }} for={'checkdata' + index.toString()}>{(item[value['label']])?.toString()}</label></td>
                            )
                          }
                        })
                      }
                    </tr>)
                })
              }
            </tbody>
          </Table>
        </div>
      </>
    </div>
  )
}
