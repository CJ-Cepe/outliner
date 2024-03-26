  function ColorPicker({attribute, onChange}){
    const handleChange = (event) => {
        onChange("color", event.target.value)
    }
  
    return (
      <>
        <input type="color" onChange={handleChange} value={attribute}/>
      </>
    )
  }
  
  function StylePicker({attribute, onChange}){
    const handleChange = (event) => {
     onChange("style", event.target.value)
    }
  
    return (
      <>
        <select name="" id="" onChange={handleChange} value={attribute}>
          <option value="auto">auto</option>
  
          <option value="solid">solid</option>
          <option value="dotted">dotted</option>
          <option value="dashed">dashed</option>
          <option value="double">double</option>
  
          <option value="groove">groove</option>
          <option value="ridge">ridge</option>
          <option value="inset">inset</option>
          <option value="outset">outset</option>
        </select>
      </>
    )
  }

  function ThicknessPicker({attribute, onChange}){
    const handleChange = (event) => {
        onChange("thickness", event.target.value)
    }
  
    return (
      <>
        <input type="number" onChange={handleChange} value={attribute}/>
      </>
    )
  }
  
  function OffsetPicker({attribute, onChange}){
    const handleChange = (event) => {
        onChange("offset", event.target.value)
    }
  
    return (
      <>
        <input type="number" onChange={handleChange} value={attribute}/>
      </>
    )
  }
  
  function Button({outline}){

    const handleOnClick = () => {
        console.log(outline.color, outline.style, outline.thickness, outline.offset)
    }

    return (
      <>
        <button onClick={handleOnClick}> yeah!</button>
      </>
    )
  } 
  
  
function Field({labelName, componentType, data, onChange}){

    let input = null

    switch(componentType){
      case "color":  
        input = <ColorPicker attribute={data["color"]} onChange={onChange}/>
        break;
      case "style":  
        input = <StylePicker attribute={data["style"]} onChange={onChange}/>
        break;
      case "thickness": 
        input = <ThicknessPicker attribute={data["thickness"]} onChange={onChange}/>
        break;
      case "offset":  
        input = <OffsetPicker attribute={data["offset"]} onChange={onChange}/>
        break;
      case "button":  
        input = <Button outline={data}/>
        break;
    }
  
    return(
      <div>
        <label>
          {input}
          : {labelName}
        </label>
      </div>
      )
  }
  

export default Field