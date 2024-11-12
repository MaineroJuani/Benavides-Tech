import {abrir_popup, cargarComputadoras_Catalogo} from "./funciones.js"

// Cargar header y footer automaticamente
document.addEventListener('DOMContentLoaded', () => {
    // Cargar computadoras en catalogo
    const contenedor = document.querySelector('.catalogo');
    cargarComputadoras_Catalogo(contenedor);
});

// Abrir pop-up
const botonAbrirPopup = document.querySelector("#id-popup-carrito")
botonAbrirPopup.addEventListener("click", () => {
    const popupCarro = document.querySelector("#popup-carro")
    if (popupCarro.open) {
        popupCarro.close();
    }else{
        popupCarro.showModal();
    }
})