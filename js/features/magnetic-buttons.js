/**
 * Initializes magnetic effect for buttons
 */
export function initMagneticEffect() {
  const buttons = document.querySelectorAll(".hero-buttons .btn, .send-btn");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.classList.add("magnetic-effect");

    button.addEventListener("mousemove", handleMagneticEffect);
    button.addEventListener("mouseleave", resetMagneticEffect);
  });

  // Add styles for the magnetic effect
  addMagneticStyles();
}

/**
 * Handles the magnetic effect on mouse movement
 */
function handleMagneticEffect(e) {
  const btn = this;
  const rect = btn.getBoundingClientRect();
  const btnWidth = rect.width;
  const btnHeight = rect.height;

  // Calculate cursor position relative to the button
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate the distance from center in percentage
  const centerX = btnWidth / 2;
  const centerY = btnHeight / 2;

  // Calculate the maximum movement (in pixels)
  const maxMovement = 10;

  // Calculate the movement based on cursor position
  const moveX = ((x - centerX) / centerX) * maxMovement;
  const moveY = ((y - centerY) / centerY) * maxMovement;

  // Apply the transform
  btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

/**
 * Resets the magnetic effect when mouse leaves
 */
function resetMagneticEffect() {
  // Reset the transform
  this.style.transform = "translate(0, 0)";
}

/**
 * Adds CSS styles for magnetic effect
 */
function addMagneticStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .magnetic-effect {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
  `;
  document.head.appendChild(style);
}
