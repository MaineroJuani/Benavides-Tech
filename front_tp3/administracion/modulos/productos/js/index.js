import { obtenerRegistros } from '../../../recursos/js/utilidades.js';
import { renderizarListado } from './funciones.js';

const respuesta = await obtenerRegistros('/api/v1/productos');
renderizarListado(respuesta);
