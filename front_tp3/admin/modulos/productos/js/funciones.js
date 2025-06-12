export async function renderizarFormulario(registros, formulario) {
    try {
        const datos = await registros.json()
        if (registros.ok) {
            // Llenar form
            formulario.nombre.value = datos[0].nombre;
            formulario.marca.value = datos[0].marca;
            formulario.precio.value = datos[0].precio;
            formulario.stock.value = datos[0].stock;
        } else {
            console.log('Registro no encontrado');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function renderizarListado(respuesta) {
    try {
        const datosProductos = await respuesta.json()
        if (respuesta.ok) {
            const contenedorProductos =
                document.getElementById('contenedor-productos');
            let filas = '';
            datosProductos.forEach((producto) => {
                filas += `
                    <tr>
                        <td>${producto.modelo}</td>
                        <td>${producto.marca}</td>
                        <td>${producto.categoria}</td>
                        <td>${producto.procesador}</td>
                        <td>${producto.graficos}</td>
                        <td>${producto.almacenamiento}</td>
                        <td>${producto.ram}</td>
                        <td>${producto.pantalla}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.imagen}</td>
                        <td><a href="./editar.html?id=${producto.id}">Editar</a></td>
                    </tr>
                `;
            });
            contenedorProductos.innerHTML = filas;
        } else {
            console.log(datosProductos.mensaje);
        }
    } catch (error) {
        console.log(error);
    }
}
