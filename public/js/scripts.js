window.addEventListener('scroll', function () {
  const header = document.querySelector('[data-js="header-scroll"]');
  header.classList.toggle('-scrolled', window.scrollY > 100);
});

document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.querySelector('.l-header__nav__toggle');

  var header = document.querySelector('.l-header');

  toggleButton.addEventListener('click', function () {
    header.classList.toggle('is-open');
  });
});
