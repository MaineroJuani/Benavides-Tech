import * as controlador from "../controlador.computadoras.mjs";
import express from "express";
import multer from 'multer';
import { dirname , extname, join } from "path";
import { fileURLToPath } from 'url';
import {nanoid} from "nanoid";

const rutasAdmin = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Instanciamos multer
const gestionArchivos = multer({
    storage: multer.diskStorage({
        destination: join(__dirname, '../../../front_tp3/recursos/imagenes/computadoras'),
        filename: (req, archivo, cb) => {
            const ext = extname(archivo.originalname)
            const nuevoNombre = `imagen-${nanoid(30)}${ext}`
            cb(null, nuevoNombre)
        }
    })
})

rutasAdmin.post("/api/v1/computadoras",gestionArchivos.single('imagen'), controlador.crearUno)
rutasAdmin.put("/api/v1/computadoras/:id",gestionArchivos.single('imagen'), controlador.actualizarUnoUno)
rutasAdmin.delete("/api/v1/computadoras/:id", controlador.eliminarUno)

export default rutasAdmin;