import {cargar_catalogo, filtradoBoton_marcas, cargarBotonesCatalogo, funciones_comunes} from "./funciones.js"

funciones_comunes();

// Renderizar todos los productos
document.addEventListener('DOMContentLoaded', () => {
    // Cargar computadoras en catalogo
    const contenedor = document.querySelector('.catalogo');
    cargar_catalogo(contenedor);

    // Revisar si recibo filtro del index.html
    const marcaSeleccionada = localStorage.getItem("marcaSeleccionada");
    if (marcaSeleccionada) {
        console.log("Marca seleccionada:", marcaSeleccionada);
        filtradoBoton_marcas(marcaSeleccionada, contenedor)
        localStorage.removeItem("marcaSeleccionada");
    }

    // Cargar Boton Marcas
    const contenedorMarcas = document.querySelector(".contenido-marcas");
    cargarBotonesCatalogo(contenedorMarcas,true);

    // Cargar Boton Categorias
    const contenedorCategorias = document.querySelector(".contenido-categorias");
    cargarBotonesCatalogo(contenedorCategorias,false);
});
