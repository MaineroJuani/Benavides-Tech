import {cargarBotonesCatalogo,cargarComputadoras_Catalogo, funciones_comunes} from "./funciones.js"

funciones_comunes();

// Renderizar todos los productos
document.addEventListener('DOMContentLoaded', () => {
    // Cargar computadoras en catalogo
    const contenedor = document.querySelector('.catalogo');
    cargarComputadoras_Catalogo(contenedor);

    // Cargar Boton Marcas
    const contenedorMarcas = document.querySelector(".contenido-marcas");
    cargarBotonesCatalogo(contenedorMarcas,true);

    // Cargar Boton Categorias
    const contenedorCategorias = document.querySelector(".contenido-categorias");
    cargarBotonesCatalogo(contenedorCategorias,false);

    
});
