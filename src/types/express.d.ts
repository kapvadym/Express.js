import { Request } from 'express';

declare module 'express' {
  export interface Request{
    requestTime?: string;
    user?: any;
  }
}