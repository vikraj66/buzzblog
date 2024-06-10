import { Base } from "@/models/base.model";
import { TestView } from "@/views/sample/Test";
import { TessLayoutView } from "@/views/tess/Tess";


export const testViewHandler = (params: { [key: string]: string }): void => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const testView = new TessLayoutView(appElement);
        testView.render();
    }
};
