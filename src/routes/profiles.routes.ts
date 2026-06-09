import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";
import { ensureAuth } from "../middlewares/ensureAuth";

const router = Router();
const controller = new ProfileController

router.use(ensureAuth);

router.get('/me',  (req,res) => controller.me(req,res));
router.get('/:id', (req,res) => controller.show(req,res));
router.put('/', (req,res) => controller.update(req,res));
router.delete('/', (req,res) => controller.delete(req,res));

export default router;