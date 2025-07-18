import { Wc, Events, Microtask, Subscription, QuerySelector } from "wctk";
import { dispatch, getState, subscribe, unsubscribe } from "../datastore.js";
export class ShapeControls extends HTMLElement {
    #wc = new Wc({ host: this });
    #mc = new Microtask({ host: this, callbacks: [this.#render] });
    #ec = new Events({
        host: this,
        connected: true,
        target: this.#wc.shadowRoot,
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
        querySelector: [
            "[action='shapes/decrement_circles']",
            "[action='shapes/decrement_squares']",
            "[type=reset]"
        ]
    });
    #render() {
        let state = getState();
        let { circles, squares } = state;
        let circleButton = this.#qc.get("[action='shapes/decrement_circles']");
        circles
            ? circleButton?.removeAttribute('disabled')
            : circleButton?.setAttribute('disabled', "");
        let squaresButton = this.#qc.get("[action='shapes/decrement_squares']");
        squares
            ? squaresButton?.removeAttribute('disabled')
            : squaresButton?.setAttribute('disabled', "");
        let resetButton = this.#qc.get("[type=reset]");
        (circles + squares)
            ? resetButton?.removeAttribute('disabled')
            : resetButton?.setAttribute('disabled', "");
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
