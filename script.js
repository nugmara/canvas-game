// Select our canvas with querySelector
// Select our context, in this case 2d since the game is 2d, declaring ctx
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Size of our canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

// In order to be able to interact with the surroundings,
// we have to create a class to our player

class Player {
  // Constructor is called each time we initialite a new version of the player
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Class for the projectiles that our player will be shooting
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // We call this function when we want to draw something on the canvas
  draw() {
    // This produce a circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update the classes properties so we can separate how the classes looks like comparing to where
  // we are actually manipulating its properties
  update() {
    this.draw();
    // To make the projectile move
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

// Put the player on the center of the canvas
const x = canvas.width / 2;
const y = canvas.height / 2;

// We declare a new const called player equal to a new instance of player
// With the values we want to have for our player from the Player Class
const player = new Player(x, y, 30, "pink");
const projectiles = [];
const enemies = [];

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;

    let x
    let y

    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height
    } else {
        x = Math.random() * canvas.width
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;

    }
    const color = "green";

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

const projectile = new Projectile(
  canvas.width / 2,
  canvas.height / 2,
  5,
  "purple",
  {
    x: 1,
    y: 1,
  }
);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.update();
  });

  enemies.forEach((enemy) => {
    enemy.update();
  });
}

addEventListener("click", (e) => {
  const angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "purple", velocity)
  );
});

animate();
spawnEnemies();
