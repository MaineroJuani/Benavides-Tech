import express from "express";
import rutasAdmin from "./modulos/computadoras/rutas/admin.computadoras.mjs";
import rutasFront from "./modulos/computadoras/rutas/front.computadoras.mjs";

const puerto = 3000;
const app = express();

app.listen(puerto)

app.use(express.json())

// Separacion de rutas
app.use("/",rutasFront)
app.use("/admin",rutasAdmin)

app.use(express.static("front_tp3"))
app.use('/imagenes', express.static('./front_tp3/recursos/imagenes/computadoras'))