

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.tocbox-nav-unique').forEach(function(nav) {
    const title = nav.querySelector('.tocbox-title-unique');
    const tocList = nav.querySelector('.tocbox-list-unique, ul');
    if (title && tocList) {
      function setInitialState() {
        if (window.innerWidth >= 900) {
          nav.classList.add('expanded');
        } else {
          nav.classList.remove('expanded');
        }
      }
      setInitialState();
      window.addEventListener('resize', setInitialState);
      title.setAttribute('tabindex', '0');
      title.setAttribute('role', 'button');
      title.setAttribute('aria-expanded', nav.classList.contains('expanded'));
      title.addEventListener('click', function(e) {
        nav.classList.toggle('expanded');
        title.setAttribute('aria-expanded', nav.classList.contains('expanded'));
      });
      title.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          nav.classList.toggle('expanded');
          title.setAttribute('aria-expanded', nav.classList.contains('expanded'));
        }
      });
    }
  });
});
