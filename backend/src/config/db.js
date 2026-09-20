import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_POT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // define se quem chegar depois espera;
    wautForConnections: true,
    // define quantas conexões trabalhamao mesmo tempo;
    conecctionLimit: 10,
    // queueLimit define quantos podem ficar nessa espera.
    queueLimit: 0

    // é basicamente "Trabalhe com até 10 conexões;
    // // se lotar, espere; e nãoimponha um limite de tamanho à fila."

    // O queueLimit: 0 não siginifica "sem fila"; significa fila sem limite  configurado.
});
