import express from "express";
import rutasProductos from "./modulos/computadoras/rutas.computadoras.mjs";

const puerto = 3000;
const app = express();

app.listen(3000)

app.use(express.json())
app.use(rutasProductos)

app.use(express.static("front_tp3"))