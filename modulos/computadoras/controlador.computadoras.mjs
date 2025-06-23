import * as modelos from "./modelo.computadoras.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const FRASE_PRIVADA = process.env.LLAVE_PRIVADA_JWT;

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
    const { filename } = req.file
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
    const filename = req.file?.filename || "";
    try {
        const datos = await modelos.actualizarUno(id,computadora,filename);
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
export async function registrarse(req, res){
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }

    try {
        const datos = await modelos.registrarse(usuario, pass);
        if (datos > 0) {
            res.redirect('/login');
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}
export async function autentificar(req, res){
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }

    try {
        const verificado = await modelos.autentificar(usuario, pass)
        if (verificado) {
            // Creamos Token
            const datos = {
                usuarioId: 1,
                rol: 0
            }
            jwt.sign(datos, FRASE_PRIVADA, {expiresIn: "24h"}, (error, token) => {
                if (error) {
                    return res.redirect("/login");
                }
                // Si se genero
                // Creamos cookie
                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.redirect('/admin/'); // Redirigimos al usuario a la página de administracion
            })
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error en el servidor"})
    }
}