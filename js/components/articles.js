/**
 * Initializes article category filtering
 */
export function initArticleFilter() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const articleItems = document.querySelectorAll(".article-item");

  if (!categoryButtons.length || !articleItems.length) return;

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      this.classList.add("active");

      const categoryValue = this.getAttribute("data-category");

      // Filter article items
      articleItems.forEach((item) => {
        if (categoryValue === "all" || item.classList.contains(categoryValue)) {
          showArticleItem(item);
        } else {
          hideArticleItem(item);
        }
      });
    });
  });
}

/**
 * Shows an article item with animation
 */
function showArticleItem(item) {
  item.style.display = "block";
  setTimeout(() => {
    item.style.opacity = "1";
    item.style.transform = "translateY(0)";
  }, 50);
}

/**
 * Hides an article item with animation
 */
function hideArticleItem(item) {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  setTimeout(() => {
    item.style.display = "none";
  }, 300);
}
