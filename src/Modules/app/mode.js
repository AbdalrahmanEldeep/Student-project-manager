let light__mode = {
    '--main-color': '#f5f6fa',
    '--dark-color-f1': '#40739e',
    '--dark-color-f2': '#2f3640',
    '--green-color': '#273c75',
}
let dark__mode = {
    '--main-color': '#cfd7e6',
    '--dark-color-f1': '#2c3e50',
    '--dark-color-f2': '#2f3640',
    '--green-color': '#2f3542',
}

let mode__controller = document.querySelectorAll('.mode input');

mode__controller.forEach(element => {
    element.addEventListener('click', ({ target }) => {
        for (let mode__controller__ele of mode__controller) {
            mode__controller__ele.classList.remove('inp-active')
        }

        target.classList.add('inp-active');

        if (target.getAttribute('id') == 'light') {
            for (let color in light__mode) {
                document.documentElement.style.setProperty(`${color}`, `${light__mode[color]}`);
            }
        } else {
            for (let color in dark__mode) {
                document.documentElement.style.setProperty(`${color}`, `${dark__mode[color]}`);
            }
        }
    })
})
