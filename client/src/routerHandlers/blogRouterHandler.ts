import { BlogLayoutView } from "@/views/blog/Blog";


export const blogPageRouterHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const homeView = new BlogLayoutView(appElement, params);
        homeView.render();
    }
};
