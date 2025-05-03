/**
 * Preloader Functionality
 * -----------------------
 * Handles website preloader animation
 */

/**
 * Initializes the preloader
 */
export function initPreloader() {
  // Create preloader element
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(preloader);

  // Hide preloader after page loads
  window.addEventListener("load", function () {
    preloader.classList.add("fade-out");
    setTimeout(function () {
      preloader.style.display = "none";
    }, 500);
  });
}
