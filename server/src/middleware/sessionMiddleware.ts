// src/middleware/sessionMiddleware.ts
import { Middleware } from '../interface/Middleware';
import * as http from 'http';
import { parse } from 'cookie';
import { serialize } from 'cookie';
import { SessionStore } from '../utils/sessionStore';
import { adminAuth } from '../config/firebaseAdmin';
import prisma from '../utils/connect'; // Make sure to import prisma client

const sessionStore = new SessionStore();

export const sessionMiddleware: Middleware = async (req, res, next) => {
  const cookies = parse(req.headers.cookie || '');
  let sessionId = cookies['sessionId'];
  const session = sessionId ? sessionStore.getSession(sessionId) : null;

  if (session && session.user) {
    req.session = session;
    return next();
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.statusCode = 401;
    res.end('Not Authenticated');
    return;
  }

  const idToken = authHeader.split(' ')[1];
  if (!idToken) {
    res.statusCode = 401;
    res.end('Not Authenticated');
    return;
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const user = await prisma.user.findUnique({
      where: { email: decodedToken.email }
    });

    if (!user) {
      res.statusCode = 401;
      res.end('Not Authenticated');
      return;
    }

    sessionId = sessionStore.createSession({ user });
    res.setHeader('Set-Cookie', serialize('sessionId', sessionId, { path: '/', httpOnly: true }));
    req.session = sessionStore.getSession(sessionId);

    next();
  } catch (error) {
    res.statusCode = 401;
    res.end('Not Authenticated');
  }
};
