const style = createStyle()

//Receive message from popup
chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(message, sender, sendResponse) {
  const {action, sliderState, outline} = message
  console.log('message')
  if (action === 'toggleSlider') {
    const tabs = await getTabs()
    style.setStyle(outline)
    
    if(sliderState){ //add style
      tabs.forEach((tab)=>{
        toggleStyle(tab, addStyle)
      })
    } else { //remove style
      tabs.forEach((tab)=>{
        toggleStyle(tab, removeStyle)
      })
    }
  }
}

async function getTabs(){
  const tabs = await chrome.tabs.query({})
  return tabs
}

function toggleStyle(tab, func){
  const tabId = tab.id
    chrome.scripting.executeScript({
      target: {tabId},
      func: func,
      args : [ style.getStyle()],
    })
}

function addStyle(style){
  let element = document.head.querySelector('style[data-ext = outlineExtStyle]')

  if(!element){
    element = document.createElement('style');
    element.type = 'text/css'
    element.dataset.ext = "outlineExtStyle"

    document.head.appendChild(element);
  }
  
  element.textContent = style
}

function removeStyle(){
  const element = document.querySelector('style[data-ext = outlineExtStyle]')
  if(element){
    document.head.removeChild(element)
  }
}

function createStyle(){

  let color;
  let style;
  let width;
  let offset;

  const cssText = `
      :root {
        --color: ${color};
        --style: ${style};
        --thickness: ${width};
        --offset: ${offset};
      }

      * {
          outline-color: var(--color);
          outline-style: var(--style);
          outline-width: var(--thickness);
          outline-offset: var(--offset);
      }
  `

  const getStyle = () => {
    return cssText
  }

  const setStyle = (data) => {
    console.log(data)
    color && (this.color = color);
    style && (this.style = style);
    width && (this.width = thickness);
    offset && (this.offset = offset);
  }

  return {getStyle, setStyle}
}

