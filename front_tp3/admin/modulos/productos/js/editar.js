import {
    renderizarFormulario
} from './funciones.js';
import {
    procesarFormulario,
    obtenerParametroId,
    altaRegistro,
    obtenerRegistros,
    eliminarRegistro,
    obtenerMarcas,
    obtenerCategorias,
} from '../../../recursos/js/utilidades.js';
// ---------------------------------------------------------

// Constantes
const id = obtenerParametroId();
const formulario = document.getElementById('form-editar');
const botonEliminar = document.getElementById('eliminar-registro');
const mensajes = document.getElementById('mensajes');

// Renderizado de Form
const marcas = await obtenerRegistros('/api/v1/computadoras/marcas');
obtenerMarcas(marcas);
const categorias = await obtenerRegistros('/api/v1/computadoras/categorias');
obtenerCategorias(categorias);

// Asignar escuchador evento boton eliminar
botonEliminar.addEventListener('click', async (evento) => {
    evento.preventDefault();
    if (confirm('Eliminar registro?')) {

        const respuesta = await eliminarRegistro(
            `/api/v1/productos/${id}`
        );
        // Respuestas
        const { mensaje } = await respuesta.json();
        if (respuesta.ok) {
            formulario.style.display = 'none';
        } else {
            console.log(mensaje);
        }
        mensajes.innerHTML = mensaje;
        setTimeout(() => {
            location.href = './';
        }, 2000);
    } else {
        return false;
    }
});
// Asignar escuchador evento enviar formulario (submit)
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    // Obtener datos formulario
    const datosFormulario = procesarFormulario(formulario);
    // Enviar datos al back
    try {
        await altaRegistro(
            `/api/v1/productos/${id}`,
            'PUT',
            datosFormulario
        );
        // Respuestas
        mensajes.innerHTML = 'Producto actualizado correctamente';
    } catch (error) {
        console.log(error);
        mensajes.innerHTML = 'No se pudo modificar el registro';
    }
});
// Renderizar datos en formulario
const resultado = await obtenerRegistros('/api/v1/computadoras/' + id);
renderizarFormulario(resultado, formulario);
