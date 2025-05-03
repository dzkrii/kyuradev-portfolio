/**
 * Custom Interactive Cursor
 * ------------------------
 * Creates a custom interactive cursor effect
 */

/**
 * Initializes custom cursor effect
 */
export function initCustomCursor() {
  // Create cursor elements
  const cursorOuter = document.createElement("div");
  const cursorInner = document.createElement("div");

  cursorOuter.className = "cursor-outer";
  cursorInner.className = "cursor-inner";

  document.body.appendChild(cursorOuter);
  document.body.appendChild(cursorInner);

  // Add CSS for cursors
  addCursorStyles();

  // Update cursor position
  let mouseX = 0;
  let mouseY = 0;
  let outerX = 0;
  let outerY = 0;
  let innerX = 0;
  let innerY = 0;

  // Add cursor-hidden class to body
  document.body.classList.add("cursor-hidden");

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover effect for links and buttons
  const cursorTargets = document.querySelectorAll(
    'a, button, input[type="submit"], .service-card, .portfolio-card, .article-card'
  );

  cursorTargets.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      cursorOuter.classList.add("cursor-expand");
    });

    item.addEventListener("mouseleave", function () {
      cursorOuter.classList.remove("cursor-expand");
    });
  });

  // Animation loop
  function updateCursor() {
    // Smooth movement for outer cursor
    outerX += (mouseX - outerX) * 0.1;
    outerY += (mouseY - outerY) * 0.1;

    // Fast movement for inner cursor
    innerX += (mouseX - innerX) * 0.3;
    innerY += (mouseY - innerY) * 0.3;

    // Apply positions
    cursorOuter.style.left = outerX + "px";
    cursorOuter.style.top = outerY + "px";

    cursorInner.style.left = innerX + "px";
    cursorInner.style.top = innerY + "px";

    requestAnimationFrame(updateCursor);
  }

  requestAnimationFrame(updateCursor);
}

/**
 * Adds CSS styles for custom cursor
 */
function addCursorStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .cursor-hidden {
          cursor: none !important;
      }
      
      .cursor-outer {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(108, 99, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, transform 0.1s;
          z-index: 9999;
          mix-blend-mode: difference;
      }
      
      .cursor-inner {
          position: fixed;
          width: 8px;
          height: 8px;
          background-color: var(--primary-color);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          mix-blend-mode: difference;
      }
      
      .cursor-expand {
          width: 60px;
          height: 60px;
          background-color: rgba(108, 99, 255, 0.2);
      }
      
      @media (max-width: 991.98px) {
          .cursor-outer, .cursor-inner {
              display: none;
          }
      }
  `;
  document.head.appendChild(style);
}
