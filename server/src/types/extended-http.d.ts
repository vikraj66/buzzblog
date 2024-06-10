// src/types/extended-http.d.ts
import * as http from 'http';

declare module 'http' {
  interface IncomingMessage {
    logout(callback?: (err: Error) => void): void;
    isAuthenticated: () => boolean;
    user?: any;
    params?: { [key: string]: string };
    session?: any; // Define the structure of session as per your requirements
  }
}
