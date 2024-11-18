// Funciones importadas
import {auto_categorias, inicializarCarrusel, verificarBusqueda} from "./funciones.js"

// Cargar header y footer automaticamente
document.addEventListener('DOMContentLoaded', () => {
    auto_categorias('id-categorias');

    let CantidadComputadoras = 1;
    if (document.body.clientWidth > 765) {
        CantidadComputadoras = 3;
    }
    else{
        inicializarCarrusel('.categoria','.prev-button2','.next-button2','.carrusel-track-categoria','.nav-button2',1);
    }
    inicializarCarrusel('.computadoras','.prev-button','.next-button','.carrusel-track','.nav-button',CantidadComputadoras);
});

// Abrir resultados de busqueda
const textareaBuscador = document.querySelector("#id-filtro-modelo")
const resultadosBusqueda = document.querySelector(".filtro-resultados")
let perdidaFoco = false;

// Entrada del foco
textareaBuscador.addEventListener("focus", () => {
    perdidaFoco = false;
    verificarBusqueda(resultadosBusqueda,textareaBuscador.value)
})

// Perdida del foco
textareaBuscador.addEventListener("blur", () => {
    perdidaFoco = true;
});
// Se deja de presionar click
document.addEventListener("mouseup", () => {
    if (perdidaFoco == true) {
        resultadosBusqueda.innerHTML = ""
    }
});

// Cuando se escribe
textareaBuscador.addEventListener("input", () => {
    verificarBusqueda(resultadosBusqueda,textareaBuscador.value)
})