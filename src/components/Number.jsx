export default function Number({label, attribute, onChange}){
    const placeholder = label === "width" ? "0 - 100" : "-100 - 100"

    const handleChange = (event) => {
      let value = event.target.value

      if(+value > 100){
        value = "100"
      } else if (+value < -100){
        value = "-100"
      }

      if(label === "width" && value < 0){
        return
      }

      onChange(label, value)
    }
  
    return (
      <>
        <input type="number" min="-100" max="100" onChange={handleChange} value={attribute} placeholder={placeholder}/>
      </>
    )
}
