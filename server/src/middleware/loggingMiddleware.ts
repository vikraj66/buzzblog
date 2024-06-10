import { Middleware } from '@/interface/Middleware';



export const LoggingMiddleware: Middleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
