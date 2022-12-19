class Bullet {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.h = 2
        this.w = 10
        this.speed = 40
    }
    draw() {
        ctx.fillStle = 'red'
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    update() {
        this.draw()
        this.x += this.speed
    }
}