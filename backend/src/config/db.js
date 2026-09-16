import mysql from "mysql2/promise";
import "Dotenv/config";

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_POT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})
