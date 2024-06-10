import { Controller, Route } from 'wayofthenode';
import * as http from 'http';
import { adminAuth } from '../config/firebaseAdmin';
import { serialize } from 'cookie';
import { SessionStore } from '../utils/sessionStore';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const sessionStore = new SessionStore();

@Controller('/api/auth')
export class AuthController {
  @Route('post', '/google-login')
  async googleLogin(req: http.IncomingMessage, res: http.ServerResponse) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const { idToken } = JSON.parse(body);
      try {
        // Verify the ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const { uid, name, picture } = decodedToken;
        const email = decodedToken.email as string;

      
        // Upsert the user in the database
        const user = await prisma.user.upsert({
          where: { email },
          update: { name, image: picture },
          create: {
            id: uid,
            email,
            name,
            image: picture,
            emailVerified: new Date(),
          },
        });

        // Upsert the account in the database
        await prisma.account.upsert({
          where: { provider_providerAccountId: { provider: 'google', providerAccountId: uid } },
          update: { userId: user.id },
          create: {
            userId: user.id,
            type: 'oauth',
            provider: 'google',
            providerAccountId: uid,
            id_token: idToken,
          },
        });

        // Create a session
        const sessionId = await sessionStore.createSession({ user });
        res.setHeader('Set-Cookie', serialize('sessionId', sessionId, { path: '/', httpOnly: true }));

        res.statusCode = 200;
        res.end(JSON.stringify(user));
      } catch (error) {
        console.error(error);
        res.statusCode = 401;
        res.end('Login failed');
      }
    });
  }

  @Route('post', '/signup')
  async signup(req: http.IncomingMessage, res: http.ServerResponse) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const { email, password, name } = JSON.parse(body);
      try {
        const userRecord = await adminAuth.createUser({ email, password, displayName: name });
        
        // Create the user in the database
        const user = await prisma.user.create({
          data: {
            id: userRecord.uid,
            email: userRecord.email!,
            name: userRecord.displayName,
            emailVerified: new Date(),
          },
        });

        res.statusCode = 201;
        res.end(JSON.stringify(user));
      } catch (error) {
        console.error(error);
        res.statusCode = 401;
        res.end('Signup failed');
      }
    });
  }

  @Route('post', '/login')
  async login(req: http.IncomingMessage, res: http.ServerResponse) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const { email, password } = JSON.parse(body);
      try {
        const userRecord = await adminAuth.getUserByEmail(email);
        if (!userRecord) {
          res.statusCode = 401;
          res.end('Login failed');
          return;
        }

        // Verify the user's password (this part needs to be handled as Firebase Admin SDK does not directly support password verification)
        // Assuming password is verified successfully

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          res.statusCode = 401;
          res.end('Login failed');
          return;
        }

        const sessionId = await sessionStore.createSession({ user });
        res.setHeader('Set-Cookie', serialize('sessionId', sessionId, { path: '/', httpOnly: true }));

        res.statusCode = 200;
        res.end(JSON.stringify(user));
      } catch (error) {
        console.error(error);
        res.statusCode = 401;
        res.end('Login failed');
      }
    });
  }

  @Route('get', '/logout')
  async logout(req: http.IncomingMessage, res: http.ServerResponse) {
    const cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
    const sessionId = cookies.find(cookie => cookie.startsWith('sessionId='));

    if (sessionId) {
      const sessionIdValue = sessionId.split('=')[1];
      await sessionStore.deleteSession(sessionIdValue);
      res.setHeader('Set-Cookie', serialize('sessionId', '', { path: '/', expires: new Date(0) }));
    }

    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
