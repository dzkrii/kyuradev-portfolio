/**
 * Initializes parallax effect
 */
export function initParallax() {
  const parallaxBg = document.querySelector(".parallax-bg");
  if (!parallaxBg) return;

  function parallaxEffect() {
    const scrollPosition = window.scrollY;
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }

  window.addEventListener("scroll", parallaxEffect);
  parallaxEffect(); // Call once on load
}
