import {cargar_catalogo, filtradoBoton_marcas, filtradoBoton_categorias, cargarBotonesCatalogo, funciones_comunes} from "./funciones.js"

funciones_comunes();

// Renderizar todos los productos
document.addEventListener('DOMContentLoaded', () => {
    // Cargar computadoras en catalogo
    const contenedor = document.querySelector('.catalogo');

    // Revisar si recibe filtro
    const marcaSeleccionada = localStorage.getItem("marcaSeleccionada");
    const categoriaSeleccionada = localStorage.getItem("categoriaSeleccionada");
    if (marcaSeleccionada) {
        filtradoBoton_marcas(marcaSeleccionada, contenedor)
        localStorage.removeItem("marcaSeleccionada");
    }
    else if (categoriaSeleccionada) {
        filtradoBoton_categorias(categoriaSeleccionada, contenedor)
        localStorage.removeItem("categoriaSeleccionada");
    }
    else { //Por si acaso no recibe un filtro
        cargar_catalogo(contenedor);
    }

    // Cargar Boton Marcas
    const contenedorMarcas = document.querySelector(".contenido-marcas");
    cargarBotonesCatalogo(contenedorMarcas,true);

    // Cargar Boton Categorias
    const contenedorCategorias = document.querySelector(".contenido-categorias");
    cargarBotonesCatalogo(contenedorCategorias,false);
});