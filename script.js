document.querySelectorAll('.nav-links a').forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    });
});
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;
const mouse = { x: 0, y: 0 };

// Create particle objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Move particles
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce particles off edges
        if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

        // Move slightly towards the mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        this.x += dx * 0.0002;
        this.y += dy * 0.0002;

        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 + 1;
        const color = `rgba(255, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        particles.push(new Particle(x, y, radius, color));
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => particle.update());
    requestAnimationFrame(animateParticles);
}

// Track mouse movement
window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Adjust canvas size on resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Initialize and animate
initParticles();
animateParticles();
