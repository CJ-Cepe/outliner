import { useEffect, useState } from 'react'
import Field from './Field';
import Slider from './Slider';



function App() {
  
 /*  chrome.storage.local.get('stylesEnabled', (data) => {
    checkbox.checked = data.stylesEnabled || false; // Set checkbox state based on storage

    //inside EFFECT
        chrome.storage.local.get('updatedColorList', (data) => {
      if(data.updatedColorList){
        defColorList = [...data.updatedColorList]
        setColorList(defColorList)
      }
    })
  }); */

    
  
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
    /* chrome.storage.local.set({ stylesEnabled }); */
    //chrome.runtime.sendMessage({ action: 'toggleOutline', outline, sliderState });
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
