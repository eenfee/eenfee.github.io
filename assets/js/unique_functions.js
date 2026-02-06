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


// study abroad planning page
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

/* Open first tab by default */
document.addEventListener("DOMContentLoaded", function () {
  const firstTab = document.querySelector(".tablinks");
  if (firstTab) {
    firstTab.click();
  }
});