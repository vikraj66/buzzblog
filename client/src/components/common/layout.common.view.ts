import { Base } from '../../models/base.model';
import { base } from '../../props/base.props';
import { View } from 'wayofthejs';

interface LayoutCommonProps {
    id: number;
    children?: { [key: string]: View<any, any> };
}

export class LayoutCommonView extends View<any, LayoutCommonProps> {
    private children: { [key: string]: View<any, any> } = {};

    constructor(parent: Element, children?: { [key: string]: View<any, any> }, useEjs: boolean = false, scopingEnable: boolean = false) {
        super(parent, Base.default(), useEjs, scopingEnable);
        if (children) {
            this.children = children;
        }
    }

    addChild(key: string, view: View<any, any>): void {
        this.children[key] = view;
    }

    removeChild(key: string): void {
        delete this.children[key];
    }

    getChild(key: string): View<any, any> | undefined {
        return this.children[key];
    }

    styles(): string {
        return '';
    }

    template(): string {
        return `
            <div>
                ${Object.keys(this.children).map(key => `<div id="${key}"></div>`).join('')}
            </div>
        `;
    }

    onRender(): void {
        Object.keys(this.children).forEach(key => {
            const element = this.parent.querySelector(`#${key}`);
            if (element) {
                this.children[key].parent = element;
                this.children[key].render();
            }
        });
    }

    eventsMap(): { [key: string]: (event: Event) => void } {
        return {};
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }
}
