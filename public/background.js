
//Receive message from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  handleMessage(message, sendResponse)
  return true;
});

async function handleMessage(message, sendResponse){
  
  const {action, outline, buttonState, tabId} = message
  const tab = await getTab()
  
  const data = await loadData(action)  
  console.log(`BG-Message [${message.action}]: `,  message)
  console.log(`BG-LoadedData [${message.action}]: `, data)
  console.log(`BG-tab [${message.action}]: `,  tab)

  if(action === 'toggle'){
   /*  const cssText = createStyle(outline)
    if(buttonState){
      //adding style
      console.log('ButtonState: ', buttonState, '->' , tab)
      toggleStyle(tab, addStyle, cssText)
    } else {
      toggleStyle(tab, removeStyle, cssText)
    } */
  }

  else if (action === 'save'){
      saveData(undefined, data, action, outline, buttonState)
      const cssText = createStyle(outline)
      if(buttonState){
        toggleStyle(tab, addStyle, cssText)
      } else {
        toggleStyle(tab, removeStyle, cssText)
      }

  }
  
  else if (action === 'load'){
     // Send the data back to the popup script
     console.log(`BG-LoadReply [${message.action}]: `, data["333714304"])
     sendResponse({data: data["333713486"]});
  }
}

//issue in save?
function saveData(tabId = "333713486", data, action, outline, buttonState){
  data[tabId] = {outline, buttonState}
  chrome.storage.local.set({data})
  if (chrome.runtime.lastError) {
    console.log(`Error: ${chrome.runtime.lastError.message}`);
  } else {
    console.log(`BG-Saved [${action}]: Saved`);
  }
}

async function loadData(action){
  return new Promise ((resolve, reject) => {
    chrome.storage.local.get(['data'], (result) => {
      resolve(result.data)
    })
  })
}

async function getTab(){
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if(tabs.length > 0 ){
        resolve(tabs[0]);
      } else {
        // Fallback: Get the active tab in the last focused window
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
          if(tabs.length > 0){
            resolve(tabs[0]);
          } else {
            console.error('No active tab found');
            resolve(null);
          }
        });
      }
    })
  });
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
  const tabId = tab.id
    chrome.scripting.executeScript({
      target: {tabId},
      func: func,
      args : [cssText],
    })
}

function addStyle(cssText){
  let element = document.head.querySelector('style[data-ext = outlineExtStyle]')

  if(!element){
    element = document.createElement('style');
    element.type = 'text/css'
    element.dataset.ext = "outlineExtStyle"

    document.head.appendChild(element);
  }
  
  element.textContent = cssText
}

function removeStyle(cssText){

  const element = document.querySelector('style[data-ext = outlineExtStyle]')
  if(element){
    document.head.removeChild(element)
  }
}
