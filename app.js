/* NT Auto Works — shared interactions */
(function () {
  // Intro overlay
  var intro = document.getElementById('intro');
  if (intro) {
    window.addEventListener('load', function () {
      setTimeout(function () { intro.classList.add('hide'); }, 700);
    });
    setTimeout(function () { intro.classList.add('hide'); }, 2200); // fail-safe
  }

  // Nav background on scroll
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.position = 'absolute';
      links.style.top = '100%';
      links.style.left = '0';
      links.style.right = '0';
      links.style.flexDirection = 'column';
      links.style.gap = '0';
      links.style.background = 'rgba(22,24,29,.97)';
      links.style.padding = open ? '0' : '1rem 24px';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 900) links.style.display = 'none';
      });
    });
  }

  // Hero rolling images
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 5600);
    }
  }

  // Reveal on scroll
  var revs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revs.forEach(function (r) { io.observe(r); });
  } else {
    revs.forEach(function (r) { r.classList.add('in'); });
  }
})();
