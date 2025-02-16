const canvas = document.
    querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = innerWidth;
canvas.height = innerHeight;

// In order to be able to interact with the surroundings,
// we have to create a class to our player

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 30, 'pink');

const projectile = new Projectile(
    canvas.width / 2, 
    canvas.height / 2, 
    5, 
    'purple',
    {
        x: 1,
        y: 1
    }
)

const projectiles = []

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach(projectile => {
        projectile.update()
    })
}

addEventListener('click', (e) => {

    const angle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(
        canvas.width / 2, 
        canvas.height / 2, 
        5, 
        'purple', 
        velocity
    ))
})

animate()
