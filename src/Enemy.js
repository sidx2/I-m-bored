class Enemy {
    constructor() {
        this.x = window.innerWidth * 0.95
        this.y = (Math.random() * (canvas.height - 100)) + 75
        this.speed = 5
        this.img = new Image()
        this.img.src = "./assets/images/enemy.png"
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, 75, 75)
    }
    update() {
        this.draw()
        this.x -= this.speed
    }
}