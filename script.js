// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks   = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TYPED EFFECT =====
const outputEl = document.getElementById('typed-output');
const phrases   = [
  'linux · security · c · networking',
  'chess · badminton · anime · calculus',
  'kali linux · tcp/ip · pointers',
];
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
let typePause = false;

function type() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    outputEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting  = true;
      typePause = true;
      setTimeout(() => { typePause = false; requestAnimationFrame(typeTick); }, 2200);
      return;
    }
  } else {
    outputEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }

  setTimeout(() => requestAnimationFrame(typeTick), deleting ? 40 : 80);
}

function typeTick() {
  if (!typePause) type();
}

// Start after a short delay
setTimeout(() => requestAnimationFrame(typeTick), 800);

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.section-tag, .about-text, .about-terminal, .interest-card, ' +
  '.anime-quote, .anime-card, .learn-item, .contact-info, .contact-form-wrap, ' +
  '.hero-stats, .stat, .section-heading'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) {
          setTimeout(() => sib.classList.add('visible'), idx * 80);
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  const isFloat = target % 1 !== 0;
  const duration = 1400;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = eased * target;

    el.textContent = (isFloat ? value.toFixed(2) : Math.floor(value)) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const data = [3.79, 11, 6, '∞'];

      nums.forEach((el, i) => {
        if (data[i] === '∞') {
          el.textContent = '∞';
          return;
        }
        const suffix = i === 2 ? '+' : '';
        animateCounter(el, data[i], suffix);
      });

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== ACTIVE NAV LINK =====
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));

// ===== CONTACT FORM (UI feedback only) =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message sent ✓';
    btn.style.background = 'var(--green)';
    btn.style.color = '#0a0a0f';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ===== TERMINAL TYPEWRITER (learning section) =====
const learnItems = document.querySelectorAll('.learn-item');
const learnObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.learn-item');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity    = '1';
          item.style.transform  = 'translateX(0)';
        }, i * 150);
      });
      learnObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Init learn items hidden
learnItems.forEach(item => {
  item.style.opacity   = '0';
  item.style.transform = 'translateX(-16px)';
  item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

const learningTerminal = document.querySelector('.learning-terminal');
if (learningTerminal) learnObserver.observe(learningTerminal);
