import { html, View } from 'wayofthejs';
import { authlinkStyles } from './authlink.styles';
import { AuthModel, AuthModelProps } from '../../models/authlink.model';

interface AuthLinksProps {
    id?: number;
    status: Boolean | string;
    signOut?: () => void;
}

class AuthLinks extends View<AuthModel, AuthLinksProps> {
    private open: boolean = false;
    private props: AuthLinksProps;

    constructor(parent: Element, model: AuthModel, props: AuthLinksProps) {
        super(parent, model, false, true);
        this.props = props;
    }

    styles(): string {
        return authlinkStyles;
    }

    eventsMap(): { [key: string]: (event: Event) => void } {
        return {
            'click:.burger': this.toggleMenu.bind(this),
            'click:.sign-out': this.props.signOut.bind(this),
        };
    }

    toggleMenu(): void {
        this.open = !this.open;
        this.render();
    }

    template(): HTMLElement {
        const { status } = this.props;
        const { open } = this;

        return html`
            <div>
                ${!status ? html`
                    <a href="/login" class="link">Login</a>
                ` : html`
                    <a href="/write" class="link">Write</a>
                    <span class="link sign-out">Logout</span>
                `}
                <div class="burger" onclick=${this.toggleMenu}>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                ${open ? html`
                    <div class="responsiveMenu">
                        <a href="/">Homepage</a>
                        <a href="/">About</a>
                        <a href="/">Contact</a>
                        ${!status ? html`
                            <a href="/login">Login</a>
                        ` : html`
                            <a href="/write">Write</a>
                            <span class="link sign-out">Logout</span>
                        `}
                    </div>
                ` : ''}
            </div>
        ` as HTMLElement;
    }
}

export { AuthLinks };
