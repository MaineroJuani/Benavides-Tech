import { funciones_comunes, renderizado_compras } from "./funciones.js";

funciones_comunes();

document.addEventListener('DOMContentLoaded', () => {
    // Revisar computadora del catalogo.html
    const computadoraSeleccionada = localStorage.getItem("computadoraSeleccionada");
    renderizado_compras(computadoraSeleccionada);
    localStorage.removeItem("computadoraSeleccionada");
})