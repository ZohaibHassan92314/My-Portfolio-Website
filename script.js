/* ═══════════════════════════════════════════
   HAMBURGER MENU — original preserved
═══════════════════════════════════════════ */
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

/* Close menu when clicking outside */
document.addEventListener('click', function (e) {
  const nav   = document.getElementById('hamburger-nav');
  const menu  = document.querySelector('.menu-links');
  const icon  = document.querySelector('.hamburger-icon');
  if (nav && !nav.contains(e.target)) {
    menu.classList.remove('open');
    icon.classList.remove('open');
  }
});

/* Keyboard support for hamburger icon */
const hamburgerIcon = document.querySelector('.hamburger-icon');
if (hamburgerIcon) {
  hamburgerIcon.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

/* ═══════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════ */
const progressBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
  if (!progressBar) return;
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress.toFixed(1) + '%';
}

/* ═══════════════════════════════════════════
   STICKY NAV SHADOW ON SCROLL
═══════════════════════════════════════════ */
const desktopNav = document.getElementById('desktop-nav');

function updateNav() {
  if (!desktopNav) return;
  if (window.scrollY > 20) {
    desktopNav.classList.add('scrolled');
  } else {
    desktopNav.classList.remove('scrolled');
  }
}

/* ═══════════════════════════════════════════
   SCROLL-REVEAL (Intersection Observer)
═══════════════════════════════════════════ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScrollReveal() {
  if (prefersReducedMotion) {
    /* Immediately show all reveal elements */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* reveal once */
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════
   SMOOTH SCROLL for anchor links
═══════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = (desktopNav ? desktopNav.offsetHeight : 0) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════
   SCROLL HANDLER (throttled)
═══════════════════════════════════════════ */
let scrollTicking = false;

window.addEventListener('scroll', function () {
  if (!scrollTicking) {
    window.requestAnimationFrame(function () {
      updateScrollProgress();
      updateNav();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  initScrollReveal();
  initSmoothScroll();
  updateScrollProgress();
  updateNav();
});
