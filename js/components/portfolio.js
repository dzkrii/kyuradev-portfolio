/**
 * Initializes portfolio filtering
 */
export function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (!filterButtons.length || !portfolioItems.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        if (
          filterValue === "*" ||
          item.classList.contains(filterValue.substring(1))
        ) {
          showPortfolioItem(item);
        } else {
          hidePortfolioItem(item);
        }
      });
    });
  });
}

/**
 * Shows a portfolio item with animation
 */
function showPortfolioItem(item) {
  item.style.display = "block";
  setTimeout(() => {
    item.style.opacity = "1";
    item.style.transform = "scale(1)";
  }, 50);
}

/**
 * Hides a portfolio item with animation
 */
function hidePortfolioItem(item) {
  item.style.opacity = "0";
  item.style.transform = "scale(0.8)";
  setTimeout(() => {
    item.style.display = "none";
  }, 300);
}
