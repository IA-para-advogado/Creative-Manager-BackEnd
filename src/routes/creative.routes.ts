import { Router } from 'express';
import { CreativeController } from '../controllers/creative.controller';

const router = Router();
const creativeController = new CreativeController();

// Define o endpoint do dashboard
router.get('/dashboard', creativeController.getDashboardStats);

export default router;