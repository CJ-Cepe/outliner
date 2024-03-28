
//Receive message from popup
chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(message, sender, sendResponse) {
  const {action, sliderState, outline} = message

  if (action === 'toggleSlider') {
    const tabs = await getTabs()

    //add style
    if(sliderState){
      tabs.forEach((tab)=>{
        toggleStyle(tab, addStyle)
      })
    } 
    //remove style
    else {
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
  })
}

function addStyle(){
  styleElement = document.createElement('link');
  styleElement.href = chrome.runtime.getURL('outline.css')
  styleElement.rel = 'stylesheet';
  styleElement.type = 'text/css'
  styleElement.dataset.ext = "outlineExtStyle"
  document.head.appendChild(styleElement);
}

function removeStyle(){
  const element = document.head.querySelector('link[data-ext = outlineExtStyle]')
  document.head.removeChild(element)
}