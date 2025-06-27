import * as controlador from "../controlador.computadoras.mjs";
import express from "express";

const rutasLogin = express.Router();

rutasLogin.post('/registrar', controlador.registrarse);
// Ruta para el POST login
rutasLogin.post('/autenticacion', controlador.autentificar);
rutasLogin.get('/logout', async (req, res) => {
    // Borramos la cookie
    res.cookie("token", "", {maxAge:0})
    res.redirect("/");
});

export default rutasLogin;