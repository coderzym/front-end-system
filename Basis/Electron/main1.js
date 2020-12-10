let { shell } = require("electron")

let aHref = document.querySelector("#aHref")

aHref.addEventListener("click", e => {
    e.preventDefault()
    shell.openExternal(e.target.href)
})