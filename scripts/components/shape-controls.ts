import { Wc, Events, Subscription } from "wctk";
import { datastore, subscribe, unsubscribe} from "../datastore/mod.js"


export class ShapeControls extends HTMLElement {
    #wc = new Wc({host: this});
    #sc = new Subscription({
        host: this,
        callback: this.#update,
        connected: true,
        subscribe,
        unsubscribe
    });
    #ec = new Events({
        host: this,
        target: this.#wc.shadowRoot,
        connected: true,
        callbacks: [
            ["click", this.#clickHandler]
        ]
    });

    #update() {
        let state = datastore.getState();
        console.log(state);
    }

    #clickHandler(e: PointerEvent) {
        let { target } = e;
        if (target instanceof HTMLElement) {
            let type = target.getAttribute("action");
            if (type) datastore.dispatch({type});
        }
    }
}

