// Referenciamos
const contenedor = document.querySelector('.catalogo');

// creamos una variable que contendra el HTML
let contenidoHtml = ``

// iteramos con forEach
const computadoras = tienda.computadoras
computadoras.forEach((computadora)=>{
    contenidoHtml +=  `
        <div class="producto">
        <a href="/compra.html" class="link-compra">
            <div class="nombre-producto"><h2>${computadora.modelo}</h2></div>
            <div class="tamaño-imagen">
            <img src="${computadora.imagen}" alt="${computadora.detalle_imagen}" class="imagen-producto" />
            </div>
            <div class="precio-producto">$${computadora.precio.toLocaleString("es-ES")}</div>
            <button class="boton-comprar">Comprar</button>
        </a>
        </div>
    `
})

contenedor.innerHTML = contenidoHtml


// -----------------------------------------------------------
// Eventos

// const botonFiltrar = document.getElementById('boton-filtrar')
const campoTexto = document.getElementById('texto-filtro')

campoTexto.addEventListener('input',()=>{
    const productosFiltrados = productos.filter((producto)=>{
        const nombreMinusculas = producto.nombre.toLowerCase()
        const textoUsuarioMinusculas = campoTexto.value.toLowerCase()

        return nombreMinusculas.includes(textoUsuarioMinusculas)
    })

    let contenidoFiltrado = ''
    productosFiltrados.forEach((producto)=>{
        contenidoFiltrado +=  `
            <h2>${producto.nombre}</h2>
            <ul>
                <li>Precio: ${producto.precio}</li>
                <li>Stock: ${producto.stock}</li>
            </ul>
        `
    })

    contenedor.innerHTML = contenidoFiltrado
})