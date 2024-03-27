export default function Slider ({state, onChange}){
    const handleChange = (event) => {
        onChange(!state)
    }

    const handleClick = (event) => {
        handleChange(event)
    }

    return (
        <>
          <div className="switch" onClick={handleClick}>
              <input type="checkbox" checked={state} onChange={handleChange}/>
              <span className="slider"></span>
          </div>
        </>
    )
}
