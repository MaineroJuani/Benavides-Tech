// Funciones importadas
import {auto_categorias, inicializarCarrusel} from "./funciones.js"

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