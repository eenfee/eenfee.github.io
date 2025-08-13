document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetSelector = button.getAttribute('data-copy-target');
      const codeElement = targetSelector ? document.querySelector(targetSelector) : null;
      const code = codeElement ? codeElement.innerText.trim() : '';
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          button.innerText = 'Copied!';
          setTimeout(() => button.innerText = '📋', 1500);
        }).catch(() => {
          alert('Failed to copy. Please copy manually.');
          button.innerText = '📋';
        });
      } else {
        alert('No text to copy. Check data-copy-target.');
      }
    });
  });
});