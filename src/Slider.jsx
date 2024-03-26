export default function Slider ({state, onChange}){

    const handleChange = (event) => {
        console.log("Slider: " , "state")
        onChange(!state)
    }

    return (
        <>
          <div className="switch">
              <input type="checkbox" value={state} onChange={handleChange}/>
              <span className="slider"></span>
          </div>
        </>
    )
}
