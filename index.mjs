import express from "express";

const puerto = 3000;
const app = express();

app.listen(3000)

app.use(express.static("front_tp3"))