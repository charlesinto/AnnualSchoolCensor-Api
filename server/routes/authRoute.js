import express from "express";
import { validateLoginParams } from "../middleware/authMiddleware";
import { loginUser } from "../controller/authController";

const router = express.Router();


router.post('/login', validateLoginParams, loginUser)

export default router;