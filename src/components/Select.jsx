export default function Select({attribute, onChange}){

    const handleChange = (event) => {
     onChange("style", event.target.value)
    }
  
    return (
      <>
        <select onChange={handleChange} value={attribute}>
          <option value="auto">Auto</option>
  
          <option value="solid">Solid</option>
          <option value="dotted">Dotted</option>
          <option value="dashed">Dashed</option>
          <option value="double">Double</option>
  
          <option value="groove">Groove</option>
          <option value="ridge">Ridge</option>
          <option value="inset">Inset</option>
          <option value="outset">Outset</option>
        </select>
      </>
    )
}