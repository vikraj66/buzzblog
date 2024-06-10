import { LayoutCommonView } from '../../components/common/layout.common.view';
import { NavbarView } from '../../components/navbar/navbar.component.view';
import { FooterView } from '../../components/footer/footer.component.view';
import { Base } from '@/models/base.model';
import { PostView } from './view/post.view';


export class PostLayoutView extends LayoutCommonView {
    constructor(parent: HTMLElement, params: { [key: string]: string }) {
        super(parent, {
            navbar: new NavbarView(parent, Base.default()),
            content: new PostView(parent, { id: 1 }, params),
            footer: new FooterView(parent, Base.default()),
        });
    }

    styles(): string {
        return `
            .container {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            .wrapper {
                flex: 1;
            }
        `;
    }

    template(): string {
        return `
            <div class="container">
                <div class="wrapper">
                    <div id="navbar"></div>
                    <div id="content"></div>
                    <div id="footer"></div>
                </div>
            </div>
        `;
    }
}


