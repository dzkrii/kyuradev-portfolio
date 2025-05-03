// Import component loader
import ComponentLoader from "./utils/component-loader.js";

// Import utility modules
import { initThemeToggle } from "./utils/theme-toggle.js";
import {
  initSmoothScrolling,
  initScrollIndicator,
  initBackToTop,
} from "./utils/scroll-utils.js";

// Import component modules
import { initNavbar } from "./components/navbar.js";
import { initPortfolioFilter } from "./components/portfolio.js";
import { initArticleFilter } from "./components/articles.js";
import { initForms } from "./components/form.js";

// Import effect modules
import { initParallax } from "./effects/parallax.js";
import { initAnimations } from "./effects/animations.js";
import { initTypingEffect } from "./effects/typing.js";
import { initLightbox } from "./effects/lightbox.js";

// Import special features
import { initCustomCursor } from "./features/custom-cursor.js";
import { initPortfolio3DHover } from "./features/portfolio-3d.js";
import { initParticleBackground } from "./features/particle-bg.js";
import { initTextScrambleEffect } from "./features/text-scramble.js";
import { initLogoAnimation } from "./features/logo-animation.js";
import { initParallaxTiltEffect } from "./features/parallax-tilt.js";
import { initMagneticEffect } from "./features/magnetic-buttons.js";

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  "use strict";

  // Load all HTML components
  await loadAllComponents();

  // Initialize utilities
  initThemeToggle();
  initSmoothScrolling();
  initBackToTop();
  initScrollIndicator();

  // Initialize components
  initNavbar();
  initPortfolioFilter();
  initArticleFilter();
  initForms();

  // Initialize effects
  initParallax();
  initAnimations();
  initTypingEffect();
  initLightbox();

  // Initialize special features
  if (window.innerWidth > 991) {
    initCustomCursor();
    initPortfolio3DHover();
    initParticleBackground();
    initTextScrambleEffect();
    initLogoAnimation();
    initParallaxTiltEffect();
    initMagneticEffect();
  }

  console.log("Application initialized successfully");
});

async function loadAllComponents() {
  const isArticlePage = document.body.classList.contains("article-page");

  // Components NavBar and Footer
  const commonComponents = [
    { path: "components/navbar.html", targetId: "navbar" },
    { path: "components/footer.html", targetId: "footer" },
  ];

  const mainPageComponents = [
    { path: "components/hero.html", targetId: "hero" },
    { path: "components/about.html", targetId: "about" },
    { path: "components/services.html", targetId: "services" },
    { path: "components/portfolio.html", targetId: "portfolio" },
    { path: "components/articles.html", targetId: "articles" },
    { path: "components/contact.html", targetId: "contact" },
  ];

  // Load components based on page type
  if (isArticlePage) {
    return ComponentLoader.loadMany(commonComponents);
  } else {
    return ComponentLoader.loadMany([
      ...commonComponents,
      ...mainPageComponents,
    ]);
  }
}
