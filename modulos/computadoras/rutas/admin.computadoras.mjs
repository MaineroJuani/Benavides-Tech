import * as controlador from "../controlador.computadoras.mjs";
import express from "express";

const rutasAdmin = express.Router();

rutasAdmin.post("/api/v1/computadoras", controlador.crearUno)
rutasAdmin.put("/api/v1/computadoras/:id", controlador.actualizarUnoUno)
rutasAdmin.delete("/api/v1/computadoras/:id", controlador.eliminarUno)

export default rutasAdmin;