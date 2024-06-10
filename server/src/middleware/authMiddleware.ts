import { Middleware } from '../interface/Middleware';



export const AuthMiddleware: Middleware = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  } else {
    res.statusCode = 401;
    res.end('Not Authenticated');
  }
};