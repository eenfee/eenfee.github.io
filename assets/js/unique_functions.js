document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', () => {
        const code = button.previousElementSibling.innerText;
        navigator.clipboard.writeText(code).then(() => {
          button.innerText = 'Copied!';
          setTimeout(() => button.innerText = 'Copy', 1500);
        }).catch(() => {
          alert('Failed to copy. Please copy manually.');
        });
      });
    });
  });

