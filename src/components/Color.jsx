import { useEffect, useRef } from "react"

export default function Color({attribute, onChange}){

    const colorInputRef = useRef(null)
    const divRef = useRef(null)

    useEffect(()=> {
        divRef.current.style.backgroundColor = attribute
    })

    const handleClick = (event) => {
        colorInputRef.current.click()
    }

    const handleChange = (event) => {
        onChange("color", event.target.value)
        divRef.current.style.backgroundColor = event.target.value;
    }
  
    return (
      <>
        <div ref={divRef} onClick={handleClick} className="input"></div>
        <input ref={colorInputRef} type="color" onChange={handleChange} value={attribute}/>
      </>
    )
  }
  