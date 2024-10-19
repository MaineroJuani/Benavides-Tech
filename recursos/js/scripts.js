// function App(){

//     window.onload = function(event){
//         var app = new App();
//         window.app = app;
//     }

//     App.prototype.processingButton = function(event) {

//         const btn = event.currentTarget;
//         const carruselList = event.currentTarget.parentNode;
//         const track = event.currentTarget.parentNode.querySelector('#track');
//         const carrusel = track.querySelectorAll('.computadoras');

//         const carruselWidth = carrusel[0].offsetWidth;
//         const trackWidht = track.offsetWidth;
//         const listWidht = carruselList.offsetWidth;

//         track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0,-2) * -1);
//         btn.dataset.button == "button-prev" ? prevAction(leftPosition,carruselWidth,track) : nextAction(leftPosition,trackWidht,listWidht,carruselWidth,track);

//     }

//     let prevAction = (leftPosition, carruselWidth, track) => {
//         if(leftPosition > 0){
//             track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;
//         }
//     }

//     let nextAction = (leftPosition, trackWidht, listWidht, carruselWidth, track) => {

//         if(leftPosition < (trackWidht - listWidht)) {
//             if(leftPosition > 0){
//                 track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
//             }
//         }
//     }
// }

// JavaScript para el carrusel

const track = document.getElementById('track');
let index = 0;
const itemsToShow = 3; // Número de elementos que se mostrarán a la vez

function updateCarrusel() {
  const itemWidth = document.querySelector('.computadoras').clientWidth;
  const trackWidth = track.scrollWidth;
  const visibleArea = document.querySelector('.contenedor_destacados').clientWidth;

  // Calcula el desplazamiento máximo
  const maxIndex = Math.floor(trackWidth / itemWidth) - itemsToShow;

  // Limita el índice dentro de los rangos válidos
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;

  // Actualiza la posición del carrusel
  const translateX = -index * itemWidth;
  track.style.transform = `translateX(${translateX}px)`;
}

// Manejadores de evento para las flechas
document.getElementById('button-prev').addEventListener('click', () => {
  index--;
  updateCarrusel();
});

document.getElementById('button-next').addEventListener('click', () => {
  index++;
  updateCarrusel();
});