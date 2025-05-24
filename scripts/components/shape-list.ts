import { Wc, Subscription } from "wctk";
import { datastore, subscribe, unsubscribe} from "../datastore/mod.js"

export class ShapeList extends HTMLElement {
    #wc = new Wc({host: this});
    
    #sc = new Subscription({
        host: this,
        callback: this.#update,
        subscribe,
        unsubscribe
    })

    #update() {
        let state = datastore.getState();
    }
}

