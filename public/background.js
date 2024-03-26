chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const {action, sliderState, outline} = message
    console.log(typeof action)
    console.log("MESSAGE SENT: ", action, sliderState, outline)
    

    if (action === 'toggleOutline') {
      console.log("wth")
      //slider True
      if (sliderState) {
        console.log('State ON')
        injectStyle()
      } 
      
      //slider False
      else {
        
      }

    } else if (action === 'saveData'){
      //chrome.storage.local.set(data);
    }
  });


  function injectStyle(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        console.log(tabs[0])
        chrome.scripting.executeScript({
          target: { tabId },
          func: createStyle,
        }).then(() => console.log("injected a function"));
      }
    });
  }

function createStyle(){

    const style = " * { outline: 1px solid red } body { background-color: red }"
    const styleElement = document.createElement('style')
    styleElement.textContent = style;
    document.head.appendChild(styleElement)
  }

  /*     const response = await fetch(chrome.runtime.getURL('outline.css'));
    const cssText = response.text() */

  /* function createStyle(){
    console.log('yeah!!!')
    styleElement = document.createElement('link');
    styleElement.href = chrome.runtime.getURL('outline.css') // Replace with your stylesheet path
    styleElement.rel = 'stylesheet';
    document.head.appendChild(styleElement);
  } */
/* function injectStyle(){
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({target: {tabId}, files: ['outline.css'] });
    }
  })
} */


const urls = "*://*/*"

/* 
//OLD
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ url: urls }, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.executeScript(tab.id, { file: "content.js" });
    }
  });
});


//NEW
function injectStyles() {
  chrome.tabs.query({ url: url }, (tabs) => { // Matches all web pages
  for (const tab of tabs) {
    chrome.tabs.sendMessage(tab.id, { action: 'injectStyles' });
  }
});
}

 */