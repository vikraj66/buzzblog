import { ApiSync, Attributes, Eventing, Model } from 'wayofthejs';

export interface WriteAttributes {
    id?: number;
    title: string;
    value: string;
    media: string;
    catSlug: string;
}

export class WriteModel extends Model<WriteAttributes> {
    static default(): WriteModel {
        return new WriteModel(new Attributes({
            id: 1,
            title: '',
            value: '',
            media: '',
            catSlug: 'style',
        }), new Eventing(), new ApiSync(''));
    }
}
