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
            const contenedorPrecioFinalizar = document.querySelector(".contenedor-precio-finalizar")
            cargarComputadoras_Popup(popupProductos,contenedorPrecioFinalizar)
        }
    })
    
    // Filtrado de marcas
    const marcas = document.querySelectorAll(".link-marca-pie");
    filtradosCatalogo(marcas,"marca");
    // El filtrado de categorias esta en la funcion auto_categorias

    
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
            setTimeout(() => {
                resultadosBusqueda.innerHTML = "";
            }, 100);
        }
    });

    // Cuando se escribe
    textareaBuscador.addEventListener("input", () => {
        verificarBusqueda(resultadosBusqueda,textareaBuscador.value)
    })

    // Poner URL en formulario del footer
    const contenedorPromociones = document.querySelector(".formulario-ofertas"); 
    colocar_URL(contenedorPromociones);
}

function verificarBusqueda(resultadosBusqueda,textareaBuscadorTexto){
    if (textareaBuscadorTexto !== "") {
        cargarComputadoras_BarraBusqueda(resultadosBusqueda,textareaBuscadorTexto)
    }
    else {
        resultadosBusqueda.innerHTML = ""
    }
}
//cargar computadoras en barra de busqueda
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
                        <a href="compra.html" class="elemento-resultado contenedor-centrado-inicio" data-id="${computadora.id}">
                            <picture class="imagen-resultado">
                            <img src="${computadora.imagen}" alt="${computadora.detalle_imagen}" >
                            </picture>
                            <h2 class="descripcion-resultado puntos-suspensivos">${computadora.modelo}</h2>
                        </a>
                    `
                    cantidadElementos--;
                }
                if (cantidadElementos == 0){
                    break;
                }
            }
        
            contenedor.innerHTML = contenidoHtml

            const anclaCompras = document.querySelectorAll(".elemento-resultado")
            redireccion_compras(anclaCompras)
        })
}

function cargarComputadoras_Popup(contenedor,contenedorPrecioFinalizar){
    let contenidoHtml = ``
    let montoTotal = 0

    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data.computadoras
            const carrito = traerCarrito();

            for (let i = 0; i < carrito.length; i++){
                computadoras.some((computadora) => {
                    if (computadora.id == carrito[i][0]){
                        contenidoHtml +=  `
                            <article class="producto-popup" id="contenedor-producto${carrito[i][0]}">
                                <a href="/compra.html" class="link-compra-carrito" data-id="${carrito[i][0]}">
                                    <div class="imagen-producto-carrito">
                                        <img src="${computadora.imagen}" alt="${computadora.detalle_imagen}" class="imagen-producto" />
                                    </div>
                                    <div class="nombre-popup puntos-suspensivos contenedor-centrado-inicio"><h2 class="puntos-suspensivos">${computadora.modelo}</h2></div>
                                </a>
                                <div class="cantidad-producto-popup">
                                    <button class="boton-quitar boton-carrito boton-morado-oscuro" data-id="${carrito[i][0]}">-</button>
                                    <div class="cantidad-popup contenedor-centrado" id="producto${carrito[i][0]}" data-cantidad="${carrito[i][1]}">${carrito[i][1]}</div>
                                    <button class="boton-agregar boton-carrito boton-morado-oscuro" data-id="${carrito[i][0]}">+</button>
                                </div>
                                <div class="precio-popup contenedor-centrado-inicio" id="precio-popup${carrito[i][0]}" data-precio="${computadora.precio}">$${(computadora.precio*carrito[i][1]).toLocaleString("es-ES")}</div>
                            </article>
                        `
                        montoTotal = montoTotal + (computadora.precio*carrito[i][1])
                        return true;
                    }
                })
            }

            contenedor.innerHTML = contenidoHtml
            if (carrito.length > 0){
                contenedorPrecioFinalizar.innerHTML = `
                    <h2 class="monto-final" data-precio="${montoTotal}">Total: $${montoTotal.toLocaleString("es-ES")}</h2>
                    <button class="boton-finalizar-compra bordeado boton-morado-oscuro">Continuar Compra</button>
                `
            }

            // Modificar la cantidad de productos
            const restarCantidad = document.querySelectorAll(".boton-quitar")
            restarCantidad.forEach((boton) => {
                boton.addEventListener("click", () => {
                    modificarCantidad_Popup(-1, boton.dataset.id, carrito, contenedorPrecioFinalizar)
                })
            })
            const sumarCantidad = document.querySelectorAll(".boton-agregar")
            sumarCantidad.forEach((boton) => {
                boton.addEventListener("click", () => {
                    modificarCantidad_Popup(1, boton.dataset.id, carrito, contenedorPrecioFinalizar)
                })
            })

            // Redireccion a la pagina de compras
            const anclaCompras = document.querySelectorAll(".link-compra-carrito");
            redireccion_compras(anclaCompras)
        })
}

function modificarCantidad_Popup(modificacion, idProducto, carrito, contenedorPrecioFinalizar){
    const contenedorCantidad = document.querySelector(`#producto${idProducto}`)
    const contenedorPrecio = document.querySelector(`#precio-popup${idProducto}`)
    const contenedormontoTotal = document.querySelector(".monto-final")

    // Actualizar cantidad y precio
    let cantidadProducto = Number(contenedorCantidad.dataset.cantidad)
    let precioProducto = Number(contenedorPrecio.dataset.precio)
    let montoTotal = Number(contenedormontoTotal.dataset.precio)
    cantidadProducto = cantidadProducto + modificacion

    if(modificacion == 1){
        montoTotal = montoTotal + precioProducto
    }
    else{
        montoTotal = montoTotal - precioProducto
    }
    contenedormontoTotal.setAttribute("data-precio", montoTotal); 
    contenedormontoTotal.innerHTML = `Total: $${montoTotal.toLocaleString("es-ES")}`

    let i;
    for (i = 0; i < carrito.length; i++) {
        if (carrito[i][0] == Number(idProducto)) {
            carrito[i][1] = cantidadProducto
            break
        }
    }

    if (cantidadProducto > 0){
        contenedorCantidad.dataset.cantidad = cantidadProducto
        
        precioProducto = precioProducto * cantidadProducto
        contenedorCantidad.textContent = cantidadProducto
        contenedorPrecio.textContent = precioProducto.toLocaleString("es-ES")
    }
    else {
        carrito.splice(i,1)
        const contenedorProducto = document.querySelector(`#contenedor-producto${idProducto}`)
        contenedorProducto.remove();
        if (carrito.length == 0){
            contenedorPrecioFinalizar.innerHTML = ""
        }
    }

    sessionStorage.setItem("Carrito", JSON.stringify(carrito));
}

export function traerCarrito(){
    const carritoSinProcesar = sessionStorage.getItem("Carrito");
    let carrito = [];

    // Verificar si hay datos almacenados
    if (carritoSinProcesar) {
        carrito = JSON.parse(carritoSinProcesar);
    }
    return carrito;
}

// Cargar las categorias
export function auto_categorias(categoriasId){
    if (document.body.clientWidth > 765) {
        // Cargar nuevo contenido
        fetch('/recursos/plantillas/categorias-compu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById(categoriasId).innerHTML = data;

                const categorias = document.querySelectorAll(".link-categoria");
                filtradosCatalogo(categorias,"categoria");
            })
            .catch(error => console.error('Error al cargar contenedor categorias:', error));
    }
    else {
        const categorias = document.querySelectorAll(".link-categoria");
        filtradosCatalogo(categorias,"categoria");
    }
}


// Colocar URL de la pagina en el formulario
export function colocar_URL(contenedor){
    const url = window.location.href;

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = '_next';
    input.value = url;

    contenedor.appendChild(input);
}

// Carruseles
export function inicializarCarrusel(elemento, prev, next,contenedor,nav,CantidadComputadoras){
    let currentIndex = 0; // Índice actual del carrusel
    const computadoras = document.querySelectorAll(elemento); // Selecciona todos los elementos con la clase 'computadoras'

    const computedStyle = getComputedStyle(computadoras[0]);
    const anchoComputadora = parseFloat(computedStyle.width)
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
            startAutoplay(3000)
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
            crear_eliminarFiltros()
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
            crear_eliminarFiltros()
        })
}

function filtradosCatalogo(elementos,nombreFiltro){
    elementos.forEach(elemento => {
        elemento.addEventListener("click", (cambioPagina) => {
            cambioPagina.preventDefault();
            localStorage.setItem(`${nombreFiltro}Seleccionada`, elemento.dataset.id);
            console.log(`${nombreFiltro}Seleccionada`,elemento.dataset.id);
            const linkCatalogo = cambioPagina.currentTarget.getAttribute("href");
            window.location.href = linkCatalogo;
        })
    })
}

export async function cargar_catalogo(ruta,contenedor){
    try {
        const datos = await fetch(ruta);
        const datosConvertidos = await datos.json()
        console.log(datosConvertidos)
        renderizado_catalogo(contenedor,datosConvertidos)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function renderizado_catalogo(contenedor, computadoras){
    let contenidoHtml = ``
    computadoras.forEach((computadora)=>{
        contenidoHtml +=  `
            <div class="producto bordeado-morado-claro">
            <a href="/compra.html" class="link-compra" data-id=${computadora.id}>
                <div class="nombre-producto"><h2>${computadora.modelo}</h2></div>
                <div class="tamaño-imagen contenedor-centrado">
                <img src="${computadora.imagen}" alt="${computadora.detalle_imagen}" class="imagen-producto" />
                </div>
                <div class="precio-producto">$${computadora.precio.toLocaleString("es-ES")}</div>
                <button class="boton-comprar boton-morado-oscuro">Ver Más</button>
            </a>
            </div>
        `
    })

    contenedor.innerHTML = contenidoHtml

    // Redireccion a la pagina de compras
    const anclaCompras = document.querySelectorAll(".link-compra");
    redireccion_compras(anclaCompras)
}

function crear_eliminarFiltros(){
    // Crear el ancla y colocarla en html
    const contenedorEliminarFiltro = document.querySelector('#eliminar-filtro');
    contenedorEliminarFiltro.innerHTML = ""
    const ancla = document.createElement('a');
    ancla.href = '#';

    const span = document.createElement('span');
    span.className = "Categorias";
    span.textContent = 'Eliminar Filtro';

    ancla.appendChild(span);
    contenedorEliminarFiltro.appendChild(ancla);

    // Crear evento del ancla
    ancla.addEventListener("click", () => {
        const contenedorCatalogo = document.querySelector(".catalogo");
        cargar_catalogo(contenedorCatalogo)
        contenedorEliminarFiltro.innerHTML = "";
    })
}

export function redireccion_compras(ancla){
    ancla.forEach(computadora => {
        computadora.addEventListener("click", (cambioPagina) => {
            cambioPagina.preventDefault();
            sessionStorage.setItem("computadoraSeleccionada", computadora.dataset.id);
            const linkCompra = cambioPagina.currentTarget.getAttribute("href");
            window.location.href = linkCompra;
        })
    })
}

export function renderizado_compras(id){
    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data.computadoras
            const computadora = computadoras.filter(compu =>{
                return compu.id == Number(id)
            })
            const imagen = document.querySelector(".imagen img")
            imagen.src = computadora[0].imagen
            imagen.alt = computadora[0].modelo

            const precio = document.querySelector(".precio-compra p")
            precio.textContent = `$${computadora[0].precio.toLocaleString("es-ES")}`

            const botonComprar = document.querySelector(".boton-comprar button")
            botonComprar.setAttribute("data-id",computadora[0].id)

            const titulo = document.querySelector(".derecha h1")
            titulo.textContent = computadora[0].modelo

            const marca = document.querySelector(".marca p")
            const marcas = data.marcas
            const marcaId = computadora[0].marca[0];
            const marcaEncontrada = marcas.find(marca => marca.id == marcaId);
            marca.textContent = marcaEncontrada.nombre

            const procesador = document.querySelector(".procesador p")
            procesador.textContent = computadora[0].procesador

            const graficos = document.querySelector(".graficos p")
            graficos.textContent = computadora[0].graficos

            const almacenamiento = document.querySelector(".Almacenamiento p")
            almacenamiento.textContent = computadora[0].almacenamiento

            const RAM = document.querySelector(".RAM p")
            RAM.textContent = computadora[0].ram

            const pantalla = document.querySelector(".Pantalla p")
            pantalla.textContent = computadora[0].pantalla

            const descripcion = document.querySelector(".descripcion-compra p")
            descripcion.textContent = computadora[0].descripcion
        })
}

export function renderizado_producto_agregado(popup,id){
    fetch('/recursos/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const computadoras = data.computadoras
            const computadora = filtrado_computadoras_id(computadoras,id)

            const imagen = document.querySelector(".imagen-producto-agregado img")
            imagen.src = computadora[0].imagen
            imagen.alt = computadora[0].modelo

            const nombreProducto = document.querySelector(".contenedor-producto-agregado p")
            nombreProducto.textContent = computadora[0].modelo

            popup.showModal()
        })
}

function filtrado_computadoras_id(computadoras,id){
    const computadora = computadoras.filter(compu =>{
        return compu.id == Number(id)
    })
    return computadora
}