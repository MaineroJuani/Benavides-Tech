import pool from '../conexion.bd.mjs'

export async function obtenerTodos(){
    try {
        const query = "SELECT C.id,STRING_AGG(CA.nombre, ', ') as categoria,C.modelo,M.nombre as marca, C.procesador, C.graficos, C.almacenamiento,C.ram,C.pantalla,C.precio,C.descripcion,C.imagen,C.detalle_imagen FROM computadoras as C INNER JOIN computadora_categoria as CC ON CC.computadora_id = C.ID INNER JOIN categorias as CA ON CA.id = CC.categoria_id INNER JOIN marcas as M ON M.id = C.marca_id GROUP BY C.id,C.modelo,M.nombre, C.procesador, C.graficos, C.almacenamiento,C.ram,C.pantalla,C.precio,C.descripcion,C.imagen,C.detalle_imagen"
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}
export async function obtenerUno(id){
    try {
        const query = "SELECT C.id,STRING_AGG(CA.nombre, ', ') as categoria,ARRAY_AGG(CA.id) AS categoria_id,C.modelo,M.nombre as marca,M.id as marca_id, C.procesador, C.graficos, C.almacenamiento,C.ram,C.pantalla,C.precio,C.descripcion,C.imagen,C.detalle_imagen FROM computadoras as C INNER JOIN computadora_categoria as CC ON CC.computadora_id = C.ID INNER JOIN categorias as CA ON CA.id = CC.categoria_id INNER JOIN marcas as M ON M.id = C.marca_id GROUP BY C.id,C.modelo,M.nombre,M.id, C.procesador, C.graficos, C.almacenamiento,C.ram,C.pantalla,C.precio,C.descripcion,C.imagen,C.detalle_imagen HAVING C.id = $1"
        const result = await pool.query(query,[id])
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}
export async function crearUno(objComputadora, nombreImagen){
    const {modelo,procesador,graficos,almacenamiento,ram,pantalla,precio,descripcion,detalle_imagen,marca_id,categoria_id} = objComputadora
    try {
        const queryCompu = "INSERT INTO computadoras(modelo,procesador,graficos,almacenamiento,ram,pantalla,precio,descripcion,imagen,detalle_imagen,marca_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id"
        const resultadoCompu = await pool.query(queryCompu,[modelo,procesador,graficos,almacenamiento,ram,pantalla,precio,descripcion,nombreImagen,detalle_imagen,marca_id])

        const idComputadora = resultadoCompu.rows[0].id;

        let resultadoCategoria = ''
        categoria_id.forEach(async categoria => {
            const queryCategoria = "INSERT INTO computadora_categoria(computadora_id,categoria_id) VALUES ($1,$2)"
            resultadoCategoria = await pool.query(queryCategoria,[idComputadora,categoria])
        });

        return resultadoCategoria.rowCount
    } catch (error) {
        throw new Error(error)
    }
}
export async function actualizarUno(id, objComputadora){
    console.log(objComputadora)
    const {modelo,procesador,graficos,almacenamiento,ram,pantalla,precio,descripcion,imagen,detalle_imagen,marca_id,categoria_id} = objComputadora
    try {
        const queryUpdate = "UPDATE computadoras SET modelo = $1,procesador = $2,graficos = $3,almacenamiento = $4,ram = $5,pantalla = $6,precio = $7,descripcion = $8,imagen = $9,detalle_imagen = $10,marca_id = $11 WHERE id = $12;"
        const result = await pool.query(queryUpdate,[modelo,procesador,graficos,almacenamiento,ram,pantalla,precio,descripcion,imagen,detalle_imagen,marca_id, id])

        const queryBorrar = "DELETE FROM computadora_categoria WHERE computadora_id = $1"
        await pool.query(queryBorrar,[id])

        const queryCategoria = "INSERT INTO computadora_categoria(computadora_id,categoria_id) VALUES ($1,$2)"
        categoria_id.forEach(async categoria => {
            await pool.query(queryCategoria,[id,categoria])
        })

        return result.rowCount
    } catch (error) {
        throw new Error(error)
    }
}
export async function eliminarUno(id){
    try {
        const query = "DELETE FROM computadoras WHERE id = $1"
        const result = await pool.query(query,[id])
        return result.rowCount
    } catch (error) {
        throw new Error(error)
    }
}
// Extras
export async function obtenerMarcas(){
    try {
        const query = "SELECT * FROM marcas"
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}
export async function obtenerCategorias(){
    try {
        const query = "SELECT * FROM categorias"
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}