import { Model, View } from 'wayofjs';
import { footerStyles } from './footer.styles';
import { Base } from '@/models/base.model';
import { base } from '@/props/base.props';

export class FooterView extends View<Base, base> {
    constructor(parent: Element, model: Model<base>) {
        super(parent, model, false, true);
    }
    styles(): string {
        return footerStyles;
    }

    template(): string {
        return `
            <div class="container">
    <div class="info">
        <div class="logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/medium.png?alt=media&token=2d53fc3f-f717-43d0-9dfb-65e64f8d2275" alt="BuzzBlog" width="50" height="50" />
            <h1 class="logoText">BuzzBlog</h1>
        </div>
        <p class="desc">
            Welcome to BuzzBlog, a platform where creativity and innovation meet. Explore captivating stories, insightful articles, and stay updated with the latest trends. Dive into a world of inspiration and knowledge.
        </p>
        <div class="icons">
            <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/facebook.png?alt=media&token=d32118e1-f137-433f-8e1c-77da236918fd" alt="facebook" width="18" height="18" />
            <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/instagram.png?alt=media&token=d7c55141-41c2-4604-844d-90184df8ff0c" alt="instagram" width="18" height="18" />
            <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/tiktok.png?alt=media&token=f28ffd2f-5ecc-4ed2-b203-d411c6dbd886" alt="tiktok" width="18" height="18" />
            <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/youtube.png?alt=media&token=d8133d7c-1a1a-4438-8f57-ce2d29b9487f" alt="youtube" width="18" height="18" />
        </div>
    </div>
    <div class="links">
        <div class="list">
            <span class="listTitle">Links</span>
            <a href="/">Homepage</a>
            <a href="/blog">Blog</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </div>
        <div class="list">
            <span class="listTitle">Tags</span>
            <a href="/tags/style">Style</a>
            <a href="/tags/fashion">Fashion</a>
            <a href="/tags/coding">Coding</a>
            <a href="/tags/travel">Travel</a>
        </div>
        <div class="list">
            <span class="listTitle">Social</span>
            <a href="https://facebook.com">Facebook</a>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://tiktok.com">Tiktok</a>
            <a href="https://youtube.com">Youtube</a>
        </div>
    </div>
</div>

        `;
    }
}
