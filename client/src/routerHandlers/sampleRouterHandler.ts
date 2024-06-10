import { Base } from "@/models/base.model";
import { SampleLayoutView } from "@/views/sample/Sample";
import { SampleView } from "@/views/sample/sample.view";


export const sampleRouteHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const sampleView = new SampleLayoutView(appElement);
        sampleView.render();
    }
};
