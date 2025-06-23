import pg from "pg";
import dotenv from "dotenv";

dotenv.config({})
const {BD_HOST, BD_NOMBRE, BD_USUARIO, BD_PASSWORD, BD_PUERTO} = process.env


const config = {

    host: BD_HOST,
    port: BD_PUERTO,
    user: BD_USUARIO,
    password: BD_PASSWORD,
    database: BD_NOMBRE
}

const pool = new pg.Pool(config);

export default pool;