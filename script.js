if (window.lucide) lucide.createIcons();

const canvas = document.querySelector('#fluid');
const ctx = canvas.getContext('2d');
const pointer = { x: innerWidth * 0.55, y: innerHeight * 0.42, active: false };
let width, height, tick = 0;

function resize() { width = canvas.width = innerWidth * devicePixelRatio; height = canvas.height = innerHeight * devicePixelRatio; canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px'; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
function blob(x, y, r, color, blur) { ctx.filter = `blur(${blur}px)`; ctx.beginPath(); ctx.fillStyle = color; ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
function fluid() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.fillStyle = '#f5f0e8'; ctx.fillRect(0, 0, innerWidth, innerHeight);
  const t = tick * 0.008;
  blob(innerWidth * (.18 + Math.sin(t) * .08), innerHeight * (.36 + Math.cos(t * .8) * .1), Math.min(innerWidth, innerHeight) * .22, '#cbff3d', 70);
  blob(innerWidth * (.75 + Math.cos(t * .6) * .1), innerHeight * (.62 + Math.sin(t * .7) * .1), Math.min(innerWidth, innerHeight) * .2, '#83e6ef', 80);
  blob(pointer.x, pointer.y, pointer.active ? 170 : 85, '#fb5a85', pointer.active ? 70 : 110);
  ctx.filter = 'none'; tick++; requestAnimationFrame(fluid);
}
resize(); fluid(); addEventListener('resize', resize);
addEventListener('pointermove', (event) => { pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true; });
addEventListener('pointerleave', () => pointer.active = false);

document.querySelectorAll('.project-signal').forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.project;
  document.querySelectorAll('.project-signal, .project-detail').forEach(item => item.classList.remove('active'));
  button.classList.add('active'); document.querySelector(`[data-detail="${id}"]`).classList.add('active');
  if (matchMedia('(max-width: 760px)').matches) {
    techStack.classList.remove('open');
    techSun.setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => document.querySelector(`[data-detail="${id}"]`).scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
}));

const techSun = document.querySelector('#tech-sun');
const techStack = document.querySelector('#tech-stack');
techSun.addEventListener('click', () => {
  const isOpen = techSun.getAttribute('aria-expanded') === 'true';
  techSun.setAttribute('aria-expanded', String(!isOpen));
  techStack.classList.toggle('open', !isOpen);
});
