/* ═══════════════════════════════════════════════════════════════
   PIERRES MANO — main.js
   Scroll reveal, sticky nav, mobile menu, form handler
═══════════════════════════════════════════════════════════════ */

/* ── Sticky nav ─────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ────────────────────────────────────────────── */
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.mobile-menu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  const isOpen = mobileMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
  spans[1].style.opacity  = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

/* ── Scroll reveal ──────────────────────────────────────────── */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

/* Stagger siblings */
document.querySelectorAll('.reveal').forEach((el, idx) => {
  const parent = el.parentElement;
  const siblings = [...parent.querySelectorAll(':scope > .reveal')];
  const pos = siblings.indexOf(el);
  if (pos > 0) el.dataset.delay = pos * 80;
  observer.observe(el);
});

/* ── Form handler ───────────────────────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#4caf50';
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      success.style.display = 'none';
    }, 4000);
  }, 1000);
}

/* ── Smooth active nav ──────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--gold)'
      : '';
  });
}, { passive: true });

/* ── Parallax hero ──────────────────────────────────────────── */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${offset * 0.25}px)`;
    }
  }, { passive: true });
}
