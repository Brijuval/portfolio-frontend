/* ============================================================
   main.js — All JavaScript for the portfolio
   ✏️  SECTIONS:
     1. Custom cursor
     2. Scroll fade-up animations
     3. Typing hero effect     ← edit roles[] here
     4. Contact form submit    ← edit API URL here
     5. Design filter
     6. Lightbox
   ============================================================ */


/* ── 1. CUSTOM CURSOR ─────────────────────────────────────── */

const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;
let cursorVisible = false;

// Hide cursor initially until mouse moves
cursor.style.opacity = '0';
cursorTrail.style.opacity = '0';

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  // Snap cursor dot to mouse instantly
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';

  // Show cursor once mouse moves
  if (!cursorVisible) {
    cursor.style.opacity = '1';
    cursorTrail.style.opacity = '0.4';
    cursorVisible = true;
  }
});

// Hide cursor when mouse leaves the browser window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorTrail.style.opacity = '0';
  cursorVisible = false;
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorTrail.style.opacity = '0.4';
  cursorVisible = true;
});

// Trail ring follows with smooth lag
setInterval(() => {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  cursorTrail.style.left = tx - 16 + 'px';
  cursorTrail.style.top  = ty - 16 + 'px';
}, 16);

// Scale cursor up when hovering interactive elements
document.querySelectorAll('a, button, .project-card, .blog-card, .design-card, .filter-btn')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
  });

/* ── 2. SCROLL FADE-UP ANIMATIONS ─────────────────────────── */

// Watch every .fade-up element — add .visible class when it enters viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay so multiple items don't all appear at once
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* ── 3. TYPING HERO EFFECT ─────────────────────────────────── */

// ✏️  Edit this array to change the rotating roles in the hero
const roles = [
  'Software Developer',
  'Cloud Engineer',
  'Full-Stack Builder',
  'AI App Developer',
  'UI / UX Designer',       // ← added since you do design work too!
];

let roleIndex    = 0;
let charIndex    = 0;
let isDeleting   = false;
const roleEl     = document.querySelector('.hero-role');

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    roleEl.childNodes[0].textContent = currentRole.slice(0, ++charIndex);
    if (charIndex === currentRole.length) {
      // Pause at end before deleting
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    // Deleting
    roleEl.childNodes[0].textContent = currentRole.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, isDeleting ? 60 : 100);
}

typeRole();


/* ── 4. CONTACT FORM SUBMIT ────────────────────────────────── */

async function handleSubmit() {
  const payload = {
    name:    document.getElementById('fname').value,
    email:   document.getElementById('femail').value,
    subject: document.getElementById('fsubject').value,
    message: document.getElementById('fmessage').value,
  };

  // Basic validation
  if (!payload.name || !payload.email || !payload.message) {
    alert('Please fill all required fields.');
    return;
  }

  // ── Option A: Django backend (use when your backend is running) ──
  // ✏️  Change this URL to your deployed Railway/Render URL in production
  /*
  try {
    const res = await fetch('http://127.0.0.1:8000/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      showFormSuccess();
    } else {
      alert('Something went wrong. Please email me directly.');
    }
  } catch (err) {
    alert('Could not connect to server. Please email me directly.');
  }
  */

  // ── Option B: No backend yet — just show success message ──
  // Remove this block once you connect Django
  showFormSuccess();
}

function showFormSuccess() {
  const msg = document.getElementById('formMsg');
  msg.style.display = 'block';
  document.getElementById('fname').value    = '';
  document.getElementById('femail').value   = '';
  document.getElementById('fsubject').value = '';
  document.getElementById('fmessage').value = '';
  setTimeout(() => { msg.style.display = 'none'; }, 4000);
}


/* ── 5. DESIGN GALLERY FILTER ──────────────────────────────── */

function filterDesign(category, clickedBtn) {
  // Remove active from all buttons, add to clicked one
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  // Show/hide cards based on data-cat attribute
  document.querySelectorAll('.design-card').forEach(card => {
    const match = category === 'all' || card.dataset.cat === category;
    card.classList.toggle('hidden', !match);
  });
}


/* ── 6. LIGHTBOX (design card click to zoom) ───────────────── */

function openLightbox(imageSrc, caption) {
  document.getElementById('lightboxImg').src         = imageSrc;
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';   // prevent background scroll
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox with ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
