// Cargar header y footer automaticamente
document.addEventListener('DOMContentLoaded', function () {
    fetch('recursos/plantillas/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-encabezado').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el header:', error));

    fetch('recursos/plantillas/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-pie').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el footer:', error));
});


//Carrusel de recomendados
let currentIndex = 0; // Índice actual del carrusel
const computadoras = document.querySelectorAll('.computadoras'); // Selecciona todos los elementos con la clase 'computadoras'
const anchoComputadora = computadoras[0].offsetWidth; // Ancho de cada computadora (elemento)

const computedStyle = getComputedStyle(computadoras[0]);
const margenIzquierdo = parseFloat(computedStyle.marginLeft)
const anchoTotalComputadora = anchoComputadora + margenIzquierdo

let CantidadComputadoras = 1;

if (document.body.clientWidth > 765) {
    CantidadComputadoras = 2;
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

    currentIndex = (currentIndex + direction + totalImages) % totalImages;

    if (currentIndex < 0 && direction === -1) {
        currentIndex = totalImages - CantidadComputadoras;
    } 
    else if (currentIndex >= totalImages - CantidadComputadoras && direction === 1) {
        currentIndex = 0; // Ir al inicio
    }

    if (currentIndex > totalImages - CantidadComputadoras) {
        currentIndex = totalImages - CantidadComputadoras;
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


//cargar html de categorias en index
document.addEventListener('DOMContentLoaded', function () {
    if (document.body.clientWidth > 765){
        fetch('recursos/plantillas/categorias-compu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-categorias').innerHTML = data;

            //Carrusel de categorias
            document.addEventListener('DOMContentLoaded', function () {
                let currentIndex2 = 0; // Índice actual del carrusel
                const computadoras2 = document.querySelectorAll('.categoria'); // Selecciona todos los elementos con la clase 'categoria'
                
                // Verifica que haya elementos en computadoras2
                if (computadoras2.length > 0) {
                    const anchoComputadora2 = computadoras2[0].offsetWidth; // Ancho de cada computadora (elemento)
                    
                    const computedStyle2 = getComputedStyle(computadoras2[0]);
                    const margenIzquierdo2 = parseFloat(computedStyle2.marginLeft);
                    const anchoTotalComputadora2 = anchoComputadora2 + margenIzquierdo2;

                    document.querySelector('.prev-button2').addEventListener('click', () => {
                        navigate2(-1); // Navega hacia atrás
                    });

                    document.querySelector('.next-button2').addEventListener('click', () => {
                        navigate2(1); // Navega hacia adelante
                    });

                    function navigate2(direction2) {
                        const galleryContainer = document.querySelector('.carrusel-track-categoria');
                        const totalImages = computadoras2.length;

                        currentIndex2 = (currentIndex2 + direction2 + totalImages) % totalImages;

                        const offset = -currentIndex2 * anchoTotalComputadora2;
                        galleryContainer.style.transform = `translateX(${offset}px)`;
                    }
                } else {
                    console.error('No se encontraron elementos con la clase .categoria');
                }
            });
        })
        .catch(error => console.error('Error al cargar el header:', error));
    }
    else{
        fetch('recursos/plantillas/categorias-celu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-categorias').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el header:', error));
    }
    
});



// Autoplay del carrusel de categorias
let autoplayInterval2 = null;        
function startAutoplay2(interval) {
stopAutoplay2();
autoplayInterval2 = setInterval(() => {
    navigate2(1);
}, interval);
}

function stopAutoplay2() {
clearInterval(autoplayInterval2);
}

startAutoplay2(3000);

document.querySelectorAll('.nav-button2').forEach(button => {
    button.addEventListener('click', stopAutoplay2);
});