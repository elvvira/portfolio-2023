// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const screen = document.getElementById('screen');
const rootStyles = document.documentElement.style;

window.addEventListener('scroll', e => {
  //scroll = 0 -> 1
  //scroll = 100 -> 2.4

  const totalScroll = e.target.scrollingElement.scrollHeight;
  const currentScroll = e.target.scrollingElement.scrollTop;

  const currentScale =
    (currentScroll * 1.5) / (totalScroll - window.innerHeight) + 1;

  rootStyles.setProperty('--scale', currentScale);
});
