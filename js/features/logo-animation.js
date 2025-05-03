/**
 * Initializes logo animation
 */
export function initLogoAnimation() {
  const navbarBrand = document.querySelector(".navbar-brand");
  if (!navbarBrand) return;

  // Create SVG logo
  const logoSvg = createLogoSvg();

  // Insert SVG before the brand text
  navbarBrand.insertBefore(logoSvg, navbarBrand.firstChild);

  // Add styles for the logo animation
  addLogoStyles();
}

/**
 * Creates SVG logo element
 */
function createLogoSvg() {
  const logoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  logoSvg.setAttribute("width", "36");
  logoSvg.setAttribute("height", "36");
  logoSvg.setAttribute("viewBox", "0 0 100 100");
  logoSvg.classList.add("logo-svg");

  // SVG content - simple geometric logo
  logoSvg.innerHTML = `
      <path class="logo-path" d="M20,80 L40,20 L60,80 L80,20" 
          stroke="url(#logo-gradient)" stroke-width="8" fill="none" stroke-linecap="round" />
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--primary-color)" />
          <stop offset="100%" stop-color="var(--secondary-color)" />
      </linearGradient>
  `;

  return logoSvg;
}

/**
 * Adds CSS styles for logo animation
 */
function addLogoStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .logo-svg {
          margin-right: 10px;
      }
      
      .logo-path {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: draw-logo 2s ease forwards;
      }
      
      @keyframes draw-logo {
          to {
              stroke-dashoffset: 0;
          }
      }
  `;
  document.head.appendChild(style);
}
