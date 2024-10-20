if (document.body.clientWidth > 765) {
    // Cargar nuevo contenido
    fetch('recursos/plantillas/categorias-compu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-categorias').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar contenedor categorias:', error));
}
else {
    fetch('recursos/plantillas/categorias-celu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('id-categorias').innerHTML = data;
            inicializarCarrusel();
        })
        .catch(error => console.error('Error al cargar contenedor categorias:', error));
}

function inicializarCarrusel(){
    let currentIndex = 0; // Índice actual del carrusel
    const computadoras = document.querySelectorAll('.categoria');
    
    const anchoComputadora = computadoras[0].offsetWidth; // Ancho de cada computadora (elemento)
    const computedStyle = getComputedStyle(computadoras[0]);
    const margenIzquierdo = parseFloat(computedStyle.marginLeft);
    const margenDerecho = parseFloat(computedStyle.marginRight);
    const anchoTotalComputadora = anchoComputadora + margenIzquierdo + margenDerecho;
    
    document.querySelector('.prev-button2').addEventListener('click', () => {
        navigate(-1); // Navega hacia atrás
    });
    
    document.querySelector('.next-button2').addEventListener('click', () => {
        navigate(1); // Navega hacia adelante
    });
    
    function navigate(direction) {
        const galleryContainer = document.querySelector('.carrusel-track-categoria');
        const totalImages = document.querySelectorAll('.categoria').length;
    
        currentIndex = (currentIndex + direction + totalImages) % totalImages;
    
        const offset = -currentIndex * anchoTotalComputadora;
    
        galleryContainer.style.transform = `translateX(${offset}px)`;
    }
    
    // Autoplay del carrusel categorías
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
    
    document.querySelectorAll('.nav-button2').forEach(button => {
        button.addEventListener('click', stopAutoplay);
    });
}
