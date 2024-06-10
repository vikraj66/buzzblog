import { Middleware } from "../interface/Middleware";
import * as http from 'http';

export const adaptMiddleware = (expressMiddleware: any): Middleware => {
    return (req: http.IncomingMessage, res: http.ServerResponse, next: (err?: any) => void) => {
        expressMiddleware(req as any, res as any, next);
    };
};