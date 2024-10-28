const tienda = {
    computadoras: [
        {
        marca: "apple",
        modelo: "Macbook Air M2",
        precio: 1900000,
        descripcion: "",
        categoria: "Diseño - Arquitectura",
        imagen: "recursos/imagenes/notebooks/apple/macbook_air_m2.png",
        detalle_imagen: "macbook_air_m2.png"
        },
        {
        marca: "apple",
        modelo: "MacBook Pro M2",
        precio: 2214999,
        descripcion: "",
        categoria: "Arquitectura",
        imagen: "recursos/imagenes/notebooks/apple/macbook_pro_m2.png",
        detalle_imagen: "macbook_pro_m2.png"
        },
        {
        marca: "apple",
        modelo: "Macbook Pro M1",
        precio: 1750000,
        descripcion: "",
        categoria: "Diseño",
        imagen: "recursos/imagenes/notebooks/apple/macbook_pro_m1.png",
        detalle_imagen: "macbook_pro_m1.png"
        },
        {
        marca: "hp",
        modelo: "HP Victus Core i5 8gb",
        precio: 1394000,
        descripcion: "",
        categoria: "Diseño",
        imagen: "recursos/imagenes/notebooks/hp/victus_core_i5-8gb.png",
        detalle_imagen: "victus_core_i5-8gb.png"
        },
        {
        marca: "hp",
        modelo: "HP Victus Core i5 16gb",
        precio: 1360000,
        descripcion: "",
        categoria: "Diseño",
        imagen: "recursos/imagenes/notebooks/hp/victus_core_i5 _16gb.png",
        detalle_imagen: "victus_core_i5 _16gb.png"
        },
        {
        marca: "hp",
        modelo: "HP Victus Core i7",
        precio: 1800000,
        descripcion: "",
        categoria: "Gamer",
        imagen: "recursos/imagenes/notebooks/hp/victus_core_i7.png",
        detalle_imagen: "victus_core_i7.png"
        },
        {
        marca: "lenovo",
        modelo: "Lenovo idePad3 slim",
        precio: 1000000,
        descripcion: "",
        categoria: "Economica",
        imagen: "recursos/imagenes/notebooks/lenovo/ide_pad3_slim.png",
        detalle_imagen: "ide_pad3_slim.png"
        },
        {
        marca: "lenovo",
        modelo: "Lenovo LOQ Core",
        precio: 1500000,
        descripcion: "",
        categoria: "Gamer",
        imagen: "recursos/imagenes/notebooks/lenovo/loq_core.png",
        detalle_imagen: "loq_core.png"
        },
        {
        marca: "lenovo",
        modelo: "Lenovo E16 R7",
        precio: 1969000,
        descripcion: "",
        categoria: "Gamer - Diseño",
        imagen: "recursos/imagenes/notebooks/lenovo/e16_r7.png",
        detalle_imagen: "e16_r7.png"
        },
        {
        marca: "msi",
        modelo: "MSI GE78HX 13VG RAIDER",
        precio: 4725299,
        descripcion: "",
        categoria: "Gamer - Arquitectura - Diseño",
        imagen: "recursos/imagenes/notebooks/msi/ge78hx_13vg_raider.png",
        detalle_imagen: "ge78hx_13vg_raider.png"
        },
        {
        marca: "msi",
        modelo: "MSI CREATOR M16 B13VE-642AR",
        precio: 2911999,
        descripcion: "",
        categoria: "Gamer - Arquitectura - Diseño",
        imagen: "recursos/imagenes/notebooks/msi/creator_m16_b13ve-642ar.png",
        detalle_imagen: "creator_m16_b13ve-642ar.png"
        },
        {
        marca: "msi",
        modelo: "MSI GF63 THIN i5",
        precio: 1469999,
        descripcion: "",
        categoria: "Gamer - Arquitectura - Diseño",
        imagen: "recursos/imagenes/notebooks/msi/gf63_thin_i5.png",
        detalle_imagen: "gf63_thin_i5.png"
        },
        {
        marca: "asus",
        modelo: "Notebook Asus X515ea-ej3968 Fhd I3",
        precio: 769299,
        descripcion: "",
        categoria: "Economica",
        imagen: "recursos/imagenes/notebooks/asus/x515ea-ej3968_fhd_i3.png",
        detalle_imagen: "x515ea-ej3968_fhd_i3.png"
        },
        {
        marca: "asus",
        modelo: "Notebook Gamer ASUS TUF Gaming F15 FX506LHB-HN324W",
        precio: 1501999,
        descripcion: "",
        categoria: "Gamer - Diseño",
        imagen: "recursos/imagenes/notebooks/asus/tuf_gaming_f15_fx506lhb-hn3242.png",
        detalle_imagen: "tuf_gaming_f15_fx506lhb-hn3242.png"
        },
        {
        marca: "asus",
        modelo: "Notebook Asus TUF A16 Ryzen 7 16GB 512GB Radeon RX770",
        precio: 2159999,
        descripcion: "",
        categoria: "Arquitectura",
        imagen: "recursos/imagenes/notebooks/asus/tuf_a16_ryzen7_16gb_512GB_radeon_rx7700s.png",
        detalle_imagen: ""
        }
    ]    
}

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