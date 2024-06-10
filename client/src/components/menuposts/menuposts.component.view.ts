import { html, View } from 'wayofjs';
import { Base } from '@/models/base.model';
import { mockData } from '../cardlist/mockData';
import { menuPostsStyles } from './menuposts.styles';

interface MenuPostsProps {
    id?: number;
    withImage?: boolean;
}

export class MenuPostsView extends View<Base, MenuPostsProps> {
    private props: MenuPostsProps;

    constructor(parent: Element, props: MenuPostsProps) {
        super(parent, Base.default(), false, true);
        this.props = props;
    }

    styles(): string {
        return menuPostsStyles;
    }

    template(): HTMLElement | HTMLElement[] {
        return html`<div id="items" class="items"></div>`;
    }

    afterRender(): void {
        const withImage = true;
        const itemsContainer = this.parent.querySelector(`#items`) as HTMLElement;

        if (itemsContainer) {
            itemsContainer.innerHTML = '';

            mockData.posts.slice(0, 4).forEach(item => {
                const link = document.createElement('a');
                link.href = "/";
                link.className = "item";
                link.innerHTML = `
                    ${withImage ? `
                        <div class="imageContainer">
                            <img src="${item.img}" alt="" class="image" />
                        </div>
                    ` : ''}
                    <div class="textContainer">
                        <span class="category ${item.catSlug}">${item.catSlug}</span>
                        <h3 class="postTitle">${item.title}</h3>
                        <div class="detail">
                            <span class="username">John Doe</span>
                            <span class="date"> - ${item.createdAt.substring(0, 10)}</span>
                        </div>
                    </div>
                `;
                itemsContainer.appendChild(link);
            });
            this.applyScopedClassesToAll(itemsContainer as HTMLElement);
        }
    }
}
