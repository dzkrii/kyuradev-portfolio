/**
 * Navbar Component
 * ---------------
 * Handles navbar functionality
 */

/**
 * Initializes all navbar functionality
 */
export function initNavbar() {
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!mainNav || !navLinks.length) return;

  // Check if this is an article page
  const isArticlePage = document.body.classList.contains("article-page");

  // Add background to navbar on scroll (skip for article pages)
  if (!isArticlePage) {
    initNavbarScrollEffect(mainNav);
  }

  // Handle active link highlighting (skip for article pages)
  if (!isArticlePage) {
    initActiveNavLinks(navLinks);
  }

  // Close mobile menu when clicking on a nav link
  initMobileMenuClosing(navLinks);

  // Handle navigation for article pages
  if (isArticlePage) {
    handleArticlePageNavigation(navLinks);
  }

  // Add click event listeners for all nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // If it's a section link on article page, prevent default and handle manually
      if (isArticlePage && href.startsWith("index.html#")) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
}

/**
 * Handles navigation for article pages
 */
function handleArticlePageNavigation(navLinks) {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href) {
      if (href === "index.html") {
        // Link to home page
        link.setAttribute("href", "index.html");
      } else if (href.startsWith("#")) {
        // Link to section on home page
        link.setAttribute("href", `index.html${href}`);
      }
      // External links and other URLs are left unchanged
    }
  });
}

/**
 * Adds background to navbar on scroll
 */
function initNavbarScrollEffect(mainNav) {
  function addNavbarBg() {
    if (window.scrollY > 50) {
      mainNav.classList.add("navbar-scrolled");
    } else {
      mainNav.classList.remove("navbar-scrolled");
    }
  }

  window.addEventListener("scroll", addNavbarBg);
  addNavbarBg(); // Call once on load
}

/**
 * Updates active navigation link based on scroll position
 */
function initActiveNavLinks(navLinks) {
  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((navLink) => {
          navLink.classList.remove("active");
          if (navLink.getAttribute("href") === `#${sectionId}`) {
            navLink.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Call once on load
}

/**
 * Closes mobile menu when a nav link is clicked
 */
function initMobileMenuClosing(navLinks) {
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const navbarCollapse = document.getElementById("navbarResponsive");
      if (navbarCollapse && typeof bootstrap !== "undefined") {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    });
  });
}
