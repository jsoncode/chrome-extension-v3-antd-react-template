document.querySelector('#menu').addEventListener('click', e => {
    if (e.target.dataset.href) {
        chrome.tabs.create({ url: e.target.dataset.href });
    }
})
