import { Wc, Events, Microtask, Subscription, QuerySelector } from "wctk";
import { dispatch, getState, subscribe, unsubscribe } from "../datastore/mod.js";
export class ShapeControls extends HTMLElement {
    #wc = new Wc({ host: this });
    #mc = new Microtask({ host: this, callbacks: [this.#render] });
    #ec = new Events({
        host: this,
        target: this.#wc.shadowRoot,
        connected: true,
        callbacks: [
            ["click", this.#clickHandler]
        ]
    });
    #sc = new Subscription({
        host: this,
        callbacks: [this.#mc.queue],
        connected: true,
        subscribe,
        unsubscribe
    });
    #qc = new QuerySelector({
        target: this.#wc.shadowRoot,
        selectors: [
            ["decrement_circles", "[action='shapes/decrement_circles']"],
            ["decrement_squares", "[action='shapes/decrement_squares']"]
        ]
    });
    #render() {
        let state = getState();
        let circleButton = this.#qc.get("decrement_circles");
        state.circles
            ? circleButton?.removeAttribute('disabled')
            : circleButton?.setAttribute('disabled', "");
        let squaresButton = this.#qc.get("decrement_squares");
        state.squares
            ? squaresButton?.removeAttribute('disabled')
            : squaresButton?.setAttribute('disabled', "");
    }
    #clickHandler(e) {
        let { target } = e;
        if (target instanceof HTMLElement) {
            let type = target.getAttribute("action");
            if (type)
                dispatch({ type });
        }
    }
}
