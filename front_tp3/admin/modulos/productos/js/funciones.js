export async function renderizarFormulario(registros, formulario) {
    try {
        const datos = await registros.json()
        if (registros.ok) {
            // Llenar form
            formulario.modelo.value = datos[0].modelo;
            formulario.procesador.value = datos[0].procesador;
            formulario.graficos.value = datos[0].graficos;
            formulario.almacenamiento.value = datos[0].almacenamiento;
            formulario.ram.value = datos[0].ram;
            formulario.pantalla.value = datos[0].pantalla;
            formulario.precio.value = datos[0].precio;
            formulario.descripcion.value = datos[0].descripcion;
            formulario.detalle_imagen.value = datos[0].detalle_imagen;
            formulario.marca_id.value = datos[0].marca_id;

            // Chequear categorias
            const checkboxFormulario = formulario.querySelectorAll('input[name="categoria_id"]')
            checkboxFormulario.forEach((checkbox) => {
                checkbox.checked = datos[0].categoria_id.includes(Number(checkbox.value));
            });
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
                console.log(producto.imagen)
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
                        <td>${
                            producto.imagen
                                ? `<img src="/computadoras/${producto.imagen}" alt="${producto.detalle_imagen}">`
                                : ''
                        }</td>
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
