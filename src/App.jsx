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

  //retrieving saved on local
  useEffect(()=>{
    chrome.storage.local.get(['data'], (result) => {
      const savedData = result.data;
      if(savedData){
        setSliderState(savedData.sliderState)
        setOutline({...savedData.outline})
      }
    })
  }, [])

  //saving on local
  useEffect(()=>{
    const tempState = {outline, sliderState};
    chrome.storage.local.set({ data: tempState});
    //send message to background
    chrome.runtime.sendMessage({ action: 'toggleSlider', outline, sliderState });
  }, [sliderState, outline])

  const handleChange = (key, value) => {
    setOutline({...outline, [key]: value})
  }

  const handleSliderChange = (value) => {
    setSliderState(value)
  }

  return (
    <>
      <header>
        <h1>ELEMENT OUTLINER</h1>
        <a href="">User Guide</a>
      </header>
      
      <main>
        <section>
          <a href="">Reset to Default</a>
          <fieldset>
            <legend>Outline Attributes</legend>
            <Field labelName="color" componentType="color" data={outline} onChange={handleChange}/>
            <Field labelName="width" componentType="thickness" data={outline} onChange={handleChange}/>
            <Field labelName="style" componentType="style" data={outline} onChange={handleChange}/>
            <Field labelName="offset" componentType="offset" data={outline} onChange={handleChange}/>
          </fieldset>
        </section>
        <section>
          <fieldset>
            <legend>Target Elements</legend>
            <Field labelName="Selector" componentType="offset" data={outline} onChange={handleChange}/>
            <div>
              <p>Specify the element to outline by entering the appropriate CSS selector.</p>
              <br/>
              <p>Advanced selectors can be used for complex targeting.</p>
            </div>
          </fieldset>
        </section>
        <section>
          <Slider state={sliderState} onChange={handleSliderChange}/>
          <p>Hotkey: Ctrl + Q</p>
        </section>
      </main>
    </>
  )
}

export default App
