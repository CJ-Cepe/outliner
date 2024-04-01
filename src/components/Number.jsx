export default function Number({label, attribute, onChange}){
    const handleChange = (event) => {
        onChange(label, event.target.value)
    }
  
    return (
      <>
        <input type="number" onChange={handleChange} value={attribute}/>
      </>
    )
}
