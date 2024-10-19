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

const track = document.getElementById('track'); // Identificamos el carrusel
const slides = Array.from(track.children); // Obtenemos todas las diapositivas

const prevButton = document.getElementById('button-prev'); // Botón de retroceso
const nextButton = document.getElementById('button-next'); // Botón siguiente

let currentIndex = 0; // Posición actual del carrusel

// Función para mover el carrusel a la diapositiva indicada
function moveToSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width; // Ancho de la diapositiva
  track.style.transform = `translateX(-${index * slideWidth}px)`; // Desplazamos el carrusel
}

// Evento para botón "next"
nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++; // Avanza al siguiente slide
  } else {
    currentIndex = 0; // Si es el último, vuelve al inicio
  }
  moveToSlide(currentIndex); // Llamamos a la función para mover el carrusel
});

// Evento para botón "prev"
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--; // Retrocede al slide anterior
  } else {
    currentIndex = slides.length - 1; // Si es el primero, vuelve al último
  }
  moveToSlide(currentIndex); // Llamamos a la función para mover el carrusel
});