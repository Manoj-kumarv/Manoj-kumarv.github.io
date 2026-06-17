// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within the same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BOXES STAGGER =====
const skillBoxes = document.querySelectorAll('.skill-box');
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBoxes.forEach((box, i) => {
        setTimeout(() => {
          box.style.opacity = '1';
          box.style.transform = 'translateY(0) scale(1)';
        }, i * 60);
      });
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

skillBoxes.forEach(box => {
  box.style.opacity = '0';
  box.style.transform = 'translateY(20px) scale(0.9)';
  box.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.className = 'form-status error';
    return;
  }

  // Build a mailto link and open it (no backend needed)
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  // Replace with your actual email below
  window.location.href = `mailto:you@email.com?subject=${subject}&body=${body}`;

  formStatus.textContent = 'Opening your email client... Thank you!';
  formStatus.className = 'form-status success';
  contactForm.reset();

  setTimeout(() => { formStatus.textContent = ''; }, 5000);
});

// ===== CURSOR TRAIL EFFECT (subtle) =====
const trailDots = [];
const MAX_DOTS = 8;

for (let i = 0; i < MAX_DOTS; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed;pointer-events:none;z-index:9999;
    width:${6 - i * 0.4}px;height:${6 - i * 0.4}px;
    border-radius:50%;
    background:rgba(108,99,255,${0.6 - i * 0.07});
    transition:transform 0.05s ease;
    opacity:0;
  `;
  document.body.appendChild(dot);
  trailDots.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  trailDots[0].el.style.opacity = '1';
});

function animateTrail() {
  let prevX = mouseX, prevY = mouseY;
  trailDots.forEach((dot, i) => {
    const delay = 0.15 * (i + 1);
    dot.x += (prevX - dot.x) * (0.5 - delay * 0.1);
    dot.y += (prevY - dot.y) * (0.5 - delay * 0.1);
    dot.el.style.left = dot.x - 3 + 'px';
    dot.el.style.top = dot.y - 3 + 'px';
    dot.el.style.opacity = '1';
    prevX = dot.x;
    prevY = dot.y;
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();
