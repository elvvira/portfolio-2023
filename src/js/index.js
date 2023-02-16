// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const screen = document.getElementById('screen');
const pipeLight = document.getElementById('pipe-light');
const label = document.getElementById('label');
const input = document.getElementById('input');

const rootStyles = document.documentElement.style;

window.addEventListener('scroll', e => {
  //scroll = 0 -> 1
  //scroll = 100 -> 2.4

  const totalScroll = e.target.scrollingElement.scrollHeight;
  const currentScroll = e.target.scrollingElement.scrollTop;

  const currentScale = (currentScroll * 1.5) / (totalScroll - window.innerHeight) + 1;

  rootStyles.setProperty('--scale', currentScale);
});
const changeTheme = value => {
  if (value) {
    //enciende farola
    pipeLight.classList.remove('pipe--on');
    screen.classList.remove('background--night');
  } else {
    pipeLight.classList.add('pipe--on');
    screen.classList.add('background--night');
  }
};

label.addEventListener('click', e => {
  console.dir(input.checked);
  changeTheme(input.checked);
});
