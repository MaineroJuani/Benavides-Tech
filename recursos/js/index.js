// Funciones importadas
import {auto_header, auto_footer, auto_categorias, inicializarCarrusel} from "./funciones.js"



// Cargar header y footer automaticamente
document.addEventListener('DOMContentLoaded', () => {
    auto_header('id-encabezado');
    auto_footer('id-pie');
    auto_categorias('id-categorias');

    let CantidadComputadoras = 1;
    if (document.body.clientWidth > 765) {
        CantidadComputadoras = 3;
    }
    inicializarCarrusel('.computadoras','.prev-button','.next-button','.carrusel-track','.nav-button',CantidadComputadoras);
    inicializarCarrusel('.categoria','.prev-button2','.next-button2','.carrusel-track-categoria','.nav-button2',1);
});

