import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const controller = new AuthController();

router.post("/sign-in",  (req, res) => controller.signIn(req, res));
router.post("/sign-up",  (req, res) => controller.signUp(req, res));
router.post("/sign-out", (req, res) => controller.signOut(req, res));
router.post("/reset-password-request", (req, res) => controller.resetPasswordRequest(req, res));
router.post("/reset-password", (req, res) => controller.resetPassword(req, res));

export default router;