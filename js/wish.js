const wishCardScene = document.querySelector('.wish-card-scene');
const openWishCardButton = document.getElementById('openWishCard');
const toScratchFromWishButton = document.getElementById('toScratchFromWish');

openWishCardButton.addEventListener('click', () => {
  wishCardScene.classList.add('opened');
  openWishCardButton.setAttribute('aria-expanded', 'true');
});

toScratchFromWishButton.addEventListener('click', () => {
  goToPage('page-scratch');
});