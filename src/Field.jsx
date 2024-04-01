import Text from "./components/Text"

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

  function widthPicket({attribute, onChange}){
    const handleChange = (event) => {
        onChange("thickness", event.target.value)
    }
  
    return (
      <>
        <input type="number" onChange={handleChange} value={attribute}/>
      </>
    )
  }
  
  function offsetPicker({attribute, onChange}){
    const handleChange = (event) => {
        onChange("offset", event.target.value)
    }
  
    return (
      <>
        <input type="number" onChange={handleChange} value={attribute}/>
      </>
    )
  }
  

function Field({labelName, componentType, data, onChange}){

    let input = null

    switch(componentType){
      case "color":
        input = <ColorPicker attribute={data[labelName]} onChange={onChange}/>
        break;
      case "select":
        input = <StylePicker attribute={data[labelName]} onChange={onChange}/>
        break;
      case "number": //width + offset
        input = labelName === "width" ? 
          <widthPicket attribute={data[labelName]} onChange={onChange}/>
          : <offsetPicker attribute={data[labelName]} onChange={onChange}/>
        break;
      case "text":
        console.log('Type: ' , labelName)
        input = <Text attribute={data[labelName]} onChange={onChange}/>
        break;
    }
  
    return (
      <div>
        <label>
          {input}
          &nbsp; {labelName} {labelName === 'width' || labelName === 'offset' ? <sup> px </sup> : null}
        </label>
      </div>
    )
  }
  

export default Field