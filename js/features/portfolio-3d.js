/**
 * Initializes 3D hover effect for portfolio cards
 */
export function initPortfolio3DHover() {
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  if (!portfolioCards.length) return;

  portfolioCards.forEach((card) => {
    // Add tilt effect class
    card.classList.add("tilt-effect");

    // Handle mouse movement
    card.addEventListener("mousemove", handleTilt);
    card.addEventListener("mouseleave", resetTilt);
  });

  // Add tilt effect styles
  addTiltEffectStyles();
}

/**
 * Handles the tilt effect on mouse movement
 */
function handleTilt(e) {
  const card = this;
  const cardRect = card.getBoundingClientRect();
  const cardWidth = cardRect.width;
  const cardHeight = cardRect.height;

  // Calculate cursor position relative to the card
  const x = e.clientX - cardRect.left;
  const y = e.clientY - cardRect.top;

  // Calculate rotation values (max rotation: 10deg)
  const rotateY = (10 * (x - cardWidth / 2)) / (cardWidth / 2);
  const rotateX = (-10 * (y - cardHeight / 2)) / (cardHeight / 2);

  // Apply the 3D rotation
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

/**
 * Resets the tilt effect when mouse leaves
 */
function resetTilt() {
  this.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
}

/**
 * Adds CSS styles for tilt effect
 */
function addTiltEffectStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .tilt-effect {
          transform-style: preserve-3d;
          transform: perspective(1000px);
          transition: transform 0.1s;
      }
      
      .tilt-effect .portfolio-img,
      .tilt-effect .portfolio-overlay-content {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
      }
      
      .tilt-effect:hover .portfolio-img {
          transform: translateZ(20px);
      }
      
      .tilt-effect:hover .portfolio-overlay-content {
          transform: translateZ(50px);
      }
      
      .tilt-effect::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0) 50%,
              rgba(255, 255, 255, 0) 100%
          );
          top: 0;
          left: 0;
          z-index: 1;
          transition: opacity 0.3s;
          opacity: 0;
          pointer-events: none;
          border-radius: 15px;
      }
      
      .tilt-effect:hover::before {
          opacity: 1;
      }
  `;
  document.head.appendChild(style);
}
