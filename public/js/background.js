chrome.runtime.onInstalled.addListener(async function () {
    // 第一次安装后，打开一下popup页面，以完成缓存的初始化
    let storage = await chrome.storage.local.get('marsMap')
    // 如果不是第一次安装，而是刷新的情况，就不再打开页面
    if (!storage.marsMap) {
        chrome.tabs.create({url: '/index.html'});
    }
});

var MarsMap = {}
// 接受content.js发送来的消息
var huoxingKey = 'TranslateHuoxing'
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    let storage = await chrome.storage.local.get('marsMap')
    MarsMap = storage.marsMap
    if (message.name === huoxingKey) {
        var result = translateHuoxing(message.value);
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            // 给content.js发消息
            chrome.tabs.sendMessage(tabs[0].id, {
                name: huoxingKey,
                value: result
            })
        })
    }
})

function translateHuoxing(txt) {
    return txt.split('').map(i => {
        let val = MarsMap[i];
        if (val) {
            let random = Math.floor(Math.random() * val.length)
            return val[random]
        } else {
            return i
        }
    }).join('')
}
