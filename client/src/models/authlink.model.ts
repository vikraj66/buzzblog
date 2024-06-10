import { ApiSync, Attributes, Eventing, Model } from 'wayofthejs';
import { base } from '@/props/base.props';

export interface AuthModelProps {
    id?: number;
    status: Boolean | string;
}

export class AuthModel extends Model<AuthModelProps> {
    static default(): AuthModel {
        return new AuthModel(new Attributes({ id: 1, status: false }), new Eventing(), new ApiSync(''));
    }
}
