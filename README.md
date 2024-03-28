- [] outline attribute value
    - useState to save object containing outline attrib values
        - set default values
    - [x] save outline locally
        - useEffect to retrieve saved data if it exist
            - setOutline({...data.outline})
            - if not, already set to default
        - useEffect to monitor changes and save current outline to local storage
- [] slider ON/OFF
    - useState to save button state
        - set OFF (false) by default
    - [x] save button state
        - useEffect to retrieve saved data if it exist
            - setOutline(data.sliderState)
            - if not, nothing happens since it is OFF by default
        - useEffect to monitor changes and save current state to local storage
    - [] add/remove style when slider is toggled
        - send message to background
- [] add outline style to all
    - use chrome.tabs.query to query tab
    - use chrome.scripting.executeScript to inject script
    - when sliderState is true
        - inject style
    - when sliderState is false
        - remove style
    
        
- [] add outline style to all
    - [] What if the page reloads while turned ON
    
    - [] all tabs or current tab only?
    - [] what if turned on then close browser then open again
        - [] what if crashes and got turned off
    - [] when turned ON and tab is loaded

- PERMISSIONS
    - tabs -> for querying tabs
    - scripting -> for appending/removing outline style
    - storage -> for saving button and outline attrib 
    - <all_urls> -> to add outline to all pages

# Cases
