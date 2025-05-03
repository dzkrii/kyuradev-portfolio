/**
 * Article Page Script
 * -------------------
 * Handles loading of navbar and footer for article pages
 */

// Import component loader
import ComponentLoader from "./utils/component-loader.js";

// Import utility modules
import { initThemeToggle } from "./utils/theme-toggle.js";
import {
  initSmoothScrolling,
  initScrollIndicator,
  initBackToTop,
} from "./utils/scroll-utils.js";

// Import components
import { initNavbar } from "./components/navbar.js";

// Import effects
import { initAnimations } from "./effects/animations.js";

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  "use strict";

  try {
    // Load navbar and footer components
    await loadComponents();

    // Initialize utilities
    initThemeToggle();
    initSmoothScrolling();
    initBackToTop();
    initScrollIndicator();

    // Initialize navbar after components are loaded
    setTimeout(() => {
      initNavbar();

      // Add event listener for component loaded
      document.addEventListener("component:loaded", function (e) {
        if (e.detail.id === "navbar") {
          initNavbar();
        }
      });
    }, 100);

    // Initialize animations
    initAnimations();

    console.log("Article page initialized successfully");
  } catch (error) {
    console.error("Error initializing article page:", error);
  }
});

/**
 * Loads all required components
 */
async function loadComponents() {
  const components = [
    { path: "components/navbar.html", targetId: "navbar" },
    { path: "components/footer.html", targetId: "footer" },
  ];

  try {
    await ComponentLoader.loadMany(components);
  } catch (error) {
    console.error("Error loading components:", error);
  }
}
