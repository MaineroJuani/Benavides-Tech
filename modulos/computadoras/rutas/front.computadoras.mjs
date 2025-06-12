import * as controlador from "../controlador.computadoras.mjs";
import express from "express";

const rutasFront = express.Router();

// Extras
rutasFront.get("/api/v1/computadoras/marcas", controlador.obtenerMarcas)
rutasFront.get("/api/v1/computadoras/categorias", controlador.obtenerCategorias)

// Curso Normal
rutasFront.get("/api/v1/computadoras", controlador.obtenerTodos)
rutasFront.get("/api/v1/computadoras/:id", controlador.obtenerUno)

export default rutasFront;