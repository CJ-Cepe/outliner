import { useEffect, useState } from 'react'
import Field from './Field';
import Slider from './Slider';


function App() {
  
  const [sliderState, setSliderState] = useState(false)
  const [outline, setOutline] = useState({
    color: "#ff0000",
    style: "solid",
    thickness: "1",
    offset: "0",
  });

  useEffect(()=>{
    //retrieve from background if there is a file stored
      //asign value
    //sendMessage to content
      //sliderState
      //outline
  }, [sliderState])


  const handleChange = (key, value) => {
    setOutline({...outline, [key]: value})
  }

  const handleSliderChange = (value) => {
    setSliderState(value)
  }

  return (
    <>
      <header>
        OUTLINER
      </header>

      <main>
        <Field labelName="color" componentType="color" data={outline} onChange={handleChange}/>
        <Field labelName="style" componentType="style" data={outline} onChange={handleChange}/>
        <Field labelName="thickness" componentType="thickness" data={outline} onChange={handleChange}/>
        <Field labelName="offset" componentType="offset" data={outline} onChange={handleChange}/>
        <Slider state={sliderState} onChange={handleSliderChange}/>
      </main>
    </>
  )
}

export default App
