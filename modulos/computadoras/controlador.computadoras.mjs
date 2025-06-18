import * as modelos from "./modelo.computadoras.mjs";

export async function obtenerTodos(req, res){
    try {
        const datos = await modelos.obtenerTodos();
        res.json(datos)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}
export async function obtenerUno(req, res){
    const id = Number(req.params.id);
    try {
        const datos = await modelos.obtenerUno(id);
        if(datos.length <= 0){
            res.status(404).json({mensaje: "Producto no Existente"})
        }
        else{
            res.json(datos)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}
export async function crearUno(req, res){
    const computadora = req.body;
    const filename = req.file
    console.log(computadora)
    console.log(filename)
    try {
        const datos = await modelos.crearUno(computadora, filename);
        if(datos <= 0){
            res.status(404).json({mensaje: "Error al Cargar Producto"})
        }
        else{
            res.json({mensaje: "Producto Cargado Exitosamente"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}
export async function actualizarUnoUno(req, res){
    const id = Number(req.params.id);
    const computadora = req.body;
    try {
        const datos = await modelos.actualizarUno(id,computadora);
        if(datos <= 0){
            res.status(404).json({mensaje: "Producto no Existente"})
        }
        else{
            res.json({mensaje: "Producto Modificado Exitosamente"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}
export async function eliminarUno(req, res){
    const id = Number(req.params.id);
    try {
        const datos = await modelos.eliminarUno(id);
        if(datos <= 0){
            res.status(404).json({mensaje: "Producto no Existente"})
        }
        else{
            res.json({mensaje: "Producto Eliminado Exitosamente"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}
// Extras
export async function obtenerMarcas(req, res){
    try {
        const datos = await modelos.obtenerMarcas();
        res.json(datos)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}
export async function obtenerCategorias(req, res){
    try {
        const datos = await modelos.obtenerCategorias();
        res.json(datos)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}