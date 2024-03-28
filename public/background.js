//Receive message from popup
chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(message, sender, sendResponse) {
  const {action, sliderState, outline} = message
  if (action === 'toggleSlider') {
    const tabs = await getTabs()
    
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
      args : [ getStyle() ],
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

function getStyle(){
  const style = `
      :root {
        --color: #ff0000;
        --style: solid;
        --thickness: 1;
        --offset: 0;
      }

      * {
          outline-color: var(--color);
          outline-style: var(--style);
          outline-width: var(--thickness);
          outline-offset: var(--offset);
      }
  `
  return style
}