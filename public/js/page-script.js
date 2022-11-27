document.addEventListener('message', (event) => {
    eval(event.detail);
});

