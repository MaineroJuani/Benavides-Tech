import {
    procesarFormulario,
    altaRegistro,
} from '../../../recursos/js/utilidades.js';
// ----------------------------------------------
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
            '/api/v1/productos',
            'POST',
            datosFormulario
        );
        mensajes.innerHTML = "Producto dado de alta";
    }catch(error){
        console.log(error);
        mensajes.innerHTML = 'No se pudo dar de alta el registro';
    }
});
