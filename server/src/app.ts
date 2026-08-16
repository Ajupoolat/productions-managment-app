import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import env from './configs/env.config';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Global Middleware
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'API is running successfully!' });
});

import routes from './routes';

// API Routes will be mounted here
app.use('/api', routes);

// Handle unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Error Handling Middleware
app.use(errorHandler);

export default app;
