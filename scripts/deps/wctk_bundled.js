class Bind {
    constructor(params) {
        let { host, callbacks } = params;
        for (let callback of callbacks) {
            // do not bind and replace already bound functions
            if (!callback.hasOwnProperty("prototype") &&
                callback instanceof Function) {
                let { name } = callback;
                if (!name.startsWith("#"))
                    host[name] = callback.bind(host);
            }
        }
    }
}

class Events {
    #connected = false;
    #callbacks = [];
    #target;
    constructor(params) {
        const { host, target, callbacks, connected } = params;
        this.#target = target ?? host;
        this.#callbacks = getBoundCallbacks$2(host, callbacks);
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        for (let [name, callback] of this.#callbacks) {
            this.#target.addEventListener(name, callback);
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        for (let [name, callback] of this.#callbacks) {
            this.#target.removeEventListener(name, callback);
        }
    }
}
function getBoundCallbacks$2(host, callbacks) {
    let events = [];
    for (let [name, callback] of callbacks) {
        if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
            callback = callback.bind(host);
        }
        events.push([name, callback]);
    }
    return events;
}

class Microtask {
    #queued = false;
    #callbacks;
    constructor(params) {
        this.queue = this.queue.bind(this);
        this.#callbacks = getBoundCallbacks$1(params);
    }
    queue() {
        if (this.#queued)
            return;
        this.#queued = true;
        queueMicrotask(() => {
            this.#queued = false;
            for (let callback of this.#callbacks) {
                callback();
            }
        });
    }
}
function getBoundCallbacks$1(params) {
    let { host, callbacks } = params;
    let boundCallbacks = [];
    for (let callback of callbacks) {
        if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
            callback = callback.bind(host);
        }
        boundCallbacks.push(callback);
    }
    return boundCallbacks;
}

class Subscription {
    #connected = false;
    #callbacks;
    #affects;
    #subscribe;
    #unsubscribe;
    constructor(params) {
        let { host, callbacks, connected, subscribe, unsubscribe } = params;
        this.#subscribe = subscribe;
        this.#unsubscribe = unsubscribe;
        this.#callbacks = getBoundCallbacks(host, callbacks);
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affects = [];
        for (let callback of this.#callbacks) {
            this.#affects.push(this.#subscribe(callback));
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        if (this.#affects) {
            for (let callback of this.#affects) {
                this.#unsubscribe(callback);
            }
        }
    }
}
function getBoundCallbacks(host, callbacks) {
    let bounded = [];
    for (let callback of callbacks) {
        if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
            callback = callback.bind(host);
        }
        bounded.push(callback);
    }
    return bounded;
}

class QuerySelector {
    #params;
    #queries;
    constructor(params) {
        this.#params = params;
        this.#queries = getQueries(params);
    }
    query() {
        this.#queries = getQueries(this.#params);
    }
    get(name) {
        return this.#queries.get(name)?.[0];
    }
    getAll(name) {
        return this.#queries.get(name);
    }
}
function getQueries(params) {
    const { target, querySelector, querySelectorAll } = params;
    const queries = new Map();
    for (let selector of querySelectorAll) {
        const queried = target.querySelectorAll(selector);
        if (queried.length)
            queries.set(selector, Array.from(queried));
    }
    for (let selector of querySelector) {
        if (queries.has(selector))
            continue;
        const queried = target.querySelector(selector);
        if (queried)
            queries.set(selector, [queried]);
    }
    return queries;
}

const shadowRootInitFallback = {
    mode: "closed",
};
class Wc {
    #declarative = true;
    #internals;
    #shadowRoot;
    constructor(params) {
        let { host, shadowRootInit, adoptedStyleSheets, formValue, formState } = params;
        this.#internals = host.attachInternals();
        let { shadowRoot } = this.#internals;
        if (!shadowRoot) {
            this.#declarative = false;
            shadowRoot = host.attachShadow(shadowRootInit ?? shadowRootInitFallback);
        }
        this.#shadowRoot = shadowRoot;
        if (formValue)
            this.setFormValue(formValue, formState);
        if (adoptedStyleSheets)
            this.adoptedStyleSheets = adoptedStyleSheets;
    }
    get declarative() {
        return this.#declarative;
    }
    get shadowRoot() {
        return this.#shadowRoot;
    }
    get adoptedStyleSheets() {
        return this.#shadowRoot.adoptedStyleSheets ?? [];
    }
    set adoptedStyleSheets(stylesheets) {
        this.#shadowRoot.adoptedStyleSheets = stylesheets;
    }
    checkValidity() {
        return this.#internals.checkValidity();
    }
    reportValidity() {
        return this.#internals.reportValidity();
    }
    setFormValue(value, state) {
        this.#internals.setFormValue(value, state);
    }
    setValidity(flags, message, anchor) {
        this.#internals.setValidity(flags, message, anchor);
    }
}

export { Bind, Events, Microtask, QuerySelector, Subscription, Wc };
