import { Router } from 'express';
import creativeRoutes from './creative.routes';

const router = Router();

// Vincula as rotas de criativos sob o prefixo /creatives
router.use('/creatives', creativeRoutes);

export default router;