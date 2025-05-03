/**
 * Animations
 * ---------
 * Handles general animations in the website
 */

/**
 * Initializes all animations
 */
export function initAnimations() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  // Skills progress bars animation
  initSkillBarsAnimation();
}

/**
 * Animates skill bars when they come into view
 */
function initSkillBarsAnimation() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe about section
  observer.observe(aboutSection);
}

/**
 * Animates all skill bars
 */
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".progress-bar");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("aria-valuenow") + "%";
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}
