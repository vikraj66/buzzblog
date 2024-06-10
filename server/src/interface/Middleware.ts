import * as http from 'http';
export interface Middleware {
    (req: http.IncomingMessage, res: http.ServerResponse, next: (err?: any) => void): void;
}