document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".toc-toggle");
  const toc = document.getElementById("toc");
  if (toggleBtn && toc) {
    toggleBtn.addEventListener("click", function () {
      toc.classList.toggle("show");
      toggleBtn.setAttribute("aria-expanded", toc.classList.contains("show"));
    });
    // Optional: close TOC when clicking outside
    document.addEventListener("click", function(e) {
      if (
        !toggleBtn.contains(e.target) &&
        !toc.contains(e.target) &&
        toc.classList.contains("show")
      ) {
        toc.classList.remove("show");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
});