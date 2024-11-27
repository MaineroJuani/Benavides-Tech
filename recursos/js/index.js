// Funciones importadas
import {auto_categorias, inicializarCarrusel, filtradosCatalogo, funciones_comunes} from "./funciones.js"

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

    // Filtrado de marcas
    const marcas = document.querySelectorAll(".link-marca-pie");
    filtradosCatalogo(marcas,"marca");
    // El filtrado de categorias esta en la funcion auto_categorias
});