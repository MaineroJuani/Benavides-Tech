// Cargar las categorias
export function auto_categorias(categoriasId){
    if (document.body.clientWidth > 765) {
        // Cargar nuevo contenido
        fetch('/recursos/plantillas/categorias-compu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById(categoriasId).innerHTML = data;
            })
            .catch(error => console.error('Error al cargar contenedor categorias:', error));
    }
}

// Carruseles
export function inicializarCarrusel(elemento, prev, next,contenedor,nav,CantidadComputadoras){
    let currentIndex = 0; // Índice actual del carrusel
    const computadoras = document.querySelectorAll(elemento); // Selecciona todos los elementos con la clase 'computadoras'

    const computedStyle = getComputedStyle(computadoras[0]);
    const anchoComputadora = parseFloat(computedStyle.width) // Ancho de cada computadora (elemento)
    const margenIzquierdo = parseFloat(computedStyle.marginLeft)
    const margenDerecho = parseFloat(computedStyle.marginRight)
    const anchoTotalComputadora = anchoComputadora + margenIzquierdo + margenDerecho //Tamaño total del elemento


    document.querySelector(prev).addEventListener('click', () => {
        navigate(-1); // Navega hacia atrás
    });

    document.querySelector(next).addEventListener('click', () => {
        navigate(1); // Navega hacia adelante
    });

    function navigate(direction) {
        const galleryContainer = document.querySelector(contenedor);
        const totalImages = document.querySelectorAll(elemento).length;

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

    // Autoplay del carrusel
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

    document.querySelectorAll(nav).forEach(button => {
        button.addEventListener('click', ()=>{
            stopAutoplay();
            startAutoplay(3000)  //Debatible
        });
    });
}




// Renderizados

export function cargarComputadoras_Catalogo(contenedor){
    let contenidoHtml = ``

    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data
            computadoras.computadoras.forEach((computadora)=>{
                contenidoHtml +=  `
                    <div class="producto">
                    <a href="/compra.html" class="link-compra">
                        <div class="nombre-producto"><h2>${computadora.modelo}</h2></div>
                        <div class="tamaño-imagen">
                        <img src="${computadora.imagen}" alt="${computadora.detalle_imagen}" class="imagen-producto" />
                        </div>
                        <div class="precio-producto">$${computadora.precio.toLocaleString("es-ES")}</div>
                        <button class="boton-comprar">Ver Más</button>
                    </a>
                    </div>
                `
            })
        
            contenedor.innerHTML = contenidoHtml
        })
}


export function cargarComputadoras_Popup(contenedor){
    let contenidoHtml = ``

    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data
            computadoras.computadoras.forEach((computadora)=>{
                contenidoHtml +=  `
                    <article class="producto-popup">
                        <a href="/compra.html" class="link-compra-carrito">
                            <div class="imagen-producto-carrito">
                                <img src="${computadora.imagen}" alt="${computadora.detalle_imagen}" class="imagen-producto" />
                            </div>
                            <div class="nombre-popup"><h2>${computadora.modelo}</h2></div>
                        </a>
                        <div class="cantidad-producto-popup">
                            <button class="boton-quitar boton-carrito">-</button>
                            <div class="cantidad-popup">1</div>
                            <button class="boton-agregar boton-carrito">+</button>
                        </div>
                        <div class="precio-popup">10500</div>
                    </article>
                `
            })
        
            contenedor.innerHTML = contenidoHtml
        })
}

export function verificarBusqueda(resultadosBusqueda,textareaBuscadorTexto){
    if (textareaBuscadorTexto !== "") {
        cargarComputadoras_BarraBusqueda(resultadosBusqueda,textareaBuscadorTexto)
    }
    else {
        resultadosBusqueda.innerHTML = ""
    }
}

function cargarComputadoras_BarraBusqueda(contenedor, textareaTexto){
    let contenidoHtml = ``

    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data
            const textoBusqueda = textareaTexto.toLowerCase();
            let cantidadElementos = 3;
            for (let i = 0; i < computadoras.computadoras.length; i++) {
                const computadora = computadoras.computadoras[i];
                const modeloComputadora = computadora.modelo.toLowerCase();
                if (modeloComputadora.includes(textoBusqueda)) {
                    contenidoHtml +=  `
                        <a href="compra.html" class="elemento-resultado">
                            <picture class="imagen-resultado">
                            <img src="${computadora.imagen}" alt="${computadora.detalle_imagen}" >
                            </picture>
                            <h2 class="descripcion-resultado">${computadora.modelo}</h2>
                        </a>
                    `
                    cantidadElementos--;
                }
                if (cantidadElementos == 0){
                    break;
                }
            }
        
            contenedor.innerHTML = contenidoHtml
        })
}