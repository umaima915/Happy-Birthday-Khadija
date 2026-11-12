// ===== MEMORIES DATA =====
const memories = [
  {
    image: "assets/memories/mem1.jpg",
    date: "26 November 2022",
    title: "Pehli Tasweer",
    desc: "Ek awkward photo of us when we weren't actually on talking terms 😬!"
  },
  {
    image: "assets/memories/mem2.jpg",
    date: "22 July 2023",
    title: "Pehli gathering",
    desc: "Chaotic 🤯, me being the worst host 😶‍🌫️, fan and people issues 😵‍💫"
  },
  {
    image: "assets/memories/mem3.jpg",
    date: "28 October 2023",
    title: "Ghumi Ghumi at samandar",
    desc: "bt bt pr hm couples ban jate hein 🤼‍♀️.. best day with worst ppl (some of them) 😐"
  },
  {
    image: "assets/memories/mem4.jpg",
    date: "6 December 2023",
    title: "Character Day",
    desc: "Nothing as such chaotic i remember but a cutiee day 😍"
  },
  {
    image: "assets/memories/mem5.jpg",
    date: "9 March 2024",
    title: " College ki Pehli farewell",
    desc: "Bekar sa venue but cutie si ap 🫣.. much was happening but we survived 💪"
  },
  {
    image: "assets/memories/mem6.jpg",
    date: "28 July 2024",
    title: "Onederland fully planned trip",
    desc: "Favorite memory of mine.. the bumping cars was the core one 🥹"
  },
  {
    image: "assets/memories/mem7.jpg",
    date: "30 October 2025",
    title: "KU mein pehla photo sesh",
    desc: "A planned twinning 😁.."
  },
  {
    image: "assets/memories/mem8.jpg",
    date: "30 July 2026",
    title: "Kidnapping conducted ",
    desc: "Our relation in question (mother-daughter or husband-wife) 🫥 .. very random but nicely executed one with 0 chaos 🤪"
  },
];

// ===== STATE =====
let currentIndex = 0;
let bookOpened = false;

// ===== ELEMENTS =====
const memoryPhoto = document.getElementById('memoryPhoto');
const memoryDate = document.getElementById('memoryDate');
const memoryTitle = document.getElementById('memoryTitle');
const memoryDesc = document.getElementById('memoryDesc');
const pageCounter = document.getElementById('pageCounter');
const prevBtnMem = document.getElementById('prevBtn');
const nextBtnMem = document.getElementById('nextBtn');
const flipPage = document.getElementById('flipPage');
const endMessage = document.getElementById('endMessage');
const spiralBinding = document.getElementById('spiralBinding');
const bookCover = document.getElementById('bookCover');
const openArrow = document.getElementById('openArrow');
const scrapbook = document.getElementById('scrapbook');
const controls = document.getElementById('controls');

// ===== SPIRAL COILS BUILD =====
function buildSpiral() {
  spiralBinding.querySelectorAll('.coil').forEach(c => c.remove());
  for (let i = 0; i < 12; i++) {
    const coil = document.createElement('div');
    coil.className = 'coil';
    spiralBinding.appendChild(coil);
  }
}

// ===== RENDER MEMORY =====
function renderMemory() {
  const m = memories[currentIndex];

  memoryPhoto.src = m.image;
  memoryDate.textContent = m.date;
  memoryTitle.textContent = m.title;
  memoryDesc.textContent = m.desc;
  pageCounter.textContent = `${currentIndex + 1} / ${memories.length}`;

  prevBtnMem.disabled = currentIndex === 0;
  nextBtnMem.disabled = currentIndex === memories.length - 1;

  if (currentIndex === memories.length - 1) {
    endMessage.classList.add('show');
  } else {
    endMessage.classList.remove('show');
  }
}

// ===== FLIP FORWARD =====
function flipForward(callback) {
  flipPage.classList.add('flipping-forward');
  setTimeout(() => {
    flipPage.classList.remove('flipping-forward');
    if (callback) callback();
  }, 800);
}

// ===== FLIP BACK =====
function flipBack(callback) {
  flipPage.classList.add('flipping-back');
  setTimeout(() => {
    flipPage.classList.remove('flipping-back');
    if (callback) callback();
  }, 800);
}

// ===== OPEN BOOK =====
function openBook() {
  if (bookOpened) return;
  bookOpened = true;

  bookCover.classList.add('opening');

  setTimeout(() => {
    bookCover.style.display = 'none';
    scrapbook.classList.remove('hidden');
    controls.classList.remove('hidden');
    renderMemory();
  }, 1200);
}

// ===== BOOK OPEN HANDLERS =====
openArrow.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  openBook();
});

bookCover.addEventListener('click', (e) => {
  if (e.target.closest('.open-arrow')) return;
  openBook();
});

// ===== NEXT BUTTON =====
nextBtnMem.addEventListener('click', () => {
  if (currentIndex >= memories.length - 1) return;
  flipForward(() => {
    currentIndex++;
    renderMemory();
  });
});

// ===== PREV BUTTON =====
prevBtnMem.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  flipBack(() => {
    currentIndex--;
    renderMemory();
  });
});

// ===== INIT =====
buildSpiral();