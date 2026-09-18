import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { pool } from "./config/db.js";

const app = express();
const PORT = process.env.POT || 3000;