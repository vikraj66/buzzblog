import { WriteLayoutView } from "@/views/write/Write";


export const writeRouteHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const writeView = new WriteLayoutView(appElement);
        writeView.render();
    }
};
