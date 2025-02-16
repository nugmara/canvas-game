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
}