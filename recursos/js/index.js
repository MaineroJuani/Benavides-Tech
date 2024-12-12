// Funciones importadas
import {auto_categorias, inicializarCarrusel, redireccion_compras, funciones_comunes} from "./funciones.js"

funciones_comunes();

// Cambiar categoria para pc
auto_categorias('id-categorias');

// Redireccion a la pagina de compras
const anclaCompras = document.querySelectorAll(".imagen_computadora a");
redireccion_compras(anclaCompras)

// Cargar los carruseles
let CantidadComputadoras = 1;
if (document.body.clientWidth > 765) {
    CantidadComputadoras = 3;
}
else{
    inicializarCarrusel('.categoria','#prev-button2','#next-button2','.carrusel-track-categoria','.nav-button2',1);
}
inicializarCarrusel('.computadoras','#prev-button','#next-button','.carrusel-track','.nav-button',CantidadComputadoras);
