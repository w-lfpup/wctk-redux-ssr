import { Wc, Microtask, Subscription } from "wctk";
import { getState, subscribe, unsubscribe} from "../datastore/mod.js"

export class ShapeList extends HTMLElement {
    #wc = new Wc({host: this});
    
    #mc = new Microtask({host: this, callbacks: [this.#render]});

    #sc = new Subscription({
        host: this,
        callbacks: [this.#mc.queue],
        connected: true,
        subscribe,
        unsubscribe
    });

    #render() {
        let state = getState();
        console.log(this.children);

        // 1:1 li to shape list

        // if same length?
        //  check every item for being the correct item

        // if new list is longer
        //   check for correctness of children
        //   then add children

        // if new list is shorter
        //   walk back from

        // get least lengthed index
        // iterate through and change 
    }
}
