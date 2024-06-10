import { PostLayoutView } from "@/views/post/Post";


export const postPageRouteHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const postView = new PostLayoutView(appElement, params);
        postView.render();
    }
};
