/* ------------------------------------ */
/* --------- Message listener --------- */
/* ------------------------------------ */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  handleMessage(message, sendResponse)
  return true;
});

/* ------------------------------------ */
/* --------- onMessage callback --------- */
/* ------------------------------------ */
async function handleMessage(message, sendResponse){
  const {action, outline} = message
  let {tabId} = message
  let data = await loadData()
  let response = null;

  tabId = await getTabId(tabId) //check if tabId exist
  data = checkData(data, tabId) //handle wether data is valid

  if (action === 'load'){
    console.log("LOAD: ", {data: {...data[tabId], id: tabId}})
    response = {data: {...data[tabId], id: tabId}};
  } 
  else if (action === 'save'){
    saveData(data, outline, tabId) //to handle null tab
    setToggleStyle(action, outline, tabId)
    response = {status: 'saved'}
  }
  else if (action === 'toggle'){
    setToggleStyle(action, outline, tabId)
    response = {status: 'toggle'}
  }

  sendResponse(response)
}


/* ------------------------------------ */
/* --------- Checking data --------- */
/* ------------------------------------ */
function saveData(data, outline, tabId){
  data[tabId] = {outline}
  chrome.storage.session.set({data})
}

// get saved data
async function loadData(){
  return new Promise ((resolve, reject) => {
    chrome.storage.session.get('data', (result) => {
      resolve(result.data)
    })
  })
}

//check data for tab is valid
function checkData(data, id){
  
  const defaultValue = {
    outline: {
    color: "#ff0000",
    style: "solid",
    width: "1",
    offset: "0",
    selector: "*"
  }}

  //handle empty/undefine data in session start
  if(!data){
    data = { [id]: defaultValue }
  } else if (!data[id]){
    data[id] = defaultValue
  }

  return data
}

/* ------------------------------------ */
/* --------- Checking tab --------- */
/* ------------------------------------ */
async function getTabId(tabId){
  //if undefined -> get current tab's id
  if(!tabId){
    let tab = await getTab()

    //if null -> handle returned null
    if(!tab) {
      return null
    }

    return tab.id
  }
  return tabId
}

async function getTab(){
  return new Promise((resolve, reject) => {
    // query current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if(tabs.length > 0 ){
        //handle chrome internal pages
        if(tabs[0].url.startsWith("chrome://")){
          resolve(null)
        }
        resolve(tabs[0]);
      } 
    })
  });
}

/* ------------------------------------ */
/* --------- Toggle Style --------- */
/* ------------------------------------ */
function setToggleStyle(action, outline, tabId){
  const cssText = createStyle(outline)

  if(action === "save"){
    setStyle(tabId, updateStyle, cssText)
  } else {
    setStyle(tabId, toggleStyle, cssText)
  }
}

function setStyle(tabId, func, cssText){
    //handle null tab id
    if(!tabId){
      return null;
    }

    chrome.scripting.executeScript({
      target: {tabId},
      func: func,
      args : [cssText],
    })
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

// in content scope
function updateStyle(cssText){
  const element = document.querySelector('style[data-ext = outlineExtStyle]')

  if(element){
    element.textContent = cssText
  }
}

function toggleStyle(cssText){
  let element = document.querySelector('style[data-ext = outlineExtStyle]')
  
  if(element){
    document.head.removeChild(element)
  } else {
    element = document.createElement('style');
    element.type = 'text/css'
    element.dataset.ext = "outlineExtStyle"
    document.head.appendChild(element);
    element.textContent = cssText
  }
}



/* ------------------------------------ */
/* --------- Hotkey --------- */
/* ------------------------------------ */
chrome.commands.onCommand.addListener( async (command) => {
  const tabId = await getTabId(undefined) //get current tab's ID
  let data = await loadData() //get outline - load
  data = checkData(data, tabId)

  const cssText = createStyle(data[tabId].outline)
 
  if(command === "toggle-outline"){
    setStyle(tabId, toggleStyle, cssText)
  }
})