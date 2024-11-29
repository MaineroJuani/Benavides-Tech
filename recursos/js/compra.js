import { funciones_comunes, renderizado_compras, traerCarrito } from "./funciones.js";

funciones_comunes();

document.addEventListener('DOMContentLoaded', () => {
    // Revisar computadora del catalogo.html
    const computadoraSeleccionada = sessionStorage.getItem("computadoraSeleccionada");
    renderizado_compras(computadoraSeleccionada);

    // Meter computadora al carrito
    const botonComprar = document.querySelector(".boton-comprar button")
    botonComprar.addEventListener("click", () => {
        const carrito = traerCarrito()
        const compuNueva = botonComprar.dataset.id

        // Verificar si no esta esa compu cargada
        let i;
        for (i = 0; i < carrito.length; i++) {
            if (carrito[i][0] == compuNueva) {
                carrito[i][1] = Number(carrito[i][1]) + 1;
                break;
            }
        }
        if(i >= carrito.length){
            carrito.push([compuNueva, 1]);
        }
        sessionStorage.setItem("Carrito", JSON.stringify(carrito));
    })
})