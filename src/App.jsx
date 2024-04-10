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
  const [outline, setOutline] = useState({
    color: "#ff0000",
    style: "solid",
    width: "1",
    offset: "0",
    selector: "*"
  });

  useEffect(() => {
    async function loadData() {
      try {
        console.log('------- APP preResponse: ')
        const response = await sendMessage("load");
        console.log('------- APP Response: ', response.data.outline)

        if(!response.status){
          if(response.data.outline){
            setOutline({...response.data.outline})
            tabIdRef.current = response.data.id;
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
  
    loadData();
    console.log("------- APP Load");
  }, []);

  //saving data on local & sending message to background
  useEffect(()=>{
    console.log("------- APP Save")
    chrome.runtime.sendMessage({action: "save", outline, tabId: tabIdRef.current})
  }, [outline])

  const handleChange = (key, value) => {
    setOutline({...outline, [key]: value})
  }

  const handleButtonClick = () => {
    chrome.runtime.sendMessage({action: "toggle", outline, tabId: tabIdRef.current})
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
          <EmojiLink emoji="☕" content="Buy Coffee"/>
        </section>
      </main>
    </>
  )
}

export default App
