import { HomeLayoutView } from "@/views/home/Home";


export const homepageRouteHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const homeView = new HomeLayoutView(appElement);
        homeView.render();
    }
};
