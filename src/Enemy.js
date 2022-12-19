class Enemy {
    constructor() {
        this.x = 1200
        this.y = Math.random() * canvas.height
        this.speed = 5
        this.img = new Image()
        this.img.src = "./assets/images/enemy.png"
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.drawImage(this.img, this.x, this.y, 75, 75)
    }
    update() {
        this.draw()
        this.x -= this.speed
    }
}