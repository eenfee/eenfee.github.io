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

// Replace with your single deployed Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';

function handleFormSubmit(form, sheetName, messageDivId) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const messageDiv = document.getElementById(messageDivId);
    messageDiv.textContent = 'Submitting...';

    const formData = new FormData(form);
    formData.append('sheetName', sheetName); // Pass the sheet name

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        messageDiv.textContent = 'Thank you for subscribing!';
        form.reset();
      } else {
        messageDiv.textContent = 'Error: ' + data.error;
      }
    })
    .catch(error => {
      messageDiv.textContent = 'Error: ' + error.message;
    });
  });
}

const educationForm = document.forms['education-subscribe'];
const environmentForm = document.forms['environment-subscribe'];

handleFormSubmit(educationForm, 'Education', 'education-message');
handleFormSubmit(environmentForm, 'Environment', 'environment-message');
