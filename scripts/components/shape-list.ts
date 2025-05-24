import { Wc, Microtask, Subscription } from "wctk";
import { datastore, subscribe, unsubscribe} from "../datastore/mod.js"

export class ShapeList extends HTMLElement {
    #wc = new Wc({host: this});
    
    #mc = new Microtask({target: this, callbacks: [this.#render]});

    #sc = new Subscription({
        host: this,
        callback: this.#mc.queue,
        connected: true,
        subscribe,
        unsubscribe
    });

    #render() {
        let state = datastore.getState();
    }
}
