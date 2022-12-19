const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.height = window.innerHeight
canvas.width = window.innerWidth

// const backgroundImage = new Image()
// backgroundImage.src = "./assets/images/background.jpg"
// const fireSound = new Audio("./assets/audio/fire.mp3")
// const dieSound = new Audio("./assets/audio/die.mp3")

window.onload = () => {
    alert("Up Down Arrow Keys to move\nSpace bar to shoot")

}

const playerMain = new Player(200, 500, 75, 75)
const bullets = []
const enemies = []
let frame = 0

const animate = () => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
        // ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

    playerMain.update()
    bullets.forEach((b) => { b.update() })
    enemies.forEach((b) => { b.update() })

    if (KEYS.spaceBar) {
        bullets.push(new Bullet(playerMain.x + (playerMain.w), playerMain.y + (playerMain.h / 2)))
            // fireSound.play()
    }

    // hit
    bullets.forEach((bullet, bullet_i) => {
        enemies.forEach((enemy, enemy_i) => {
            if (bullet.x > enemy.x &&
                bullet.x < enemy.x + 75 &&
                bullet.y > enemy.y &&
                bullet.y < enemy.y + 50
            ) {
                enemies.splice(enemy_i, 1)
                    // dieSound.play()
            }
        })
    })

    // game over
    enemies.forEach((enemy) => {
        if (enemy.x < playerMain.x + playerMain.w) {
            alert("Game Over")
            cancelAnimationFrame()
        }
    })

    if (frame % 120 == 0) enemies.push(new Enemy())
    frame++
    requestAnimationFrame(animate)
}

animate()