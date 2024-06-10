import { html, View } from 'wayofjs';
import { Base } from '@/models/base.model';
import { MenuView } from '@/components/menu/menu.component.view';
import { CommentsView } from '@/components/comments/comments.component.view';
import { postStyles } from './post.styles';

interface SinglePageProps {
    id?: number;
    slug?: string;
}

export class PostView extends View<Base, SinglePageProps> {
    private props: SinglePageProps;
    private postData: any = null;

    constructor(parent: Element, props: SinglePageProps, params: { [key: string]: string }) {
        super(parent, Base.default(), false, true);
        this.props = props;
        this.props.slug = params.postId
        this.fetchPostData(params.postId);
    }

    async fetchPostData(slug: string): Promise<void> {
        try {
            const response = await fetch(`http://localhost:3000/posts/blog?slug=${slug}`);
            if (response.ok) {
                this.postData = await response.json();
                this.render();
            } else {
                console.error('Failed to fetch post data');
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    }

    styles(): string {
        return postStyles;
    }

    template(): HTMLElement | HTMLElement[] {
        if (!this.postData) {
            return html`<div>Loading...</div>`;
        }

        const { title, createdAt, user, img, desc, comments } = this.postData;

        return html`
            <div class="container">
                <div class="infoContainer">
                    <div class="textContainer">
                        <h1 class="title">${title}</h1>
                        <div class="user">
                            <div class="userImageContainer">
                                <img src="${user.image}" class="avatar" alt="${user.name}" />
                            </div>
                            <div class="userTextContainer">
                                <span class="username">${user.name}</span>
                                <span class="date">${new Date(createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div class="imageContainer">
                        <img src="${img}" class="image" alt="Post Image" />
                    </div>
                </div>
                <div class="content">
                    <div class="post">
                        <div class="description" id="description-container"></div>
                        <div class="comments-placeholder"></div>
                    </div>
                    <div id="menu-placeholder"></div>
                </div>
            </div>
        `;
    }

    afterRender(): void {
        if (!this.postData) return;

        const descriptionContainer = this.parent.querySelector('#description-container');
        if (descriptionContainer) {
            descriptionContainer.innerHTML = this.postData.desc;
        }

        const commentsPlaceholder = this.parent.querySelector(`.${this.getUniqueId()}-comments-placeholder`) as HTMLElement;
        const menuPlaceholder = this.parent.querySelector(`#menu-placeholder`) as HTMLElement;

        const commentsView = new CommentsView(commentsPlaceholder, { postSlug: this.props.slug });
        commentsView.render();

        const menuView = new MenuView(menuPlaceholder, Base.default(), false, true);
        menuView.render();
    }
}
