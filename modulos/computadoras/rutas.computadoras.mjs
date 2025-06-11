import * as controlador from "./controlador.computadoras.mjs";
import express from "express";

const rutasProductos = express.Router();

rutasProductos.get("/api/v1/computadoras", controlador.obtenerTodos)
rutasProductos.get("/api/v1/computadoras/:id", controlador.obtenerUno)
rutasProductos.post("/api/v1/computadoras", controlador.crearUno)
rutasProductos.put("/api/v1/computadoras/:id", controlador.actualizarUnoUno)
rutasProductos.delete("/api/v1/computadoras/:id", controlador.eliminarUno)

export default rutasProductos;