//Carrusel de recomendados
let currentIndex = 0; // Índice actual del carrusel
const computadoras = document.querySelectorAll('.computadoras'); // Selecciona todos los elementos con la clase 'computadoras'
const anchoComputadora = computadoras[0].offsetWidth; // Ancho de cada computadora (elemento)

const computedStyle = getComputedStyle(computadoras[0]);
const margenIzquierdo = parseFloat(computedStyle.marginLeft)
const margenDerecho = parseFloat(computedStyle.marginRight)
const anchoTotalComputadora = anchoComputadora + margenIzquierdo + margenDerecho

let CantidadComputadoras = 1;

if (document.body.clientWidth > 765) {
    CantidadComputadoras = 3;
}

document.querySelector('.prev-button').addEventListener('click', () => {
    navigate(-1); // Navega hacia atrás
});

document.querySelector('.next-button').addEventListener('click', () => {
    navigate(1); // Navega hacia adelante
});

function navigate(direction) {
    const galleryContainer = document.querySelector('.carrusel-track');
    const totalImages = document.querySelectorAll('.computadoras').length;

    currentIndex = (currentIndex + direction);

    if (currentIndex < 0) {
        currentIndex = totalImages - CantidadComputadoras ; // Ir al final
    } 
    else if (currentIndex > totalImages - CantidadComputadoras && direction === 1) {
        currentIndex = 0; // Ir al inicio
    }

    const offset = -currentIndex * anchoTotalComputadora;
    galleryContainer.style.transform = `translateX(${offset}px)`;
}

// Autoplay del carrusel recomendados
let autoplayInterval = null;        
function startAutoplay(interval) {
stopAutoplay();
autoplayInterval = setInterval(() => {
    navigate(1);
}, interval);
}

function stopAutoplay() {
clearInterval(autoplayInterval);
}

startAutoplay(3000);

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoplay);
});
