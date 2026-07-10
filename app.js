(() => {
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hello = document.querySelector('.fluid-hello');
  const noise = document.querySelector('.fluid-noise');
  const displacement = document.querySelector('.fluid-map');
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let previousScroll = window.scrollY;
  let previousTime = performance.now();
  let scrollVelocity = 0;

  document.querySelectorAll('.theme-button').forEach((button) => {
    button.addEventListener('click', () => body.classList.toggle('night'));
  });

  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (!hello) return;
    const x = (pointer.x / window.innerWidth - .5) * 30;
    const y = (pointer.y / window.innerHeight - .5) * 22;
    hello.style.setProperty('--fluid-x', `${x.toFixed(2)}px`);
    hello.style.setProperty('--fluid-y', `${y.toFixed(2)}px`);
    hello.style.setProperty('--fluid-rotate', `${(x * .09).toFixed(2)}deg`);
    hello.style.setProperty('--fluid-scale', `${(1 + Math.min(.035, Math.abs(x + y) / 1000)).toFixed(4)}`);
  });

  function animateFrame(now) {
    const elapsed = Math.max(16, now - previousTime);
    const currentScroll = window.scrollY;
    const rawVelocity = (currentScroll - previousScroll) / elapsed;
    scrollVelocity += (rawVelocity - scrollVelocity) * .16;
    const bend = reducedMotion ? 0 : Math.max(-2.2, Math.min(2.2, -scrollVelocity * 1.7));
    document.querySelectorAll('.surface-section').forEach((section) => {
      section.style.setProperty('--section-bend', `${bend.toFixed(2)}deg`);
    });
    if (hello && noise && displacement && !reducedMotion) {
      const energy = Math.abs(scrollVelocity);
      noise.setAttribute('baseFrequency', `${(.006 + energy * .0014).toFixed(4)} ${(.018 + energy * .0025).toFixed(4)}`);
      displacement.setAttribute('scale', `${(18 + Math.min(18, energy * 12)).toFixed(2)}`);
      noise.setAttribute('seed', `${12 + Math.floor(now / 900) % 7}`);
    }
    previousScroll = currentScroll;
    previousTime = now;
    requestAnimationFrame(animateFrame);
  }
  requestAnimationFrame(animateFrame);

  function createRipple(area, event) {
    if (event.target.closest('a, button')) return;
    const bounds = area.getBoundingClientRect();
    const ripple = document.createElement('span');
    const colors = ['#93b7f2', '#b7a4e8', '#eacb91'];
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    ripple.style.setProperty('--ripple-color', colors[Math.floor(Math.random() * colors.length)]);
    area.querySelector('.ripple-layer')?.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 1550);
  }

  document.querySelectorAll('[data-ripple-area]').forEach((area) => {
    area.addEventListener('pointerdown', (event) => createRipple(area, event));
  });

  document.querySelectorAll('.contact-action').forEach((action) => {
    const release = () => window.setTimeout(() => {
      action.querySelectorAll('.contact-petal').forEach((petal) => petal.remove());
    }, 1450);
    const petals = () => {
      const colors = ['#a8b7ed', '#d4b7ed', '#e8ce98'];
      for (let i = 0; i < 3; i += 1) {
        const petal = document.createElement('span');
        petal.className = 'contact-petal';
        petal.style.left = `${24 + Math.random() * 66}%`;
        petal.style.top = `${8 + Math.random() * 30}%`;
        petal.style.setProperty('--petal-x', `${-24 + Math.random() * 48}px`);
        petal.style.setProperty('--petal-color', colors[i]);
        action.appendChild(petal);
      }
      release();
    };
    action.addEventListener('pointerenter', petals);
    action.addEventListener('focus', petals);
  });

  const kind = document.querySelector('.kind-word');
  const contact = document.querySelector('.contact-main');
  kind?.addEventListener('pointerenter', () => contact?.classList.add('kind-active'));
  kind?.addEventListener('pointerleave', () => contact?.classList.remove('kind-active'));

  document.querySelectorAll('.animal-hotspot').forEach((animal) => {
    animal.addEventListener('click', () => {
      animal.classList.remove('is-awake');
      requestAnimationFrame(() => animal.classList.add('is-awake'));
      window.setTimeout(() => animal.classList.remove('is-awake'), 900);
    });
  });

  document.querySelector('[data-scroll-next]')?.addEventListener('click', () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    window.location.href = 'about.html';
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
