import { LoginLayoutView } from "@/views/login/Login";


export const loginRouteHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const loginView = new LoginLayoutView(appElement);
        loginView.render();
    }
};
