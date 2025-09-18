// Hamburger menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Simple language switcher (only demo, not full translation)
const langEn = document.getElementById('lang-en');
const langId = document.getElementById('lang-id');
langEn.addEventListener('click', () => {
  alert('Language switched to English (Demo)');
});
langId.addEventListener('click', () => {
  alert('Bahasa diubah ke Indonesia (Demo)');
});

// Animated moving background (black + blue realistic effect)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to full window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Blue particle animation
const particles = [];
const colors = ['#00aaff', '#003366', '#001a33', '#000c1d', '#111'];

function createParticle() {
  const size = Math.random() * 8 + 2;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const speed = Math.random() * 1.5 + 0.2;
  const angle = Math.random() * Math.PI * 2;
  return {
    x, y, size,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    alpha: Math.random() * 0.6 + 0.2
  };
}

function initParticles(num = 64) {
  particles.length = 0;
  for (let i = 0; i < num; i++) {
    particles.push(createParticle());
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Gradient background
  let grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  grad.addColorStop(0, '#000c1d');
  grad.addColorStop(0.5, '#001a33');
  grad.addColorStop(1, '#003366');
  ctx.fillStyle = grad;
  ctx.globalAlpha = 1;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Particles
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();

    // Move
    p.x += p.vx;
    p.y += p.vy;

    // Bounce or wrap
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
}

function animate() {
  drawParticles();
  requestAnimationFrame(animate);
}
animate();