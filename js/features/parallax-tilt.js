/**
 * Parallax Image Tilt Effect
 * ------------------------
 * Creates 3D tilt effect for about image
 */

/**
 * Initializes parallax tilt effect
 */
export function initParallaxTiltEffect() {
  const aboutImageContainer = document.querySelector(".about-img-container");
  if (!aboutImageContainer) return;

  // Add special class
  aboutImageContainer.classList.add("parallax-tilt");

  // Add styles for the tilt effect
  addTiltStyles();

  // Add CSS variable for RGB values
  setupColorVariables();

  // Handle mouse movement for tilt effect
  aboutImageContainer.addEventListener("mousemove", handleTiltEffect);

  // Reset tilt on mouse leave
  aboutImageContainer.addEventListener("mouseleave", resetTiltEffect);
}

/**
 * Adds CSS styles for tilt effect
 */
function addTiltStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .parallax-tilt {
          transform-style: preserve-3d;
          transform: perspective(1000px);
          transition: transform 0.1s;
      }
      
      .parallax-tilt .about-image {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
      }
      
      .parallax-tilt:hover .about-image {
          transform: translateZ(20px);
      }
      
      .parallax-tilt::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.2) 0%, rgba(var(--primary-color-rgb), 0) 50%);
          top: 0;
          left: 0;
          z-index: 1;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
      }
      
      .parallax-tilt:hover::after {
          opacity: 1;
      }
  `;
  document.head.appendChild(style);
}

/**
 * Setup color variables for tilt effect
 */
function setupColorVariables() {
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root)
    .getPropertyValue("--primary-color")
    .trim();
  const rgb = hexToRgb(primaryColor) || "108, 99, 255"; // fallback value
  root.style.setProperty("--primary-color-rgb", rgb);
}

/**
 * Handles tilt effect on mouse movement
 */
function handleTiltEffect(e) {
  const container = this;
  const rect = container.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // Calculate cursor position relative to the card
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate rotation values (max rotation: 7deg)
  const rotateY = (7 * (x - width / 2)) / (width / 2);
  const rotateX = (-7 * (y - height / 2)) / (height / 2);

  // Apply the 3D rotation
  container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

/**
 * Resets tilt effect
 */
function resetTiltEffect() {
  this.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
}

/**
 * Helper function to convert hex to rgb
 */
function hexToRgb(hex) {
  // Check if it's already in RGB format
  if (hex.startsWith("rgb")) {
    const rgbValues = hex.match(/\d+/g);
    if (rgbValues && rgbValues.length === 3) {
      return rgbValues.join(", ");
    }
    return null;
  }

  // Remove # if present
  hex = hex.replace("#", "");

  // Convert 3-digit hex to 6-digits
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Convert hex to rgb
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }

  return `${r}, ${g}, ${b}`;
}
