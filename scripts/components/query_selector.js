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
    get(selector) {
        return this.#queries.get(selector)?.[0];
    }
    getAll(selector) {
        return this.#queries.get(selector);
    }
}
function getQueries(params) {
    const { target, selectors } = params;
    const queries = new Map();
    for (let selector of selectors) {
        const queried = target.querySelectorAll(selector);
        queries.set(selector, queried);
    }
    return queries;
}
export { QuerySelector };
