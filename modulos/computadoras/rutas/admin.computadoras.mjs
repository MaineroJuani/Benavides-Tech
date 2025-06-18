import * as controlador from "../controlador.computadoras.mjs";
import express from "express";
import multer from 'multer';
import { extname, join } from "path";
import {nanoid} from "nanoid";

const rutasAdmin = express.Router();

// Instanciamos multer
const gestionArchivos = multer({
    storage: multer.diskStorage({
        destination: join('/front_tp3/recursos/imagenes/computadoras'),
        filename: (req, archivo, cb) => {
            const ext = extname(archivo.originalname)
            const nuevoNombre = `imagen-${nanoid(30)}${ext}`
            cb(null, nuevoNombre)
        }
    })
})

rutasAdmin.post("/api/v1/computadoras",gestionArchivos.single('imagen'), controlador.crearUno)
rutasAdmin.put("/api/v1/computadoras/:id", controlador.actualizarUnoUno)
rutasAdmin.delete("/api/v1/computadoras/:id", controlador.eliminarUno)

export default rutasAdmin;