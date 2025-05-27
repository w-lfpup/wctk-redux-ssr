import { Wc, Microtask, Subscription } from "wctk";
import { getState, subscribe, unsubscribe} from "../datastore/mod.js"

export class ShapeTable extends HTMLElement {
    #wc = new Wc({host: this});

    #mc = new Microtask({host: this, callbacks: [this.#render]});

    #sc = new Subscription({
        host: this,
        connected: true,
        callbacks: [this.#mc.queue],
        subscribe,
        unsubscribe
    });

    #render() {
        let state = getState();

        for (let index = 0; index < this.children.length; index++) {
            let child = this.children[index];
            
            let slot = child.getAttribute("slot");
            if ("circle_count" === slot)
                child.textContent = state.circles.toString();
            if ("square_count" === slot)
                child.textContent = state.squares.toString();
            if ("total" === slot)
                child.textContent = state.shapeList.length.toString();
        }
    }
}
