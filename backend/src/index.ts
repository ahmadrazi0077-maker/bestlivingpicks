import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import articlesRouter from './routes/articles';
import categoriesRouter from './routes/categories';
import productsRouter from './routes/products';
import subscribersRouter from './routes/subscribers';

const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';

app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_URL.split(',').map((s) => s.trim()),
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '64kb' }));
app.use(morgan('combined'));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'bestlivingpicks-backend', time: new Date().toISOString() });
});

app.use('/api/articles', articlesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/subscribers', subscribersRouter);

// 404 for unknown API routes
app.use('/api', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler — never leak stack traces in production responses.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`bestlivingpicks-backend listening on :${PORT} (frontend: ${FRONTEND_URL})`);
});
