/**
 * Initializes lightbox for portfolio images
 */
export function initLightbox() {
  // Select all portfolio lightbox links
  const lightboxLinks = document.querySelectorAll(".portfolio-lightbox");
  if (lightboxLinks.length === 0) return;

  // Create lightbox elements
  const lightbox = createLightboxElement();

  // Add lightbox CSS
  addLightboxCSS();

  // Get lightbox elements
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");

  // Open lightbox
  lightboxLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const imgSrc = this.getAttribute("href");
      const imgTitle = this.getAttribute("title");

      lightboxImage.src = imgSrc;
      lightboxCaption.textContent = imgTitle;

      setTimeout(() => {
        lightbox.classList.add("show");
      }, 50);
    });
  });

  // Close lightbox on close button click
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  // Close lightbox on outside click
  lightbox.addEventListener("click", function (e) {
    if (e.target === this) {
      lightbox.classList.remove("show");
    }
  });

  // Close lightbox on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("show")) {
      lightbox.classList.remove("show");
    }
  });
}

/**
 * Creates lightbox DOM element
 */
function createLightboxElement() {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
      <div class="lightbox-content">
          <img class="lightbox-image" src="" alt="Portfolio Image">
          <span class="lightbox-close">&times;</span>
          <div class="lightbox-caption"></div>
      </div>
  `;
  document.body.appendChild(lightbox);
  return lightbox;
}

/**
 * Adds CSS styles for lightbox
 */
function addLightboxCSS() {
  const style = document.createElement("style");
  style.textContent = `
      .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      
      .lightbox.show {
          opacity: 1;
          visibility: visible;
      }
      
      .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 85vh;
      }
      
      .lightbox-image {
          display: block;
          max-width: 100%;
          max-height: 85vh;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
      }
      
      .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          color: white;
          font-size: 30px;
          cursor: pointer;
          transition: color 0.3s ease;
      }
      
      .lightbox-close:hover {
          color: var(--secondary-color);
      }
      
      .lightbox-caption {
          position: absolute;
          bottom: -40px;
          left: 0;
          right: 0;
          color: white;
          text-align: center;
          font-size: 16px;
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.7);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
      }
      
      .lightbox.show .lightbox-caption {
          opacity: 1;
          transform: translateY(0);
      }
  `;
  document.head.appendChild(style);
}
