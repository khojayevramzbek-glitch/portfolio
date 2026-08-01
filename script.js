/* ════════════════════════════════════════════════
   RAMZBEK KHOJAYEV — ULTRA PREMIUM PORTFOLIO JS
   ════════════════════════════════════════════════ */
"use strict";

/* ══════════════════════════════════════════════════
   0. UTILITY — lerp, clamp, raf
══════════════════════════════════════════════════ */
const lerp  = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
let   raf   = null;

/* ══════════════════════════════════════════════════
   1. LOADER
══════════════════════════════════════════════════ */
(function initLoader() {
  const fill = document.getElementById('ldr-fill');
  const txt  = document.getElementById('ldr-txt');
  const msgs = [
    'Initializing portfolio...',
    'Loading components...',
    'Almost there...',
    'Welcome!'
  ];
  let progress = 0;
  let msgIdx   = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress > 100) progress = 100;

    fill.style.width = progress + '%';

    const newMsgIdx = Math.floor(progress / 26);
    if (newMsgIdx !== msgIdx && msgs[newMsgIdx]) {
      msgIdx = newMsgIdx;
      txt.style.opacity = '0';
      setTimeout(() => {
        txt.textContent  = msgs[msgIdx];
        txt.style.opacity = '1';
      }, 200);
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        const loader = document.getElementById('loader');
        window.scrollTo(0, 0);
        loader.classList.add('done');
        // Remove from DOM after CSS transition completes
        setTimeout(() => {
          loader.remove();
        }, 1200);
        document.body.style.overflow = '';
        startAnimations();
      }, 400);
    }
  }, 80);

  document.body.style.overflow = 'hidden';
})();

function startAnimations() {
  initBgCanvas();
  initReveal();
  initCounters();
  initSkillCircles();
  initTimeline();
  initTypewriter();
}

/* ══════════════════════════════════════════════════
   2. NOISE CANVAS (background grain)
══════════════════════════════════════════════════ */
(function initNoise() {
  const canvas = document.getElementById('noise-canvas');
  const ctx    = canvas.getContext('2d');
  let   frame  = 0;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawNoise() {
    frame++;
    if (frame % 3 !== 0) { requestAnimationFrame(drawNoise); return; }

    const w = canvas.width, h = canvas.height;
    const img = ctx.createImageData(w, h);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i]   = v;
      data[i+1] = v;
      data[i+2] = v;
      data[i+3] = 15;
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(drawNoise);
  }
  drawNoise();
})();

/* ══════════════════════════════════════════════════
   3. HERO BACKGROUND CANVAS (gradient orbs)
══════════════════════════════════════════════════ */
function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let   w, h;

  const orbs = [
    { x:0.15, y:0.35, r:0.55, c1:'rgba(124,58,237,0.28)', c2:'transparent', dx:0.0002, dy:0.00015, t:0 },
    { x:0.75, y:0.25, r:0.45, c1:'rgba(6,182,212,0.2)',   c2:'transparent', dx:-0.00015, dy:0.0002, t:Math.PI },
    { x:0.5,  y:0.75, r:0.4,  c1:'rgba(236,72,153,0.14)', c2:'transparent', dx:0.0001, dy:-0.0002,  t:Math.PI*.7 },
    { x:0.85, y:0.7,  r:0.38, c1:'rgba(124,58,237,0.15)', c2:'transparent', dx:-0.0002, dy:-0.00015, t:1 },
  ];

  function resize() {
    w = canvas.width  = canvas.parentElement.offsetWidth  || window.innerWidth;
    h = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let time = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    time += 0.003;

    orbs.forEach(o => {
      const cx = (o.x + Math.sin(time * 0.7 + o.t) * 0.08) * w;
      const cy = (o.y + Math.cos(time * 0.5 + o.t) * 0.07) * h;
      const r  = o.r * Math.min(w, h);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, o.c1);
      grad.addColorStop(1, o.c2);

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════════════════════════
   4. CUSTOM CURSOR (magnetic)
══════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.getElementById('cur-dot');
  const blob = document.getElementById('cur-blob');
  if (!dot || !blob) return;

  let mx = 0, my = 0;
  let bx = 0, by = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function tick() {
    bx = lerp(bx, mx, 0.1);
    by = lerp(by, my, 0.1);
    blob.style.left = bx + 'px';
    blob.style.top  = by + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Hover effects
  document.querySelectorAll('a, button, .bc, .pj, .skp, .sp, .cts, .cti, .tl-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
})();

/* ══════════════════════════════════════════════════
   5. MAGNETIC ELEMENTS
══════════════════════════════════════════════════ */
(function initMagnetic() {
  const strength = 0.35;

  document.querySelectorAll('.mag-el').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ══════════════════════════════════════════════════
   6. NAVBAR — scroll + active link
══════════════════════════════════════════════════ */
(function initNav() {
  const nav      = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-a');
  const sections = document.querySelectorAll('section[id]');
  const spBar    = document.getElementById('sp-bar');
  const btt      = document.getElementById('btt');
  const burger   = document.getElementById('burger');
  const navList  = document.getElementById('nav-list');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;

    // Glass nav
    nav.classList.toggle('glass', sy > 60);

    // Scroll progress
    const docH  = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = docH > 0 ? (sy / docH) * 100 : 0;
    spBar.style.width = pct + '%';

    // Back to top
    btt.classList.toggle('show', sy > 600);

    // Active link
    let cur = '';
    sections.forEach(sec => {
      if (sy >= sec.offsetTop - 140) cur = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === cur);
    });
  });

  // Hamburger
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navList.classList.toggle('open');
  });
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navList.classList.remove('open');
    });
  });

  // Back to top
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ══════════════════════════════════════════════════
   7. TYPEWRITER EFFECT
══════════════════════════════════════════════════ */
function initTypewriter() {
  const el     = document.getElementById('h-role');
  if (!el) return;
  const phrases = [
    'AI Frontend Developer',
    'UI/UX Designer',
    'React Developer',
    'Prompt Engineer',
    'Next.js Developer',
  ];
  let pi = 0, ci = 0, del = false, delay = 100;

  (function type() {
    const phrase = phrases[pi];
    if (!del) {
      el.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) { del = true; delay = 2000; }
      else delay = 75;
    } else {
      el.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; delay = 350; }
      else delay = 40;
    }
    setTimeout(type, delay);
  })();
}

/* ══════════════════════════════════════════════════
   8. INTERSECTION OBSERVER REVEALS
══════════════════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger within same container
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.08) + 's';
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════════════
   9. ANIMATED STAT COUNTERS
══════════════════════════════════════════════════ */
function initCounters() {
  const ctrEls = document.querySelectorAll('[data-count]');
  const obs    = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      let   cur = 0;
      const dur = 1600;
      const step = dur / end;

      const timer = setInterval(() => {
        cur++;
        el.textContent = cur + '+';
        if (cur >= end) { el.textContent = end + '+'; clearInterval(timer); }
      }, step);

      obs.unobserve(el);
    });
  }, { threshold: 0.7 });
  ctrEls.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════════════
   10. CIRCULAR SKILL PROGRESS (SVG)
══════════════════════════════════════════════════ */
function initSkillCircles() {
  // Inject SVG gradient defs
  const svgDefs = `
    <svg width="0" height="0" style="position:absolute">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7c3aed"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#3b82f6"/>
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899"/>
          <stop offset="100%" stop-color="#a78bfa"/>
        </linearGradient>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
    </svg>
  `;
  document.body.insertAdjacentHTML('beforeend', svgDefs);

  const circLen = 2 * Math.PI * 50; // r=50

  const skcs = document.querySelectorAll('.skc');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const pct = parseInt(el.dataset.pct, 10);
      const prog = el.querySelector('.skc-prog');
      if (!prog) return;

      prog.style.strokeDasharray  = circLen;
      prog.style.strokeDashoffset = circLen;

      setTimeout(() => {
        const offset = circLen - (pct / 100) * circLen;
        prog.style.strokeDashoffset = offset;
      }, 200);

      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  skcs.forEach(el => {
    const prog = el.querySelector('.skc-prog');
    if (prog) {
      prog.style.strokeDasharray  = circLen;
      prog.style.strokeDashoffset = circLen;
      prog.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.19,1,0.22,1)';
    }
    obs.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   11. TIMELINE SPINE ANIMATION
══════════════════════════════════════════════════ */
function initTimeline() {
  const spine = document.getElementById('tl-spine');
  if (!spine) return;
  const wrap  = spine.closest('.tl-wrap');
  if (!wrap) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      spine.style.height = (wrap.scrollHeight - 40) + 'px';
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  obs.observe(wrap);
}

/* ══════════════════════════════════════════════════
   12. SPOTLIGHT EFFECT ON CARDS
══════════════════════════════════════════════════ */
(function initSpotlight() {
  document.querySelectorAll('.bc, .tl-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%,
          rgba(124,58,237,.1) 0%,
          rgba(255,255,255,.035) 40%,
          rgba(255,255,255,.035) 100%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

/* ══════════════════════════════════════════════════
   13. PROJECT CARD TILT (front only)
══════════════════════════════════════════════════ */
(function initTilt() {
  if (!window.matchMedia('(hover:hover)').matches) return;

  document.querySelectorAll('.pj-front').forEach(front => {
    const card = front.closest('.pj');
    front.addEventListener('mousemove', e => {
      if (card.matches(':hover') && !front.classList.contains('flipped')) {
        const rect = front.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        // Tilt effect handled by flip CSS – just add subtle depth
      }
    });
  });
})();

/* ══════════════════════════════════════════════════
   14. CONTACT FORM
══════════════════════════════════════════════════ */
(function initForm() {
  const form = document.getElementById('ct-form');
  if (!form) return;
  const btn  = document.getElementById('cf-btn');
  const span = btn?.querySelector('span');
  const svg  = btn?.querySelector('svg');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!btn || !span) return;

    btn.disabled = true;
    span.textContent = 'Sending...';
    if (svg) svg.style.opacity = '0';

    setTimeout(() => {
      span.textContent     = 'Sent Successfully ✓';
      btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      btn.style.boxShadow  = '0 0 30px rgba(16,185,129,.5)';

      setTimeout(() => {
        span.textContent  = 'Send Message';
        btn.disabled      = false;
        btn.style.background = '';
        btn.style.boxShadow  = '';
        if (svg) svg.style.opacity = '';
        form.reset();
      }, 3500);
    }, 1800);
  });
})();

/* ══════════════════════════════════════════════════
   15. SMOOTH SCROLL ANCHORS
══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

/* ══════════════════════════════════════════════════
   16. HERO CHIP ENTRANCE
══════════════════════════════════════════════════ */
(function chipHover() {
  const chip = document.getElementById('h-chip');
  if (!chip) return;
  chip.addEventListener('mouseenter', () => {
    chip.style.borderColor = 'rgba(6,182,212,.6)';
    chip.style.boxShadow   = '0 0 20px rgba(6,182,212,.3)';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.borderColor = '';
    chip.style.boxShadow   = '';
  });
})();

/* ══════════════════════════════════════════════════
   17. GLITCH TEXT ON HOVER (section titles)
══════════════════════════════════════════════════ */
(function initGlitch() {
  const titles = document.querySelectorAll('.sec-title');
  const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  titles.forEach(el => {
    const origHTML = el.innerHTML;
    let interval   = null;

    el.addEventListener('mouseenter', () => {
      let frame = 0;
      interval = setInterval(() => {
        // Quick glitch then restore
        if (frame < 4) {
          el.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
          el.style.filter    = `hue-rotate(${Math.random()*30}deg)`;
        } else {
          clearInterval(interval);
          el.style.transform = '';
          el.style.filter    = '';
        }
        frame++;
      }, 40);
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(interval);
      el.style.transform = '';
      el.style.filter    = '';
    });
  });
})();

/* ══════════════════════════════════════════════════
   18. PARALLAX ON SCROLL
══════════════════════════════════════════════════ */
(function initParallax() {
  const orbs = document.querySelectorAll('.hv-orb, .hv-ring');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY * 0.15;
    orbs.forEach((o, i) => {
      o.style.transform = `translateY(${sy * (i % 2 === 0 ? 1 : -1)}px)`;
    });
  });
})();

/* ══════════════════════════════════════════════════
   19. MARQUEE PAUSE ON HOVER
══════════════════════════════════════════════════ */
(function initMarquee() {
  const track = document.querySelector('.mq-track');
  if (!track) return;
  const lists = track.querySelectorAll('.mq-inner');
  track.addEventListener('mouseenter', () => lists.forEach(l => l.style.animationPlayState = 'paused'));
  track.addEventListener('mouseleave', () => lists.forEach(l => l.style.animationPlayState = ''));
})();

/* ══════════════════════════════════════════════════
   20. CONSOLE SIGNATURE
══════════════════════════════════════════════════ */
console.log(
  '%c ⚡ RK Portfolio %c v2.0 ',
  'background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;padding:6px 10px;border-radius:6px 0 0 6px;font-weight:900;font-size:13px',
  'background:#0a0a14;color:#a78bfa;padding:6px 10px;border-radius:0 6px 6px 0;font-size:13px'
);
console.log(
  '%c Built with ❤️  by Ramzbek Khojayev\n%c khojayevramzbek@gmail.com',
  'color:#a78bfa;font-size:12px;font-weight:700',
  'color:#38bdf8;font-size:11px'
);
