import { Router } from 'express';
import creativeRoutes from './creative.routes';
import profileRoutes from './profiles.routes';
import authRoutes from './auth.routes';

const router = Router();

// Vincula as rotas de criativos sob o prefixo /creatives
router.use('/creatives', creativeRoutes);
router.use('/profiles', profileRoutes);
router.use('/auth', authRoutes)

export default router;