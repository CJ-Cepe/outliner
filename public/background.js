console.log('background')


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const {action, sliderState, outline} = message

    if (action === 'toggleSlider') {
      if (sliderState) {
        console.log('State ON')
        getTab();
        /* injectStyle() */
        //add style if it exist
      } 
      
      //slider False
      else {
        console.log('State OFF')
        removeTab();
        //remove style if it exist
      }
    }
});

const urls = "*://*/*"

  function getTab(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId },
          func: injectStyle,
        }).then(() => console.log("injected a function"));
      }
    });

    function injectStyle(){
      styleElement = document.createElement('link');
      styleElement.href = chrome.runtime.getURL('outline.css')
      styleElement.rel = 'stylesheet';
      styleElement.type = 'text/css'
      styleElement.dataset.ext = "outlineExtStyle"
      document.head.appendChild(styleElement);
    }
    
  }

  function removeTab(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId },
          func: removeStyle,
        }).then(() => console.log("injected a function"));
      }
    });

    function removeStyle(){
      const element = document.head.querySelector('link[data-ext = outlineExtStyle]')
      document.head.removeChild(element)
    } 
  }
 



/* function createStyle(){
    const style = " * { outline: 1px solid red } body { background-color: red }"
    const styleElement = document.createElement('style')
    styleElement.textContent = style;
    document.head.appendChild(styleElement)
  } */

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