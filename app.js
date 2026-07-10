(() => {
  const root = document.body;
  const cursor = document.querySelector('.cursor-orb');
  const orb = document.querySelector('.hello-orb');
  const mode = document.querySelector('.mode-toggle');
  const back = document.querySelector('.back-button');
  let px = window.innerWidth / 2;
  let py = window.innerHeight / 2;
  let tx = px;
  let ty = py;

  function moveCursor() {
    px += (tx - px) * .16;
    py += (ty - py) * .16;
    if (cursor) { cursor.style.left = `${px}px`; cursor.style.top = `${py}px`; }
    if (orb) {
      const dx = (tx / window.innerWidth - .5) * 28;
      const dy = (ty / window.innerHeight - .5) * 20;
      orb.style.setProperty('--orb-x', `${dx}px`);
      orb.style.setProperty('--orb-y', `${dy}px`);
      orb.style.setProperty('--orb-r', `${dx * .12}deg`);
      orb.style.setProperty('--orb-s', `${1 + Math.min(0.04, Math.abs(dx + dy) / 900)}`);
    }
    requestAnimationFrame(moveCursor);
  }
  window.addEventListener('pointermove', (event) => { tx = event.clientX; ty = event.clientY; });
  moveCursor();

  mode?.addEventListener('click', () => root.classList.toggle('night'));
  back?.addEventListener('click', () => { window.location.href = 'index.html'; });
  document.querySelector('.hotspot-about')?.addEventListener('click', () => { window.location.href = 'about.html'; });

  const contact = document.querySelector('#contact');
  const observer = contact ? new IntersectionObserver(([entry]) => {
    root.classList.toggle('contact-active', entry.isIntersecting);
  }, { threshold: .25 }) : null;
  observer?.observe(contact);
})();
