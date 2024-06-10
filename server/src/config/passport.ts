import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
 
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: String(id) } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/api/auth/callback/google',
  scope: ['email', 'profile'],
}, async (token: string, tokenSecret: string, profile: GoogleProfile, done) => {
  try {
    const user = await prisma.user.upsert({
      where: { email: profile.emails![0].value },
      update: { name: profile.displayName },
      create: {
        email: profile.emails![0].value,
        name: profile.displayName
      }
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: '/api/auth/callback/github'
}, async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: any) => {
  try {
    const user = await prisma.user.upsert({
      where: { email: profile.emails![0].value },
      update: { name: profile.displayName },
      create: {
        email: profile.emails![0].value,
        name: profile.displayName
      }
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
}));

export default passport;
