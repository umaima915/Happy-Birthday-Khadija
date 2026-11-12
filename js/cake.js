// ===== ELEMENTS =====
const blowBtn   = document.getElementById('blowBtn');
const candlesEl = document.getElementById('candles');
const candleList = candlesEl.querySelectorAll('.candle');

let blown = false;

// ===== BLOW HANDLER =====
blowBtn.addEventListener('click', () => {
  if (blown) return;
  blown = true;
  blowBtn.disabled = true;
  blowBtn.textContent = "Wishing... 🌟";

  // Sab candles ko pehle tez flicker karao (2 sec)
  candleList.forEach(c => c.classList.add('flicker-fast'));

  // 2 sec baad ek-ek karke bujhao
  setTimeout(() => {
    candleList.forEach((candle, i) => {
      setTimeout(() => {
        candle.classList.remove('flicker-fast');
        candle.classList.add('out');
      }, i * 350);
    });
  }, 2000);

  // Sab bujh jaane ke baad → reveal page
  const totalTime = 2000 + candleList.length * 350 + 1500;
  setTimeout(() => {
    goToPage('page-reveal');
    resetCakePage();
  }, totalTime);
});

// ===== RESET =====
function resetCakePage() {
  setTimeout(() => {
    candleList.forEach(c => {
      c.classList.remove('out');
      c.classList.remove('flicker-fast');
    });
    blown = false;
    blowBtn.disabled = false;
    blowBtn.textContent = "Blow the Candles 💨";
  }, 2000);
}