import { isLoggedIn } from "@/utils/firebase";
import { Middleware } from "wayofjs/dist/router/Router";

export const authMiddleware: Middleware = async (params, next) => {
    // next();
    // return;
    // console.log(isLoggedIn())
    // return next();
    const isAuthenticated = await isLoggedIn();
    if (isAuthenticated) {
        window.location.href = '/';
    } else {
        next();
    }
};
export const privateMiddleware: Middleware = async (params, next) => {
    // next(); 
    // return;
    // console.log(isLoggedIn())
    // return next();
    const isAuthenticated = await isLoggedIn();
    console.log(isAuthenticated)
    if (isAuthenticated) {
        next(); 
    } else {
        window.location.href = '/login';
    }
};

