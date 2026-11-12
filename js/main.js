// ===== PAGE NAVIGATION =====
function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// ===== FIREFLIES GENERATOR =====
window.addEventListener('load', () => {
  const container = document.getElementById('fireflies');
  for (let i = 0; i < 25; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.left = Math.random() * 100 + '%';
    f.style.top  = Math.random() * 100 + '%';
    f.style.animationDelay = Math.random() * 5 + 's';
    f.style.animationDuration = (6 + Math.random() * 6) + 's';
    container.appendChild(f);
  }
});