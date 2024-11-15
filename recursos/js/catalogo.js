import {cargarComputadoras_Popup, cargarComputadoras_Catalogo} from "./funciones.js"

// Renderizar todos los productos
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
        // Cargar los productos al carrito
        const popupProductos = document.querySelector("#contenedor-carro")
        cargarComputadoras_Popup(popupProductos)
    }
})