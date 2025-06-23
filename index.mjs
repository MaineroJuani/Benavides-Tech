import express from "express";
import rutasAdmin from "./modulos/computadoras/rutas/admin.computadoras.mjs";
import rutasFront from "./modulos/computadoras/rutas/front.computadoras.mjs";
import rutasLogin from "./modulos/computadoras/rutas/login.computadoras.mjs";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

dotenv.config();

const puerto = process.env.PUERTO || 4000;
const FRASE_PRIVADA = process.env.LLAVE_PRIVADA_JWT;


const app = express();
app.listen(puerto);

app.use(express.json())
app.use(cookieParser())


function verificarToken(req, res, next) {
    const {token} = req.cookies;
    jwt.verify(token, FRASE_PRIVADA, (error, datos) => {
        if (error) {
            return res.redirect("/login")
        }
        next();
    })
}

// Separacion de rutas
app.use("/", rutasFront, express.static("front_tp3"))
app.use('/login', rutasLogin, express.static('login'));

// Agregar despues verifaciones
app.use("/admin", verificarToken, rutasAdmin, express.static("admin"))

// Dar acceso a imagenes
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/computadoras', express.static(join(__dirname,'./front_tp3/recursos/imagenes/computadoras')))