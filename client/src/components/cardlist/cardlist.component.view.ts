import { html, View } from 'wayofthejs';
import { Base } from '../../models/base.model';
import { CardView } from '../../components/card/card.component.view';
import { cardListStyles } from './cardlist.styles';
import { mockData } from './mockData';
import { BASEURL } from '../../constants/constant';

interface CardListProps {
    id?: number;
    page?: number;
    cat?: string;
}

interface Post {
    id: string;
    slug: string;
    title: string;
    img: string;
    desc: string;
    catSlug: string;
}

interface ApiResponse {
    posts: Post[];
    count: number;
}

export class CardListView extends View<Base, CardListProps> {
    private props: CardListProps;
    private posts: Post[] = [];
    private hasPrev: boolean = false;
    private hasNext: boolean = false;
    private isLoading: boolean = false;
    private hasFetched: boolean = false;


    constructor(parent: Element, props: CardListProps, params?: { [key: string]: string }) {
        super(parent, Base.default(), false, true);
        this.props = props;
        this.props.cat = params?.slug || '';
        this.fetchData();
    }

    async fetchData() {
        if (this.isLoading || this.hasFetched) {
            return;
        }

        const { page = 1, cat } = this.props;
        const POST_PER_PAGE = 2;

        try {
            const response = await fetch(`${BASEURL}/posts?page=${page}&cat=${cat || ''}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('idToken')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data: ApiResponse = await response.json();
            this.posts = data.posts;
            this.hasPrev = POST_PER_PAGE * (page - 1) > 0;
            this.hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count;
            this.hasFetched = true; // Indicate that data has been fetched

            this.render();
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            this.isLoading = false;
        }
    }

    styles(): string {
        return cardListStyles;
    }

    template(): HTMLElement | HTMLElement[] {
        return html`
            <div class="container">
                <h1 class="title">Recent Posts</h1>
                <div class="posts"></div>
                <div class="pagination">
                    <button class="button" ${!this.hasPrev ? 'disabled' : ''} onclick=${() => this.navigate(this.props.page - 1)}>Previous</button>
                    <button class="button" ${!this.hasNext ? 'disabled' : ''} onclick=${() => this.navigate(this.props.page + 1)}>Next</button>
                </div>
            </div>
        `;
    }

    afterRender(): void {
        const postsContainer = this.parent.querySelector(`.${this.getUniqueId()}-posts`) as HTMLElement;
        if (postsContainer) {
            postsContainer.innerHTML = '';
            this.posts.forEach(item => {
                const cardElement = document.createElement('div');
                const cardView = new CardView(cardElement, { item });
                cardView.render();
                postsContainer.appendChild(cardElement);
            });
        }
    }

    navigate(page: number) {
        this.props.page = page;
        this.hasFetched = false;
        this.fetchData();
    }
}
