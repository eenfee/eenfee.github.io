document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer");
  const footerText = document.querySelector(".footer-text p");

  // Set footer copyright date (UTC format optional)
  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const day = now.getDate();

  if (footerText) {
    footerText.innerHTML = `&copy; ${month} ${day}, ${year} EENFEE. All rights reserved.`;
  }

  // Adjust footer position based on content height
  function updateFooterPosition() {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    if (bodyHeight <= windowHeight) {
      footer.classList.remove("relative");
      footer.classList.add("fixed");
    } else {
      footer.classList.remove("fixed");
      footer.classList.add("relative");
    }
  }

  updateFooterPosition();
  window.addEventListener("resize", updateFooterPosition);
});

function showMessage(divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.textContent = "Thank you for subscribing!";
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 5000); // Clear message after 5 seconds
  return true; // Allow form to submit
}