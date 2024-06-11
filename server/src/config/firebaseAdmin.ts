import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.FIREBASE_PRIVATE_KEY_ID) {
  console.error("FIREBASE_PRIVATE_KEY_ID is not defined");  
  process.exit(0);
}

try {
  const serviceAccount = { 
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: "https://accounts.google.com/o/oauth2/auth",
    tokenUri: "https://oauth2.googleapis.com/token",
    authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
    clientC509CertUrl: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
  };


  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL, // Uncomment if you are using the Firebase database
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin', error);
}

export const adminAuth = admin.auth();
