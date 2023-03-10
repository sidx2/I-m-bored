class Player {
    constructor(x, y, w, h) {
        this.h = h
        this.w = w
        this.y = y
        this.x = x
        this.speed = 7 + (GAME_SPEED * 2)
        this.img = new Image()
        this.img.src = "./assets/images/player.png"
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    update() {
        this.draw()
        if (KEYS.arrowUp) this.y -= this.speed
        if (KEYS.arrowDown) this.y += this.speed
    }
}