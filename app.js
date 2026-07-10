(() => {
  const root = document.body;
  const cursor = document.querySelector('.cursor-orb');
  const helloField = document.querySelector('.hero-hello');
  const helloNoise = document.querySelector('.hello-noise');
  const helloDisplacement = document.querySelector('.hello-displacement');
  const heroMode = document.querySelector('.hero-theme');
  const back = document.querySelector('.back-button');
  let px = window.innerWidth / 2;
  let py = window.innerHeight / 2;
  let tx = px;
  let ty = py;
  let previousScroll = window.scrollY;
  let previousFrame = performance.now();
  let previousSmoothScroll = window.scrollY;
  let curve = 0;
  let scrollTarget = window.scrollY;
  let smoothScroll = scrollTarget;
  let wheelTarget = scrollTarget;
  let wheelInput = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function maxScrollY() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  if (root.classList.contains('home-page') && !reducedMotion) {
    window.addEventListener('wheel', (event) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      wheelInput = true;
      wheelTarget = Math.max(0, Math.min(maxScrollY(), wheelTarget + event.deltaY * .92));
    }, { passive: false });
    window.addEventListener('scroll', () => {
      if (!wheelInput) wheelTarget = window.scrollY;
    }, { passive: true });
  }

  function moveCursor() {
    px += (tx - px) * .16;
    py += (ty - py) * .16;
    if (cursor) { cursor.style.left = `${px}px`; cursor.style.top = `${py}px`; }
    if (helloField) {
      const dx = (tx / window.innerWidth - .5) * 28;
      const dy = (ty / window.innerHeight - .5) * 20;
      helloField.style.setProperty('--hello-x', `${dx}px`);
      helloField.style.setProperty('--hello-y', `${dy}px`);
      helloField.style.setProperty('--hello-r', `${dx * .12}deg`);
      helloField.style.setProperty('--hello-skew', `${dy * .04}deg`);
      helloField.style.setProperty('--hello-scale', `${1 + Math.min(0.04, Math.abs(dx + dy) / 900)}`);
    }
    requestAnimationFrame(moveCursor);
  }
  window.addEventListener('pointermove', (event) => { tx = event.clientX; ty = event.clientY; });
  moveCursor();

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    if (root.classList.contains('home-page') && !reducedMotion) {
      wheelInput = true;
      wheelTarget = Math.max(0, Math.min(maxScrollY(), top));
    } else {
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      scrollToSection(link.getAttribute('href'));
    });
  });
  document.querySelector('.hero-scroll')?.addEventListener('click', () => scrollToSection('#about'));

  function animateScrollCurve(now) {
    const elapsed = Math.max(16, now - previousFrame);
    const scrollDelta = window.scrollY - previousScroll;
    const velocity = scrollDelta / elapsed;
    if (root.classList.contains('home-page') && !reducedMotion) {
      const nativeScroll = window.scrollY;
      const easedTarget = nativeScroll + (wheelTarget - nativeScroll) * .12;
      if (Math.abs(wheelTarget - nativeScroll) > .15) window.scrollTo(0, easedTarget);
      scrollTarget = wheelTarget;
    } else {
      scrollTarget = window.scrollY;
    }
    smoothScroll += (scrollTarget - smoothScroll) * .1;
    const smoothDelta = smoothScroll - previousSmoothScroll;
    const targetCurve = Math.max(-7, Math.min(7, -velocity * 0.7 - smoothDelta * .01));
    curve += (targetCurve - curve) * 0.14;
    root.style.setProperty('--scroll-curve', `${curve.toFixed(2)}deg`);
    root.style.setProperty('--scroll-scale', `${(1 - Math.min(.012, Math.abs(curve) / 700)).toFixed(4)}`);
    if (helloNoise && helloDisplacement) {
      helloNoise.setAttribute('baseFrequency', `${(.008 + Math.abs(curve) * .001).toFixed(4)} ${(.02 + Math.abs(curve) * .002).toFixed(4)}`);
      helloDisplacement.setAttribute('scale', `${(8 + Math.abs(curve) * 3).toFixed(1)}`);
    }
    previousScroll = window.scrollY;
    previousSmoothScroll = smoothScroll;
    previousFrame = now;
    requestAnimationFrame(animateScrollCurve);
  }
  requestAnimationFrame(animateScrollCurve);

  heroMode?.addEventListener('click', () => root.classList.toggle('night'));
  back?.addEventListener('click', () => { window.location.href = 'index.html'; });
  document.querySelector('.hotspot-about')?.addEventListener('click', () => { window.location.href = 'about.html'; });

  const contact = document.querySelector('#contact');
  const fireworkCanvas = document.querySelector('.firework-canvas');
  const particles = [];
  let fireworkFrame = null;
  let contactWasVisible = false;

  function resizeFireworks() {
    if (!fireworkCanvas) return;
    const rect = fireworkCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    fireworkCanvas.width = Math.max(1, Math.round(rect.width * dpr));
    fireworkCanvas.height = Math.max(1, Math.round(rect.height * dpr));
    fireworkCanvas.style.width = `${rect.width}px`;
    fireworkCanvas.style.height = `${rect.height}px`;
  }

  function launchFireworks() {
    if (!fireworkCanvas) return;
    resizeFireworks();
    const rect = fireworkCanvas.getBoundingClientRect();
    const palette = ['#86a7ff', '#b99cff', '#ffd27d', '#ff9fc9', '#8fe3d1'];
    [0.34, 0.62, 0.82].forEach((ratio, burstIndex) => {
      const originX = rect.width * ratio;
      const originY = rect.height * (0.38 + burstIndex * 0.06);
      for (let i = 0; i < 34; i += 1) {
        const angle = (Math.PI * 2 * i) / 34 + burstIndex * 0.32;
        const speed = 1.2 + Math.random() * 2.2;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1 + Math.random() * 1.6,
          color: palette[(i + burstIndex) % palette.length],
        });
      }
    });
    if (!fireworkFrame) animateFireworks();
  }

  function animateFireworks() {
    if (!fireworkCanvas || particles.length === 0) {
      fireworkFrame = null;
      return;
    }
    const ctx = fireworkCanvas.getContext('2d');
    const rect = fireworkCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.035;
      particle.vx *= 0.985;
      particle.life -= 0.012;
      if (particle.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    fireworkFrame = requestAnimationFrame(animateFireworks);
  }

  const igniter = document.querySelector('.firework-igniter');
  const hint = document.querySelector('.firework-hint');
  igniter?.addEventListener('click', () => {
    igniter.classList.add('is-lit');
    if (hint) hint.textContent = '✦ launched';
    launchFireworks();
  });

  const observer = contact ? new IntersectionObserver(([entry]) => {
    root.classList.toggle('contact-active', entry.isIntersecting);
    contactWasVisible = entry.isIntersecting;
  }, { threshold: .25 }) : null;
  observer?.observe(contact);
  window.addEventListener('resize', resizeFireworks);
})();
