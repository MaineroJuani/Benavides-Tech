import pg from "pg";

const config = {
    host: "localhost",
    port: 5432,
    database: "tienda_notebooks",
    user: "root",
    password: "pass"
}

const pool = new pg.Pool(config);

export default pool;