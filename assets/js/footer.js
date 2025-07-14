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

// Replace with your Google Apps Script Web App URLs
    const educationScriptURL = 'https://script.google.com/macros/s/AKfycbzGiY7-EqZu0cVbAZOEXblAlpc_fusnMeJm06V6t48UlM-EGuroTNa9KvGGbbhGJUHOqA/exec';
    const environmentScriptURL = 'https://script.google.com/macros/s/AKfycbyB0r4b6EMFoiazGbsHIgd7sD8X2NSdp0Bw8qmVWGI9IMY1XbpDO3vwd_uFhNu8L8YFTg/exec';

    // Function to handle form submission
    function handleFormSubmit(form, scriptURL, messageDivId) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const messageDiv = document.getElementById(messageDivId);
        messageDiv.textContent = 'Submitting...';
        
        fetch(scriptURL, {
          method: 'POST',
          body: new FormData(form)
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

    // Attach event listeners to both forms
    const educationForm = document.forms['education-subscribe'];
    const environmentForm = document.forms['environment-subscribe'];
    
    handleFormSubmit(educationForm, educationScriptURL, 'education-message');
    handleFormSubmit(environmentForm, environmentScriptURL, 'environment-message');
