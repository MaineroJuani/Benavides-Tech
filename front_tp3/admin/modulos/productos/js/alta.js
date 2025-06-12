import {
    procesarFormulario,
    altaRegistro,
    obtenerRegistros,
    obtenerMarcas,
    obtenerCategorias,
} from '../../../recursos/js/utilidades.js';
// ----------------------------------------------
// Renderizado de Form
const marcas = await obtenerRegistros('/api/v1/computadoras/marcas');
obtenerMarcas(marcas);
const categorias = await obtenerRegistros('/api/v1/computadoras/categorias');
obtenerCategorias(categorias);

// Referenciamos
const formulario = document.getElementById('form-editar');
const mensajes = document.getElementById('mensajes');
// ----------------------------------------------
// Asignar escuchador evento
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    // Obtener datos formulario
    const datosFormulario = procesarFormulario(formulario);
    // Enviar datos al back
    try{
        await altaRegistro(
            '/admin/api/v1/computadoras',
            'POST',
            datosFormulario
        );
        mensajes.innerHTML = "Producto dado de alta";
    }catch(error){
        console.log(error);
        mensajes.innerHTML = 'No se pudo dar de alta el registro';
    }
});
