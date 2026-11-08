const menu = document.querySelector('.menu');
const links = [...menu.querySelectorAll('a')];
const screens = [...document.querySelectorAll('.screen')];
const readout = document.querySelector('#readout');

function showScreen(moveFocus = false) {
  const index = Math.max(0, screens.findIndex(screen => '#' + screen.id === location.hash));
  const active = screens[index];
  screens.forEach(screen => {
    screen.hidden = screen !== active;
    screen.classList.remove('enter');
  });
  links.forEach((link, position) => {
    if (position === index) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  readout.textContent = '0' + (index + 1) + ' / 03';
  if (moveFocus) {
    active.classList.add('enter');
    active.focus({ preventScroll: true });
    if (window.scrollY > active.offsetTop) window.scrollTo(0, 0);
  }
}

showScreen();
window.addEventListener('hashchange', () => {
  if (location.hash !== '#command') showScreen(true);
});
menu.addEventListener('keydown', event => {
  const index = links.indexOf(document.activeElement);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const step = event.key === 'ArrowDown' ? 1 : -1;
    const next = index < 0 ? (step === 1 ? 0 : links.length - 1) : (index + step + links.length) % links.length;
    links[next].focus();
  }
});
