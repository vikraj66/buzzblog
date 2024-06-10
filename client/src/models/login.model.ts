// login.model.ts
import { ApiSync, Attributes, Eventing, Model } from 'wayofthejs';

export interface LoginAttributes {
    id: number;
    status: 'loading' | 'authenticated' | 'unauthenticated';
}

export class LoginModel extends Model<LoginAttributes> {
    static default(): LoginModel {
        return new LoginModel(new Attributes({
            id: 1,
            status: 'unauthenticated',
        }), new Eventing(), new ApiSync(''));
    }
}