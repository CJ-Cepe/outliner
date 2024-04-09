

console.log("Content -> yeah!!")

//if slider true 
    if(false){
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './outline.css';
        document.head.appendChild(link)
    } else {
        let links = document.head.querySelectorAll('link')
        links.forEach((link) => {
            if(link.href.includes('outline.css')) {
                document.head.removeChild(link)
            }
        })
    }


    else {
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

      console.log(`BG-Message [${message.action}]: `,  message)
      console.log(`BG-LoadedData [${message.action}]: `, data)
      console.log(`BG-tab [${message.action}]: `,  tabId)