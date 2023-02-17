// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const screen = document.getElementById('screen');
const pipeLight = document.getElementById('pipe-light');
const label = document.getElementById('label');
const input = document.getElementById('input');
const aboutSticker = document.getElementById('about-sticker');
const contactSticker = document.getElementById('contact-sticker');
const skillsSticker = document.getElementById('skills-sticker');
const worksSticker = document.getElementById('works-sticker');

const about = document.getElementById('about');
const contact = document.getElementById('contact');
const skills = document.getElementById('skills');
const works = document.getElementById('works');
const exit = document.getElementById('exit');

const rootStyles = document.documentElement.style;

// window.addEventListener('scroll', e => {
//   const totalScroll = e.target.scrollingElement.scrollHeight;
//   const currentScroll = e.target.scrollingElement.scrollTop;

//   const currentScale = (currentScroll * 1.5) / (totalScroll - window.innerHeight) + 1;

//   rootStyles.setProperty('--scale', currentScale);
// });

const changeTheme = value => {
  if (value) {
    pipeLight.classList.remove('pipe--on');
    screen.classList.remove('background--night');
  } else {
    pipeLight.classList.add('pipe--on');
    screen.classList.add('background--night');
  }
};

const exitModal = value => {
  if (value) {
    exit.classList.remove('exit');
    exit.classList.add('exit--show');
  }
};

aboutSticker.addEventListener('click', () => {
  about.classList.remove('about');
  about.classList.add('about--show');
  exitModal(about.classList.contains('about--show'));
});
contactSticker.addEventListener('click', e => {
  contact.classList.remove('contact');
  contact.classList.add('contact--show');
  exitModal(contact.classList.contains('contact--show'));
});
skillsSticker.addEventListener('click', () => {
  skills.classList.remove('skills');
  skills.classList.add('skills--show');
  exitModal(skills.classList.contains('skills--show'));
});
worksSticker.addEventListener('click', () => {
  works.classList.remove('works');
  works.classList.add('works--show');
  exitModal(works.classList.contains('works--show'));
});

exit.addEventListener('click', () => {
  about.classList.add('about');
  contact.classList.add('contact');
  skills.classList.add('skills');
  works.classList.add('works');

  exit.classList.remove('exit--show');
});

label.addEventListener('click', e => {
  console.dir(input.checked);
  changeTheme(input.checked);
});
