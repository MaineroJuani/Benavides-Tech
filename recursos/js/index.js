// Funciones importadas
import {auto_categorias, inicializarCarrusel, funciones_comunes, filtradoBoton_marcas} from "./funciones.js"

funciones_comunes();

// Cargar header y footer automaticamente
document.addEventListener('DOMContentLoaded', () => {
    // Cambiar categoria para pc
    auto_categorias('id-categorias');

    // Cargar los carruseles
    let CantidadComputadoras = 1;
    if (document.body.clientWidth > 765) {
        CantidadComputadoras = 3;
    }
    else{
        inicializarCarrusel('.categoria','.prev-button2','.next-button2','.carrusel-track-categoria','.nav-button2',1);
    }
    inicializarCarrusel('.computadoras','.prev-button','.next-button','.carrusel-track','.nav-button',CantidadComputadoras);

    // Filtrado de categoria
    const categorias = document.querySelectorAll(".imagen-computadora");

    // Filtrado de marcas
    const marcas = document.querySelectorAll(".link-marca-pie");
    marcas.forEach(marca => {
        marca.addEventListener("click", (cambioPagina) => {
            cambioPagina.preventDefault();
            localStorage.setItem("marcaSeleccionada", marca.dataset.id);
            const linkCatalogo = cambioPagina.currentTarget.getAttribute("href");
            window.location.href = linkCatalogo;
        })
    })
});
