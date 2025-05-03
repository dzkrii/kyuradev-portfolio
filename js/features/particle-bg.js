/**
 * Particle Background Animation
 * ----------------------------
 * Creates interactive particle background for hero section
 */

/**
 * Initializes particle background animation
 */
export function initParticleBackground() {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  // Create canvas element
  const canvas = document.createElement("canvas");
  canvas.className = "particle-canvas";

  // Insert canvas as the first child of hero section
  heroSection.insertBefore(canvas, heroSection.firstChild);

  // Add canvas styles
  addCanvasStyles();

  // Configure canvas and particles
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = heroSection.offsetWidth);
  let height = (canvas.height = heroSection.offsetHeight);

  // Handle window resize
  window.addEventListener("resize", () => {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  });

  // Create particles
  const particles = createParticles(width, height);

  // Start animation
  animateParticles(particles, ctx, width, height);
}

/**
 * Adds CSS styles for canvas
 */
function addCanvasStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .particle-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
      }
  `;
  document.head.appendChild(style);
}

/**
 * Creates particle objects
 */
function createParticles(width, height) {
  const particles = [];
  const particleCount = width > 768 ? 50 : 30;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(width, height));
  }

  return particles;
}

/**
 * Particle class
 */
class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      "rgba(108, 99, 255, 0.3)",
      "rgba(85, 230, 165, 0.3)",
      "rgba(255, 255, 255, 0.3)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(width, height) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x > width || this.x < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y > height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Animates particles
 */
function animateParticles(particles, ctx, width, height) {
  // Draw function
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update(width, height);
      particle.draw(ctx);
    });

    // Draw connections between particles
    connectParticles(particles, ctx, width);

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Connect particles with lines
 */
function connectParticles(particles, ctx, width) {
  const maxDistance = width > 768 ? 150 : 100;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        // Calculate opacity based on distance
        const opacity = 1 - distance / maxDistance;

        ctx.strokeStyle = `rgba(108, 99, 255, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}
