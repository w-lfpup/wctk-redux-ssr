interface QuerySelectorParamsInterface {
	target: Element | ShadowRoot | Document;
	selectors: Array<string>;
}

interface QuerySelectorInterface {
	query(): void;
	get(selector: string): Element | undefined;
	getAll(selector: string): NodeListOf<Element> | undefined;
}

class QuerySelector implements QuerySelectorInterface {
	#params: QuerySelectorParamsInterface;
	#queries: Map<string, NodeListOf<Element>>;

	constructor(params: QuerySelectorParamsInterface) {
		this.#params = params;
		this.#queries = getQueries(params);
	}

	query() {
		this.#queries = getQueries(this.#params);
	}

	get(selector: string): Element | undefined {
		return this.#queries.get(selector)?.[0];
	}

	getAll(selector: string): NodeListOf<Element> | undefined {
		return this.#queries.get(selector);
	}
}

function getQueries(
	params: QuerySelectorParamsInterface,
): Map<string, NodeListOf<Element>> {
	const { target, selectors } = params;

	const queries = new Map<string, NodeListOf<Element>>();
	for (let selector of selectors) {
		const queried = target.querySelectorAll(selector);
		queries.set(selector, queried);
	}

	return queries;
}

export type { QuerySelectorInterface, QuerySelectorParamsInterface };

export { QuerySelector };
