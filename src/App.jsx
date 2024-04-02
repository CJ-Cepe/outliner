import { useEffect, useState } from 'react'
import Field from './Field';
import Button from './components/Button';



function App() {

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
    chrome.storage.local.get(["data"], (result) => {
      const data = result.data;
      if(savedData){
        setButtonState(data.buttonState)
        setOutline({...data.outline})
      }
    })
  }, [])

  //saving data on local
  useEffect(()=>{
    chrome.storage.local.set({data: {outline, buttonState: buttonState}})
  }, [buttonState, outline])

  const handleChange = (key, value) => {
    setOutline({...outline, [key]: value})
  }

  const handleButtonClick = () => {
    setButtonState(!buttonState)
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
