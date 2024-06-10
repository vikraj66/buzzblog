import { Base } from '@/models/base.model';
import { base } from '@/props/base.props';
import { View } from 'wayofjs';

export class SampleView extends View<Base, base> {
    template(): string {
        return `
            <div>
                <h1>Sample Content</h1>
                <p>This is a simple view with static content.</p>
            </div>
        `;
    }
}
