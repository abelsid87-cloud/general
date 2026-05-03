/* ═══════════════════════════════════════════════════════════════
   PIERRES MANO — main.js  v3.0
   Loader · Custom cursor · Sticky nav · Scroll reveal
   Mobile menu · Image lazy-load · Parallax hero · Form
═══════════════════════════════════════════════════════════════ */

/* ── Loader ──────────────────────────────────────────────────── */
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('done');
    document.body.classList.remove('loading');
  }, 1600);
});
document.body.classList.add('loading');

/* ── Custom cursor ───────────────────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (window.matchMedia('(pointer: fine)').matches) {
  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('[data-cursor="link"]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-link'));
  });
  document.querySelectorAll('[data-cursor="view"]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-view'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
  });
}

/* ── Sticky nav ──────────────────────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Mobile menu ─────────────────────────────────────────────── */
const burger   = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.mobile-menu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const [s1, s2] = burger.querySelectorAll('span');
  s1.style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  s2.style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  burger.querySelectorAll('span').forEach(s => s.style.transform = '');
}));

/* ── Scroll reveal ───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const siblings = [...(el.parentElement?.querySelectorAll(':scope > .reveal') || [])];
    const idx = siblings.indexOf(el);
    setTimeout(() => el.classList.add('in'), idx * 90);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Image lazy-load & onError ───────────────────────────────── */
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => {
      img.parentElement?.classList.add('img-err');
    });
  }
});

/* ── Active nav link ─────────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-group a');
window.addEventListener('scroll', () => {
  let curr = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) curr = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = (a.getAttribute('href') === `#${curr}`) ? 'var(--gold)' : '';
  });
}, { passive: true });

/* ── Parallax hero ring ──────────────────────────────────────── */
const heroRing = document.querySelector('.hero-ring-wrap');
if (heroRing) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight * 1.2) {
      heroRing.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.18}px))`;
    }
  }, { passive: true });
}

/* ── Form ────────────────────────────────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Sent ✓';
    btn.style.background = '#4caf50';
    success.hidden = false;
    e.target.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      success.hidden = true;
    }, 4500);
  }, 1100);
}
