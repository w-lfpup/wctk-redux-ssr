class Bind {
    constructor(params) {
        let { target, callbacks } = params;
        for (let callback of callbacks) {
            // do not bind and replace already bound functions
            if (callback.hasOwnProperty("prototype"))
                continue;
            if (callback instanceof Function) {
                let { name } = callback;
                if (!name.startsWith("#"))
                    target[name] = callback.bind(target);
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
        this.#callbacks = getBoundCallbacks$1(host, callbacks);
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
function getBoundCallbacks$1(host, callbacks) {
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
        this.#callbacks = getBoundCallbacks(params);
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
function getBoundCallbacks(params) {
    let { target, callbacks } = params;
    let boundCallbacks = [];
    for (let callback of callbacks) {
        if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
            callback = callback.bind(target);
        }
        boundCallbacks.push(callback);
    }
    return boundCallbacks;
}

class Subscription {
    #connected = false;
    #callback;
    #affect;
    #subscribe;
    #unsubscribe;
    constructor(params) {
        let { host, callback, connected, subscribe, unsubscribe } = params;
        this.#subscribe = subscribe;
        this.#unsubscribe = unsubscribe;
        this.#callback = callback;
        if (callback.hasOwnProperty("prototype") && callback instanceof Function) {
            this.#callback = callback.bind(host);
        }
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affect = this.#subscribe(this.#callback);
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        this.#unsubscribe(this.#affect);
    }
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
    const { target, selectors } = params;
    const queries = new Map();
    for (let [name, query] of selectors) {
        const queried = target.querySelectorAll(query);
        queries.set(name, queried);
    }
    return queries;
}

const shadowRootInitFallback = {
    mode: "closed",
};
class Wc {
    #internals;
    #declarative;
    constructor(params) {
        let { host } = params;
        this.#internals = host.attachInternals();
        this.#declarative = null !== this.#internals.shadowRoot;
        if (!this.#declarative) {
            let { shadowRootInit, formValue, formState } = params;
            host.attachShadow(shadowRootInit ?? shadowRootInitFallback);
            if (formValue)
                this.setFormValue(formValue, formState);
        }
        let { adoptedStyleSheets } = params;
        if (adoptedStyleSheets)
            this.adoptedStyleSheets = adoptedStyleSheets;
    }
    get declarative() {
        return this.#declarative;
    }
    get shadowRoot() {
        return this.#internals.shadowRoot;
    }
    get adoptedStyleSheets() {
        return this.#internals.shadowRoot?.adoptedStyleSheets ?? [];
    }
    set adoptedStyleSheets(stylesheets) {
        let { shadowRoot } = this.#internals;
        if (shadowRoot)
            shadowRoot.adoptedStyleSheets = stylesheets;
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
