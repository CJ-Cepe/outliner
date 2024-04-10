
- PERMISSIONS
    - tabs -> for querying tabs
    - scripting -> for appending/removing outline style
    - storage -> for saving button and outline attrib 
    - <all_urls> -> to add outline to all pages


- [x] Restructure & redesign extension
    - [x] transform to tailwind -> maybe next time
    - [x] replace font sizes
- [x] Hide color input and replace div as placeholder
    - this is to make the inputs look consistent
    - hide color input
    - when div is clicked, trigger click color input aswell
    - handle onChange, and set colorInput Event value as div's background color
- [x] Set outline attributes and selector as state
    - useState to save object containing outline attrib values
        - set default values
- [x] Storage
    - [x] Save
        - inside useEffect, when triggered, save outline and button state
        - useEffect to monitor changes and save current outline to local storage
    - [x] Retrieving
        - every time the popup is opened, retrieve save data
        - useEffect to retrieve saved data if it exist
            - setOutline({...data.outline})
            - if not, nothing happens already set to default
    - [] Save status for each tab?
- [] Toggle/Click button -> toggle outline in a page
    - useState to save button state
        - set OFF (false) by default
    - [x] save button state
        - useEffect to retrieve saved data if it exist
            - setOutline(data.buttonState)
            - if not, nothing happens since it is OFF by default
        - useEffect to monitor changes and save current state to local storage
    - [x] Button is clicked
        - send message to the background
        - [x] Add style
            - if button state is true
            -   if not yet existing
                - create, append, and set css text content to header
            -   if existing
                - set css text content
        - [x] Remove style
            - check if style element is existing
            - if yes, remove element
    - [x] injecting style to current active tab
        - use chrome.tabs.query to query tab
        - use chrome.scripting.executeScript to inject script
        - when button state is true
            - inject style
        - when button stateis false
            - remove style
- [] Default for outline and button state
    - set a default value for outline state as obj & button state
    - [] what if empty string?
    - [] what if negative number?
        - selector
        - outline
        - width
- [x] handle selector input
    - set inject css selector to inputed value
- [x] handle resetting of outline style and selector
- [] handle hot key


???
- [] check if style element exist
- [] resets when popup is opened
- [] state per tab?
    - [] save data
        - tabID: {outline, button State}

CONCERNS
    - [X] decide if all tabs or current tab only?
        - current tab only
             - the outlining would not be active until they click the button in that tab.
    - [x] when turned ON and tab is loaded
        - decided to apply outline to current tab only
    - [] What if the page reloads while turned ON
        - [] toggle style? no need to rely on button truth or false
            - but useEffect is used to monitor button changes
    - [] each tab, diff settings/outline style
        - [] Store tabId
    - [] what if turned on then close browser then open again
    - [] remove stored data for non-existing tabID
        - remove style on Close - tabs.onRemoved, window.onRemoved
            - but what if the browser closed differently? 
                - [] such as crashes
        - [] clear storage when opened
        - [] get style for corres ID

???
- Per tab, save data state
    - initialize
        -  
- Set 2 action: toggle and change
    - Toggle
        - if style doesn't exist, add it
        - if style exist, remove it
    - Change
        - if style exist, change cssText content
        - if no, nothing happens
    - solves the ability to toggle on any style
    - Cons: it will get applied when 

- On new tab focused
    1. retrieve save data
    2. send it to react, set as default
    - popup opens, retrieve file
    - state, save include ID
- Save tab
    3. include tab id in save data
- Browser load/open
    - check if tab exist
    - if not, remove
    - if yes stay

- Per browser loads, get all tabs ID then get the saved data
    - check if id of each in the saved data is present to the tabs
        - if not, remove that part in the saved data
        - if yes, remain
            - save new data
    - what listener to use? - windows.onCreated?
        - what if new window is created when original is still opened?
        - it will clear the tabs
    - expiration of data?
    - add a button to clear local storage
- Per tab have saved data {outline attributes, button state}
    - save data, including there id as key
        - tabID: {outline, state}
    - every time the tab is opened/hotkey is pressed
        - get current tab id
        - get load data
            - check if current tab's ID is present
                - if yes, send data to popup (with tabID)???
                - if no, send default value to popup
- Input/Button
    - per change/event send message to background
        - Save - save changes to data
        - Apply - apply changes to css


- [x] Saving
    - App
        - useEffect [outline, button]
        - sendMessage to background with data
            - {"save", outline, buttoneState, tabID}
    - Background
        - save Data with corres tabID
            - if existing: ovewrite
            - if not create data
- [x] Loading
    - every time popup is opened, load data corres to tab ID
    - chrome.storage.local.get(data)
        - then return results.data as data
- [x] handle undefined when switing tab
    - fix getData function in background.js
- [x] add button to buy coffee
    - style
- [x] refactor chrome.storage.local to chrome.storage.session
        - saved in ram & doesn't persist     
- [x] handle async error
    - send response when action is save
- [x] handle sites that cant be injected
    - catch if tab url starts with "chrome://"
    - return null
- [x] handle toggle button
    - instead of saving and taking track of button state
        remove it and instead check wether style in inject or not,
        then in the app, send toggle message instead of using useEffect
        to monitor buttonState
- [x] add and set hotkey
    - declare in manifest
        - set hotkey to listen
    - add eventlistener in the background.js
- [x] set style to important
    - add !important, not the recommended approach



- [] clean console.logs
- [x] handle -> Uncaught (in promise) Error: The extensions gallery cannot be scripted.
    - catch if tab url starts with https://chromewebstore.google.com/

- [] adjust logic so when popup is opened, no need for reinjecting style 
- [] in popup handle undefine result incase
- [] rename extension style

- cant
    - internal pages of the Chrome browser (like chrome://settings/, chrome://extensions/, etc.) which is not allowed due to security reasons.
    - The extensions gallery cannot be scripted.

