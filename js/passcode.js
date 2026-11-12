// ===== CONFIG =====
const CORRECT_PASSCODE = "1511";   // ← yahan apna passcode likho
const PASSCODE_LENGTH  = CORRECT_PASSCODE.length;

let input = "";

// ===== ELEMENTS =====
const dots      = document.querySelectorAll('#passcodeDots .dot');
const errorMsg  = document.getElementById('passcodeError');
const container = document.querySelector('.passcode-container');

// ===== UPDATE DOTS =====
function updateDots() {
  dots.forEach((d, i) => d.classList.toggle('filled', i < input.length));
}

// ===== HANDLE KEY =====
document.getElementById('keypad').addEventListener('click', (e) => {
  const key = e.target.closest('.key');
  if (!key) return;

  const value = key.dataset.key;

  if (value === 'clear') {
    input = "";
    updateDots();
    return;
  }

  if (value === 'enter') {
    checkPasscode();
    return;
  }

  if (input.length < PASSCODE_LENGTH) {
    input += value;
    updateDots();
  }
});

// ===== CHECK =====
function checkPasscode() {
  if (input === CORRECT_PASSCODE) {
    container.classList.add('success-glow');
    setTimeout(() => {
      goToPage('page-cake');
      resetPasscode();
    }, 900);
  } else {
    errorMsg.classList.add('show');
    container.classList.add('shake');
    setTimeout(() => {
      container.classList.remove('shake');
      errorMsg.classList.remove('show');
      resetPasscode();
    }, 600);
  }
}

function resetPasscode() {
  input = "";
  updateDots();
}

// ===== KEYBOARD SUPPORT (desktop) =====
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('page-passcode').classList.contains('active')) return;

  if (e.key >= '0' && e.key <= '9' && input.length < PASSCODE_LENGTH) {
    input += e.key;
    updateDots();
  } else if (e.key === 'Enter') {
    checkPasscode();
  } else if (e.key === 'Backspace') {
    input = input.slice(0, -1);
    updateDots();
  }
});