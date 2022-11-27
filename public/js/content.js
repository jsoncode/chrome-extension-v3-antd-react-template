// 火星文微博
var huoxingKey = 'TranslateHuoxing'
runWeibo()

async function runWeibo() {
    if (window.location.host === 'weibo.com') {
        // getFans({
        //     page:1,
        //     uid: '',
        // })
        const SwitchOpenStorage = await chrome.storage.local.get(getHuoxingKey('SwitchOpen'))
        const SwitchOpen = SwitchOpenStorage[getHuoxingKey('SwitchOpen')]
        if (!SwitchOpen) {
            return
        }
        let input = document.querySelector('textarea[class*="Form_input"]');
        let el = input?.closest('.wbpro-form[class*="Form_wbproform"]')?.parentElement
        let submitBtn = document.querySelector('[class*="Tool_btn"]')
        if (!input) {
            return
        }
        input.addEventListener('keyup', async () => {
            // 记录状态，以区分翻译后的输入还说用户自己输入
            await chrome.storage.local.set({
                [getHuoxingKey('IsUserInput')]: true
            })
        })
        input.addEventListener('change', async () => {
            let storage = await chrome.storage.local.get(getHuoxingKey('IsUserInput'))
            if (storage[getHuoxingKey('IsUserInput')]) {
                await chrome.storage.local.set({
                    [getHuoxingKey('InputValue')]: input.value
                })
            }
        })
        // 发布后，清空上次换成记录
        submitBtn.addEventListener('click', async () => {
            await chrome.storage.local.set({
                [getHuoxingKey('InputValue')]: ''
            })
        })

        if (input) {
            let fire = '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M704 288c-1.984 85.6-66.24 157.888-66.24 157.888C637.76 286.656 512 160 512 160s-1.696 94.784-65.376 190.336C382.944 127.392 191.84 0 191.84 0 287.392 350.336 160 477.76 160 732.544 160 882.016 286.528 1024 480 1024c286.624 0 342.048-105.216 371.68-223.776C892.512 636.992 831.36 447.232 704 288zm85.632 496.672C769.056 866.88 745.824 960 480 960c-160.256 0-256-115.648-256-227.456 0-85.632 15.616-155.936 32.128-230.368 20.992-94.368 42.496-190.976 33.184-318.752 98.688 136.608 133.824 317.6 133.824 317.6s91.872-128.992 116.576-188.896C558.624 350.624 576 480 576 608c0 0 84.992-70.016 148.736-175.296 67.136 120.384 91.328 246.24 64.896 351.968z" fill="#d81e06"/><path d="m717.824 537.44-27.2 31.52c-33.696 39.296-65.568 76.544-150.656 119.36-12.192-36.544-23.264-76.768-23.264-138.336v-54.688l-48.576 76.096c-16.384 25.952-29.952 47.456-50.176 76.032-30.688-69.184-52.384-120.352-68.864-166.784l-15.328-43.2-16.64 48.32C296 547.232 276 605.28 276 755.968a16 16 0 1 0 32 0c0-115.488 11.488-172.672 26.88-222.112 16.64 42.304 37.632 90.4 65.184 152l11.264 25.088 16.256-22.144c26.56-36.16 42.368-60.48 59.68-87.776 5.056 47.328 16.736 81.28 28.32 114.88l5.824 16.896 16.192-7.648c86.496-41.088 126.976-78.496 159.104-114.4 4.992 59.648-2.88 124.928-21.568 171.296A15.968 15.968 0 0 0 690.016 804a15.968 15.968 0 0 0 14.816-10.016c24.8-61.568 32.256-149.248 18.944-223.424l-5.952-33.12z" fill="#d81e06"/></svg>'
            let back = '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M130 562.5c0-19.33 15.67-35 35-35s35 15.67 35 35C200 735.089 339.911 875 512.5 875S825 735.089 825 562.5 685.089 250 512.5 250c-19.33 0-35-15.67-35-35s15.67-35 35-35C723.749 180 895 351.251 895 562.5S723.749 945 512.5 945 130 773.749 130 562.5z" fill="#2F54EB"/><path d="m482.657 214.747 79.355 79.356c10.74 10.74 10.74 28.151 0 38.89-10.74 10.74-28.151 10.74-38.89 0l-85.573-85.572c-18.045-18.045-18.045-47.302 0-65.348l85.766-85.766c10.74-10.74 28.152-10.74 38.891 0 10.74 10.74 10.74 28.151 0 38.89l-79.55 79.55z" fill="#2F54EB"/></svg>'
            let div = document.createElement('div')
            div.classList.add('woo-box-item-inlineBlock')
            div.classList.add(huoxingKey)
            div.innerHTML = `
            <div style="margin-top: 10px;display: flex;align-items: center">
                <div class="wbpro-iconbed woo-box-flex woo-box-alignCenter woo-box-justifyCenter translateHuoxing" style="margin-right: 10px" title="火星文转化">${fire}</div>
                <div class="wbpro-iconbed woo-box-flex woo-box-alignCenter woo-box-justifyCenter backOld" title="还原原文">${back}</div>
            </div>
        `
            el.appendChild(div)

            document.querySelector('.translateHuoxing').addEventListener('click', async () => {
                await chrome.storage.local.set({
                    [getHuoxingKey('IsUserInput')]: false
                })
                const inputStorage = await chrome.storage.local.get(getHuoxingKey('InputValue'))
                let value = inputStorage[getHuoxingKey('InputValue')]
                if (!inputStorage[getHuoxingKey('InputValue')] && input.value) {
                    // 如果过没有缓存,但是微博有缓存，使用微博的缓存
                    value = input.value
                    await chrome.storage.local.set({
                        [getHuoxingKey('InputValue')]: input.value
                    })
                }
                // 发送消息到background.js
                chrome.runtime.sendMessage({
                    name: huoxingKey,
                    value,
                })
                // 接受background.js发送来的消息
                chrome.runtime.onMessage.addListener(async (message) => {
                    if (message.name === huoxingKey) {
                        inputValue(input, message.value)
                    }
                })
            })
            document.querySelector('.backOld').addEventListener('click', async () => {
                const inputStorage = await chrome.storage.local.get(getHuoxingKey('InputValue'))
                inputValue(input, inputStorage[getHuoxingKey('InputValue')])
            })
        }
    }
}

function inputValue(el, value) {
    const prop = el.tagName === 'INPUT' ? HTMLInputElement.prototype : HTMLTextAreaElement.prototype;
    const setValue = Object.getOwnPropertyDescriptor(prop, 'value').set;
    setValue.call(el, value);
    const event = new Event('input', {bubbles: true});
    el.dispatchEvent(event);
}

function getHuoxingKey(name) {
    return huoxingKey + (name || '')
}

function getFans(params) {
    let data = [
        'relate=fans',
        'type=all',
        'newFollowerCount=0',
    ];
    for (let key in params) {
        // page=1
        // uid=xxx
        data.push(`${key}=${params[key]}`)
    }
    return fetch('https://weibo.com/ajax/friendships/friends?' + data.join('&'))
        .then(res => res.json())
        .then(res => {
            // const {display_total_number: display_tatal, total_number: real_total, users: list} = res
            return res
        })
}