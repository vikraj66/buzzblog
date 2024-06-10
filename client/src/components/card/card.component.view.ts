import { html, View } from 'wayofthejs';
import { Base } from '@/models/base.model';
import { cardStyles } from './card.styles';

interface CardProps {
    id?: number;
    item?: {
        img?: string;
        createdAt?: string;
        catSlug?: string;
        slug?: string;
        title?: string;
        desc?: string;
    };
}

export class CardView extends View<Base, CardProps> {
    private props: CardProps;

    constructor(parent: Element, props: CardProps) {
        super(parent, Base.default(), false, true);
        this.props = props;
    }

    styles(): string {
        return cardStyles;
    }

    stripHtml(html: string): string {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    template(): HTMLElement | HTMLElement[] {
        const { item } = this.props;
        return html`
            <div class="container">
                ${item.img
                ? html`
                        <div class="imageContainer">
                            <img src="${item.img}" alt="" class="image" />
                        </div>
                    `
                : ''}
                <div class="textContainer">
                    <div class="detail">
                        <span class="date">${String(item.createdAt).substring(0, 10)} - </span>
                        <span class="category">${item.catSlug}</span>
                    </div>
                    <a href="/posts/${item.slug}">
                        <h1>${item.title}</h1>
                    </a>
                    <div class="desc">${this.stripHtml(item.desc).substring(0, 60)}</div>
                    <a href="/posts/${item.slug}" class="link">Read More</a>
                </div>
            </div>
        `;
    }
}
