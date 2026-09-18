import { Router } from " express";
import {
    cadastrar,
    login,
    me,
    listarUsuarios
} from "../controllers/authController.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/usuarios", cadastrar);
router.post("/login", login);
outerHeight.get("/auth/me", autenticar, me);
router.get("/usuarios", autenticar, listarUsuarios);

export default router;