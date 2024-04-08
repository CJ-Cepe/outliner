import { useEffect, useRef, useState } from 'react'
import Field from './Field';
import Button from './components/Button';
import EmojiLink from './components/EmojiLInk';


function sendMessage(action) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({action: action}, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

function App() {
  const tabIdRef = useRef(undefined)
  const [buttonState, setButtonState] = useState(false)
  const [outline, setOutline] = useState({
    color: "#ff0000",
    style: "solid",
    width: "1",
    offset: "0",
    selector: "*"
  });

  //retrieving saved on local
  //Original
/*   useEffect(()=>{
    chrome.storage.local.get(["data"], (result) => {
      const data = result.data;
      if(data){
        setButtonState(data.buttonState)
        setOutline({...data.outline})
      }
    })
  }, []) */


  useEffect(() => {
    async function loadData() {
      try {
        console.log('------- APP preResponse: ')
        const response = await sendMessage("load");
        console.log('------- APP Response: ', response.data.outline)

        //check if response is good data
          //if not set default
       setOutline({...response.data.outline})
       setButtonState(response.data.buttonState)
       tabIdRef.current = response.data.id;
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
  
    loadData();
    console.log("------- APP Load");
  }, []);

  //saving data on local & sending message to background
  useEffect(()=>{
    //chrome.storage.local.set({data: {outline, buttonState: buttonState}})
    console.log("------- APP Save")
    chrome.runtime.sendMessage({action: "save", outline, buttonState, tabId: tabIdRef.current})
    /* chrome.runtime.sendMessage({action: "toggle", outline, buttonState}) */
  }, [buttonState, outline])


  const handleChange = (key, value) => {
    setOutline({...outline, [key]: value})
  }

  const handleButtonClick = () => {
    setButtonState(!buttonState)
  }

  const resetDefault = () => {
    setOutline({
      color: "#ff0000",
      style: "solid",
      width: "1",
      offset: "0",
      selector: "*"
    })
  }

  const handleClearStorage = () => {
    //send message to back to clear
    chrome.runtime.sendMessage({action: "clear"})
  }

  const handleBuyCoffee = (event) => {
    event.target.setAttribute("href", "https://ko-fi.com/huemore_colorpicker")
    event.target.setAttribute("target", "_blank")
  }

  return (
    <>
      <header>
        <h1>ELEMENT OUTLINER</h1>
        <a href="">User Guide</a>
      </header>
      
      <main>
        <section>
          <a onClick={resetDefault}>Reset to Default</a>
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
              <p>Advanced selectors can be used for complex targeting.</p>
            </div>
          </fieldset>
        </section>
        <section>
          <Button onClick={handleButtonClick}/>
          <p>Hotkey: Ctrl + Q</p>
          <EmojiLink emoji="🗑️" content="Clear Storage" onClick={handleClearStorage}/>
          <EmojiLink emoji="☕" content="Buy Coffee" onClick={handleBuyCoffee}/>
        </section>
      </main>
    </>
  )
}

export default App
