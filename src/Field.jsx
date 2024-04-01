import Text from "./components/Text"
import Select from "./components/Select" 

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
        input = <Select attribute={data[labelName]} onChange={onChange}/>
        break;
      case "number": //width + offset
        input = labelName === "width" ? 
          <widthPicket attribute={data[labelName]} onChange={onChange}/>
          : <offsetPicker attribute={data[labelName]} onChange={onChange}/>
        break;
      case "text":
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