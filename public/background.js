
//Receive message from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  handleMessage(message, sendResponse)
  return true;
});

async function handleMessage(message, sendResponse){
  const {action, outline, buttonState} = message
  let {tabId} = message
  tabId = await getTabId(tabId)

  let data = await loadData() //returns result.data
  data = checkData(data, tabId)
  let response = null;

  console.log(`BG-Message [${message.action}]: `,  message)
  console.log(`BG-LoadedData [${message.action}]: `, data)
  console.log(`BG-tab [${message.action}]: `,  tabId)

 if (action === 'save'){
      saveData(data, {...message, tabId})
      //separate function
      const cssText = createStyle(outline)
      if(buttonState){
        toggleStyle(tabId, addStyle, cssText)
      } else {
        toggleStyle(tabId, removeStyle, cssText)
      }
      response = {status: 'saved'}
  }
  
  else if (action === 'load'){
     console.log("BG-Response: ", {data: {...data[tabId], id: tabId}})
     response = {data: {...data[tabId], id: tabId}};
  }

  sendResponse(response)
}

function saveData(data, message){
  const {outline, buttonState, tabId} = message

  data[tabId] = {outline, buttonState}
  chrome.storage.session.set({data}, () => {
    console.log("session value set")
  })
}

async function loadData(){
  return new Promise ((resolve, reject) => {
    chrome.storage.session.get('data', (result) => {
      console.log("Load data: ", result)
      resolve(result.data)
    })
  })
}

 
function checkData(data, id){
  console.log("Check Data: ", data)
  //handle empty/undefine data for first click
  if(!data){
    data = { [id]: {
      outline: {
      color: "#ff0000",
      style: "solid",
      width: "1",
      offset: "0",
      selector: "*"
    }, buttonState: false}
    }
  } else if (!data[id]){
    data[id] = {
      outline: {
      color: "#ff0000",
      style: "solid",
      width: "1",
      offset: "0",
      selector: "*"
    }, buttonState: false}
  }

  return data
}

async function getTabId(tabId){
  console.log('BG before tabID: ', tabId)

  if(!tabId){
    let tab = await getTab()
    if(!tab) {
      return null
    }
    tabId = tab.id
  }
  console.log('BG after tabID: ', tabId)
  return tabId
}

async function getTab(){
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if(tabs.length > 0 ){
        if(tabs[0].url.startsWith("chrome://")){
          console.log("Chrome Tab Url: ", tabs[0].url)
          resolve(null)
        }
        resolve(tabs[0]);
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

function toggleStyle(tabId, func, cssText){
    if(!tabId){
      return null;
    }

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

chrome.commands.onCommand.addListener((command) => {
  if(command === "toggle-outline"){
    console.log("Hotkey pressed: ", command)
  }
  console.log("yeah!!")
})