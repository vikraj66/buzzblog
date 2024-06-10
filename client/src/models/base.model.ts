import { base } from "@/props/base.props";
import { ApiSync, Attributes, Eventing, Model } from "wayofjs";
export class Base extends Model<base> {
    static default() {
        const attr = new Attributes<base>({ id: 1 });
        const events = new Eventing();
        const sync = new ApiSync('');
        return new Base(attr, events, sync)
    }
}