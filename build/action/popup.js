// Initialize button with user's preferred color
let btnChangeColor = document.getElementById('changeColor');
let btnSayHi = document.getElementById('sayHi');
chrome.storage.sync.get('color', ({ color }) => {
   btnChangeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
btnChangeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get('color', ({ color }) => {
      document.body.style.backgroundColor = color;
    });
}

// say hi
// btnSayHi.addEventListener('click', () => {
//   let notification = {
//     iconUrl: '/images/icon_32.png',
//     message: 'hello hc',
//     title: 'Hi',
//     type: 'basic'
//   };
//   chrome.notifications.create(notification);
// });