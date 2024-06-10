import { html, View } from 'wayofthejs';
import { Base } from '@/models/base.model';
import { MenuPostsView } from '@/components/menuposts/menuposts.component.view';
import { MenuCategoriesView } from '@/components/menucategories/menucategories.component.view';

export class MenuView extends View<Base, {}> {
    styles(): string {
        return `
            .container {
                flex: 2;
                margin-top: 60px;
            }
            .subtitle {
                color: gray;
                font-size: 16px;
                font-weight: 400;
            }
            .title {
                font-size: 28px;
            }
            @media screen and (max-width: 1024px) {
                .container {
                    display: none;
                }
            }
        `;
    }

    template(): HTMLElement | HTMLElement[] {
        return html`
            <div class="container">
                <h2 class="subtitle">What's hot</h2>
                <h1 class="title">Most Popular</h1>
                <div class="menu-posts-no-image"></div>
                <h2 class="subtitle">Discover by topic</h2>
                <h1 class="title">Categories</h1>
                <div class="menu-categories"></div>
            </div>
        `;
    }

    afterRender(): void {
        // return;
        const postsNoImageContainer = this.parent.querySelector(`.${this.getUniqueId()}-menu-posts-no-image`) as HTMLElement;
        const postsWithImageContainer = this.parent.querySelector(`.${this.getUniqueId()}-menu-posts-with-image`) as HTMLElement;
        const categoriesContainer = this.parent.querySelector(`.${this.getUniqueId()}-menu-categories`) as HTMLElement;


        // return;
        const menuPostsWithoutImage = new MenuPostsView(postsNoImageContainer, { withImage: false });
        menuPostsWithoutImage.render();
        

        const menuCategories = new MenuCategoriesView(categoriesContainer, Base.default(), false, true);
        menuCategories.render();
        return;

        /**
         * <h2 class="subtitle">Chosen by the editor</h2>
         * <h1 class="title">Editors Pick</h1>
         * <div class="menu-posts-with-image"></div>
         */
        const menuPostsWithImage = new MenuPostsView(postsWithImageContainer, { withImage: true });
        menuPostsWithImage.render();
        return;

    }

    // afterRender(): void {
    //     // const postsNoImageContainer = this.parent.querySelector('.menu-posts-no-image') as HTMLElement;
    //     // const postsWithImageContainer = this.parent.querySelector('.menu-posts-with-image') as HTMLElement;
    //     // const categoriesContainer = this.parent.querySelector('.menu-categories') as HTMLElement;


        
    //     // const menuPostsWithoutImage = new MenuPostsView(postsNoImageContainer, { withImage: false });
    //     // menuPostsWithoutImage.render();
    //     console.log(this.parent.innerHTML)
    //     return;
    // }
}
