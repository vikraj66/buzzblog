import { html, View } from 'wayofthejs';
import { Base } from '../../models/base.model';
import { featuredStyles } from './featured.styles';
import { base } from '../../props/base.props';

export class FeaturedView extends View<Base, base> {
    styles(): string {
        return featuredStyles;
    }

    template(): HTMLElement | HTMLElement[] {
        return html`
        <div class="container">
    <h1 class="title">
        <b>Welcome to BuzzBlog!</b> Explore stories and creative ideas.
    </h1>
    <div class="post">
        <div class="imgContainer">
            <img src="./images/p2.jpg" alt="" class="image" />
        </div>
        <div class="textContainer">
            <h1 class="postTitle">Unveiling the Secrets of Exceptional Writing Techniques</h1>
            <p class="postDesc">
                Delve into the art of writing, where creativity thrives. Discover how to create compelling narratives that engage readers. From initial concepts to final touches, embark on a journey to enhance writing proficiency.
            </p>
            <button class="button">Read More</button>
        </div>
    </div>
</div>


    `;
    }
}
