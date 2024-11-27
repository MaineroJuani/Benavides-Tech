// Funciones comunes
export function funciones_comunes(){
    // Abrir pop-up
    const botonAbrirPopup = document.querySelector("#id-popup-carrito")
    botonAbrirPopup.addEventListener("click", () => {
        const popupCarro = document.querySelector("#popup-carro")
        if (popupCarro.open) {
            popupCarro.close();
        }else{
            popupCarro.showModal();
            // Cargar los productos al carrito
            const popupProductos = document.querySelector("#contenedor-carro")
            cargarComputadoras_Popup(popupProductos)
        }
    })

    
    // Abrir resultados de busqueda
    const textareaBuscador = document.querySelector("#id-filtro-modelo")
    const resultadosBusqueda = document.querySelector(".filtro-resultados")
    let perdidaFoco = false;

    // Entrada del foco
    textareaBuscador.addEventListener("focus", () => {
        perdidaFoco = false;
        verificarBusqueda(resultadosBusqueda,textareaBuscador.value)
    })

    // Perdida del foco
    textareaBuscador.addEventListener("blur", () => {
        perdidaFoco = true;
    });
    // Se deja de presionar click
    document.addEventListener("mouseup", () => {
        if (perdidaFoco == true) {
            resultadosBusqueda.innerHTML = ""
        }
    });

    // Cuando se escribe
    textareaBuscador.addEventListener("input", () => {
        verificarBusqueda(resultadosBusqueda,textareaBuscador.value)
    })
}

function verificarBusqueda(resultadosBusqueda,textareaBuscadorTexto){
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

function cargarComputadoras_Popup(contenedor){
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
                        <div class="precio-popup">$${computadora.precio.toLocaleString("es-ES")}</div>
                    </article>
                `
                })
                            
            contenedor.innerHTML = contenidoHtml
        })
}

// Cargar las categorias
export function auto_categorias(categoriasId){
    if (document.body.clientWidth > 765) {
        // Cargar nuevo contenido
        fetch('/recursos/plantillas/categorias-compu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById(categoriasId).innerHTML = data;

                // Filtrado de categoria
                const categorias = document.querySelectorAll(".link-categoria");
                filtradosCatalogo(categorias,"categoria");
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

export function cargarBotonesCatalogo(contenedor,marcas){
    let contenidoHtml = ``

    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            let categorias;
            let clase;
            let funcion;

            if (marcas == true){
                categorias = data.marcas;
                clase = "filtro-marcas";
                funcion = (id) => filtradoBoton_marcas(id, catalogo);
            }
            else{
                categorias = data.categorias;
                clase = "filtro-categorias";
                funcion = (id) => filtradoBoton_categorias(id, catalogo);
            }

            categorias.forEach((categoria)=>{
                contenidoHtml +=  `
                    <li> <a href="#" class="${clase}" data-id=${categoria.id}> <span class="dot" style="color:#bb64e0">•</span>${categoria.nombre}</a> </li>
                `
            })
        
            contenedor.innerHTML = contenidoHtml

            // eventos de filtrado por botones
            const botonMarcas = document.querySelectorAll(`.${clase}`);
            const catalogo = document.querySelector('.catalogo');

            botonMarcas.forEach(boton => {
                boton.addEventListener("click", () => {
                    const id = boton.dataset.id
                    funcion(id)
                })
            })
        })
}

export function filtradoBoton_categorias(id,catalogo){
    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data
            const computadorasFiltradas = computadoras.computadoras.filter(computadora =>{
                return computadora.categoria.includes(Number(id))
            })
            renderizado_catalogo(catalogo,computadorasFiltradas)
        })
}

export function filtradoBoton_marcas(id,catalogo){
    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data
            const computadorasFiltradas = computadoras.computadoras.filter(computadora =>{
                return computadora.marca == id
            })
            renderizado_catalogo(catalogo,computadorasFiltradas)
        })
}

export function filtradosCatalogo(elementos,nombreFiltro){
    elementos.forEach(elemento => {
        elemento.addEventListener("click", (cambioPagina) => {
            cambioPagina.preventDefault();
            localStorage.setItem(`${nombreFiltro}Seleccionada`, elemento.dataset.id);
            const linkCatalogo = cambioPagina.currentTarget.getAttribute("href");
            window.location.href = linkCatalogo;
        })
    })
}

export function cargar_catalogo(contenedor){
    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data
            renderizado_catalogo(contenedor,computadoras.computadoras)
        })
}

function renderizado_catalogo(contenedor, computadoras){
    let contenidoHtml = ``
    computadoras.forEach((computadora)=>{
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
}