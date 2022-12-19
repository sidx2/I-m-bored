const KEYS = {
    arrowUp: false,
    arrowDown: false,
    spaceBar: false
}

document.addEventListener("keydown", (k) => {
    if (k.keyCode == 38) KEYS.arrowUp = true
    if (k.keyCode == 40) KEYS.arrowDown = true
    if (k.keyCode == 32) KEYS.spaceBar = true
})

document.addEventListener("keyup", (k) => {
    if (k.keyCode == 38) KEYS.arrowUp = false
    if (k.keyCode == 40) KEYS.arrowDown = false
    if (k.keyCode == 32) {
        KEYS.spaceBar = false

    }
})