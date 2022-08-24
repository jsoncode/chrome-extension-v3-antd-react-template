document.querySelector(`#menu`).addEventListener('click', e => {
    console.log(e.target.dataset.href)
    if (e.target.dataset.href) {
        chrome.tabs.create({ url: e.target.dataset.href });
    }
})
