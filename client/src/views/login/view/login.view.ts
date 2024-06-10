// login.view.ts
import { html, View } from 'wayofthejs';
import { loginPageStyles } from './login.styles';
import { LoginModel, LoginAttributes } from '@/models/login.model';
import { signInWithGoogle } from '@/utils/firebase';  // Import the function

interface LoginViewProps {
    id: number;
    status: 'loading' | 'authenticated' | 'unauthenticated';
    signIn?: (provider: string) => void;
    push?: (url: string) => void;
}

export class LoginView extends View<LoginModel, LoginViewProps> {
    private props: LoginViewProps;

    constructor(parent: Element, props: LoginViewProps) {
        super(parent, LoginModel.default(), false, true);
        this.props = props;
    }

    styles(): string {
        return loginPageStyles;
    }

    eventsMap(): { [key: string]: (event: Event) => void } {
        return {
            'click:.socialButton:nth-child(1)': signInWithGoogle,
            'click:.socialButton:nth-child(2)': () => console.log('Sign in with Github clicked'),
            'click:.socialButton:nth-child(3)': () => console.log('Sign in with Facebook clicked')
        };
    }

    template(): HTMLElement | HTMLElement[] {
        const { status } = this.props;

        // if (status === 'loading') {
        //     return html`<div class="loading">Loading...</div>`;
        // }

        // if (status === 'authenticated') {
        //     this.props.push('/');
        //     return html`<div></div>`;
        // }

        return html`
            <div class="container">
                <div class="wrapper">
                    <div class="socialButton">Sign in with Google</div>
                    <div class="socialButton" onclick="${() => console.log('Sign in with Github clicked')}">Sign in with Github</div>
                    <div class="socialButton" onclick="${() => console.log('Sign in with Facebook clicked')}">Sign in with Facebook</div>
                </div>
            </div>
        `;
    }
}
