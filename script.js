const canvas = document.getElementById("canvas")
const beforeStart = document.getElementById("beforeStart")
const ctx = canvas.getContext("2d")

canvas.height = window.innerHeight
canvas.width = window.innerWidth

const backgroundMusic = new Audio("./assets/audio/bg.mp3")
backgroundMusic.loop = true

let GAME_SPEED = 0
let ENEMY_SPAN_RATE = 120
let level = 1
let updateSpeed = true
let OK

window.onload = async() => {
    beforeStart.innerText = 'Click Anywhere to start'
    OK = await confirm("Up Down Arrow Keys to move\nSpace bar to shoot")
    if (OK == true || OK == false) {
        preGame()
    }
}

const preGame = () => {
    window.addEventListener("click", (e) => {
        beforeStart.style.display = 'none'
        canvas.style.display = 'flex'
        if (OK) game()
    })
}


const game = () => {
    backgroundMusic.play()
    const playerMain = new Player(window.innerWidth * 0.05, 500, 75, 75)
    const bullets = []
    const enemies = []
    let frame = 0
    let score = 0

    const drawScore = () => {
        ctx.font = "30px Verdana";
        // Create gradient
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText(`Score : ${score <= 22 ? score : "🤯"}`, (window.innerWidth / 2) - 150, 35);
    }

    const drawLevel = () => {
        ctx.font = "30px Verdana";
        // Create gradient
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "gray");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText(`Level : ${level <= 22 ? level : "🤯"}`, (window.innerWidth / 2) + 50, 35);
    }

    const animate = () => {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawScore(0)
        drawLevel()
        playerMain.update()
        bullets.forEach((b) => { b.update() })
        enemies.forEach((b) => { b.update() })

        if (KEYS.spaceBar) {
            bullets.push(new Bullet(playerMain.x + (playerMain.w), playerMain.y + (playerMain.h / 2)))
        }

        // hit
        bullets.forEach((bullet, bullet_i) => {
            if (bullet.x > canvas.width) bullets.splice(bullet_i, 1)
            enemies.forEach((enemy, enemy_i) => {
                if (bullet.x > enemy.x &&
                    bullet.x < enemy.x + 75 &&
                    bullet.y > enemy.y &&
                    bullet.y < enemy.y + 50
                ) {
                    enemies.splice(enemy_i, 1)
                    score++
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

        if (frame % ENEMY_SPAN_RATE == 0) enemies.push(new Enemy())
        if (updateSpeed && score > 1 && score % 10 == 0) {
            playerMain.speed += 1
            GAME_SPEED++
            if(ENEMY_SPAN_RATE > 1)ENEMY_SPAN_RATE -= ENEMY_SPAN_RATE > 10 ? 10 : 1
            level++
            updateSpeed = false
        }
        if (score > 1 && score % 10 != 0) updateSpeed = true
        frame++
        requestAnimationFrame(animate)
    }

    animate()
}