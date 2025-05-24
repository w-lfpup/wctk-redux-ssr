import { Wc, Events, Subscription, QuerySelector } from "wctk";
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

    #qc = new QuerySelector({
        target: this.#wc.shadowRoot,
        selectors: [
            ["decrement_circles", "button[action='shapes/decrement_circles']"],
            ["decrement_squares", "button[action='shapes/decrement_squares']"]
        ]
    })

    #update() {
        let state = datastore.getState();
        console.log(state);
        
        let circleButton = this.#qc.get("decrement_circles");
        state.circles
            ? circleButton?.removeAttribute('disabled')
            : circleButton?.setAttribute('disabled', "");

        let squaresButton = this.#qc.get("decrement_squares");
        state.squares
            ? squaresButton?.removeAttribute('disabled')
            : squaresButton?.setAttribute('disabled', "");
    }

    #clickHandler(e: PointerEvent) {
        let { target } = e;
        if (target instanceof HTMLElement) {
            let type = target.getAttribute("action");
            if (type) datastore.dispatch({type});
        }
    }
}

