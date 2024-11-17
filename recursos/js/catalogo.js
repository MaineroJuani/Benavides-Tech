import {cargarComputadoras_Popup, cargarComputadoras_Catalogo, verificarBusqueda} from "./funciones.js"

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

// Abrir resultados de busqueda
const textareaBuscador = document.querySelector("#id-filtro-modelo")
const resultadosBusqueda = document.querySelector(".filtro-resultados")

textareaBuscador.addEventListener("focus", () => {
    verificarBusqueda(resultadosBusqueda,textareaBuscador.value)
})

textareaBuscador.addEventListener("blur", () => {
    setTimeout(() => {
        resultadosBusqueda.innerHTML = ""
    },80)
});

textareaBuscador.addEventListener("input", () => {
    verificarBusqueda(resultadosBusqueda,textareaBuscador.value)
})