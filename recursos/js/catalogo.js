import {cargarComputadoras_Popup, cargarComputadoras_Catalogo, funciones_comunes} from "./funciones.js"

// Renderizar todos los productos
document.addEventListener('DOMContentLoaded', () => {
    // Cargar computadoras en catalogo
    const contenedor = document.querySelector('.catalogo');
    cargarComputadoras_Catalogo(contenedor);
});

funciones_comunes();