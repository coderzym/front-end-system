function createElement() {
    const element = document.createElement('div')
    element.innerHTML = '欣欣';
    return element
}

document.body.appendChild(createElement())