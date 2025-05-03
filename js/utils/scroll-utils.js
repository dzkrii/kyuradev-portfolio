/**
 * Initializes smooth scrolling for anchor links
 */
export function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return; // Skip if href is just "#"

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Initializes back to top button functionality
 */
export function initBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) return;

  function toggleBackToTopBtn() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBackToTopBtn);
  toggleBackToTopBtn(); // Call once on load

  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Creates a scroll progress indicator
 */
export function initScrollIndicator() {
  const indicator = document.createElement("div");
  indicator.className = "scroll-progress-indicator";
  document.body.appendChild(indicator);

  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    indicator.style.width = `${progress}%`;
  });

  // Add CSS for scroll progress indicator
  const style = document.createElement("style");
  style.textContent = `
      .scroll-progress-indicator {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          width: 0%;
          z-index: 9999;
          transition: width 0.1s ease;
      }
  `;
  document.head.appendChild(style);
}
