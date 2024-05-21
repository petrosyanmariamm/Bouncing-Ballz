const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#222831'

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = 0; // vertical velocity // aragutyun
        this.gravity = 0.5;
        this.friction = 0.7; // dampening effect
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#76ABAE';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y + this.radius + this.dy > canvas.height ?
        this.dy = -this.dy * this.friction :
        this.dy += this.gravity;
        
        this.y += this.dy;
        this.draw();
    }
}

let circles = [];

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = 25; // or any size you prefer
    circles.push(new Circle(x, y, radius));
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
    requestAnimationFrame(animate);
}

animate();

