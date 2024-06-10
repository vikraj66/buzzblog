// src/middleware/corsMiddleware.ts
import { Middleware } from '../interface/Middleware';
import * as http from 'http';

export const corsMiddleware: Middleware = (req: http.IncomingMessage, res: http.ServerResponse, next: (err?: any) => void) => {
  console.log('CORS Middleware executed for request:', req.method, req.url);

  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    console.log('OPTIONS request handled');
    return;
  }

  next();
};
