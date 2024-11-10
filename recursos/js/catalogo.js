import {cargarComputadoras_Catalogo} from "./funciones.js"

// Cargar header y footer automaticamente
document.addEventListener('DOMContentLoaded', () => {
    // Cargar computadoras en catalogo
    const contenedor = document.querySelector('.catalogo');
    cargarComputadoras_Catalogo(contenedor);
});