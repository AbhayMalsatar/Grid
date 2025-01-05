import React, { useState } from 'react'

export default function InpputBox() {
  const StockList = ["Stock1", "Stock2", "Stock3"];
  const [ShowList, setShowList] = useState(false);;
  const [inputVal, setinputVal] = useState("")
  return (
    <div>
      <input type="text" placeholder="Enter" style={{width:"300px"}} value={inputVal} onInput={(e) => {
        let Value = e.target.value
        if (Value.includes('$') === true) {
          setShowList(true);
        } else {
          setShowList(false);
        }
      }}  onChange={(e)=>{setinputVal(e.target.value)}} onKeyDown={(e)=>{
        if (e.keyCode == 8) {
          
          let stringList = e.target.value.split(' ');
          console.log(stringList[stringList.length - 1],stringList[stringList.length - 1].slice(1) )
          if (stringList[stringList.length - 1].includes('$') == true && StockList.indexOf(stringList[stringList.length - 1].slice(1)) > -1) {
              setinputVal((prev)=>{
                return prev.replace(stringList[stringList.length - 1], '');
              })
          }
        }
      }} />
      {ShowList == true ?
        <div>
          {StockList.map((stock, index) => {
            return <div style={{background:"gray", width:"100px" , border:"1px solid black"}} key={index} onClick={(e)=>{
              setinputVal((prev)=>{
                return prev + stock;
              })
              setShowList(false)
            }}>{stock}</div>
          })}
        </div> : null}
    </div>
  )
}
