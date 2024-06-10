import { LayoutCommonView } from '../../components/common/layout.common.view';
import { NavbarView } from '../../components/navbar/navbar.component.view';
import { FooterView } from '../../components/footer/footer.component.view';
import { SampleView } from './sample.view';
import { Base } from '@/models/base.model';



export class SampleLayoutView extends LayoutCommonView {
    constructor(parent: HTMLElement) {
        super(parent, {
            navbar: new NavbarView(parent, Base.default()),
            content: new SampleView(parent, Base.default()),
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
            #content {
                height: 70vh;
            }
        `;
    }

    template(): string {
        return `
            <div class="container">
                <div class="wrapper">
                    <div id="navbar"></div>
                    <div class="wrapper" id="content"></div>
                    <div id="footer"></div>
                </div>
            </div>
        `;
    }
}


