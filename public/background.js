
//Receive message from popup
chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(message, sender, sendResponse){
  const {action, outline, buttonState} = message
  console.log(action, outline, buttonState)

  //toggle style
  if(action === 'toggle'){
    const tab = await getTab()
    const cssText = createStyle(outline)
    console.log("Tab: ", tab)

    if(buttonState){
      //adding style
      console.log('ButtonState: ', buttonState, '->' , tab)
      toggleStyle(tab, addStyle, cssText)
    } else {
      toggleStyle(tab, removeStyle, cssText)
    }
  }
} 

async function getTab(){
  const tab = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab[0]
}

function createStyle(outline){
  const {color, style, width, offset, selector} = outline
  const cssText = `
      :root {
        --color: ${color};
        --style: ${style};
        --thickness: ${width}px;
        --offset: ${offset}px;
      }

      ${selector} {
          outline-color: var(--color);
          outline-style: var(--style);
          outline-width: var(--thickness);
          outline-offset: var(--offset);
      }
  `
  return cssText
}

function toggleStyle(tab, func, cssText){
  console.log("ToggleTab: ", tab)
  console.log("ToggleTabID: ", tab.id)
  const tabId = tab.id
    chrome.scripting.executeScript({
      target: {tabId},
      func: func,
      args : [cssText],
    })
}

function addStyle(cssText){
  let element = document.head.querySelector('style[data-ext = outlineExtStyle]')
  console.log('add style triggered')

  if(!element){
    element = document.createElement('style');
    element.type = 'text/css'
    element.dataset.ext = "outlineExtStyle"

    document.head.appendChild(element);
  }
  
  element.textContent = cssText
}

function removeStyle(cssText){
  console.log('remove style triggered')

  const element = document.querySelector('style[data-ext = outlineExtStyle]')
  if(element){
    document.head.removeChild(element)
  }
}
