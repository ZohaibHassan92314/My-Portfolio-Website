/* ═══════════════════════════════════════════════════════
   ZOHAIB HASSAN — PORTFOLIO INTERACTIONS
   Vanilla JS | No external dependencies
══════════════════════════════════════════════════════ */

'use strict';

/* ── Global: check motion preference once ── */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_TOUCH = window.matchMedia('(hover: none)').matches;

/* ═══════════════════════════════════════════════════════
   1. HAMBURGER MENU (preserved original + enhancements)
══════════════════════════════════════════════════════ */
function toggleMenu() {
  var menu = document.querySelector('.menu-links');
  var icon = document.querySelector('.hamburger-icon');
  if (!menu || !icon) return;
  var isOpen = menu.classList.toggle('open');
  icon.classList.toggle('open');
  icon.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.addEventListener('click', function (e) {
  var nav  = document.getElementById('hamburger-nav');
  var menu = document.querySelector('.menu-links');
  var icon = document.querySelector('.hamburger-icon');
  if (nav && menu && !nav.contains(e.target)) {
    menu.classList.remove('open');
    if (icon) icon.classList.remove('open');
  }
});

/* Keyboard support for hamburger */
var hamburgerBtn = document.querySelector('.hamburger-icon');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

/* ═══════════════════════════════════════════════════════
   2. CINEMATIC INTRO SEQUENCE
══════════════════════════════════════════════════════ */
(function initIntro() {
  var overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  /* Skip intro if already played this session or reduced motion */
  if (REDUCED || sessionStorage.getItem('zh-intro-v2')) {
    overlay.style.display = 'none';
    return;
  }

  /* After 1.9s trigger the clip-path wipe exit */
  setTimeout(function () {
    overlay.classList.add('intro-exit');
    /* Remove from DOM after transition ends */
    setTimeout(function () {
      overlay.remove();
      sessionStorage.setItem('zh-intro-v2', '1');
    }, 1000);
  }, 1900);
})();

/* ═══════════════════════════════════════════════════════
   3. CANVAS DATA-FLOW VISUALISATION
══════════════════════════════════════════════════════ */
(function initCanvas() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr  = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var nodes  = [];
  var edges  = [];
  var mouse  = { x: -9999, y: -9999 };
  var animId = null;
  var paused = false;

  /* Accent colour palette */
  var CLR_NODE  = 'rgba(0,212,255,';
  var CLR_EDGE  = 'rgba(0,212,255,';
  var CLR_PKT   = 'rgba(0,212,255,';

  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
  }

  function createNodes(count) {
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r:  Math.random() * 2 + 1.2,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.012 + Math.random() * 0.012,
      });
    }
  }

  function buildEdges() {
    edges = [];
    var MAX = W * 0.22;
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < MAX * MAX) {
          edges.push({
            a: i, b: j,
            pkts: [],
            nextSpawn: Date.now() + Math.random() * 4000,
          });
        }
      }
    }
  }

  function draw() {
    animId = requestAnimationFrame(draw);
    if (paused) return;

    ctx.clearRect(0, 0, W, H);

    var now = Date.now();

    /* Update & draw each node */
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.phase += n.phaseSpeed;

      /* Gentle drift */
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      /* Mouse repulsion */
      var mx = n.x - mouse.x;
      var my = n.y - mouse.y;
      var md = Math.sqrt(mx * mx + my * my);
      if (md < 120 && md > 0) {
        var force = (120 - md) * 0.04;
        n.x += (mx / md) * force;
        n.y += (my / md) * force;
      }

      /* Pulse glow */
      var pulse = 1 + Math.sin(n.phase) * 0.4;

      /* Outer halo */
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * pulse * 3, 0, Math.PI * 2);
      ctx.fillStyle = CLR_NODE + '0.04)';
      ctx.fill();

      /* Core dot */
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = CLR_NODE + (0.45 + Math.sin(n.phase) * 0.2).toFixed(2) + ')';
      ctx.fill();
    }

    /* Draw edges & packets */
    for (var e = 0; e < edges.length; e++) {
      var edge = edges[e];
      var a = nodes[edge.a];
      var b = nodes[edge.b];
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var maxDist = W * 0.25;
      if (dist > maxDist) continue;

      var alpha = (1 - dist / maxDist) * 0.13;

      /* Edge line */
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = CLR_EDGE + alpha.toFixed(3) + ')';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      /* Spawn data packets */
      if (now > edge.nextSpawn) {
        edge.pkts.push({ t: 0, speed: 0.0025 + Math.random() * 0.004 });
        edge.nextSpawn = now + 2500 + Math.random() * 5000;
      }

      /* Update + draw packets */
      for (var p = edge.pkts.length - 1; p >= 0; p--) {
        var pkt = edge.pkts[p];
        pkt.t += pkt.speed;
        if (pkt.t >= 1) { edge.pkts.splice(p, 1); continue; }

        var px = a.x + dx * pkt.t;
        var py = a.y + dy * pkt.t;
        /* Fade in/out at edges */
        var pAlpha = 1 - Math.abs(pkt.t - 0.5) * 2;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = CLR_PKT + (pAlpha * 0.9).toFixed(2) + ')';
        ctx.fill();
      }
    }
  }

  /* Pause canvas when not visible (IntersectionObserver) */
  var visObs = new IntersectionObserver(function (entries) {
    paused = !entries[0].isIntersecting;
  });
  visObs.observe(canvas);

  /* Mouse tracking */
  var section = document.getElementById('profile');
  if (section) {
    section.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });
    section.addEventListener('mouseleave', function () {
      mouse.x = -9999; mouse.y = -9999;
    });
  }

  /* Init */
  function start() {
    resize();
    var nodeCount = IS_TOUCH ? 18 : (W > 900 ? 32 : 22);
    createNodes(nodeCount);
    buildEdges();
    draw();
  }

  var ro = new ResizeObserver(function () {
    cancelAnimationFrame(animId);
    resize();
    buildEdges();
  });
  ro.observe(canvas);

  /* Skip canvas on reduced motion */
  if (REDUCED) { canvas.style.display = 'none'; return; }

  start();
})();

/* ═══════════════════════════════════════════════════════
   4. CUSTOM CURSOR
══════════════════════════════════════════════════════ */
(function initCursor() {
  if (IS_TOUCH || REDUCED) return;

  var dot  = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  var dotPos  = { x: 0, y: 0 };
  var ringPos = { x: 0, y: 0 };
  var visible = false;

  document.addEventListener('mousemove', function (e) {
    dotPos.x = e.clientX;
    dotPos.y = e.clientY;
    if (!visible) {
      visible = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    visible = false;
  });

  /* Context-aware cursor states */
  var interactiveEls = document.querySelectorAll('a, button, [tabindex]');
  interactiveEls.forEach(function (el) {
    var isBtn = el.tagName === 'BUTTON' || el.classList.contains('btn');
    el.addEventListener('mouseenter', function () {
      document.body.classList.add(isBtn ? 'cursor-on-btn' : 'cursor-on-link');
    });
    el.addEventListener('mouseleave', function () {
      document.body.classList.remove('cursor-on-btn', 'cursor-on-link');
    });
  });

  /* RAF render loop */
  (function renderCursor() {
    requestAnimationFrame(renderCursor);
    /* Dot: instant */
    dot.style.transform = 'translate(' + (dotPos.x - 3) + 'px, ' + (dotPos.y - 3) + 'px)';
    /* Ring: lagged lerp */
    ringPos.x += (dotPos.x - ringPos.x) * 0.1;
    ringPos.y += (dotPos.y - ringPos.y) * 0.1;
    ring.style.transform = 'translate(' + (ringPos.x - 17) + 'px, ' + (ringPos.y - 17) + 'px)';
  })();
})();

/* ═══════════════════════════════════════════════════════
   5. MAGNETIC BUTTONS
══════════════════════════════════════════════════════ */
(function initMagnetic() {
  if (IS_TOUCH || REDUCED) return;

  document.querySelectorAll('.magnetic, .magnetic-sm').forEach(function (el) {
    var strength = el.classList.contains('magnetic-sm') ? 0.2 : 0.35;

    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var cx = rect.left + rect.width  / 2;
      var cy = rect.top  + rect.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      el.style.transform = 'translate(' + (dx * strength) + 'px, ' + (dy * strength) + 'px)';
    });

    el.addEventListener('mouseleave', function () {
      el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      el.style.transform  = 'translate(0, 0)';
      setTimeout(function () { el.style.transition = ''; }, 500);
    });
  });
})();

/* ═══════════════════════════════════════════════════════
   6. SCROLL REVEAL (Intersection Observer)
══════════════════════════════════════════════════════ */
(function initScrollReveal() {
  var els = document.querySelectorAll('.reveal');

  if (REDUCED) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ═══════════════════════════════════════════════════════
   7. SCROLL PROGRESS BAR
══════════════════════════════════════════════════════ */
var progressBar = document.getElementById('scroll-progress');
var desktopNav  = document.getElementById('desktop-nav');
var ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(function () {
      /* Progress */
      if (progressBar) {
        var scrollTop = window.scrollY;
        var docH      = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0).toFixed(1) + '%';
      }

      /* Nav shadow */
      if (desktopNav) {
        if (window.scrollY > 40) {
          desktopNav.classList.add('scrolled');
        } else {
          desktopNav.classList.remove('scrolled');
        }
      }

      /* Active nav link */
      updateActiveNavLink();

      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ═══════════════════════════════════════════════════════
   8. ACTIVE NAVIGATION HIGHLIGHTING
══════════════════════════════════════════════════════ */
function updateActiveNavLink() {
  var sections  = ['about', 'experience', 'projects', 'contact'];
  var navLinks  = document.querySelectorAll('.nav-link');
  var scrollMid = window.scrollY + window.innerHeight * 0.4;

  var current = '';
  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el && el.offsetTop <= scrollMid) current = id;
  });

  navLinks.forEach(function (link) {
    link.classList.toggle('active', link.dataset.nav === current);
  });
}

/* ═══════════════════════════════════════════════════════
   9. SMOOTH SCROLL with nav-height offset
══════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navH = 80; /* account for fixed nav */
      var top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ═══════════════════════════════════════════════════════
   10. SKILL NODE STAGGER ANIMATION
══════════════════════════════════════════════════════ */
(function initSkillNodes() {
  if (REDUCED) return;

  var scene = document.getElementById('skills-scene');
  if (!scene) return;

  var nodes = scene.querySelectorAll('.skill-node');

  var obs = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    nodes.forEach(function (node, i) {
      setTimeout(function () {
        node.style.opacity   = '1';
        node.style.transform = 'translateX(0)';
      }, i * 60);
    });
    obs.disconnect();
  }, { threshold: 0.2 });

  /* Initially hide for stagger */
  nodes.forEach(function (node) {
    node.style.opacity   = '0';
    node.style.transform = 'translateX(-12px)';
    node.style.transition = 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)';
  });

  obs.observe(scene);
})();

/* ═══════════════════════════════════════════════════════
   11. PROJECT ROW — NUMBER COUNTER ANIMATION
══════════════════════════════════════════════════════ */
(function initProjectRows() {
  if (REDUCED) return;

  var rows = document.querySelectorAll('.project-row');
  if (!rows.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var num = entry.target.querySelector('.project-num');
        if (num) {
          num.style.animation = 'none';
          num.style.opacity   = '0';
          num.style.transform = 'translateY(20px)';
          setTimeout(function () {
            num.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            num.style.opacity    = '1';
            num.style.transform  = 'translateY(0)';
          }, 100);
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  rows.forEach(function (row) { obs.observe(row); });
})();

/* ═══════════════════════════════════════════════════════
   12. HERO NAME — CLIP-PATH REVEAL (after intro)
══════════════════════════════════════════════════════ */
(function initHeroReveal() {
  if (REDUCED) return;

  /* The hero words already animate via CSS, but we add
     a clip-path for an extra editorial feel on first load */
  var words = document.querySelectorAll('.hero-word');
  words.forEach(function (w, i) {
    w.style.clipPath = 'inset(0 100% 0 0)';
    w.style.transition = 'clip-path 0.8s cubic-bezier(0.87,0,0.13,1)';
    var delay = sessionStorage.getItem('zh-intro-v2') ? 200 : 2000;
    setTimeout(function () {
      w.style.clipPath = 'inset(0 0% 0 0)';
    }, delay + i * 120);
  });
})();

/* ═══════════════════════════════════════════════════════
   13. SECTION TITLE SPLIT-LINE REVEAL
══════════════════════════════════════════════════════ */
(function initTitleReveal() {
  if (REDUCED) return;

  var titles = document.querySelectorAll('.title');
  titles.forEach(function (title) {
    title.style.clipPath = 'inset(0 0 100% 0)';
    title.style.transition = 'clip-path 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s';
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.clipPath = 'inset(0 0 0% 0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  titles.forEach(function (t) { obs.observe(t); });
})();

/* ═══════════════════════════════════════════════════════
   14. CONTACT CARD GLOW ON HOVER
══════════════════════════════════════════════════════ */
(function initContactGlow() {
  var card = document.querySelector('.contact-info-upper-container');
  if (!card || IS_TOUCH) return;

  card.addEventListener('mousemove', function (e) {
    var rect = card.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    var y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(0,212,255,0.07) 0%, #0f1220 60%)';
  });

  card.addEventListener('mouseleave', function () {
    card.style.background = '';
  });
})();

/* ═══════════════════════════════════════════════════════
   15. ABOUT IMAGE PARALLAX
══════════════════════════════════════════════════════ */
(function initAboutParallax() {
  if (IS_TOUCH || REDUCED) return;
  var img = document.querySelector('.about-img-frame .about-pic');
  if (!img) return;

  window.addEventListener('scroll', function () {
    var section = document.getElementById('about');
    if (!section) return;
    var rect = section.getBoundingClientRect();
    var progress = -rect.top / window.innerHeight;
    if (progress > -0.5 && progress < 1.5) {
      img.style.transform = 'translateY(' + (progress * 18).toFixed(1) + 'px)';
    }
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  onScroll(); /* initial state */
});
