const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault();
        setRandomColor();
    }
});

document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent);
    }
});

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColor(isSetFromHash) {
    const colors = isSetFromHash ? document.location.hash.substring(1)
                                           .split('-')
                                           .map(color => '#' + color) : [];

    cols.forEach((col, index) => {
        let color = isSetFromHash ? colors[index] : chroma.random();

        if (!isSetFromHash) {
            colors.push(color);
        }

        if (col.querySelector('i').classList.contains('fa-lock')) {
            return;
        }
        let text = col.querySelector('h2');
        let icon = col.querySelector('button');


        text.style.color = chroma(color).luminance() > 0.5 ? 'black' : 'white';
        icon.style.color = chroma(color).luminance() > 0.5 ? 'black' : 'white';

        text.textContent = color;
        col.style.background = color;
    });
    updateColorsHash(colors);
}

function updateColorsHash(colors) {
    document.location.hash = colors ? colors.map(col => col.toString().substring(1))
                                            .join('-') : '';
}


function initColors() {
    setRandomColor(document.location.hash.length > 1);
}

initColors();

