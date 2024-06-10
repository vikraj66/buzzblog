import { SampleLayoutView } from "@/views/sample/Sample";
import { TessLayoutView } from "@/views/tess/Tess";


export const tessRouterHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const sampleView = new TessLayoutView(appElement);
        sampleView.render();
    }
};
