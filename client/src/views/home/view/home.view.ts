import { html, View } from 'wayofthejs';
import { Base } from '@/models/base.model';
import { FeaturedView } from '@/components/featured/featured.component.view';
// import { CardListView } from '@/components/cardList/cardList.view';
// import { MenuView } from '@/components/menu/menu.view';
import { homePageStyles } from './home.styles';
import { CategoryListView } from '@/components/categorylist/categorylist.component.view';
import { CardListView } from '@/components/cardlist/cardlist.component.view';
import { MenuView } from '@/components/menu/menu.component.view';

interface HomeViewProps {
  id?: number;
  page?: number;
}

export class HomeView extends View<Base, HomeViewProps> {
  private props: HomeViewProps;
  private featuredView: FeaturedView;
  private categoryListView: CategoryListView;
  private cardListView: CardListView;
  private menuView: MenuView;

  constructor(parent: Element, props: HomeViewProps) {
    super(parent, Base.default(), false, true);
    this.props = props;
    this.featuredView = new FeaturedView(parent, Base.default(), false, true);
    this.categoryListView = new CategoryListView(parent, Base.default(), false, true);
    this.cardListView = new CardListView(parent, { page: this.props.page });
    this.menuView = new MenuView(parent, Base.default(), false, true);
  }

  styles(): string {
    return homePageStyles;
  }

  template(): HTMLElement | HTMLElement[] {
    return html`
      <div class="container">
        <div id="featured"></div>
        <div id="category-list"></div>
        <div class="content">
          <div id="card-list"></div>
          <div id="menu"></div>
        </div>
      </div>
    `;
  }

  afterRender(): void {
    this.featuredView.parent = this.parent.querySelector('#featured');
    this.featuredView.render();

    this.categoryListView.parent = this.parent.querySelector('#category-list');
    this.categoryListView.render();

    this.cardListView.parent = this.parent.querySelector('#card-list');
    this.cardListView.render();

    this.menuView.parent = this.parent.querySelector('#menu');
    this.menuView.render();
  }
}
