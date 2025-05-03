/**
 * Theme Toggle Functionality
 * -------------------------
 * Handles dark/light mode switching
 */

/**
 * Initializes theme toggle functionality
 */
export function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or use user's system preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", function () {
    let theme = "light";

    if (document.documentElement.getAttribute("data-theme") === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      theme = "dark";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }

    localStorage.setItem("theme", theme);
  });
}
