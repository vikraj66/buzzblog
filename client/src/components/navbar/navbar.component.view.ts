import { Model, View } from 'wayofthejs';
import { navbarStyles } from './navbar.styles';
import { AuthLinks } from '../authlinks/authlink.component.view';
import { Base } from '@/models/base.model';
import { base } from '@/props/base.props';
import { AuthModel } from '@/models/authlink.model';
import { isLoggedIn, logout } from '@/utils/firebase';

export class NavbarView extends View<Base, base> {
    private authLinks: AuthLinks;

    constructor(parent: Element, model: Model<base>) {
        super(parent, model, false, true);
        // this.authLinks = new AuthLinks(parent, AuthModel.default(), {
        //     id: 1,
        //     status: 'authenticated',
        //     signOut: () => console.log('Signed out')
        // });
    }

    styles(): string {
        return navbarStyles;
    }

    template(): string {
        return `
            <div class="container">
                <div class="social">
                    <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/facebook.png?alt=media&token=d32118e1-f137-433f-8e1c-77da236918fd" alt="facebook" width="24" height="24" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/instagram.png?alt=media&token=d7c55141-41c2-4604-844d-90244df8ff0c" alt="instagram" width="24" height="24" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/tiktok.png?alt=media&token=f28ffd2f-5ecc-4ed2-b203-d411c6dbd886" alt="tiktok" width="24" height="24" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/aerobic-canto-364115.appspot.com/o/youtube.png?alt=media&token=d8133d7c-1a1a-4438-8f57-ce2d29b9487f" alt="youtube" width="24" height="24" />
                </div>
                <div class="logo">BuzzBlog</div>
                <div class="links">
                    <a href="/" class="link">Homepage</a>
                    <a href="/" class="link">Contact</a>
                    <a href="/" class="link">About</a>
                    <div id="auth-links"></div>
                </div>
            </div>
        `;
    }

    afterRender(): void {
        const authLinksContainer = this.parent.querySelector('#auth-links');
        isLoggedIn().then((isAuthenticated: Boolean) => {
            if (authLinksContainer) {
                this.authLinks = new AuthLinks(authLinksContainer, AuthModel.default(), {
                    id: 1,
                    status: isAuthenticated as Boolean,
                    signOut: logout
                });
                this.authLinks.render();
            }
        }).catch(error => {
            console.error(error)
        })
    }
}
