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
const stickerInfo = document.getElementById('sticker-info');

const allStickers = document.querySelectorAll('.sticker');

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

allStickers.forEach(sticker => {
  sticker.addEventListener('mouseover', () => {
    sticker.classList.add('sticker--tear');
  });
  sticker.addEventListener('mouseout', () => {
    sticker.classList.remove('sticker--tear');
  });
});

stickerInfo.addEventListener('mouseover', () => {
  stickerInfo.classList.add('sticker--animate');
});
stickerInfo.addEventListener('mouseout', () => {
  stickerInfo.classList.remove('sticker--animate');
});

let miCanvas = document.querySelector('#pizarra');
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;
// Marca el nuevo punto
let nuevaPosicionX = 0;
let nuevaPosicionY = 0;

let posicion = miCanvas.getBoundingClientRect();
correccionX = posicion.x;
correccionY = posicion.y;

miCanvas.width = 1900;
miCanvas.height = 1100;

//======================================================================
// FUNCIONES
//======================================================================

/**
 * Funcion que empieza a dibujar la linea
 */
function empezarDibujo() {
  pintarLinea = true;
  lineas.push([]);
}

/**
 * Funcion que guarda la posicion de la nueva línea
 */
function guardarLinea() {
  lineas[lineas.length - 1].push({
    x: nuevaPosicionX,
    y: nuevaPosicionY
  });
}

/**
 * Funcion dibuja la linea
 */
function dibujarLinea(event) {
  event.preventDefault();
  if (pintarLinea) {
    let ctx = miCanvas.getContext('2d');
    // Estilos de linea
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    // Color de la linea
    ctx.strokeStyle = '#fff';
    // Marca el nuevo punto
    if (event.changedTouches == undefined) {
      // Versión ratón
      nuevaPosicionX = event.layerX;
      nuevaPosicionY = event.layerY;
    } else {
      // Versión touch, pantalla tactil
      nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
      nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
    }
    // Guarda la linea
    guardarLinea();
    // Redibuja todas las lineas guardadas
    ctx.beginPath();
    lineas.forEach(function (segmento) {
      ctx.moveTo(segmento[0].x, segmento[0].y);
      segmento.forEach(function (punto, index) {
        ctx.lineTo(punto.x, punto.y);
      });
    });
    ctx.stroke();
  }
}

/**
 * Funcion que deja de dibujar la linea
 */
function pararDibujar() {
  pintarLinea = false;
  guardarLinea();
}

//======================================================================
// EVENTOS
//======================================================================

// Eventos raton
miCanvas.addEventListener('mousedown', empezarDibujo, false);
miCanvas.addEventListener('mousemove', dibujarLinea, false);
miCanvas.addEventListener('mouseup', pararDibujar, false);

// Eventos pantallas táctiles
miCanvas.addEventListener('touchstart', empezarDibujo, false);
miCanvas.addEventListener('touchmove', dibujarLinea, false);
