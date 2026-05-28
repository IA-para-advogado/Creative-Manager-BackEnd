import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Injeta todas as rotas mapeadas
app.use('/api', routes);

// O middleware de erro DEVE vir sempre depois de todas as rotas
app.use(errorHandler);

export default app;