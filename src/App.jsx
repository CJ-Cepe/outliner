import { useState } from 'react'
import Field from './Field';


function App() {
  const [outline, setOutline] = useState({
    color: "#ff0000",
    style: "solid",
    thickness: "1",
    offset: "0",
  });

  const [slider, setSlider] = useState(false)

  const handleChange = (key, value) => {
    setOutline({...outline, [key]: value})
  }

  const handleSliderChange = (value) => {
    setSlider(value)
  }

  return (
    <main>
      <Field labelName="color" componentType="color" data={outline} onChange={handleChange}/>
      <Field labelName="style" componentType="style" data={outline} onChange={handleChange}/>
      <Field labelName="thickness" componentType="thickness" data={outline} onChange={handleChange}/>
      <Field labelName="offset" componentType="offset" data={outline} onChange={handleChange}/>
      <Field labelName="button" componentType="button" data={slider} onChange={handleSliderChange}/>
    </main>
  )
}

export default App
