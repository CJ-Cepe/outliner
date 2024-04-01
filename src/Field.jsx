import Text from "./components/Text"
import Select from "./components/Select"
import Number from "./components/Number"
import Color from "./components/Color"

function Field({labelName, componentType, data, onChange}){

    let input = null

    switch(componentType){
      case "color":
        input = <Color attribute={data[labelName]} onChange={onChange}/>
        break;
      case "select":
        input = <Select attribute={data[labelName]} onChange={onChange}/>
        break;
      case "number":
        input = <Number attribute={data[labelName]} onChange={onChange} label={labelName} />
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