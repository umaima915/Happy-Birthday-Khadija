// ===== CONFIG =====
const wishes = [
  "You are always my safe place 😭💖",
  "Supporting my deluu no matter how cringe they are is my fav thing 😭",
  "You make every conversations bearable and interesting by just narrating it 🤝",
  "I know you'll judge hard but I like sharing my events with you 🫶",
];

const balloonColors = [
  "radial-gradient(circle at 30% 30%, #34d399, #10b981)",
  "radial-gradient(circle at 30% 30%, #2dd4bf, #14b8a6)",
  "radial-gradient(circle at 30% 30%, #d97706, #b87333)",
  "radial-gradient(circle at 30% 30%, #5eead4, #0d9488)",
];

// Balloon positions (spread across screen, avoid center)
const balloonPositions = [
  { left: "14%", top: "24%" },
  { left: "73%", top: "13%" },
  { left: "31%", top: "69%" },
  { left: "82%", top: "56%" },
];

const balloonsEl = document.getElementById('balloons');
const wishPopup = document.getElementById('wishPopup');
const wishText = document.getElementById('wishText');
const finalWish = document.getElementById('finalWish');
const revealSub = document.getElementById('revealSub');
const toScratchBtn = document.getElementById('toScratchBtn');

let balloonsSpawned = false;
let poppedCount = 0;

// ===== SPAWN BALLOONS (fade in, fixed position) =====
function spawnBalloons() {
  if (balloonsSpawned) return;
  balloonsSpawned = true;

  wishes.forEach((wish, i) => {
    const pos = balloonPositions[i % balloonPositions.length];
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.background = balloonColors[i % balloonColors.length];
    b.style.left = pos.left;
    b.style.top = pos.top;
    b.style.animationDelay = (i * 0.2) + 's';

    b.addEventListener('click', () => popBalloon(b, wish));
    balloonsEl.appendChild(b);
  });
}

// ===== POP =====
function popBalloon(balloon, wish) {
  if (balloon.classList.contains('popped')) return;
  balloon.classList.add('popped');
  poppedCount++;

  // Confetti burst at balloon position
  const rect = balloon.getBoundingClientRect();
  confetti({
    particleCount: 30,
    spread: 70,
    origin: {
      x: rect.left / window.innerWidth,
      y: rect.top / window.innerHeight,
    },
    colors: ['#10b981', '#14b8a6', '#b87333', '#f7e7ce'],
    scalar: 0.75,
  });

  showWish(wish);

  // Sab balloons pop ho gaye?
  if (poppedCount === wishes.length) {
    setTimeout(() => {
      document.getElementById('revealSub').classList.add('hide');
      document.getElementById('toScratchBtn').classList.add('show');
    }, 600);
  }
}

// ===== SHOW WISH POPUP =====
let wishTimer;
function showWish(text) {
  wishText.textContent = text;
  wishPopup.classList.add('show');
  clearTimeout(wishTimer);
  wishTimer = setTimeout(() => wishPopup.classList.remove('show'), 2000);
}

// ===== SHOW FINAL WISH =====
function showFinalWish() {
  wishPopup.classList.remove('show');
  finalWish.classList.add('show');
  revealSub.textContent = "✨ All wishes unlocked ✨";
  bigConfetti();
}

// ===== BIG CONFETTI =====
function bigConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#10b981', '#14b8a6', '#b87333', '#f7e7ce'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#10b981', '#14b8a6', '#b87333', '#f7e7ce'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#10b981', '#14b8a6', '#b87333', '#f7e7ce'],
  });
}

// ===== NEXT PAGE =====
toScratchBtn.addEventListener('click', () => {
  goToPage('page-wish');
});

// ===== TRIGGER ON PAGE SHOW =====
const revealObserver = new MutationObserver(() => {
  const page = document.getElementById('page-reveal');
  if (page.classList.contains('active') && !balloonsSpawned) {
    bigConfetti();

    // Balloons confetti khatam hone ke baad aayenge (3.5s)
    setTimeout(spawnBalloons, 3600);
  }
});

revealObserver.observe(document.getElementById('page-reveal'), {
  attributes: true,
  attributeFilter: ['class'],
});