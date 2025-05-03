/**
 * Typing Effect
 * ------------
 * Handles typing animation effect for hero subtitle
 */

/**
 * Initializes typing effect
 */
export function initTypingEffect() {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (!heroSubtitle) return;

  const originalText = heroSubtitle.textContent;
  const professions = [
    "Web Developer & Designer",
    "Frontend Developer",
    "UI/UX Designer",
    "Creative Coder",
  ];

  // Add typing CSS
  addTypingCSS();

  // Initialize variables
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  // Start the effect after a delay
  setTimeout(() => {
    heroSubtitle.textContent = ""; // Clear original text
    typeText();
  }, 1000);

  /**
   * Types text character by character
   */
  function typeText() {
    const currentProfession = professions[professionIndex];

    // Set typing speed
    if (isDeleting) {
      typingSpeed = 50; // Faster when deleting
    } else {
      typingSpeed = 100; // Normal speed when typing
    }

    // Add or remove characters based on state
    if (!isDeleting && charIndex <= currentProfession.length) {
      heroSubtitle.textContent = currentProfession.substring(0, charIndex);
      charIndex++;
    } else if (isDeleting && charIndex >= 0) {
      heroSubtitle.textContent = currentProfession.substring(0, charIndex);
      charIndex--;
    }

    // Add typing cursor effect
    heroSubtitle.classList.add("typing-effect");

    // Handle state changes
    if (!isDeleting && charIndex > currentProfession.length) {
      // Wait before deleting
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next profession
      professionIndex = (professionIndex + 1) % professions.length;
      isDeleting = false;
      typingSpeed = 500; // Pause before typing next
    }

    // Schedule next iteration
    setTimeout(typeText, typingSpeed);
  }
}

/**
 * Adds CSS styles for typing effect
 */
function addTypingCSS() {
  const style = document.createElement("style");
  style.textContent = `
      .typing-effect::after {
          content: '|';
          animation: blink 1s infinite;
      }
      
      @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
      }
  `;
  document.head.appendChild(style);
}
