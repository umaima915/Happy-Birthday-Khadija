// ===== ELEMENTS =====
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('scratchWrapper');
const nextBtn = document.getElementById('toMemoriesBtn');

let isDrawing = false;
let revealed = false;
let initialized = false;

// ===== SETUP CANVAS =====
function setupCanvas() {
  const w = 380;   // ← width
  const h = 520;   // ← height

  canvas.width = w;
  canvas.height = h;

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#b87333');
  grad.addColorStop(0.5, '#f7e7ce');
  grad.addColorStop(1, '#b87333');

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(20,43,36,0.75)';
  ctx.font = 'bold 22px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Scratch here ✨', w / 2, h / 2);

  ctx.globalCompositeOperation = 'destination-out';
  initialized = true;
}

// ===== GET POSITION =====
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}

// ===== SCRATCH =====
function scratch(e) {
  if (!isDrawing || revealed || !initialized) return;
  e.preventDefault();
  const { x, y } = getPos(e);
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();
  checkProgress();
}

// ===== CHECK PROGRESS =====
function checkProgress() {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let cleared = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 50) cleared++;
  }
  const percent = (cleared / (data.length / 4)) * 100;
  if (percent > 50) revealCard();
}

// ===== REVEAL =====
function revealCard() {
  if (revealed) return;
  revealed = true;

  canvas.style.transition = 'opacity 0.8s ease';
  canvas.style.opacity = '0';
  wrapper.classList.add('revealed');

  setTimeout(() => {
    canvas.style.display = 'none';
  }, 800);

  document.getElementById('scratchTitle').classList.add('hide');
  const scratchSub = document.getElementById('scratchSub');
  if (scratchSub) scratchSub.classList.add('hide');

  // Scratch reveal ke 2.5 seconds baad button dikhao
  setTimeout(() => {
    nextBtn.classList.add('show');
    nextBtn.style.setProperty('display', 'block', 'important');
    nextBtn.style.setProperty('position', 'fixed', 'important');
    nextBtn.style.setProperty('left', '50%', 'important');
    nextBtn.style.setProperty('bottom', '20px', 'important');
    nextBtn.style.setProperty('z-index', '99999', 'important');
    nextBtn.style.setProperty('opacity', '1', 'important');
    nextBtn.style.setProperty('visibility', 'visible', 'important');
    nextBtn.style.setProperty('pointer-events', 'auto', 'important');
    nextBtn.style.setProperty('transform', 'translateX(-50%)', 'important');
  }, 2500);

  if (typeof confetti === 'function') {
    bigConfetti();
  }
}

// ===== CONFETTI =====
function bigConfetti() {
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#10b981', '#14b8a6', '#b87333', '#f7e7ce'],
  });
  const end = Date.now() + 2000;
  (function frame() {
    confetti({
      particleCount: 3, angle: 60, spread: 55, origin: { x: 0 },
      colors: ['#10b981', '#14b8a6', '#b87333', '#f7e7ce'],
    });
    confetti({
      particleCount: 3, angle: 120, spread: 55, origin: { x: 1 },
      colors: ['#10b981', '#14b8a6', '#b87333', '#f7e7ce'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// ===== EVENTS =====
canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);

canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
canvas.addEventListener('touchmove', scratch, { passive: false });
canvas.addEventListener('touchend', () => isDrawing = false);

// ===== NEXT PAGE =====
nextBtn.addEventListener('click', () => {
  if (typeof confetti === 'function') confetti.reset();
  goToPage('page-memories');
});

// ===== INIT WHEN PAGE BECOMES ACTIVE =====
const scratchObserver = new MutationObserver(() => {
  const page = document.getElementById('page-scratch');
  if (page.classList.contains('active') && !initialized) {
    setTimeout(setupCanvas, 300);
  }
});

scratchObserver.observe(document.getElementById('page-scratch'), {
  attributes: true,
  attributeFilter: ['class'],
});