import express, { Request, Response, NextFunction } from 'express';
import { config } from './config/index';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from "./api-routes/auth/auth.router"

export const app = express();
 
app.use(express.json());
app.use(cors());

if(config.env === 'development'){
  app.use(morgan("dev"));
}

// extend Request with time
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();

  next();
})

app.use('/auth', authRouter)
// app.use('/accounts', accountsRouter)

