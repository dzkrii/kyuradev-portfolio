/**
 * Initializes all forms
 */
export function initForms() {
  const contactForm = document.querySelector(".contact-form");
  const commentForm = document.querySelector(".comment-form form");
  const newsletterForm = document.querySelector(".newsletter-form");

  // Set up form submission handlers
  if (contactForm) {
    contactForm.addEventListener("submit", (event) =>
      validateForm(contactForm, event)
    );
  }

  if (commentForm) {
    commentForm.addEventListener("submit", (event) =>
      validateForm(commentForm, event)
    );
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) =>
      validateForm(newsletterForm, event)
    );
  }
}

/**
 * Validates form and handles submission
 */
function validateForm(form, event) {
  event.preventDefault();

  // Simple form validation
  let isValid = true;
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      isValid = false;
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }

    // Validate email format
    if (input.type === "email" && input.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        isValid = false;
        input.classList.add("is-invalid");
      }
    }
  });

  if (isValid) {
    simulateFormSubmission(form);
  }
}

/**
 * Simulates form submission with loading and success states
 */
function simulateFormSubmission(form) {
  // Get submit button
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

  // Simulate API call with timeout
  setTimeout(() => {
    // Show success state
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
    form.reset();

    // Reset button after some time
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 3000);
  }, 2000);
}
