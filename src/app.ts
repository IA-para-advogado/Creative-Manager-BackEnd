import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import {env} from './config/env';
import { notFound } from './middlewares/notFound';

const app: Application = express();

app.use(helmet());
app.use(cors({
    origin: env.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev')); // Loga as requisições no console (opcional, mas útil para desenvolvimento)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Injeta todas as rotas mapeadas
app.use('/api', routes);

app.get('/', (req,res) => {
    res.json({project: 'Creative Manager API', version: '1.0.0'});
})

app.use(notFound); // Middleware para lidar com rotas não encontradas

// O middleware de erro DEVE vir sempre depois de todas as rotas
app.use(errorHandler);

export default app;