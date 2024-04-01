import { useEffect, useState } from 'react'
import Field from './Field';
import Button from './Button';



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

  const [buttonState, setButtonState] = useState(false)
  const [outline, setOutline] = useState({
    color: "#ff0000",
    style: "solid",
    width: "1",
    offset: "0",
    selector: "*"
  });

  //retrieving saved on local
  useEffect(()=>{
    chrome.storage.local.get(['data'], (result) => {
      const savedData = result.data;
      if(savedData){
        setButtonState(savedData.sliderState)
        setOutline({...savedData.outline})
      }
    })
  }, [])

  //saving on local
  useEffect(()=>{
    const tempState = {outline, sliderState: buttonState};
    chrome.storage.local.set({ data: tempState});
    //send message to background
    chrome.runtime.sendMessage({ action: 'toggleSlider', outline, sliderState: buttonState });
  }, [buttonState, outline])

  const handleChange = (key, value) => {
    setOutline({...outline, [key]: value})
  }

  const handleButtonClick = (value) => {
    setButtonState(!value)
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
            <Field labelName="width" componentType="number" data={outline} onChange={handleChange}/>
            <Field labelName="style" componentType="select" data={outline} onChange={handleChange}/>
            <Field labelName="offset" componentType="number" data={outline} onChange={handleChange}/>
          </fieldset>
        </section>
        <section>
          <fieldset>
            <legend>Target Elements</legend>
            <Field labelName="selector" componentType="text" data={outline} onChange={handleChange}/>
            <div>
              <p>Specify the element to outline by entering the appropriate CSS selector.</p>
              <br/>
              <p>Advanced selectors can be used for complex targeting.</p>
            </div>
          </fieldset>
        </section>
        <section>
          <Button onClick={handleButtonClick}/>
          <p>Hotkey: Ctrl + Q</p>
        </section>
      </main>
    </>
  )
}

export default App
