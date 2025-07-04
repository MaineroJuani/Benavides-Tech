export function procesarFormulario(formulario) {
    const formData = new FormData(formulario);

    // Verificar que categorias tenga algun elemento
    if (!formData.getAll("categoria_id").length) {
        return "Error"
    }
    return formData;
}
export function obtenerParametroId() {
    const params = new URL(location.href).searchParams;
    return params.get('id');
}
export async function obtenerMarcas(respuesta){
    try {
        const datosProductos = await respuesta.json()
        if (respuesta.ok) {
            const contenedorProductos =
                document.getElementById('marca_id');
            let filas = '';
            datosProductos.forEach((producto) => {
                filas += `
                    <option value="${producto.id}">${producto.nombre}</option>
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
export async function obtenerCategorias(respuesta){
    try {
        const datosProductos = await respuesta.json()
        if (respuesta.ok) {
            const contenedorProductos =
                document.getElementById('contenedor_categorias');
            let filas = '';
            datosProductos.forEach((producto) => {
                filas += `
                    <div>
                        <label for="cat_${producto.id}">
                            ${producto.nombre}
                        </label>
                        <input type="checkbox" name="categoria_id" value="${producto.id}" id="cat_${producto.id}">
                    </div>
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
export async function altaRegistro(ruta, metodo, datos) {
    try {
        const respuesta = await fetch(ruta, {
            method: metodo,
            body: datos
        });
        return respuesta;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function eliminarRegistro(ruta) {
    try {
        const respuesta = await fetch(ruta, {
            method: 'DELETE',
        });
        return respuesta;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function obtenerRegistros(ruta) {
    try {
        return await fetch(ruta);
    } catch (error) {
        console.log(error);
        throw error;
    }
}