import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { jwtDecode } from 'jwt-decode';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();

        const response = await fetch('http://localhost:3000/api/auth/google-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idToken })
        });

        const data = await response.json();
        localStorage.setItem('firebaseUserData', JSON.stringify(result.user));
        localStorage.setItem('idToken', idToken);
        window.location.href = '/';
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
    }
};

export async function isLoggedIn() {
    const userData = getStoredUserData();
    const idToken = localStorage.getItem('idToken');

    if (!userData || !idToken) {
        console.error('No valid user data or token found in local storage');
        return false;
    }

    try {
        const decodedToken = jwtDecode(idToken);

        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
            localStorage.removeItem('firebaseUserData');
            localStorage.removeItem('idToken');
            console.warn('Token has expired');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Failed to verify token:', error);
        return false;
    }
}

function getStoredUserData() {
    const storedData = localStorage.getItem('firebaseUserData');
    if (!storedData) {
        return null;
    }
    return JSON.parse(storedData);
}

export const logout = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('firebaseUserData');
        localStorage.removeItem('idToken');
        const response = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        window.location.href = '/login';
    } catch (error) {
        console.error('Error during sign out:', error);
    }
};

export const uploadFileToFirebase = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, new Date().getTime() + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.error('Error during file upload:', error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};
