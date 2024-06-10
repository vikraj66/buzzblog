import { html, View } from 'wayofthejs';
import { Base } from '@/models/base.model';
import { blogPageStyles } from './blog.styles';
import { CardListView } from '@/components/cardlist/cardlist.component.view';
import { MenuView } from '@/components/menu/menu.component.view';

interface BlogViewProps {
    id?: number;
    page?: number;
    slug?: string;
}

export class BlogView extends View<Base, BlogViewProps> {
    private props: BlogViewProps;

    private cardListView: CardListView;
    private menuView: MenuView;

    constructor(parent: Element, props: BlogViewProps, params: { [key: string]: string }) {
        super(parent, Base.default(), false, true);
        this.props = props;
        this.props.slug = params.slug;
        this.cardListView = new CardListView(parent, { page: this.props.page }, params);
        this.menuView = new MenuView(parent, Base.default(), false, true);
    }

    styles(): string {
        return blogPageStyles;
    }

    template(): string {
        return `
        <div class="container">
            <h1 class="title">${this.props.slug} Blog</h1>
            <div class="content">
            <div id="card-list"></div>
            <div id="menu"></div>
            </div>
        </div>
     `;
    }

    afterRender(): void {

        this.cardListView.parent = this.parent.querySelector('#card-list');
        this.cardListView.render();

        this.menuView.parent = this.parent.querySelector('#menu');
        this.menuView.render();
    }
}
